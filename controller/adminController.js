const db = require("../db/connection").db;
  const multer = require("multer");
const path = require("path");
const fs = require("fs");
const jwt = require("jsonwebtoken");
// const upload = multer({ dest: 'uploads/' });

//      Admin

const getAdmin = (req, res) => {
  try {
    const sql = "SELECT * FROM admin";
    db.query(sql, (err, result) => {
      if (err) {
        console.error("Error in admin  query:", err);
        return res
          .status(500)
          .json({
            success: 1,
            data: null,
            error: null,
            msg: "Data Get Failed",
          });
      }
      return res
        .status(200)
        .json({
          success: 0,
          data: result,
          error: null,
          msg: "Data Get Successfully",
        });
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    return res
      .status(500)
      .json({
        success: 1,
        data: null,
        error: error,
        msg: "Internal Server Error",
      });
  }
};

const createAdmin = (req, res) => {
  try {
    const sql =
      "INSERT INTO admin (`email`,`password`,`user_type`,`name`, `id_branch`, `contact`, `address_1`, `address_2`, `pincode`, `state`, `city`, `area`) VALUES (?)";
    const values = [
      req.body.email,
      req.body.password,
      req.body.user_type,
      req.body.name,
      req.body.id_branch,
      req.body.contact,
      req.body.address_1,
      req.body.address_2,
      req.body.pincode,
      req.body.state,
      req.body.city,
      req.body.area,
    ];
    db.query(sql, [values], (err, result) => {
      if (err) {
        console.error("Error creating Admin ", err);
        return res
          .status(500)
          .json({
            success: 1,
            data: null,
            error: err,
            msg: "Data Inserted Failed",
          });
      }
      return res
        .status(200)
        .json({
          success: 0,
          data: result,
          error: null,
          msg: "Data Inserted Successfully",
        }); // 201 for successful creation
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    return res
      .status(500)
      .json({
        success: 1,
        data: null,
        error: error,
        msg: "Internal Server Error",
      });
  }
};

const getAdminById = (req, res) => {
  try {
    const sql = "SELECT * FROM admin WHERE id = ?";
    const id = req.params.id;
    db.query(sql, [id], (err, result) => {
      if (err) {
        console.error("Error querying Admin  by ID:", err);
        return res
          .status(500)
          .json({
            success: 1,
            data: null,
            error: err,
            msg: "Data Get By Id Failed ",
          });
      }
      return res
        .status(200)
        .json({
          success: 0,
          data: result,
          error: null,
          msg: "Data Get By Id Successfully",
        });
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    return res
      .status(500)
      .json({
        success: 1,
        data: null,
        error: error,
        msg: "Internal Server Error",
      });
  }
};
const editAdmin = (req, res) => {
  try {
    const sql =
      "UPDATE admin SET `email`=?,`password`=?,`user_type`=?,`name`=?, `id_branch`=?, `contact`=?, `address_1`=?, `address_2`=?, `pincode`=?, `state`=?, `city`=?, `area`=? WHERE  id=?";
    const id = req.params.id;
    db.query(
      sql,
      [
        req.body.email,
        req.body.password,
        req.body.user_type,
        req.body.name,
        req.body.id_branch,
        req.body.contact,
        req.body.address_1,
        req.body.address_2,
        req.body.pincode,
        req.body.state,
        req.body.city,
        req.body.area,
        id,
      ],
      (err, result) => {
        if (err) {
          console.error("Error updating Admin ", err);
          return res
            .status(500)
            .json({
              success: 1,
              data: null,
              error: err,
              msg: "Data Update Failed",
            });
        }
        return res
          .status(200)
          .json({
            success: 0,
            data: result,
            error: null,
            msg: "Data Update Successfully",
          });
      }
    );
  } catch (error) {
    console.error("Unexpected error:", error);
    return res
      .status(500)
      .json({
        success: 1,
        data: null,
        error: error,
        msg: "Internal Server Error",
      });
  }
};
//      delet admin
const deleteAdmin = (req, res) => {
  try {
    const sql = "DELETE FROM admin WHERE id =?";
    const id = req.params.id;
    db.query(sql, [id], (err, result) => {
      if (err) {
        console.error("Error deleting admin", err);
        return res
          .status(500)
          .json({
            success: 1,
            data: null,
            error: err,
            msg: "Data Delete Failed ",
          });
      }
      return res
        .status(200)
        .json({
          success: 0,
          data: result,
          error: null,
          msg: "Data Delete Successfully",
        });
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    return res
      .status(500)
      .json({
        success: 1,
        data: null,
        error: error,
        msg: "Internal Server Error",
      });
  }
};

//course
const addCourse = (req, res) => {
  try {
    const sql =
      "INSERT INTO course (`name`,`id_branch`,`id_board`,`id_medium`,`id_standard`,`id_subject`,`duration`,`fees`) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    function my_implode_js(separator, array) {
      var temp = "";
      for (var i = 0; i < array.length; i++) {
        temp += array[i];
        if (i != array.length - 1) {
          temp += separator;
        }
      } //end of the for loop

      return temp;
    }

    var id_branch = my_implode_js(",", req.body.id_branch);
    var id_subject = my_implode_js(",", req.body.id_subject);

    const values = [
      req.body.name,
      id_branch,
      req.body.id_board,
      req.body.id_medium,
      req.body.id_standard,
      id_subject,
      req.body.duration,
      req.body.fees,
    ];
    console.log(values);
    db.query(sql, values, (err, result) => {
      if (err) {
        console.error("Error creating Course", err);
        return res.status(500).json({ Message: "Internal Server Error" });
      }
      return res.status(200).json(result);
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    return res.status(500).json({ Message: "Internal Server Error" });
  }
};

const getCourse = (req, res) => {
  try {
    const sql = "SELECT * FROM course";
    db.query(sql, (err, result) => {
      if (err) {
        console.error("Error in course query:", err);
        return res.status(500).json({ Message: "Internal Server Error" });
      }
      return res.status(200).json(result);
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    return res.status(500).json({ Message: "Internal Server Error" });
  }
};

const getCourseById = (req, res) => {
  try {
    const sql = "SELECT * FROM course WHERE id = ?";
    const id = req.params.id;
    db.query(sql, [id], (err, result) => {
      if (err) {
        console.error("Error querying course by ID:", err);
        return res.status(500).json({ Message: "Internal Server Error" });
      }
      return res.status(200).json(result);
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    return res.status(500).json({ Message: "Internal Server Error" });
  }
};
const editCourse = (req, res) => {
  try {
    const sql =
      "UPDATE course SET `name`=?, `id_branch`=? ,`id_board`=?,`id_medium`=?,`id_standard`=?,`id_subject`=?,`duration`=?,`fees`=? WHERE  id=?";

    function implode(separator, array) {
      if (Array.isArray(array)) {
        return array.join(separator);
      } else {
        return array || "";
      }
    }

    const id_branch = implode(",", req.body.id_branch);
    const id_subject = implode(",", req.body.id_subject);

    const id = req.params.id;
    db.query(
      sql,
      [
        req.body.name,
        id_branch,
        req.body.id_board,
        req.body.id_medium,
        req.body.id_standard,
        id_subject,
        req.body.duration,
        req.body.fees,
        id,
      ],
      (err, result) => {
        if (err) {
          console.error("Error updating course", err);
          return res.status(500).json({ Message: "Internal Server Error" });
        }
        return res.status(200).json(result);
      }
    );
  } catch (error) {
    console.error("Unexpected error:", error);
    return res.status(500).json({ Message: "Internal Server Error" });
  }
};

const deleteCourse = (req, res) => {
  try {
    const sql = "DELETE FROM course WHERE id =?";
    const id = req.params.id;
    db.query(sql, [id], (err, result) => {
      if (err) {
        console.error("Error deleting course", err);
        return res.status(500).json({ Message: "Internal Server Error" });
      }
      return res.status(200).json(result);
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    return res.status(500).json({
      Message: "Internal Server Error",
      success: false,
      data: null,
      error: err,
    });
  }
};

//    getCoursebyids
const getCoursebyids = (req, res) => {
  try {
    const sql =
      "SELECT * FROM course A WHERE A.id_branch = ? AND A.id_board = ? AND A.id_medium = ? AND A.id_standard = ?  ";
    db.query(
      sql,
      [
        req.query.id_branch,
        req.query.id_board,
        req.query.id_medium,
        req.query.id_standard,
      ],
      (err, results) => {
        if (err) {
          console.log(err);
          res.status(500).json({ err: "Error When Fetching Data" });
        } else {
          res.status(200).json(results);
        }
      }
    );
  } catch (err) {
    res.status(500).json({ err: "Error When Fetching Data" });
  }
};

//material
const getMaterial = (req, res) => {
  try {
    const sql = "SELECT * FROM material";
    db.query(sql, (err, result) => {
      if (err) {
        console.error("Error in material query:", err);
        return res.status(500).json({ Message: "Internal Server Error" });
      }
      return res.status(200).json(result);
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    return res.status(500).json({ Message: "Internal Server Error" });
  }
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Specify the destination folder for uploaded files
  },
  filename: (req, file, cb) => {
    const originalName = file.originalname;
    cb(null, originalName);
  },
});

const fileFilter = (req, file, cb) => {
  // Allow pdf, doc, docx, jpg, png, and jpeg files
  const allowedMimeTypes = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "image/jpeg",
    "image/png",
    "image/jpg",
  ];

  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new Error(
        "Invalid file type. Only pdf, doc, docx, jpg, png, and jpeg files are allowed."
      ),
      false
    );
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});

const createMaterial = (req, res) => {
  try {
    upload.array("files", 5)(req, res, (err) => {
      if (err) {
        console.error("Error uploading files:", err);
        return res.status(500).json({ Message: "Error uploading files" });
      }

      const files = req.files.map((file) => file.originalname);

      const sql =
        "INSERT INTO material (`name`,`id_branch`,`id_board`,`id_medium`,`id_standard`,`id_subject`,`files`) VALUES (?)";
      const values = [
        req.body.name,
        req.body.id_branch,
        req.body.id_board,
        req.body.id_medium,
        req.body.id_standard,
        req.body.id_subject,
        JSON.stringify(files),
      ];

      db.query(sql, [values], (dbErr, result) => {
        if (dbErr) {
          console.error("Error creating material", dbErr);
          return res.status(500).json({ Message: "Internal Server Error" });
        }
        return res.status(200).json(result); // 201 for successful creation
      });
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    return res.status(500).json({ Message: "Internal Server Error" });
  }
};

const getMaterialById = (req, res) => {
  try {
    const sql = "SELECT * FROM material WHERE id = ?";
    const id = req.params.id;
    db.query(sql, [id], (err, result) => {
      if (err) {
        console.error("Error querying material by ID:", err);
        return res.status(500).json({ Message: "Internal Server Error" });
      }

      // if (result.length === 0) {
      //   return res.status(404).json({ Message: "Material not found" });
      // }

      // const materialData = result[0];
      // materialData.files = JSON.parse(materialData.files || '[]'); // Parse the files array

      return res.status(200).json(result);
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    return res.status(500).json({ Message: "Internal Server Error" });
  }
};

// const editMaterial = (req, res) => {
//   try {
//     upload.array('files', 5)(req, res, (err) => {
//       if (err) {
//         console.error('Error uploading files:', err);
//         return res.status(500).json({ Message: 'Error uploading files' });
//       }

//       const uploadedFiles = req.files.map((file) => file.path);

//       const sql =
//         'UPDATE material SET `name`=?,`id_branch`=? `id_board`=?, `id_medium`=?, `id_standard`=?, `id_subject`=?, `files`=? WHERE id=?';
//       const id = req.params.id;

//       // Get the existing files from the database
//       db.query('SELECT files FROM material WHERE id=?', [id], (dbErr, result) => {
//         if (dbErr) {
//           console.error('Error retrieving existing files', dbErr);
//           return res.status(500).json({ Message: 'Internal Server Error' });
//         }

//         let existingFiles = [];
//         if (result.length > 0) {
//           existingFiles = JSON.parse(result[0].files);
//         }

//         // Assuming req.body.deletedFiles is an array of file names to delete
//         const deletedFiles = req.body.deletedFiles || [];

//         // Delete files from the upload folder
//         deletedFiles.forEach((deletedFile) => {
//           const filePath = path.join(__dirname, 'uploads', deletedFile);
//           fs.unlinkSync(filePath); // Synchronously delete the file
//         });

//         // Filter out deleted files
//         const updatedFiles = existingFiles.filter((file) => !deletedFiles.includes(file));

//         // Concatenate the existing files and uploaded files
//         const finalFiles = updatedFiles.concat(uploadedFiles);

//         db.query(
//           sql,
//           [
//             req.body.name,
//             req.body.id_branch,
//             req.body.id_board,
//             req.body.id_medium,
//             req.body.id_standard,
//             req.body.id_subject,
//             JSON.stringify(finalFiles),
//             id,
//           ],
//           (updateErr, updateResult) => {
//             if (updateErr) {
//               console.error('Error updating material', updateErr);
//               return res.status(500).json({ Message: 'Internal Server Error' });
//             }
//             return res.status(200).json(updateResult);
//           }
//         );
//       });
//     });
//   } catch (error) {
//     console.error('Unexpected error:', error);
//     return res.status(500).json({ Message: 'Internal Server Error' });
//   }
// };
const editMaterial = (req, res) => {
  try {
    const sql =
      "UPDATE material SET `name`=?,`id_branch`=?, `id_board`=?, `id_medium`=?, `id_standard`=?, `id_subject`=? WHERE id=?";
    const id = req.params.id;
    db.query(
      sql,
      [
        req.body.name,
        req.body.id_branch,
        req.body.id_board,
        req.body.id_medium,
        req.body.id_standard,
        req.body.id_subject,
        id,
      ],
      (err, result) => {
        if (err) {
          console.error("Error updating Income ", err);
          return res.status(500).json({ Message: "Internal Server Error" });
        }
        return res.status(200).json(result);
      }
    );
  } catch (error) {
    console.error("Unexpected error:", error);
    return res.status(500).json({ Message: "Internal Server Error" });
  }
};
//      delet matiral
const deleteMaterial = (req, res) => {
  try {
    const id = req.params.id;
    db.query(
      "SELECT files FROM material WHERE id = ?",
      [id],
      (selectErr, selectResult) => {
        if (selectErr) {
          console.error("Error selecting user:", selectErr);
          return res.status(500).json({ Message: "Error inside server" });
        }

        const photoFilename = JSON.parse(selectResult[0].files)[0]; // Parse the JSON array

        db.query(
          "DELETE FROM material WHERE id = ?",
          [id],
          (deleteErr, deleteResult) => {
            if (deleteErr) {
              console.error("Error deleting user:", deleteErr);
              return res.status(500).json({ Message: "Error inside server" });
            }

            if (photoFilename) {
              const photoPath = `./uploads/${photoFilename}`;
              fs.unlink(photoPath, (unlinkErr) => {
                if (unlinkErr) {
                  console.error("Error deleting photo image:", unlinkErr);
                }

                return res
                  .status(200)
                  .json({ Message: "User deleted successfully" });
              });
            } else {
              return res
                .status(200)
                .json({ Message: "User deleted successfully" });
            }
          }
        );
      }
    );
  } catch (error) {
    console.error("Unexpected error:", error);
    return res
      .status(500)
      .json({
        Message: "Internal Server Error",
        success: false,
        data: null,
        error: error,
      });
  }
};

//      income

const getIncome = (req, res) => {
  try {
    const sql = "SELECT * FROM income";
    db.query(sql, (err, result) => {
      if (err) {
        console.error("Error in Income  query:", err);
        return res.status(500).json({ Message: "Internal Server Error" });
      }
      return res.status(200).json(result);
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    return res.status(500).json({ Message: "Internal Server Error" });
  }
};

const createIncome = (req, res) => {
  try {
    const sql =
      "INSERT INTO income (`income_title`,`id_branch`,`income_type`,`amount`) VALUES (?)";
    const values = [
      req.body.income_title,
      req.body.id_branch,
      req.body.income_type,
      req.body.amount,
    ];
    db.query(sql, [values], (err, result) => {
      if (err) {
        console.error("Error creating Income ", err);
        return res.status(500).json({ Message: "Internal Server Error" });
      }
      return res.status(200).json(result); // 201 for successful creation
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    return res.status(500).json({ Message: "Internal Server Error" });
  }
};

const getIncomeById = (req, res) => {
  try {
    const sql = "SELECT * FROM income WHERE id = ?";
    const id = req.params.id;
    db.query(sql, [id], (err, result) => {
      if (err) {
        console.error("Error querying Income  by ID:", err);
        return res.status(500).json({ Message: "Internal Server Error" });
      }
      return res.status(200).json(result);
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    return res.status(500).json({ Message: "Internal Server Error" });
  }
};
const editIncome = (req, res) => {
  try {
    const sql =
      "UPDATE income SET `income_title`=?,`id_branch`=?,`income_type`=?,`amount`=? WHERE  id=?";
    const id = req.params.id;
    db.query(
      sql,
      [
        req.body.income_title,
        req.body.id_branch,
        req.body.income_type,
        req.body.amount,
        id,
      ],
      (err, result) => {
        if (err) {
          console.error("Error updating Income ", err);
          return res.status(500).json({ Message: "Internal Server Error" });
        }
        return res.status(200).json(result);
      }
    );
  } catch (error) {
    console.error("Unexpected error:", error);
    return res.status(500).json({ Message: "Internal Server Error" });
  }
};
//      delet batch
const deleteIncome = (req, res) => {
  try {
    const sql = "DELETE FROM income WHERE id =?";
    const id = req.params.id;
    db.query(sql, [id], (err, result) => {
      if (err) {
        console.error("Error deleting Income ", err);
        return res.status(500).json({ Message: "Internal Server Error" });
      }
      return res.status(200).json(result);
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    return res
      .status(500)
      .json({
        Message: "Internal Server Error",
        success: false,
        data: null,
        error: err,
      });
  }
};

//      expanse
const getExpanse = (req, res) => {
  try {
    const sql = "SELECT * FROM expense";
    db.query(sql, (err, result) => {
      if (err) {
        console.error("Error in Expanse  query:", err);
        return res.status(500).json({ Message: "Internal Server Error" });
      }
      return res.status(200).json(result);
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    return res.status(500).json({ Message: "Internal Server Error" });
  }
};

const createExpanse = (req, res) => {
  try {
    const sql =
      "INSERT INTO expense (`expense_name`,`id_branch`,`expense_type`,`amount`) VALUES (?)";
    const values = [
      req.body.expense_name,
      req.body.id_branch,
      req.body.expense_type,
      req.body.amount,
    ];
    db.query(sql, [values], (err, result) => {
      if (err) {
        console.error("Error creating Expanse ", err);
        return res.status(500).json({ Message: "Internal Server Error" });
      }
      return res.status(200).json(result); // 201 for successful creation
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    return res.status(500).json({ Message: "Internal Server Error" });
  }
};

const getExpanseById = (req, res) => {
  try {
    const sql = "SELECT * FROM expense WHERE id = ?";
    const id = req.params.id;
    db.query(sql, [id], (err, result) => {
      if (err) {
        console.error("Error querying Expanse  by ID:", err);
        return res.status(500).json({ Message: "Internal Server Error" });
      }
      return res.status(200).json(result);
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    return res.status(500).json({ Message: "Internal Server Error" });
  }
};
const editExpanse = (req, res) => {
  try {
    const sql =
      "UPDATE expense SET `expense_name`=?,`id_branch`=?,`expense_type`=?,`amount`=? WHERE  id=?";
    const id = req.params.id;
    db.query(
      sql,
      [
        req.body.expense_name,
        req.body.id_branch,
        req.body.expense_type,
        req.body.amount,
        id,
      ],
      (err, result) => {
        if (err) {
          console.error("Error updating Expanse ", err);
          return res.status(500).json({ Message: "Internal Server Error" });
        }
        return res.status(200).json(result);
      }
    );
  } catch (error) {
    console.error("Unexpected error:", error);
    return res.status(500).json({ Message: "Internal Server Error" });
  }
};
//      delet Expanse
const deleteExpanse = (req, res) => {
  try {
    const sql = "DELETE FROM expense WHERE id =?";
    const id = req.params.id;
    db.query(sql, [id], (err, result) => {
      if (err) {
        console.error("Error deleting Expanse ", err);
        return res.status(500).json({ Message: "Internal Server Error" });
      }
      return res.status(200).json(result);
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    return res
      .status(500)
      .json({
        Message: "Internal Server Error",
        success: false,
        data: null,
        error: err,
      });
  }
};

const login = (req, res) => {
  try {
    const { email, password } = req.body;
    const sql = "SELECT * FROM admin WHERE email = ? AND password = ?";
    db.query(sql, [email, password], (errUser, dataUser) => {
      if (errUser) {
        console.error("Error during login ", errUser);
        return res.status(500).json({ Message: "Internal Server Error" });
      }

      if (dataUser.length === 0) {
        return res.status(400).json({ Message: "Invalid email or password" });
      }
      const user = dataUser[0];
      const name = dataUser[0].name;
      const userType = user.user_type;
      const token = jwt.sign({ name }, "our-jsonwebtoken-secret-key", {
        expiresIn: "1d",
      });
      res.cookie("token", token);
      console.log(userType);

      const staffTypeQuery = "SELECT staff_type FROM staff_type WHERE id = ?";
      db.query(staffTypeQuery, [userType], (staffTypeErr, staffTypeResults) => {
        if (staffTypeErr) {
          console.error("Error fetching staff type ", staffTypeErr);
          return res.status(500).json({ Message: "Internal Server Error" });
        }

        const roll =
          staffTypeResults.length > 0 ? staffTypeResults[0].staff_type : null;
        if (!roll) {
          return res.status(400).json({ Message: "Staff type not found" });
        }

        switch (roll) {
          case "Admin":
          case "Clark":
          case "Teachar":
          case "Student":
          case "BranchManager":
            return res
              .status(200)
              .json({ Message: `Login successful ${roll}`, userType, roll });

          default:
            return res.status(400).json({ Message: "Invalid user type" });
        }
      });
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    return res.status(500).json({ Message: "Internal Server Error" });
  }
};

const logoutRoute = (req, res) => {
  res.clearCookie("token");
  return res.json({ Status: "Success" });
};

const timetables = (req, res) => {
  try {
    const {
      standard_id,
      batch_id,
      branch_id,
      id_class,
      id_teacher,
      id_subject,
      time_to,
      time_from,
      day,
    } = req.body;

    // Check if the timetable exists
    db.query(
      "SELECT * FROM timetables WHERE branch_id = ? AND standard_id = ? AND batch_id = ?",
      [branch_id, standard_id, batch_id],
      (err, results) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ message: "Internal Server Error" });
        }

        if (results.length === 0) {
          // If the timetable doesn't exist, create a new one
          db.query(
            "INSERT INTO timetables (standard_id, batch_id, branch_id) VALUES (?, ?, ?)",
            [standard_id, batch_id, branch_id],
            (err, results) => {
              if (err) {
                console.error(err);
                return res
                  .status(500)
                  .json({ message: "Internal Server Error" });
              }

              const id_timetable = results.insertId;

              // Now that we have the id_timetable, proceed to insert the timetable entry for the specified day
              insertTimetableEntry(
                res,
                day,
                id_timetable,
                id_class,
                id_teacher,
                id_subject,
                time_to,
                time_from
              );
            }
          );
        } else {
          // If the timetable already exists, proceed to insert the timetable entry for the specified day
          const id_timetable = results[0].id;
          insertTimetableEntry(
            res,
            day,
            id_timetable,
            id_class,
            id_teacher,
            id_subject,
            time_to,
            time_from
          );
        }
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// function insertTimetableEntry(
//   res,
//   day,
//   id_timetable,
//   id_class,
//   id_teacher,
//   id_subject,
//   time_to,
//   time_from
// ) {
//   // Check if the same timetable entry exists for the given day, time, and branch
//   db.query(
//     `SELECT * FROM ${day} WHERE id_class = ? AND id_teacher=? AND id_subject=? AND time_to = ? AND time_from = ?`,
//     [id_class, id_teacher, id_subject, time_to, time_from],
//     (err, results) => {
//       if (err) {
//         console.error(err);
//         return res.status(500).json({ message: "Internal Server Error" });
//       }

//       if (results.length > 0) {
//         return res
//           .status(400)
//           .json({
//             message: `Duplicate Timetable entry for ${day} and Already Selected this time ${time_from} - ${time_to}`,
//           });
//       }

//       // Insert timetable entry for the specified day
//       db.query(
//         `INSERT INTO ${day} (id_timetable, id_class, id_teacher, id_subject, time_to, time_from) VALUES (?, ?, ?, ?, ?, ?)`,
//         [id_timetable, id_class, id_teacher, id_subject, time_to, time_from],
//         (err) => {
//           if (err) {
//             console.error(err);
//             return res
//               .status(500)
//               .json({ message: `Error creating ${day} timetable` });
//           }

//           // Send success response
//           res
//             .status(200)
//             .json({ message: `${day} timetable created successfully` });
//         }
//       );
//     }
//   );
//   db.query(
//     `SELECT * FROM ${day} WHERE id_class != ? AND id_teacher=? AND id_subject=? AND time_to = ? AND time_from = ?`,
//     [id_class, id_teacher, id_subject, time_to, time_from],
//     (err, results) => {
//       if (err) {
//         console.error(err);
//         return res.status(500).json({ message: "Internal Server Error" });
//       }

//       if (results.length > 0) {
//         return res
//           .status(400)
//           .json({
//             message: `Timetable entry with conflicting class already exists for ${day} and time ${time_from} - ${time_to}`,
//           });
//       }

//       // Insert timetable entry for the specified day
//       db.query(
//         `INSERT INTO ${day} (id_timetable, id_class, id_teacher, id_subject, time_to, time_from) VALUES (?, ?, ?, ?, ?, ?)`,
//         [id_timetable, id_class, id_teacher, id_subject, time_to, time_from],
//         (err) => {
//           if (err) {
//             console.error(err);
//             return res
//               .status(500)
//               .json({ message: `Error creating ${day} timetable` });
//           }

//           // Send success response
//           res
//             .status(200)
//             .json({ message: `${day} timetable created successfully` });
//         }
//       );
//     }
//   );
//   db.query(
//     `SELECT * FROM ${day} WHERE id_class = ? AND id_teacher!=? AND id_subject=? AND time_to = ? AND time_from = ?`,
//     [id_class, id_teacher, id_subject, time_to, time_from],
//     (err, results) => {
//       if (err) {
//         console.error(err);
//         return res.status(500).json({ message: "Internal Server Error" });
//       }

//       if (results.length > 0) {
//         return res
//           .status(400)
//           .json({
//             message: `Timetable entry with conflicting Teachar already exists for ${day} and time ${time_from} - ${time_to}`,
//           });
//       }

//       // Insert timetable entry for the specified day
//       db.query(
//         `INSERT INTO ${day} (id_timetable, id_class, id_teacher, id_subject, time_to, time_from) VALUES (?, ?, ?, ?, ?, ?)`,
//         [id_timetable, id_class, id_teacher, id_subject, time_to, time_from],
//         (err) => {
//           if (err) {
//             console.error(err);
//             return res
//               .status(500)
//               .json({ message: `Error creating ${day} timetable` });
//           }

//           // Send success response
//           res
//             .status(200)
//             .json({ message: `${day} timetable created successfully` });
//         }
//       );
//     }
//   );
//   db.query(
//     `SELECT * FROM ${day} WHERE id_class = ? AND id_teacher=? AND id_subject !=? AND time_to = ? AND time_from = ?`,
//     [id_class, id_teacher, id_subject, time_to, time_from],
//     (err, results) => {
//       if (err) {
//         console.error(err);
//         return res.status(500).json({ message: "Internal Server Error" });
//       }

//       if (results.length > 0) {
//         return res
//           .status(400)
//           .json({
//             message: `Timetable entry with conflicting Subject already exists for ${day} and time ${time_from} - ${time_to}`,
//           });
//       }

//       // Insert timetable entry for the specified day
//       db.query(
//         `INSERT INTO ${day} (id_timetable, id_class, id_teacher, id_subject, time_to, time_from) VALUES (?, ?, ?, ?, ?, ?)`,
//         [id_timetable, id_class, id_teacher, id_subject, time_to, time_from],
//         (err) => {
//           if (err) {
//             console.error(err);
//             return res
//               .status(500)
//               .json({ message: `Error creating ${day} timetable` });
//           }

//           // Send success response
//           res
//             .status(200)
//             .json({ message: `${day} timetable created successfully` });
//         }
//       );
//     }
//   );
// }
function insertTimetableEntry(
  res,
  day,
  id_timetable,
  id_class,
  id_teacher,
  id_subject,
  time_to,
  time_from
) {
  // Validate input data
  if (!id_timetable || !id_class || !id_teacher || !id_subject || !time_to || !time_from) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  // Check if any conflicting entry exists for the given day, time, and branch
  db.query(
    `SELECT ${day}.*, classroom.name AS class_name, admin.name AS teacher_name, subject.subject AS subject
     FROM ${day}
     INNER JOIN classroom ON ${day}.id_class = classroom.id
     INNER JOIN admin ON ${day}.id_teacher = admin.id
     INNER JOIN subject ON ${day}.id_subject = subject.id
     WHERE (${day}.id_class = ? OR ${day}.id_teacher = ? OR ${day}.id_subject = ?)
     AND ((? BETWEEN ${day}.time_from AND ${day}.time_to) OR (? BETWEEN ${day}.time_from AND ${day}.time_to))`,
    [id_class, id_teacher, id_subject, time_to, time_from],
    (err, results) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).json({ message: "Internal Server Error" });
      }

      if (results.length > 0) {
        const conflictingEntries = results.map(entry => ` Subject: ${entry.subject},Class: ${entry.class_name}, Teacher: ${entry.teacher_name}, Time: ${entry.time_from} - ${entry.time_to}`).join(', ');
        return res.status(400).json({
          message: `Conflicting timetable entries already exist for ${day}: ${conflictingEntries}`,
        });
      }

      // Insert timetable entry for the specified day
      db.query(
        `INSERT INTO ${day} (id_timetable, id_class, id_teacher, id_subject, time_to, time_from) VALUES (?, ?, ?, ?, ?, ?)`,
        [id_timetable, id_class, id_teacher, id_subject, time_to, time_from],
        (err) => {
          if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ message: `Error creating ${day} timetable` });
          }

          // Send success response
          res.status(200).json({ message: `${day} timetable created successfully` });
        }
      );
    }
  );
}




const getTimetableByDay = (req, res, day) => {
  try {
      const { branch_id, id_class, id_teacher, time_from, time_to, id_subject } = req.query;

      const sql = `
      SELECT m.*, t.*
      FROM ${day} m
      JOIN timetables t 
      
      `;

      db.query(
          sql,
         
          (err, result) => {
              if (err) {
                  console.error("Error in SQL query:", err);
                  return res.status(500).json({ Message: "Internal Server Error" });
              }
              return res.status(200).json(result);
          }
      );
  } catch (error) {
      console.error("Unexpected error:", error);
      return res.status(500).json({ Message: "Internal Server Error" });
  }
};

const getTimetableMnday = (req, res) => {
  getTimetableByDay(req, res, 'monday');
};

const getTimetableTuesday = (req, res) => {
  getTimetableByDay(req, res, 'tuesday');
};

const getTimetableWednesday = (req, res) => {
  getTimetableByDay(req, res, 'wednesday');
};

const getTimetableThursday = (req, res) => {
  getTimetableByDay(req, res, 'thursday');
};

const getTimetableFriday = (req, res) => {
  getTimetableByDay(req, res, 'friday');
};

const getTimetableSaturday = (req, res) => {
  getTimetableByDay(req, res, 'saturday');
};

const getTimetableSunday = (req, res) => {
  getTimetableByDay(req, res, 'sunday');
};


module.exports = {
  //Admin
  getAdmin,
  createAdmin,
  getAdminById,
  editAdmin,
  deleteAdmin,

  //course
  addCourse,
  getCourse,
  getCourseById,
  editCourse,
  deleteCourse,
  getCoursebyids,

  //material
  getMaterial,
  createMaterial,
  getMaterialById,
  editMaterial,
  deleteMaterial,

  //Income
  getIncome,
  createIncome,
  getIncomeById,
  editIncome,
  deleteIncome,

  //Expanse
  getExpanse,
  createExpanse,
  getExpanseById,
  editExpanse,
  deleteExpanse,

  login,
  logoutRoute,

  timetables,
  getTimetableMnday,
  getTimetableTuesday,
  getTimetableWednesday,
  getTimetableThursday,
  getTimetableFriday,
  getTimetableSaturday,
  getTimetableSunday
};
