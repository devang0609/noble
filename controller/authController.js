const db = require("../db/connection").db;
const multer = require('multer');
const path = require('path');
const fs = require('fs');


//      batch

const getBatch = (req, res) => {
    try {
        const sql = 'SELECT * FROM batch';
        db.query(sql, (err, result) => {
            if (err) {
                console.error('Error in batch query:', err);
                return res.status(500).json({ Message: 'Internal Server Error' });
            }
            return res.status(200).json(result);
        });
    } catch (error) {
        console.error('Unexpected error:', error);
        return res.status(500).json({ Message: 'Internal Server Error' });
    }
};

const createBatch = (req, res) => {
    try {
        const sql = 'INSERT INTO batch (`name`,`id_branch`,`id_shift`,`id_board`,`id_medium`,`id_standard`) VALUES (?)';
        const values = [
            req.body.name,
            req.body.id_branch,
            req.body.id_shift,
            req.body.id_board,
            req.body.id_medium,
            req.body.id_standard,
        ];
        db.query(sql, [values], (err, result) => {
            if (err) {
                console.error('Error creating reference', err);
                return res.status(500).json({ Message: 'Internal Server Error' });
            }
            return res.status(200).json(result); // 201 for successful creation
        });
    } catch (error) {
        console.error('Unexpected error:', error);
        return res.status(500).json({ Message: 'Internal Server Error' });
    }
};

