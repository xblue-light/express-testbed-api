const express = require('express');
const router = express.Router();
const List = require('../models/Violation');

// GET LISTS
router.get('/list', function(req, res){
    const createdBy = req.user.id;
    List.find({createdBy}, function(err, data){
        if(err){
            return res.status(400).end();
        }
        else {
            return res.status(200).json(data);
        }
    });
});

// POST LIST
router.post('/list', passport.authenticate('jwt', { session: false }), async (req, res) => {
    const createdBy = req.user.id;
    const doc = List.create({ ...req.body, createdBy }, function(err, data){
        if(err){
            return res.status(400).end();
        }
        else {
            return res.status(200).json(doc);
        }
    });
});

module.exports = router;