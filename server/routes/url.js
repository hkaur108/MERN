const express = require('express');
const router= express.Router();
const {handlegenerateShortURL,
    redirectURLToOriginalWebsite,
    handleGetAnalytics,
    getAllRecords,deleteAllRecords}= require('../controllers/url')

router.post('/', handlegenerateShortURL)

router.get('/:shortID',redirectURLToOriginalWebsite)

router.get('/analytics/:shortID',handleGetAnalytics);
router.get('/', getAllRecords)
router.delete('/',deleteAllRecords)

module.exports=router;