const getBatchById = (req, res) => {
    try {
        const sql = 'SELECT * FROM batch WHERE id = ?';
        const id = req.params.id;
        db.query(sql, [id], (err, result) => {
            if (err) {
                console.error('Error querying standard by ID:', err);
                return res.status(500).json({ Message: 'Internal Server Error' });
            }
            return res.status(200).json(result);
        });
    } catch (error) {
        console.error('Unexpected error:', error);
        return res.status(500).json({ Message: 'Internal Server Error' });
    }
};
const editBatch = (req, res) => {
    try {
        const sql =
            "UPDATE batch SET `name`=?,`id_branch`=?,`id_shift`=?,`id_board`=?,`id_medium`=?,`id_standard`=? WHERE  id=?";
        const id = req.params.id;
        db.query(
            sql,
            [
                req.body.name,
                req.body.id_branch,
                req.body.id_shift,
                req.body.id_board,
                req.body.id_medium,
                req.body.id_standard,
                id
            ],
            (err, result) => {
                if (err) {
                    console.error("Error updating batch", err);
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
const deleteBatch = (req, res) => {
    try {
        const sql = 'DELETE FROM batch WHERE id =?';
        const id = req.params.id;
        db.query(sql, [id], (err, result) => {
            if (err) {
                console.error('Error deleting batch', err);
                return res.status(500).json({ Message: 'Internal Server Error' });
            }
            return res.status(200).json(result);
        });
    } catch (error) {
        console.error('Unexpected error:', error);
        return res.status(500).json({ Message: 'Internal Server Error', success: false, data: null, error: err, });
    }
};



//              branch
const getBranch = (req, res) => {
    try {
        const sql = 'SELECT * FROM branch';
        db.query(sql, (err, result) => {
            if (err) {
                console.error('Error in branch query:', err);
                return res.status(500).json({ Message: 'Internal Server Error' });
            }
            return res.status(200).json(result);
        });
    } catch (error) {
        console.error('Unexpected error:', error);
        return res.status(500).json({ Message: 'Internal Server Error' });
    }
};

//   create branch
const createBranch = (req, res) => {
    try {
        const sql = 'INSERT INTO branch (`name`,`email`,`contact`,`id_country`,`id_state`,`id_city`,`id_area`) VALUES (?)';
        const values = [
            req.body.name,
            req.body.email,
            req.body.contact,
            req.body.id_country,
            req.body.id_state,
            req.body.id_city,
            req.body.id_area
        ];
        db.query(sql, [values], (err, result) => {
            if (err) {
                console.error('Error creating branch', err);
                return res.status(500).json({ Message: 'Internal Server Error' });
            }
            return res.status(200).json(result);
        });
    } catch (error) {
        console.error('Unexpected error:', error);
        return res.status(500).json({ Message: 'Internal Server Error' });
    }
};

const editBranch = (req, res) => {
    try {
        const sql = 'UPDATE branch SET `name`=?, `email`=?, `contact`=?, `id_country`=? ,`id_state`=? , `id_area`=? WHERE  id=?'
        const id = req.params.id;
        db.query(sql, [req.body.name, req.body.email, req.body.contact, req.body.id_country, req.body.id_state, req.body.id_area, id], (err, result) => {
            if (err) {
                console.error('Error updating branch', err);
                return res.status(500).json({ Message: 'Internal Server Error' });
            }
            return res.status(200).json(result);
        });
    } catch (error) {
        console.error('Unexpected error:', error);
        return res.status(500).json({ Message: 'Internal Server Error' });
    }
};
const getBranchById = (req, res) => {
    try {
        const sql = 'SELECT * FROM branch WHERE id = ?';
        const id = req.params.id;
        db.query(sql, [id], (err, result) => {
            if (err) {
                console.error('Error querying branch by ID:', err);
                return res.status(500).json({ Message: 'Internal Server Error' });
            }
            return res.status(200).json(result);
        });
    } catch (error) {
        console.error('Unexpected error:', error);
        return res.status(500).json({ Message: 'Internal Server Error' });
    }
};
const deleteBranch = (req, res) => {
    try {
        const sql = 'DELETE FROM branch WHERE id =?';
        const id = req.params.id;
        db.query(sql, [id], (err, result) => {
            if (err) {
                console.error('Error deleting branch', err);
                return res.status(500).json({ Message: 'Internal Server Error' });
            }
            return res.status(200).json(result);
        });
    } catch (error) {
        console.error('Unexpected error:', error);
        return res.status(500).json({ Message: 'Internal Server Error', success: false, data: null, error: err, });
    }
};







//              Status Homework
// const getStatusHomework = (req, res) => {
//     try {
//         const sql = `SELECT *,
//         CASE 
//             WHEN done = '' THEN 0
//             ELSE (LENGTH(done) - LENGTH(REPLACE(done, ',', '')) + 1) 
//         END AS done_count ,
//         CASE 
//             WHEN not_done = '' THEN 0
//             ELSE (LENGTH(not_done) - LENGTH(REPLACE(not_done, ',', '')) + 1) 
//         END AS not_done_count FROM status_homework`;
//         db.query(sql, (err, result) => {
//             if (err) {
//                 console.error('Error in status homework query:', err);
//                 return res.status(500).json({ Message: 'Internal Server Error' });
//             }
//             return res.status(200).json(result);
//         });
//     } catch (error) {
//         console.error('Unexpected error:', error);
//         return res.status(500).json({ Message: 'Internal Server Error' });
//     }
// };
const getStatusHomework = (req, res) => {
    try {
        const sql = `
            SELECT 
                ah.*,sh.*,
                (CASE 
                    WHEN sh.done = '' THEN 0
                    ELSE (LENGTH(sh.done) - LENGTH(REPLACE(sh.done, ',', '')) + 1) 
                END) AS done_count,
                (CASE 
                    WHEN sh.not_done = '' THEN 0
                    ELSE (LENGTH(sh.not_done) - LENGTH(REPLACE(sh.not_done, ',', '')) + 1) 
                END) AS not_done_count
            FROM 
                assign_homework AS ah
            INNER JOIN 
                status_homework AS sh 
            ON 
                ah.id_subject = sh.id_subject 
                AND ah.date = sh.date`;

        db.query(sql, (err, result) => {
            if (err) {
                console.error('Error in status homework query:', err);
                return res.status(500).json({ Message: 'Internal Server Error' });
            }
            return res.status(200).json(result);
        });
    } catch (error) {
        console.error('Unexpected error:', error);
        return res.status(500).json({ Message: 'Internal Server Error' });
    }
};



//   create Status Homework
const createStatusHomework = (req, res) => {
    try {
        const sql = 'INSERT INTO status_homework (`done`, `id_subject`) VALUES (?, ?)';

        function my_implode_js(separator, array) {
            if (Array.isArray(array) && array.length > 0) {
                return array.join(separator);
            } else {
                return "";
            }
        }

        const done = my_implode_js(",", req.body.done);
        const id_subject = req.body.id_subject;

        const values = [
            done,
            id_subject,
        ];

        db.query(sql, values, (err, result) => {
            if (err) {
                console.error('Error creating status homework', err);
                return res.status(500).json({ Message: 'Internal Server Error' });
            }
            return res.status(200).json(result);
        });
    } catch (error) {
        console.error('Unexpected error:', error);
        return res.status(500).json({ Message: 'Internal Server Error' });
    }
};

const editStatusHomework = (req, res) => {
    try {
        const sql = 'UPDATE status_homework SET `done`=?, `not_done`=? WHERE  id=?'
        const id = req.params.id;
        function my_implode_js(separator, array) {
            if (Array.isArray(array) && array.length > 0) {
                return array.join(separator);
            } else {
                return "";
            }
        }
        const done = my_implode_js(",", req.body.done);
        const not_done = my_implode_js(",", req.body.not_done);
        db.query(sql, [done, not_done, id], (err, result) => {
            if (err) {
                console.error('Error updating status homework', err);
                return res.status(500).json({ Message: 'Internal Server Error' });
            }
            return res.status(200).json(result);
        });
    } catch (error) {
        console.error('Unexpected error:', error);
        return res.status(500).json({ Message: 'Internal Server Error' });
    }
};
const getStatusHomeworkById = (req, res) => {
    try {
        const sql = 'SELECT * FROM status_homework WHERE id = ?';
        const id = req.params.id;
        db.query(sql, [id], (err, result) => {
            if (err) {
                console.error('Error querying status homework by ID:', err);
                return res.status(500).json({ Message: 'Internal Server Error' });
            }
            return res.status(200).json(result);
        });
    } catch (error) {
        console.error('Unexpected error:', error);
        return res.status(500).json({ Message: 'Internal Server Error' });
    }
};
const deleteStatusHomework = (req, res) => {
    try {
        const sql = 'DELETE FROM status_homework WHERE id =?';
        const id = req.params.id;
        db.query(sql, [id], (err, result) => {
            if (err) {
                console.error('Error deleting status homework', err);
                return res.status(500).json({ Message: 'Internal Server Error' });
            }
            return res.status(200).json(result);
        });
    } catch (error) {
        console.error('Unexpected error:', error);
        return res.status(500).json({ Message: 'Internal Server Error', success: false, data: null, error: err, });
    }
};

const getHomeworkStatus = (req, res) => {
    try {
        const studentId = req.params.studentId;
        const currentDate = new Date();
        const startOfYear = new Date(currentDate.getFullYear(), 0, 1);
        const endOfYear = new Date(currentDate.getFullYear(), 11, 31);

        const sql = `
            SELECT
                id_subject,
                MONTH(date) as month,
                IF(WEEK(date, 1) = 5, WEEK(date, 1) - 1, WEEK(date, 1)) as week,
                COUNT(*) as notDoneCount
            FROM
                status_homework
            WHERE
                date BETWEEN ? AND ?
                AND (FIND_IN_SET(?, not_done))
            GROUP BY
                id_subject, month, week
            ORDER BY
                month, week;
        `;

        db.query(sql, [startOfYear, endOfYear, studentId], (err, result) => {
            if (err) {
                console.error('Error in not_done homework status query:', err);
                return res.status(500).json({ Message: 'Internal Server Error' });
            }

            return res.status(200).json(result);
        });
    } catch (error) {
        console.error('Unexpected error:', error);
        return res.status(500).json({ Message: 'Internal Server Error' });
    }
};




//                                  Student
//               call data
const getStudent = (req, res) => {
    try {
        const sql = 'SELECT * FROM student';
        db.query(sql, (err, result) => {
            if (err) {
                console.error('Error in student query:', err);
                return res.status(500).json({ Message: 'Internal Server Error' });
            }
            return res.status(200).json(result);
        });
    } catch (error) {
        console.error('Unexpected error:', error);
        return res.status(500).json({ Message: 'Internal Server Error' });
    }
};

//              create student
const createStudent = (req, res) => {
    try {
        const sql = 'INSERT INTO student (`name`,`gender`, `id_branch`,`id_board`,`id_medium`, `id_standard`,`id_batch`,`id_course`, `school`, `id_shift`, `id_reference_type`, `reference_name`,`birth_date`,`contact_1`,`contact_2`, `address`, `pincode`, `remark`, `fathers_name`, `fathers_occupation`, `fathers_contact`, `mothers_name`, `mothers_occupation`, `mothers_contact`, `sibling_name`, `sibling_relation`, `sibling_board`, `sibling_medium`, `sibling_standard`, `sibling_school`, `sibling_tution_name`, `last_result`, `photo`, `final_fees`,`id_state`, `id_city`, `id_area`) VALUES (?)';
        const values = [
            req.body.name,
            req.body.gender,
            req.body.id_branch,
            req.body.id_board,
            req.body.id_medium,
            req.body.id_standard,
            req.body.id_batch,
            req.body.id_course,
            req.body.school,
            req.body.id_shift,
            req.body.id_reference_type,
            req.body.reference_name,
            req.body.birth_date,
            req.body.contact_1,
            req.body.contact_2,
            req.body.address,
            req.body.pincode,
            req.body.remark,
            req.body.fathers_name,
            req.body.fathers_occupation,
            req.body.fathers_contact,
            req.body.mothers_name,
            req.body.mothers_occupation,
            req.body.mothers_contact,
            req.body.sibling_name,
            req.body.sibling_relation,
            req.body.sibling_board,
            req.body.sibling_medium,
            req.body.sibling_standard,
            req.body.sibling_school,
            req.body.sibling_tution_name,
            req.body.last_result,
            req.file.filename,
            req.body.final_fees,
            req.body.id_state,
            req.body.id_city,
            req.body.id_area,
        ];
        db.query(sql, [values], (err, result) => {
            if (err) {
                console.error('Error creating student', err);
                return res.status(500).json({ Message: 'Internal Server Error' });
            }
            return res.status(200).json(result); // 201 for successful creation
        });
    } catch (error) {
        console.error('Unexpected error:', error);
        return res.status(500).json({ Message: 'Internal Server Error' });
    }
};

//            edit student
// const editStudent = (req, res) => {
//     try {
//         const id = req.params.id;
//         const sqlSelectPhoto = 'SELECT photo FROM student WHERE id = ?';
//         db.query(sqlSelectPhoto, [id], (selectErr, selectResult) => {
//             if (selectErr) {
//                 console.error('Error selecting user:', selectErr);
//                 return res.status(500).json({ Message: 'Error inside server' });
//             }
//             let photoFilename = selectResult[0].photo;
//             if (req.file) {
//                 if (photoFilename) {
//                     const photoPath = `./uploads/${photoFilename}`;
//                     fs.unlink(photoPath, (unlinkErr) => {
//                         if (unlinkErr) {
//                             console.error('Error deleting photo image:', unlinkErr);
//                         }
//                     });
//                 }
//                 photoFilename = req.file.filename;
//                 console.log(photoFilename);
//             }
//             const sqlUpdate = `UPDATE student SET photo=? WHERE id=?`;
//             const values = [photoFilename, id];
//             db.query(sqlUpdate, values, (err, result) => {
//                 // console.log(values);
//                 if (err) {
//                     console.error('Error updating student', err);
//                     return res.status(500).json({ Message: 'Internal Server Error' });
//                 }
//                 return res.status(200).json(result);
//             });
//         });
//     } catch (error) {
//         console.error('Unexpected error:', error);
//         return res.status(500).json({ Message: 'Internal Server Error' });
//     }
// };

const editStudent = (req, res) => {
    try {
        const sql = 'UPDATE student SET `name`=?, `gender`=?, `id_branch`=?, `id_board`=?, `id_medium`=?, `id_standard`=?, `id_batch`=?, `id_course`=?, `school`=?, `id_shift`=?, `id_reference_type`=?, `reference_name`=?, `birth_date`=?, `contact_1`=?, `contact_2`=?, `address`=?,  `pincode`=?, `remark`=?, `fathers_name`=?, `fathers_occupation`=?, `fathers_contact`=?, `mothers_name`=?, `mothers_occupation`=?, `mothers_contact`=?, `sibling_name`=?, `sibling_relation`=?, `sibling_board`=?, `sibling_medium`=?, `sibling_standard`=?, `sibling_school`=?, `sibling_tution_name`=?, `last_result`=?, `final_fees`=?, `id_state`=?, `id_city`=?, `id_area`=? WHERE  id=?'
        const id = req.params.id;
        db.query(sql, [
            req.body.name,
            req.body.gender,
            req.body.id_branch,
            req.body.id_board,
            req.body.id_medium,
            req.body.id_standard,
            req.body.id_batch,
            req.body.id_course,
            req.body.school,
            req.body.id_shift,
            req.body.id_reference_type,
            req.body.reference_name,
            req.body.birth_date,
            req.body.contact_1,
            req.body.contact_2,
            req.body.address,
            req.body.pincode,
            req.body.remark,
            req.body.fathers_name,
            req.body.fathers_occupation,
            req.body.fathers_contact,
            req.body.mothers_name,
            req.body.mothers_occupation,
            req.body.mothers_contact,
            req.body.sibling_name,
            req.body.sibling_relation,
            req.body.sibling_board,
            req.body.sibling_medium,
            req.body.sibling_standard,
            req.body.sibling_school,
            req.body.sibling_tution_name,
            req.body.last_result,
            req.body.final_fees,
            req.body.id_state,
            req.body.id_city,
            req.body.id_area,
            id
        ], (err, result) => {
            if (err) {
                console.error('Error updating student', err);
                return res.status(500).json({ Message: 'Internal Server Error' });
            }
            return res.status(200).json(result);
        });
    } catch (error) {
        console.error('Unexpected error:', error);
        return res.status(500).json({ Message: 'Internal Server Error' });
    }
};
const getEditStudent = (req, res) => {
    try {
        const sql = 'SELECT * FROM student WHERE id = ?';
        const id = req.params.id;
        db.query(sql, [id], (err, result) => {
            if (err) {
                console.error('Error querying student by ID:', err);
                return res.status(500).json({ Message: 'Internal Server Error' });
            }
            return res.status(200).json(result);
        });
    } catch (error) {
        console.error('Unexpected error:', error);
        return res.status(500).json({ Message: 'Internal Server Error' });
    }
};
// const getStudentbyBrBoMdStBt = ((req, res) => {
//     try {
//         const sql = 'SELECT * FROM student A WHERE A.id_branch = ? AND A.id_board = ? AND A.id_medium = ? AND A.id_standard = ? AND A.id_batch = ?';
//         db.query(sql, [req.query.id_branch, req.query.id_board, req.query.id_medium, req.query.id_standard, req.query.id_batch], (err, results) => {
//             if (err) {
//                 console.log(err);
//                 res.status(500).json({ err: "Error When Fetching Data" });
//             } else {
//                 res.status(200).json(results);
//             }
//         });
//     } catch (err) {
//         res.status(500).json({ err: "Error When Fetching Data" });
//     }
// });

const getStudentbyBrBoMdStBt = (req, res) => {
    try {
        const batch = 'SELECT * FROM student A WHERE A.id_branch = ? AND A.id_board = ? AND A.id_medium = ? AND A.id_standard = ? AND A.id_batch = ?';
        const standard = 'SELECT * FROM student A WHERE A.id_branch = ? AND A.id_board = ? AND A.id_medium = ? AND A.id_standard = ? ';
        const medium = 'SELECT * FROM student A WHERE A.id_branch = ? AND A.id_board = ? AND A.id_medium = ?';
        const board = 'SELECT * FROM student A WHERE A.id_branch = ? AND A.id_board = ? ';
        const branch = 'SELECT * FROM student A WHERE A.id_branch = ? ';
        const queryParams = [req.query.id_branch, req.query.id_board, req.query.id_medium, req.query.id_standard, req.query.id_batch];

        if (queryParams[4] > 0) {
            db.query(batch, queryParams, (err, results) => {
                if (err) {
                    console.error("Error executing SQL query:", err);
                    return res.status(500).json({ err: "Error when fetching data" });
                } else {
                    return res.status(200).json(results);
                }
            });
        } else if (queryParams[3] > 0) {
            db.query(standard, queryParams, (err, results) => {
                if (err) {
                    console.error("Error executing SQL query:", err);
                    return res.status(500).json({ err: "Error when fetching data" });
                } else {
                    return res.status(200).json(results);
                }
            });
        } else if (queryParams[2] > 0) {
            db.query(medium, queryParams, (err, results) => {
                if (err) {
                    console.error("Error executing SQL query:", err);
                    return res.status(500).json({ err: "Error when fetching data" });
                } else {
                    return res.status(200).json(results);
                }
            });
        } else if (queryParams[1] > 0) {
            db.query(board, queryParams, (err, results) => {
                if (err) {
                    console.error("Error executing SQL query:", err);
                    return res.status(500).json({ err: "Error when fetching data" });
                } else {
                    return res.status(200).json(results);
                }
            });
        } else if (queryParams[0] > 0) {
            db.query(branch, queryParams, (err, results) => {
                if (err) {
                    console.error("Error executing SQL query:", err);
                    return res.status(500).json({ err: "Error when fetching data" });
                } else {
                    return res.status(200).json(results);
                }
            });
        }
    } catch (err) {
        console.error("Error in try-catch block:", err);
        return res.status(500).json({ err: "Error when fetching data" });
    }
};

//         delete  student

const deleteStudent = (req, res) => {
    try {
        const id = req.params.id;
        db.query('SELECT photo FROM student WHERE id = ?', [id], (selectErr, selectResult) => {
            if (selectErr) {
                console.error('Error selecting user:', selectErr);
                return res.status(500).json({ Message: 'Error inside server' });
            }
            db.query('DELETE FROM student WHERE id = ?', [id], (deleteErr, deleteResult) => {
                if (deleteErr) {
                    console.error('Error deleting user:', deleteErr);
                    return res.status(500).json({ Message: 'Error inside server' });
                }
                const photoFilename = selectResult[0].photo;
                if (photoFilename) {
                    const photoPath = `./uploads/${photoFilename}`;
                    fs.unlink(photoPath, (unlinkErr) => {
                        if (unlinkErr) {
                            console.error('Error deleting photo image:', unlinkErr);
                        }

                        return res.status(200).json({ Message: 'User deleted successfully' });
                    });
                } else {
                    return res.status(200).json({ Message: 'User deleted successfully' });
                }
            });
        });
    } catch (error) {
        console.error('Unexpected error:', error);
        return res.status(500).json({ Message: 'Internal Server Error', success: false, data: null, error: error });
    }
};


//                                  Inquiry
//               call data
const getInquiry = (req, res) => {
    try {
        const sql = 'SELECT * FROM inquiry';
        db.query(sql, (err, result) => {
            if (err) {
                console.error('Error in inquiry query:', err);
                return res.status(500).json({ Message: 'Internal Server Error' });
            }
            return res.status(200).json(result);
        });
    } catch (error) {
        console.error('Unexpected error:', error);
        return res.status(500).json({ Message: 'Internal Server Error' });
    }
};

//              create inquiry
const createInquiry = (req, res) => {
    try {
        // Calculate the default follow-up date as current date plus 2 days
        const defaultFollowupDate = new Date();
        defaultFollowupDate.setDate(defaultFollowupDate.getDate() + 2);

        const course = 'SELECT fees FROM course';
        const sql =
            'INSERT INTO inquiry (`name`,`inquiry_date`,`gender`,`id_branch`,`school`,`id_shift`,`id_board`,`id_medium`,`id_standard`,`id_course`,`contact_1`,`contact_2`,`address_line1`,`address_line2`,`pincode`,`id_state`,`id_city`,`id_area`,`id_reference_type`,`refence_name`,`remark`, `final_fees`,`followup_date`) VALUES (?)';

        if (req.body.final_fees > course) {
            return res.status(400).json({ Message: 'Final fees cannot be more than the course fees.' });
        }

        const values = [
            req.body.name,
            req.body.inquiry_date,
            req.body.gender,
            req.body.id_branch,
            req.body.school,
            req.body.id_shift,
            req.body.id_board,
            req.body.id_medium,
            req.body.id_standard,
            req.body.id_course,
            req.body.contact_1,
            req.body.contact_2,
            req.body.address_line1,
            req.body.address_line2,
            req.body.pincode,
            req.body.id_state,
            req.body.id_city,
            req.body.id_area,
            req.body.id_reference_type,
            req.body.refence_name,
            req.body.remark,
            req.body.final_fees,
            defaultFollowupDate, // Set the default follow-up date
        ];

        db.query(sql, [values], (err, result) => {
            if (err) {
                console.error('Error creating inquiry', err);
                return res.status(500).json({ Message: 'Internal Server Error' });
            }
            return res.status(200).json(result); // 201 for successful creation
        });
    } catch (error) {
        console.error('Unexpected error:', error);
        return res.status(500).json({ Message: 'Internal Server Error' });
    }
};



//            edit inquiry
const editInquiry = (req, res) => {
    try {
        const sql = 'UPDATE inquiry SET `name`=?,`inquiry_date`=?,`gender`=?,`id_branch`=?,`school`=?,`id_shift`=?,`id_board`=?,`id_medium`=?,`id_standard`=?,`id_course`=?,`contact_1`=?,`contact_2`=?,`address_line1`=?,`address_line2`=?,`pincode`=?,`id_state`=?,`id_city`=?,`id_area`=?,`id_reference_type`=?,`refence_name`=?,`remark`=?, `final_fees`=?,`followup_date`=? WHERE  id=?'
        const id = req.params.id;
        const values = [
            req.body.name,
            req.body.inquiry_date,
            req.body.gender,
            req.body.id_branch,
            req.body.school,
            req.body.id_shift,
            req.body.id_board,
            req.body.id_medium,
            req.body.id_standard,
            req.body.id_course,
            req.body.contact_1,
            req.body.contact_2,
            req.body.address_line1,
            req.body.address_line2,
            req.body.pincode,
            req.body.id_state,
            req.body.id_city,
            req.body.id_area,
            req.body.id_reference_type,
            req.body.refence_name,
            req.body.remark,
            req.body.final_fees,
            req.body.followup_date, // Fix the typo here
            id,
        ];
        db.query(sql, values, (err, result) => {
            if (err) {
                console.error('Error updating inquiry', err);
                return res.status(500).json({ Message: 'Internal Server Error' });
            }
            return res.status(200).json(result);
        });
    } catch (error) {
        console.error('Unexpected error:', error);
        return res.status(500).json({ Message: 'Internal Server Error' });
    }
};

const getEditInquiry = (req, res) => {
    try {
        const sql = 'SELECT * FROM inquiry WHERE id = ?';
        const id = req.params.id;
        db.query(sql, [id], (err, result) => {
            if (err) {
                console.error('Error querying inquiry by ID:', err);
                return res.status(500).json({ Message: 'Internal Server Error' });
            }
            return res.status(200).json(result);
        });
    } catch (error) {
        console.error('Unexpected error:', error);
        return res.status(500).json({ Message: 'Internal Server Error' });
    }
};

//         delete  inquiry
const deleteInquiry = (req, res) => {
    try {
        const sql = 'DELETE FROM inquiry WHERE id =?';
        const id = req.params.id;
        db.query(sql, [id], (err, result) => {
            if (err) {
                console.error('Error deleting inquiry', err);
                return res.status(500).json({ Message: 'Internal Server Error' });
            }
            return res.status(200).json(result);
        });
    } catch (error) {
        console.error('Unexpected error:', error);
        return res.status(500).json({ Message: 'Internal Server Error', success: false, data: null, error: err, });
    }
};







//              notice
const getNotice = (req, res) => {
    try {
        const sql = 'SELECT * FROM notice';
        db.query(sql, (err, result) => {
            if (err) {
                console.error('Error in notice query:', err);
                return res.status(500).json({ Message: 'Internal Server Error' });
            }
            return res.status(200).json(result);
        });
    } catch (error) {
        console.error('Unexpected error:', error);
        return res.status(500).json({ Message: 'Internal Server Error' });
    }
};

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Specify the destination folder for uploaded files
    },
    filename: (req, file, cb) => {
        const originalName = file.originalname;
        cb(null, originalName);
    },
});
const fileFilter = (req, file, cb) => {
    // Allow pdf, doc, docx, jpg, png, and jpeg files
    const allowedMimeTypes = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'image/jpeg',
        'image/png',
        'image/jpg',
    ];

    if (allowedMimeTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(
            new Error(
                'Invalid file type. Only pdf, doc, docx, jpg, png, and jpeg files are allowed.'
            ),
            false
        );
    }
};
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
});

