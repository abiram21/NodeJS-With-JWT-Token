const express = require('express');
const Student = require('../models/student');
const router = express.Router();
const checkAuth = require('../middleware/check-auth')
const studentController = require('../contollers/student')
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname)
    }
})

const upload = multer({ storage: storage });



router.post('/',upload.single('image'), studentController.students_save );


router.get('/',studentController.students_get_all);

router.get('/:id',studentController.students_get_one );

router.patch('/:id', studentController.students_update );

router.delete('/:id', studentController.students_delete );

module.exports = router;