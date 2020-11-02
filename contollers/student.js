const Student = require("../models/student");
const Degree = require("../models/degree");
const { success, error, validation } = require("../helpers/response");

exports.students_get_all = async (req, res) => {
  await Student.find()
    .select("_id name age  sex dob studentImage")
    .populate("degree", "_id name")
    .exec()
    .then((docs) => {
      const response = {
        count: docs.length,
        students: docs.map((doc) => {
          return {
            _id: doc._id,
            name: doc.name,
            age: doc.age,
            sex: doc.sex,
            dob: doc.dob,
            studentImage: doc.studentImage,
            links: {
              type: "GET",
              url: "http://localhost:3000/students/" + doc._id,
            },
          };
        }),
      };
      if (docs.length > 0) {
        res.status(200).json(success("OK",response,res.statusCode));
      } else {
        res.status(404).json(error("Not found", res.statusCode));
      }
    })
    .catch((err) => {
      res.status(500).json(error("Something went wrong", res.statusCode));
    });
};

exports.students_save =  (req, res, next) => {
  console.log(req.file);
  postSet = [];
  console.log(req.body.img);
  const student = new Student( {
    name: req.body.name,
    age: req.body.age,
    sex: req.body.sex,
    dob: req.body.dob,
    studentImage: req.file.path
  });

  student
    .save()
    .then((result) => {
      res.status(201).json(success("Student created",result,res.statusCode));
    })
    .catch((err) => {
      res.status(500).json(error("Something went wrong", res.statusCode));
    });
  // Degree.findById(req.body.degree)
  //     .exec()
  //     .then(deg => {
  //         if (deg) {
  //             req.body.forEach(std => {
  //                 const student = new Student({
  //                     name: std.name,
  //                     age: std.age,
  //                     sex: std.sex,
  //                     degree: std.degree,
  //                 })
  //                 postSet.push(student);
  //             });

  //              Student.insertMany(postSet)
  //                 .then(doc => {
  //                     res.status(201).json({ doc });
  //                 })
  //                 .catch(error => {
  //                     res.status(500).json({ error })
  //                 })
  //         }
  //         else{
  //              res.status(404).json({
  //                 message: 'Invalid Degree',
  //             })
  //         }
  //     })
  //     .catch(err => {
  //         res.status(500).json({ error })
  //     })
};

exports.students_get_one = async (req, res) => {
  const studentId = req.params.id;
  await Student.findById(studentId)
    .exec()
    .then((doc) => {
      if (doc) {
        res.status(200).json(success("OK",doc,res.statusCode));
      } else {
        res.status(404).json(error("Not found", res.statusCode));
      }
    })
    .catch((error) => {
      res.status(500).json(error("Something went wrong", res.statusCode));
    });
};

exports.students_update = async (req, res) => {
  const studentId = req.params.id;
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }

  await Student.findByIdAndUpdate({ _id: studentId }, { $set: updateOps })
    .exec()
    .then((doc) => {
      if (doc) {
        res.status(200).json(success("Updated successfully",doc,res.statusCode));
      } else {
        res.status(404).json(error("Not found", res.statusCode));
      }
    })
    .catch((err) => {
      res.status(500).json(error("Something went wrong", res.statusCode));
    });
};

exports.students_delete = async (req, res) => {
  const studentId = req.params.id;
  await Student.remove({ _id: studentId })
    .exec()
    .then((doc) => {
      if (doc.deletedCount > 0) {
        res.status(200).json(success("Student Deleted",doc,res.statusCode));
      } else {
        res.status(404).json(error("Not found", res.statusCode));
      }
    })
    .catch((err) => {
      res.status(500).json(error("Something went wrong", res.statusCode));
    });
};