const createNotice = (req, res) => {
    try {
        function my_implode_js(separator, string) {
            if (typeof string === 'string' && string.length > 0) {
                return string.split(separator).join(separator);
            } else {
                return "";
            }
        }
        const id_student = my_implode_js(",", req.body.id_student);
        const values = [
            req.body.name,
            req.body.id_branch,
            req.body.id_board,
            req.body.id_medium,
            req.body.id_standard,
            req.body.id_batch,
            id_student,
            req.body.description,
            req.file.filename,
        ];
        const branch = 'INSERT INTO notice (`name`,`id_branch`,`id_board`,`id_medium`,`id_standard`,`id_batch`,`id_student`, `description`, `files`) VALUES (?)';
        db.query(branch, [values], (dbErr, result) => {
            if (dbErr) {
                console.error('Error creating notice', dbErr);
                return res.status(500).json({ Message: 'Internal Server Error' });
            }
            return res.status(200).json(result); // 201 for successful creation
        });
    } catch (error) {
        console.error('Unexpected error:', error);
        return res.status(500).json({ Message: 'Internal Server Error' });
    }
};
const getNoticeById = (req, res) => {
    try {
        const sql = 'SELECT * FROM notice WHERE id = ?';
        const id = req.params.id;

        db.query(sql, [id], (err, result) => {
            if (err) {
                console.error('Error querying notice by ID:', err);
                return res.status(500).json({ Message: 'Internal Server Error' });
            }

            if (result.length === 0) {
                return res.status(404).json({ Message: 'Notice not found' });
            }

            const noticeData = result[0];
            noticeData.files = JSON.parse(noticeData.files || '[]'); // Parse the files array

            return res.status(200).json(noticeData);
        });
    } catch (error) {
        console.error('Unexpected error:', error);
        return res.status(500).json({ Message: 'Internal Server Error' });
    }
};

