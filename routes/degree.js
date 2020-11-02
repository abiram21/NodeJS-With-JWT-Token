const express = require('express');
const Degree = require('../models/degree');
const router  = express.Router();

router.get('/',(req,res,next)=> {
    res.status(200).json({
        message:'Get od Degrees'
    });
});

router.post('/',async (req,res,next)=> {
    const student = new Degree({
        name: req.body.name,
        
    })
    await student.save()
        .then(doc => {
            res.status(201).json({ doc });
        })
        .catch(error => {
            res.status(500).json({ error })
        })
});
router.get('/:id',(req,res,next) => {
    res.status(200).json({
        id:req.params.id
    })
})

router.patch('/:id',(req,res,next) => {
    res.status(200).json({
        id:req.params.id
    })
})

router.delete('/:id',(req,res,next) => {
    res.status(200).json({
        id:req.params.id
    })
})

module.exports = router;