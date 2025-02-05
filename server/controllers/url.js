const { nanoid } = require('nanoid');
const URL = require('../models/url')

async function handlegenerateShortURL(req,res){
    const body=req.body;
    if(!body.url) return res.status(400).json({error:'url is required'})
    const shortID= nanoid(8);
    const existingUrl=await URL.findOne({ url: body.url});
    try{
        if(!existingUrl){
        const entry= await URL.create({
        shortid:shortID,
        redirectURL:body.url,
        shortUrl:`https://www.${shortID}`
    })
    return res.json({id:shortID,entry})
        }
    }
    catch(error){
        res.send({'error':'duplicate url'})
    }  
}


async function redirectURLToOriginalWebsite(req,res){
    const shortid=req.params.shortID;
    const recordFoundInDB=await URL.findOneAndUpdate(
        {shortid:shortid},
        {$inc:{visitHistory:1}}
    );
    try{
        if(!recordFoundInDB) throw new Error('record not found')

    }
    catch(error){
        res.status(400).json({'Error':error})
    }
    res.redirect(recordFoundInDB.redirectURL)
}
async function handleGetAnalytics(req,res){
    const shortid=req.params.shortID;
    const result =await URL.findOne({shortid})
    const totalClicks= result.visitHistory;
    return res.json({'totalClick':totalClicks})
}
async function getAllRecords(req,res){
    const allRecords= await URL.find({});
    if(!allRecords) return res.status(404).json({'error':'records not found.'})
    return res.send(allRecords)

}
async function deleteAllRecords(req,res){
    const checkingLength=await URL.find({});
    if(checkingLength >=1){
        const deletedRecords= await URL.deleteMany({});
        return res.send(deletedRecords)
    }
    else{
        return res.json({error:"No enteries found"})
    }
   
}

module.exports={
    handlegenerateShortURL,
    redirectURLToOriginalWebsite,
    handleGetAnalytics,
    getAllRecords,
    deleteAllRecords
}