const editNotice = (req, res) => {
    try {
        upload.array('files', 5)(req, res, (err) => {
            if (err) {
                console.error('Error uploading files:', err);
                return res.status(500).json({ Message: 'Error uploading files' });
            }

            const uploadedFiles = req.files.map((file) => file.path);

            const sql =
                'UPDATE notice SET `name`=?, `id_branch`=?, `id_shift`=?, `id_board`=?, `id_medium`=?, `id_standard`=?, `id_student`=?, `files`=? WHERE id=?';
            const id = req.params.id;

            // Get the existing files from the database
            db.query('SELECT files FROM notice WHERE id=?', [id], (dbErr, result) => {
                if (dbErr) {
                    console.error('Error retrieving existing files', dbErr);
                    return res.status(500).json({ Message: 'Internal Server Error' });
                }

                let existingFiles = [];
                if (result.length > 0) {
                    existingFiles = JSON.parse(result[0].files);
                }

                // Assuming req.body.deletedFiles is an array of file names to delete
                const deletedFiles = req.body.deletedFiles || [];

                // Delete files from the upload folder
                deletedFiles.forEach((deletedFile) => {
                    const filePath = path.join(__dirname, 'uploads', deletedFile);
                    fs.unlinkSync(filePath); // Synchronously delete the file
                });

                // Filter out deleted files
                const updatedFiles = existingFiles.filter((file) => !deletedFiles.includes(file));

                // Concatenate the existing files and uploaded files
                const finalFiles = updatedFiles.concat(uploadedFiles);

                db.query(
                    sql,
                    [
                        req.body.name,
                        req.body.id_branch,
                        req.body.id_shift,
                        req.body.id_board,
                        req.body.id_medium,
                        req.body.id_standard,
                        req.body.id_batch,
                        req.body.id_student,
                        JSON.stringify(finalFiles),
                        id,
                    ],
                    (updateErr, updateResult) => {
                        if (updateErr) {
                            console.error('Error updating notice', updateErr);
                            return res.status(500).json({ Message: 'Internal Server Error' });
                        }
                        return res.status(200).json(updateResult);
                    }
                );
            });
        });
    } catch (error) {
        console.error('Unexpected error:', error);
        return res.status(500).json({ Message: 'Internal Server Error' });
    }
};

//      delet matiral
const deleteNotice = (req, res) => {
    try {
        const id = req.params.id;
        db.query('SELECT files FROM notice WHERE id = ?', [id], (selectErr, selectResult) => {
            if (selectErr) {
                console.error('Error selecting user:', selectErr);
                return res.status(500).json({ Message: 'Error inside server' });
            }
            db.query('DELETE FROM notice WHERE id = ?', [id], (deleteErr, deleteResult) => {
                if (deleteErr) {
                    console.error('Error deleting notice:', deleteErr);
                    return res.status(500).json({ Message: 'Error inside server' });
                }
                const profileFilename = selectResult[0].files;
                if (profileFilename) {
                    const profilePath = `uploads/${profileFilename}`;
                    fs.unlink(profilePath, (unlinkErr) => {
                        if (unlinkErr) {
                            console.error('Error deleting files:', unlinkErr);
                        }

                        return res.status(200).json({ Message: 'notice deleted successfully' });
                    });
                } else {
                    return res.status(200).json({ Message: 'notice deleted successfully' });
                }
            });
        });
    } catch (error) {
        console.error('Unexpected error:', error);
        return res.status(500).json({ Message: 'Internal Server Error', success: false, data: null, error: error });
    }
};



const getStanderdbyBranch = ((req, res) => {
    try {
        const sql = 'SELECT A.id, A.standard FROM standard A WHERE A.branch_id = ?';
        db.query(sql, [req.query.branch_id], (err, results) => {
            if (err) {
                console.log(err);
                res.status(500).json({ err: "Error When Fetching Data" });
            } else {
                res.status(200).json(results);
            }
        });
    } catch (err) {
        res.status(500).json({ err: "Error When Fetching Data" });
    }
});




//                                  Attendance
//               call data

const getAttendance = (req, res) => {
    try {
        const sql = `
            SELECT *, 
                CASE 
                    WHEN present = '' THEN 0
                    ELSE (LENGTH(present) - LENGTH(REPLACE(present, ',', '')) + 1) 
                END AS present_count ,
                CASE 
                    WHEN absent = '' THEN 0
                    ELSE (LENGTH(absent) - LENGTH(REPLACE(absent, ',', '')) + 1) 
                END AS absent_count 
            FROM attendance
        `;
        db.query(sql, (err, result) => {
            if (err) {
                console.error('Error in attendance query:', err);
                return res.status(500).json({ Message: 'Internal Server Error' });
            }
            return res.status(200).json(result);
        });
    } catch (error) {
        console.error('Unexpected error:', error);
        return res.status(500).json({ Message: 'Internal Server Error' });
    }
};

const getWeeklyAttendance = (req, res) => {
    try {
        const studentId = req.params.studentId;

        const currentDate = new Date();

        const startOfYear = new Date(currentDate.getFullYear(), 0, 1);
        const endOfYear = new Date(currentDate.getFullYear(), 11, 31);

        // SQL query to get yearly absent data with month, adjusted week, and monthly total absent for all subjects
        const sql = `
        SELECT
            id_subject,
            MONTH(date) as month,
            WEEK(date, 1) - WEEK(DATE_SUB(date, INTERVAL DAYOFMONTH(date) - 1 DAY), 1) + 1 as week,
            COUNT(*) as absentCount,
            SUM(CASE WHEN FIND_IN_SET(?, absent) THEN 1 ELSE 0 END) as monthlyTotalAbsent
        FROM
            attendance
        WHERE
            date BETWEEN ? AND ? AND (FIND_IN_SET(?, absent))
        GROUP BY
            id_subject, month, week
        ORDER BY
             month, week
        `;

        db.query(sql, [studentId, startOfYear, endOfYear, studentId], (err, result) => {
            if (err) {
                console.error('Error in attendance query:', err);
                return res.status(500).json({ Message: 'Internal Server Error' });
            }

            return res.status(200).json(result);
        });
    } catch (error) {
        console.error('Unexpected error:', error);
        return res.status(500).json({ Message: 'Internal Server Error' });
    }
};



const createAttendance = (req, res) => {
    try {
        const sql =
            "INSERT INTO attendance (`id_branch`,`id_board`,`id_medium`,`id_standard`,`id_subject`,`id_batch`,`present`,`absent`) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
        function my_implode_js(separator, array) {
            if (Array.isArray(array) && array.length > 0) {
                return array.join(separator);
            } else {
                return "";
            }
        }
        const present = my_implode_js(",", req.body.present);
        const absent = my_implode_js(",", req.body.absent);
        const values = [
            req.body.id_branch,
            req.body.id_board,
            req.body.id_medium,
            req.body.id_standard,
            req.body.id_subject,
            req.body.id_batch,
            present,
            absent,
        ];
        db.query(sql, values, (err, result) => {
            if (err) {
                console.error("Error creating Attendance", err);
                return res.status(500).json({ Message: "Internal Server Error" });
            }
            return res.status(200).json(result);
        });
    } catch (error) {
        console.error("Unexpected error:", error);
        return res.status(500).json({ Message: "Internal Server Error" });
    }
};

//            edit attendance
const editAttendance = (req, res) => {
    try {
        const sql = 'UPDATE attendance SET `id_branch`=?, `id_board`=?, `id_medium`=?, `id_standard`=?, `id_batch`=?, `id_subject`=?, `present`=?,`absent`=? WHERE  id=?'
        const id = req.params.id;
        function my_implode_js(separator, array) {
            if (Array.isArray(array) && array.length > 0) {
                return array.join(separator);
            } else {
                return "";
            }
        }
        const present = my_implode_js(",", req.body.present);
        const absent = my_implode_js(",", req.body.absent);
        db.query(sql, [req.body.id_branch, req.body.id_board, req.body.id_medium, req.body.id_standard, req.body.id_batch, req.body.id_subject, present, absent, id], (err, result) => {
            if (err) {
                console.error('Error updating attendance', err);
                return res.status(500).json({ Message: 'Internal Server Error' });
            }
            return res.status(200).json(result);
        });
    } catch (error) {
        console.error('Unexpected error:', error);
        return res.status(500).json({ Message: 'Internal Server Error' });
    }
};
const getEditAttendance = (req, res) => {
    try {
        const sql = 'SELECT * FROM attendance WHERE id = ?';
        const id = req.params.id;
        db.query(sql, [id], (err, result) => {
            if (err) {
                console.error('Error querying attendance by ID:', err);
                return res.status(500).json({ Message: 'Internal Server Error' });
            }
            return res.status(200).json(result);
        });
    } catch (error) {
        console.error('Unexpected error:', error);
        return res.status(500).json({ Message: 'Internal Server Error' });
    }
};

//         delete  Attendance
const deleteAttendance = (req, res) => {
    try {
        const sql = 'DELETE FROM attendance WHERE id =?';
        const id = req.params.id;
        db.query(sql, [id], (err, result) => {
            if (err) {
                console.error('Error deleting attendance', err);
                return res.status(500).json({ Message: 'Internal Server Error' });
            }
            return res.status(200).json(result);
        });
    } catch (error) {
        console.error('Unexpected error:', error);
        return res.status(500).json({ Message: 'Internal Server Error', success: false, data: null, error: err, });
    }
};




//              fees
const getFees = (req, res) => {
    try {
        const sql = 'SELECT * FROM fees';
        db.query(sql, (err, result) => {
            if (err) {
                console.error('Error in fees  query:', err);
                return res.status(500).json({ Message: 'Internal Server Error' });
            }
            return res.status(200).json(result);
        });
    } catch (error) {
        console.error('Unexpected error:', error);
        return res.status(500).json({ Message: 'Internal Server Error' });
    }
};

const createFees = (req, res) => {
    try {
        const sql = 'INSERT INTO fees (`id_branch`,`amount`, `id_student`) VALUES (?)';
        const values = [
            req.body.id_branch,
            req.body.amount,
            req.body.id_student
        ];
        db.query(sql, [values], (err, result) => {
            if (err) {
                console.error('Error creating branch', err);
                return res.status(500).json({ Message: 'Internal Server Error' });
            }
            return res.status(200).json(result);
        });
    } catch (error) {
        console.error('Unexpected error:', error);
        return res.status(500).json({ Message: 'Internal Server Error' });
    }
};
const getFeesByAmount = (req, res) => {
    try {
        const sql = 'SELECT SUM(amount) AS totalFees FROM fees';
        const id = req.params.id;
        db.query(sql, [id], (err, result) => {
            if (err) {
                console.error('Error querying fees by ID:', err);
                return res.status(500).json({ Message: 'Internal Server Error' });
            }

            // Extract total fees from the result
            const totalFees = result[0].totalFees !== null ? result[0].totalFees : 0;

            return res.status(200).json({ totalFees });
        });
    } catch (error) {
        console.error('Unexpected error:', error);
        return res.status(500).json({ Message: 'Internal Server Error' });
    }
};

const getFeesById = (req, res) => {
    try {
        const sql = 'SELECT * FROM fees WHERE id = ?';
        const id = req.params.id;
        db.query(sql, [id], (err, result) => {
            if (err) {
                console.error('Error querying fees  by ID:', err);
                return res.status(500).json({ Message: 'Internal Server Error' });
            }
            return res.status(200).json(result);
        });
    } catch (error) {
        console.error('Unexpected error:', error);
        return res.status(500).json({ Message: 'Internal Server Error' });
    }
};
const editFees = (req, res) => {
    try {
        const sql =
            "UPDATE fees SET `amount`=? WHERE  id=?";
        const id = req.params.id;
        db.query(
            sql,
            [
                req.body.amount,
                id
            ],
            (err, result) => {
                if (err) {
                    console.error("Error updating fees ", err);
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
//      delet fees
const deleteFees = (req, res) => {
    try {
        const sql = 'DELETE FROM fees WHERE id =?';
        const id = req.params.id;
        db.query(sql, [id], (err, result) => {
            if (err) {
                console.error('Error deleting fees ', err);
                return res.status(500).json({ Message: 'Internal Server Error' });
            }
            return res.status(200).json(result);
        });
    } catch (error) {
        console.error('Unexpected error:', error);
        return res.status(500).json({ Message: 'Internal Server Error', success: false, data: null, error: err, });
    }
};




//  structure api

const getBoardbybranch = ((req, res) => {
    try {
        const sql = 'SELECT * FROM board A WHERE A.id_branch  = ?';
        db.query(sql, [req.query.id_branch], (err, results) => {
            if (err) {
                console.log(err);
                res.status(500).json({ err: "Error When Fetching Data" });
            } else {
                res.status(200).json(results);
            }
        });
    } catch (err) {
        res.status(500).json({ err: "Error When Fetching Data" });
    }
});
const getMediumbybranchBoard = ((req, res) => {
    try {
        const sql = 'SELECT * FROM medium A WHERE A.id_branch = ? AND A.id_board =?';
        db.query(sql, [req.query.id_branch, req.query.id_board], (err, results) => {
            if (err) {
                console.log(err);
                res.status(500).json({ err: "Error When Fetching Data" });
            } else {
                res.status(200).json(results);
            }
        });
    } catch (err) {
        res.status(500).json({ err: "Error When Fetching Data" });
    }
});
const getStandardbyBrBoMd = ((req, res) => {
    try {
        const sql = 'SELECT * FROM standard A WHERE A.branch_id  = ? AND A.id_board  =? AND A.id_medium =?';
        db.query(sql, [req.query.branch_id, req.query.id_board, req.query.id_medium], (err, results) => {
            if (err) {
                console.log(err);
                res.status(500).json({ err: "Error When Fetching Data" });
            } else {
                res.status(200).json(results);
            }
        });
    } catch (err) {
        res.status(500).json({ err: "Error When Fetching Data" });
    }
});
const getBatchbyBrBoMdSt = ((req, res) => {
    try {
        const sql = 'SELECT * FROM batch A WHERE A.id_branch = ? AND A.id_board = ? AND A.id_medium = ? AND A.id_standard = ?';
        db.query(sql, [req.query.id_branch, req.query.id_board, req.query.id_medium, req.query.id_standard], (err, results) => {
            if (err) {
                console.log(err);
                res.status(500).json({ err: "Error When Fetching Data" });
            } else {
                res.status(200).json(results);
            }
        });
    } catch (err) {
        res.status(500).json({ err: "Error When Fetching Data" });
    }
});





//                                  Assign HomeWork
//               call data
const getAssignHomeWork = (req, res) => {
    try {
        const sql = 'SELECT * FROM assign_homework';
        db.query(sql, (err, result) => {
            if (err) {
                console.error('Error in assign_homework query:', err);
                return res.status(500).json({ Message: 'Internal Server Error' });
            }
            return res.status(200).json(result);
        });
    } catch (error) {
        console.error('Unexpected error:', error);
        return res.status(500).json({ Message: 'Internal Server Error' });
    }
};


//              create Assign HomeWork
const createAssignHomeWork = (req, res) => {
    try {
        const sql = 'INSERT INTO assign_homework (`id_branch`,`id_board`,`id_medium`,`id_standard`, `id_subject`, `id_batch`, `title`, `description`,`files`) VALUES (?)';
        const values = [
            req.body.id_branch,
            req.body.id_board,
            req.body.id_medium,
            req.body.id_standard,
            req.body.id_subject,
            req.body.id_batch,
            req.body.title,
            req.body.description,
            req.file.filename,
        ];
        db.query(sql, [values], (err, result) => {
            if (err) {
                console.error('Error creating assign_homework', err);
                return res.status(500).json({ Message: 'Internal Server Error' });
            }
            return res.status(200).json(result); // 201 for successful creation
        });
    } catch (error) {
        console.error('Unexpected error:', error);
        return res.status(500).json({ Message: 'Internal Server Error' });
    }
};

//            edit Assign HomeWork
const editAssignHomeWork = (req, res) => {
    try {
        const sql = 'UPDATE assign_homework SET `id_branch`=?, `id_board`=?, `id_medium`=?, `id_standard`=?, `id_subject`=?, `id_batch`=?, `title`=?, `description`=? WHERE  id=?'
        const id = req.params.id;
        db.query(sql, [req.body.id_branch, req.body.id_board, req.body.id_medium, req.body.id_standard, req.body.id_subject, req.body.id_batch, req.body.title, req.body.description, id], (err, result) => {
            if (err) {
                console.error('Error updating assign_homework', err);
                return res.status(500).json({ Message: 'Internal Server Error' });
            }
            return res.status(200).json(result);
        });
    } catch (error) {
        console.error('Unexpected error:', error);
        return res.status(500).json({ Message: 'Internal Server Error' });
    }
};
const getEditAssignHomeWork = (req, res) => {
    try {
        const sql = 'SELECT * FROM assign_homework WHERE id = ?';
        const id = req.params.id;
        db.query(sql, [id], (err, result) => {
            if (err) {
                console.error('Error querying assign homework by ID:', err);
                return res.status(500).json({ Message: 'Internal Server Error' });
            }
            return res.status(200).json(result);
        });
    } catch (error) {
        console.error('Unexpected error:', error);
        return res.status(500).json({ Message: 'Internal Server Error' });
    }
};

//         delete  Assign HomeWork
const deleteAssignHomeWork = (req, res) => {
    try {
        const id = req.params.id;
        const deleteStatusHomeworkSQL = 'DELETE FROM status_homework WHERE id = ?';
        const deleteFilesSQL = 'SELECT files FROM assign_homework WHERE id = ?';
        const deleteAssignHomeworkSQL = 'DELETE FROM assign_homework WHERE id = ?';

        db.query(deleteStatusHomeworkSQL, [id], (err, resultStatus) => {
            if (err) {
                console.error('Error deleting status homework', err);
                return res.status(500).json({ Message: 'Internal Server Error' });
            }
            db.query(deleteFilesSQL, [id], (err, resultStatusFile) => {
                if (err) {
                    console.error('Error deleting status homework', err);
                    return res.status(500).json({ Message: 'Internal Server Error' });
                }
                if (resultStatusFile.length > 0) {
                    const photoFilename = resultStatusFile[0].files;
                    if (photoFilename) {
                        const photoPath = `./uploads/${photoFilename}`;
                        fs.unlink(photoPath, (unlinkErr) => {
                            if (unlinkErr) {
                                console.error('Error deleting photo image:', unlinkErr);
                            }

                            // Continue with the deletion of assign_homework record
                            db.query(deleteAssignHomeworkSQL, [id], (err, resultAssign) => {
                                if (err) {
                                    console.error('Error deleting assign homework', err);
                                    return res.status(500).json({ Message: 'Internal Server Error' });
                                }

                                // Send the final response
                                return res.status(200).json({
                                    statusHomeworkResult: resultStatus,
                                    fileResult: resultStatusFile,
                                    assignHomeworkResult: resultAssign,
                                    Message: 'User deleted successfully'
                                });
                            });
                        });
                    }
                    //  else {
                    //     // Continue with the deletion of assign_homework record if no files
                    //     db.query(deleteAssignHomeworkSQL, [id], (err, resultAssign) => {
                    //         if (err) {
                    //             console.error('Error deleting assign homework', err);
                    //             return res.status(500).json({ Message: 'Internal Server Error' });
                    //         }

                    //         // Send the final response
                    //         return res.status(200).json({
                    //             statusHomeworkResult: resultStatus,
                    //             fileResult: resultStatusFile,
                    //             assignHomeworkResult: resultAssign,
                    //             Message: 'User deleted successfully'
                    //         });
                    //     });
                    // }
                } else {
                    // Log a message and proceed with the deletion of assign_homework record
                    console.error('No matching records found for deleteFilesSQL');

                    // Continue with the deletion of assign_homework record
                    db.query(deleteAssignHomeworkSQL, [id], (err, resultAssign) => {
                        if (err) {
                            console.error('Error deleting assign homework', err);
                            return res.status(500).json({ Message: 'Internal Server Error' });
                        }

                        // Send the final response
                        return res.status(200).json({
                            statusHomeworkResult: resultStatus,
                            fileResult: resultStatusFile,
                            assignHomeworkResult: resultAssign,
                            Message: 'User deleted successfully'
                        });
                    });
                }
            });
        });
    } catch (error) {
        console.error('Unexpected error:', error);
        return res.status(500).json({ Message: 'Internal Server Error', success: false, data: null, error: error });
    }
};

const getAssignHomeWorkbyBrBoMdStBt = ((req, res) => {
    try {
        const sql = 'SELECT * FROM assign_homework A WHERE A.id_branch = ? AND A.id_board = ? AND A.id_medium = ? AND A.id_standard = ? AND A.id_batch = ?';
        db.query(sql, [req.query.id_branch, req.query.id_board, req.query.id_medium, req.query.id_standard, req.query.id_batch], (err, results) => {
            if (err) {
                console.log(err);
                res.status(500).json({ err: "Error When Fetching Data" });
            } else {
                res.status(200).json(results);
            }
        });
    } catch (err) {
        res.status(500).json({ err: "Error When Fetching Data" });
    }
});

//Add Exam
//               call data
const getAddExam = (req, res) => {
    try {
        const sql = 'SELECT * FROM add_exam';
        db.query(sql, (err, result) => {
            if (err) {
                console.error('Error in Add Exam query:', err);
                return res.status(500).json({ Message: 'Internal Server Error' });
            }
            return res.status(200).json(result);
        });
    } catch (error) {
        console.error('Unexpected error:', error);
        return res.status(500).json({ Message: 'Internal Server Error' });
    }
};
const createAddExam = (req, res) => {
    try {
        const sql = 'INSERT INTO add_exam (`date`,`id_branch`,`id_board`,`id_medium`,`id_standard`,`id_batch`, `id_subject`, `title`, `description`,`total_marks`, `files`) VALUES (?)';
        const values = [
            req.body.date,
            req.body.id_branch,
            req.body.id_board,
            req.body.id_medium,
            req.body.id_standard,
            req.body.id_batch,
            req.body.id_subject,
            req.body.title,
            req.body.description,
            req.body.total_marks,
            req.file.filename,
        ];
        db.query(sql, [values], (err, result) => {
            if (err) {
                console.error('Error creating Add Exam', err);
                return res.status(500).json({ Message: 'Internal Server Error' });
            }
            return res.status(200).json(result); // 201 for successful creation
        });
    } catch (error) {
        console.error('Unexpected error:', error);
        return res.status(500).json({ Message: 'Internal Server Error' });
    }
};
const editAddExam = (req, res) => {
    try {
        const sql = 'UPDATE add_exam SET `date`=?,`id_branch`=?,`id_board`=?,`id_medium`=?,`id_standard`=?, `id_batch`=?,`id_subject`=?, `title`=?, `description`=?,`total_marks`=? WHERE  id=?'
        const id = req.params.id;
        db.query(sql, [req.body.date,
        req.body.id_branch,
        req.body.id_board,
        req.body.id_medium,
        req.body.id_standard,
        req.body.id_batch,
        req.body.id_subject,
        req.body.title,
        req.body.description,
        req.body.total_marks, id], (err, result) => {
            if (err) {
                console.error('Error updating Add Exam', err);
                return res.status(500).json({ Message: 'Internal Server Error' });
            }
            return res.status(200).json(result);
        });
    } catch (error) {
        console.error('Unexpected error:', error);
        return res.status(500).json({ Message: 'Internal Server Error' });
    }
};
const getEditAddExam = (req, res) => {
    try {
        const sql = 'SELECT * FROM add_exam WHERE id = ?';
        const id = req.params.id;
        db.query(sql, [id], (err, result) => {
            if (err) {
                console.error('Error querying Add Exam by ID:', err);
                return res.status(500).json({ Message: 'Internal Server Error' });
            }
            return res.status(200).json(result);
        });
    } catch (error) {
        console.error('Unexpected error:', error);
        return res.status(500).json({ Message: 'Internal Server Error' });
    }
};
const deleteAddExam = (req, res) => {
    try {
        const id = req.params.id;
        const deleteExamAttendanceSQL = 'DELETE FROM exam_attendance WHERE id =?';
        const deleteFilesSQL = 'SELECT files FROM add_exam WHERE id = ?';
        const deleteAssignHomeworkSQL = 'DELETE FROM add_exam WHERE id =?';

        db.query(deleteExamAttendanceSQL, [id], (err, resultStatus) => {
            if (err) {
                console.error('Error deleting exam attendance', err);
                return res.status(500).json({ Message: 'Internal Server Error' });
            }
            db.query(deleteFilesSQL, [id], (err, resultStatusFile) => {
                if (err) {
                    console.error('Error deleting exam attendance', err);
                    return res.status(500).json({ Message: 'Internal Server Error' });
                }
                if (resultStatusFile.length > 0) {
                    const photoFilename = resultStatusFile[0].files;
                    if (photoFilename) {
                        const photoPath = `./uploads/${photoFilename}`;
                        fs.unlink(photoPath, (unlinkErr) => {
                            if (unlinkErr) {
                                console.error('Error deleting photo image:', unlinkErr);
                            }
                            // Continue with the deletion of add_exam record
                            db.query(deleteAssignHomeworkSQL, [id], (err, resultAssign) => {
                                if (err) {
                                    console.error('Error deleting exam', err);
                                    return res.status(500).json({ Message: 'Internal Server Error' });
                                }

                                // Send the final response
                                return res.status(200).json({
                                    statusHomeworkResult: resultStatus,
                                    fileResult: resultStatusFile,
                                    assignHomeworkResult: resultAssign,
                                    Message: 'User deleted successfully'
                                });
                            });
                        });
                    }
                    //  else {
                    //     // Continue with the deletion of add_exam record if no files
                    //     db.query(deleteAssignHomeworkSQL, [id], (err, resultAssign) => {
                    //         if (err) {
                    //             console.error('Error deleting assign homework', err);
                    //             return res.status(500).json({ Message: 'Internal Server Error' });
                    //         }

                    //         // Send the final response
                    //         return res.status(200).json({
                    //             statusHomeworkResult: resultStatus,
                    //             fileResult: resultStatusFile,
                    //             assignHomeworkResult: resultAssign,
                    //             Message: 'User deleted successfully'
                    //         });
                    //     });
                    // }
                } else {
                    // Log a message and proceed with the deletion of add_exam record
                    console.error('No matching records found for deleteFilesSQL');

                    // Continue with the deletion of add_exam record
                    db.query(deleteAssignHomeworkSQL, [id], (err, resultAssign) => {
                        if (err) {
                            console.error('Error deleting exam', err);
                            return res.status(500).json({ Message: 'Internal Server Error' });
                        }

                        // Send the final response
                        return res.status(200).json({
                            statusHomeworkResult: resultStatus,
                            fileResult: resultStatusFile,
                            assignHomeworkResult: resultAssign,
                            Message: 'User deleted successfully'
                        });
                    });
                }
            });
        });
    } catch (error) {
        console.error('Unexpected error:', error);
        return res.status(500).json({ Message: 'Internal Server Error', success: false, data: null, error: error });
    }
};
const getExambyBrBoMdStSub = ((req, res) => {
    try {
        const sql = 'SELECT * FROM add_exam A WHERE A.date = ? AND A.id_branch = ? AND A.id_board = ? AND A.id_medium = ? AND A.id_standard = ? AND A.id_subject = ?';
        db.query(sql, [req.query.date, req.query.id_branch, req.query.id_board, req.query.id_medium, req.query.id_standard, req.query.id_subject], (err, results) => {
            if (err) {
                console.log(err);
                res.status(500).json({ err: "Error When Fetching Data" });
            } else {
                res.status(200).json(results);
            }
        });
    } catch (err) {
        res.status(500).json({ err: "Error When Fetching Data" });
    }
});

//exam Attendance
const createExamAttendance = (req, res) => {
    try {
        function my_implode_js(separator, array) {
            if (Array.isArray(array) && array.length > 0) {
                return array.join(separator);
            } else {
                return "";
            }
        }
        const present = my_implode_js(",", req.body.present);

        const sql = 'INSERT INTO exam_attendance (`present`) VALUES (?)';
        db.query(sql, [present], (err, result) => {
            if (err) {
                console.error('Error creating Exam Attendance', err);
                return res.status(500).json({ Message: 'Internal Server Error' });
            }
            return res.status(200).json(result); // 201 for successful creation
        });
    } catch (error) {
        console.error('Unexpected error:', error);
        return res.status(500).json({ Message: 'Internal Server Error' });
    }
};


const editExamAttendance = (req, res) => {
    try {
        const sql = 'UPDATE exam_attendance SET `present`=?, `absent`=?, `noexam`=?, `holiday`=? WHERE  id=?'
        const id = req.params.id;
        function my_implode_js(separator, array) {
            if (Array.isArray(array) && array.length > 0) {
                return array.join(separator);
            } else {
                return "";
            }
        }
        const present = my_implode_js(",", req.body.present);
        const absent = my_implode_js(",", req.body.absent);
        const noexam = my_implode_js(",", req.body.noexam);
        const holiday = my_implode_js(",", req.body.holiday);
        db.query(sql, [present, absent, noexam, holiday, id], (err, result) => {
            if (err) {
                console.error('Error updating Exam Attendance', err);
                return res.status(500).json({ Message: 'Internal Server Error' });
            }
            return res.status(200).json(result);
        });
    } catch (error) {
        console.error('Unexpected error:', error);
        return res.status(500).json({ Message: 'Internal Server Error' });
    }
};

const getExamAttendance = (req, res) => {
    try {
        const sql = `
            SELECT ea.*, ae.*,
            CASE 
                WHEN ea.present = '' THEN 0
                ELSE (LENGTH(ea.present) - LENGTH(REPLACE(ea.present, ',', '')) + 1) 
            END AS present_count ,
            CASE 
                WHEN ea.absent = '' THEN 0
                ELSE (LENGTH(ea.absent) - LENGTH(REPLACE(ea.absent, ',', '')) + 1) 
            END AS absent_count,
            CASE 
                WHEN ea.noexam = '' THEN 0
                ELSE (LENGTH(ea.noexam) - LENGTH(REPLACE(ea.noexam, ',', '')) + 1) 
            END AS noexam_count,
            CASE 
                WHEN ea.holiday = '' THEN 0
                ELSE (LENGTH(ea.holiday) - LENGTH(REPLACE(ea.holiday, ',', '')) + 1) 
            END AS holiday_count  
            FROM exam_attendance AS ea
            INNER JOIN add_exam AS ae ON ea.id = ae.id`; // Adjusted ON clause
        db.query(sql, (err, result) => {
            if (err) {
                console.error('Error in Exam Attendance query:', err);
                return res.status(500).json({ Message: 'Internal Server Error' });
            }
            return res.status(200).json(result);
        });
    } catch (error) {
        console.error('Unexpected error:', error);
        return res.status(500).json({ Message: 'Internal Server Error' });
    }
};

const getEditExamAttendance = (req, res) => {
    try {
        const sql = 'SELECT * FROM exam_attendance WHERE id = ?';
        const id = req.params.id;
        db.query(sql, [id], (err, result) => {
            if (err) {
                console.error('Error querying Add Exam by ID:', err);
                return res.status(500).json({ Message: 'Internal Server Error' });
            }
            return res.status(200).json(result);
        });
    } catch (error) {
        console.error('Unexpected error:', error);
        return res.status(500).json({ Message: 'Internal Server Error' });
    }
};
const deleteExamAttendance = (req, res) => {
    try {
        const sql = 'DELETE FROM exam_attendance WHERE id =?';
        const id = req.params.id;
        db.query(sql, [id], (err, result) => {
            if (err) {
                console.error('Error deleting ExamAttendance', err);
                return res.status(500).json({ Message: 'Internal Server Error' });
            }
            return res.status(200).json(result);
        });
    } catch (error) {
        console.error('Unexpected error:', error);
        return res.status(500).json({ Message: 'Internal Server Error', success: false, data: null, error: err, });
    }
};
//Exam Marks
const createExamMarks = (req, res) => {
    try {
        const marksData = req.body.map(({ id_exam, id_student, marks, remark }) => [
            id_exam,
            id_student,
            marks,
            remark
        ]);

        const sql = 'INSERT INTO exam_marks (`id_exam`, `id_student`, `marks`, `remark`) VALUES ?';

        db.query(sql, [marksData], (err, result) => {
            if (err) {
                console.error('Error creating Exam marks', err);
                return res.status(500).json({ Message: 'Internal Server Error' });
            }
            return res.status(200).json(result); // 201 for successful creation
        });
    } catch (error) {
        console.error('Unexpected error:', error);
        return res.status(500).json({ Message: 'Internal Server Error' });
    }
};

const updateExamMarks = (req, res) => {
    try {
        const sql = 'UPDATE exam_marks SET `marks` = ?, `remark`=? WHERE  id=?';
        const id = req.params.id;
        db.query(sql, [req.body.marks, req.body.remark, id], (err, result) => {
            if (err) {
                console.error('Error updating Exam marks:', err);
                return res.status(500).json({ message: 'Internal Server Error' });
            }
            return res.status(200).json(result);

        });
    } catch (error) {
        console.error('Unexpected error:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};



const getExamMarks = (req, res) => {
    try {
        const sql = `
            SELECT em.id, em.id_exam, em.id_student, em.marks, em.date AS datee, em.remark, ae.*
            FROM exam_marks em
            JOIN add_exam ae ON em.id_exam = ae.id;
        `;
        db.query(sql, (err, result) => {
            if (err) {
                console.error('Error in Exam Marks query:', err);
                return res.status(500).json({ Message: 'Internal Server Error' });
            }
            return res.status(200).json(result);
        });
    } catch (error) {
        console.error('Unexpected error:', error);
        return res.status(500).json({ Message: 'Internal Server Error' });
    }
};


const getEditExamMarks = (req, res) => {
    try {
        const { id, id_student, marks } = req.params;

        const sql = `
        SELECT exam_marks.*, add_exam.*
        FROM exam_marks
        JOIN add_exam ON exam_marks.id_exam = add_exam.id
        WHERE exam_marks.id = ? AND exam_marks.id_student = ? AND exam_marks.marks = ?
      `;

        db.query(sql, [id, id_student, marks], (err, result) => {
            if (err) {
                console.error('Error querying Exam Marks and Exam by Student ID and Marks:', err);
                return res.status(500).json({ Message: 'Internal Server Error' });
            }

            return res.status(200).json(result);
        });
    } catch (error) {
        console.error('Unexpected error:', error);
        return res.status(500).json({ Message: 'Internal Server Error' });
    }
};


const deleteExamMarks = (req, res) => {
    try {
        const sql = 'DELETE FROM exam_marks WHERE id =?';
        const id = req.params.id;
        db.query(sql, [id], (err, result) => {
            if (err) {
                console.error('Error deleting Exam Marks ', err);
                return res.status(500).json({ Message: 'Internal Server Error' });
            }
            return res.status(200).json(result);
        });
    } catch (error) {
        console.error('Unexpected error:', error);
        return res.status(500).json({ Message: 'Internal Server Error', success: false, data: null, error: err, });
    }
};
const getExamMarksReport = (req, res) => {
    try {
        const { id } = req.params;
        const { id_subject } = req.query;

        const sql = `
            SELECT
                em.id,
                em.id_exam,
                em.id_student,
                em.marks,
                em.date,
                em.remark,
                ae.title,
                ae.description,
                ae.total_marks
            FROM
                exam_marks em
            JOIN
                add_exam ae ON em.id_exam = ae.id AND em.date = ae.date
            WHERE
                em.id_student = ?
                AND ae.id_subject = ?
        `;

        db.query(sql, [id, id_subject], (err, result) => {
            if (err) {
                console.error('Error querying Exam Marks and Exam by Student ID:', err);
                return res.status(500).json({ Message: 'Internal Server Error' });
            }

            console.log('Query result:', result);

            return res.status(200).json(result);
        });
    } catch (error) {
        console.error('Unexpected error:', error);
        return res.status(500).json({ Message: 'Internal Server Error' });
    }
};

//                PTM
const getPTM = (req, res) => {
    try {
        const sql = 'SELECT * FROM ptm';
        db.query(sql, (err, result) => {
            if (err) {
                console.error('Error in notice query:', err);
                return res.status(500).json({ Message: 'Internal Server Error' });
            }
            return res.status(200).json(result);
        });
    } catch (error) {
        console.error('Unexpected error:', error);
        return res.status(500).json({ Message: 'Internal Server Error' });
    }
};

const createPTM = (req, res) => {
    try {
        function my_implode_js(separator, array) {
            if (Array.isArray(array) && array.length > 0) {
                return array.join(separator);
            } else {
                return "";
            }
        }
        const id_student = my_implode_js(",", req.body.id_student);
        const values = [
            req.body.title,
            req.body.date,
            req.body.time,
            req.body.id_branch,
            req.body.id_board,
            req.body.id_medium,
            req.body.id_batch,
            req.body.id_standard,
            id_student,
            req.body.purpose,
            req.body.id_teachar,
        ];
        const branch = 'INSERT INTO ptm (`title`,`date`,`time`,`id_branch`, `id_board`,`id_medium`,`id_batch`,`id_standard`,`id_student`, `purpose`, `id_teachar`) VALUES (?)';
        db.query(branch, [values], (dbErr, result) => {
            if (dbErr) {
                console.error('Error creating notice', dbErr);
                return res.status(500).json({ Message: 'Internal Server Error' });
            }
            return res.status(200).json(result); // 201 for successful creation
        });
    } catch (error) {
        console.error('Unexpected error:', error);
        return res.status(500).json({ Message: 'Internal Server Error' });
    }
};
const editPTM = (req, res) => {
    try {
        const sql = 'UPDATE ptm SET `title`=?, `date`=?, `time`=?, `purpose`=?,`id_teachar`=? WHERE  id=?'
        const id = req.params.id;

        db.query(sql, [req.body.title, req.body.date, req.body.time, req.body.purpose, req.body.id_teachar, id], (err, result) => {
            if (err) {
                console.error('Error updating pmt', err);
                return res.status(500).json({ Message: 'Internal Server Error' });
            }
            return res.status(200).json(result);
        });
    } catch (error) {
        console.error('Unexpected error:', error);
        return res.status(500).json({ Message: 'Internal Server Error' });
    }
};
const getEditPTM = (req, res) => {
    try {
        const sql = 'SELECT * FROM ptm WHERE id = ?';
        const id = req.params.id;
        db.query(sql, [id], (err, result) => {
            if (err) {
                console.error('Error querying ptm by ID:', err);
                return res.status(500).json({ Message: 'Internal Server Error' });
            }
            return res.status(200).json(result);
        });
    } catch (error) {
        console.error('Unexpected error:', error);
        return res.status(500).json({ Message: 'Internal Server Error' });
    }
};
const deletePTM = (req, res) => {
    try {
        const id = req.params.id;
        const deleteConclusion = 'DELETE FROM conclusion WHERE id =?';
        const deletePTM = 'DELETE FROM ptm WHERE id =?';

        db.query(deleteConclusion, [id], (err, resultStatus) => {
            if (err) {
                console.error('Error deleting exam conclusion', err);
                return res.status(500).json({ Message: 'Internal Server Error' });
            }
            db.query(deletePTM, [id], (err, resultAssign) => {
                if (err) {
                    console.error('Error deleting ptm', err);
                    return res.status(500).json({ Message: 'Internal Server Error' });
                }
                // Send the final response
                return res.status(200).json({
                    Conclusionstatus: resultStatus,
                    PTMstatus: resultAssign,
                    Message: 'data deleted successfully'
                });
            });
        });
    } catch (error) {
        console.error('Unexpected error:', error);
        return res.status(500).json({ Message: 'Internal Server Error', success: false, data: null, error: error });
    }
};

//                Conclusion
const getConclusion = (req, res) => {
    try {
        const sql = 'SELECT * FROM conclusion';
        db.query(sql, (err, result) => {
            if (err) {
                console.error('Error in notice query:', err);
                return res.status(500).json({ Message: 'Internal Server Error' });
            }
            return res.status(200).json(result);
        });
    } catch (error) {
        console.error('Unexpected error:', error);
        return res.status(500).json({ Message: 'Internal Server Error' });
    }
};
const createConclusion = (req, res) => {
    try {
        function my_implode_js(separator, array) {
            if (Array.isArray(array) && array.length > 0) {
                return array.join(separator);
            } else {
                return "";
            }
        }

        const done = my_implode_js(",", req.body.done);
        const values = [done, req.body.conclusion, req.body.date];

        const sql = 'INSERT INTO conclusion (`done`, `conclusion`, `date`) VALUES (?)';
        db.query(sql, [values], (err, result) => {
            if (err) {
                console.error('Error creating conclusion', err);
                return res.status(500).json({ Message: 'Internal Server Error' });
            }
            return res.status(200).json(result);
        });
    } catch (error) {
        console.error('Unexpected error:', error);
        return res.status(500).json({ Message: 'Internal Server Error' });
    }
};
const editConclusion = (req, res) => {
    try {
        const sql = 'UPDATE conclusion SET `conclusion`=?, `done`=?, `pending`=?, `remark`=? WHERE  id=?'
        const id = req.params.id;
        function my_implode_js(separator, array) {
            if (Array.isArray(array) && array.length > 0) {
                return array.join(separator);
            } else {
                return "";
            }
        }
        const done = my_implode_js(",", req.body.done);
        const pending = my_implode_js(",", req.body.pending);

        db.query(sql, [req.body.conclusion, done, pending, req.body.remark, id], (err, result) => {
            if (err) {
                console.error('Error updating conclusion', err);
                return res.status(500).json({ Message: 'Internal Server Error' });
            }
            return res.status(200).json(result);
        });
    } catch (error) {
        console.error('Unexpected error:', error);
        return res.status(500).json({ Message: 'Internal Server Error' });
    }
};
const getEditConclusion = (req, res) => {
    try {
        const sql = `
            SELECT ptm.*, conclusion.*
            FROM ptm
            INNER JOIN conclusion ON ptm.id = conclusion.id
            WHERE ptm.id = ?
        `;
        const id = req.params.id;
        db.query(sql, [id], (err, result) => {
            if (err) {
                console.error('Error querying ptm by ID:', err);
                return res.status(500).json({ Message: 'Internal Server Error' });
            }
            return res.status(200).json(result);
        });
    } catch (error) {
        console.error('Unexpected error:', error);
        return res.status(500).json({ Message: 'Internal Server Error' });
    }
};


module.exports = {

    //  structure api
    getBoardbybranch,
    getMediumbybranchBoard,
    getStandardbyBrBoMd,
    getBatchbyBrBoMdSt,


    //   Batch
    getBatch,
    createBatch,
    getBatchById,
    editBatch,
    deleteBatch,

    //   Branch
    getBranch,
    createBranch,
    editBranch,
    getBranchById,
    deleteBranch,

    //   StatusHomework
    getStatusHomework,
    createStatusHomework,
    editStatusHomework,
    getStatusHomeworkById,
    deleteStatusHomework,
    getHomeworkStatus,

    //   Student
    getStudent,
    createStudent,
    editStudent,
    getEditStudent,
    getStudentbyBrBoMdStBt,
    deleteStudent,

    //   Inquiry
    getInquiry,
    createInquiry,
    editInquiry,
    getEditInquiry,
    deleteInquiry,

    //   Notice
    getNotice,
    createNotice,
    editNotice,
    getNoticeById,
    deleteNotice,

    //      stander
    getStanderdbyBranch,

    //   Attendance
    getAttendance,
    getWeeklyAttendance,
    createAttendance,
    editAttendance,
    getEditAttendance,
    deleteAttendance,

    //   Fees
    getFees,
    createFees,
    getFeesByAmount,
    editFees,
    getFeesById,
    deleteFees,

    //   Assign HomeWork
    getAssignHomeWork,
    createAssignHomeWork,
    editAssignHomeWork,
    getEditAssignHomeWork,
    deleteAssignHomeWork,
    getAssignHomeWorkbyBrBoMdStBt,

    //add exam
    getAddExam,
    createAddExam,
    editAddExam,
    getEditAddExam,
    deleteAddExam,
    getExambyBrBoMdStSub,

    //exam attendance
    createExamAttendance,
    editExamAttendance,
    getExamAttendance,
    getEditExamAttendance,
    deleteExamAttendance,

    //exam marks
    createExamMarks,
    updateExamMarks,
    getExamMarks,
    getEditExamMarks,
    deleteExamMarks,
    getExamMarksReport,

    //  PTM
    getPTM,
    createPTM,
    getEditPTM,
    editPTM,
    deletePTM,

    // Conclusion
    getConclusion,
    createConclusion,
    editConclusion,
    getEditConclusion
}