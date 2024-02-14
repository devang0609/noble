const db = require("../db/connection").db
const fs = require('fs');

//Country
const country = (req, res) => {
    try {
        const sql = 'INSERT INTO country (`country`) VALUES (?)';
        db.query(sql, [req.body.country], (err, result) => {
            if (err) {
                console.error('Error creating country:', err);
                return res.status(500).json({ Message: 'Internal Server Error' });
            }
            return res.status(200).json(result);
        });
    } catch (error) {
        console.error('Unexpected error:', error);
        return res.status(500).json({ Message: 'Internal Server Error' });
    }
};

const getAllCountries = (req, res) => {
    try {
        const sql = 'SELECT * FROM country';
        db.query(sql, (err, result) => {
            if (err) {
                console.error('Error fetching countries:', err);
                return res.status(500).json({ Message: 'Internal Server Error' });
            }
            return res.status(200).json(result);
        });
    } catch (error) {
        console.error('Unexpected error:', error);
        return res.status(500).json({ Message: 'Internal Server Error' });
    }
};
const getCountryById = (req, res) => {
    try {
        const sql = 'SELECT * FROM country WHERE id = ?';
        const id = req.params.id;
        db.query(sql, [id], (err, result) => {
            if (err) {
                console.error('Error querying country by ID:', err);
                return res.status(500).json({ Message: 'Internal Server Error' });
            }
            return res.status(200).json(result);
        });
    } catch (error) {
        console.error('Unexpected error:', error);
        return res.status(500).json({ Message: 'Internal Server Error' });
    }
};
const updateCountry = (req, res) => {
    try {
        const sql = 'UPDATE country SET country = ? WHERE id = ?'
        const id = req.params.id;
        db.query(sql, [req.body.country, id], (err, result) => {
            if (err) {
                console.error('Error updating country:', err);
                return res.status(500).json({ Message: 'Internal Server Error' });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({ Message: 'Country not found.' });
            }

            return res.status(200).json({ Message: 'Country updated successfully.' });
        });
    } catch (error) {
        console.error('Unexpected error:', error);
        return res.status(500).json({ Message: 'Internal Server Error' });
    }
};

const deleteCountry = (req, res) => {
    try {
        const sql = 'DELETE FROM country WHERE id =?';
        const id = req.params.id;
        db.query(sql, [id], (err, result) => {
            if (err) {
                console.error('Error deleting country:', err);
                return res.status(500).json({ Message: 'Internal Server Error' });
            }
            return res.status(200).json(result);
        });
    } catch (error) {
        console.error('Unexpected error:', error);
        return res.status(500).json({ Message: 'Internal Server Error' });
    }
};

//state
const addState = (req, res) => {
    try {
        const insertStateQuery = `INSERT INTO state (state, c_id) VALUES (?,?)`;

        db.query(insertStateQuery, [req.body.state, req.body.c_id], (err, results) => {
            if (err) {
                console.error('Error creating State:', err);
                return res.status(500).json({ Message: 'Internal Server Error' });
            }
            return res.status(200).json(results);
        })
    } catch (error) {
        console.error('Unexpected error:', error);
        return res.status(500).json({ Message: 'Internal Server Error' });
    }
}
const getAllState = (req, res) => {
    try {
        const sql = 'SELECT * FROM state';
        db.query(sql, (err, result) => {
            if (err) {
                console.error('Error fetching state:', err);
                return res.status(500).json({ Message: 'Internal Server Error' });
            }
            return res.status(200).json(result);
        });
    } catch (error) {
        console.error('Unexpected error:', error);
        return res.status(500).json({ Message: 'Internal Server Error' });
    }
};
const getStatesByCountry = ((req, res) => {
    try {
        const sql = 'SELECT S.id, S.state FROM state S WHERE S.c_id = ?';
        db.query(sql, [req.query.c_id], (err, results) => {
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

const getStateById = (req, res) => {
    try {
        const sql = 'SELECT * FROM state WHERE id = ?';
        const id = req.params.id;
        db.query(sql, [id], (err, result) => {
            if (err) {
                console.error('Error querying state by ID:', err);
                return res.status(500).json({ Message: 'Internal Server Error' });
            }
            return res.status(200).json(result);
        });
    } catch (error) {
        console.error('Unexpected error:', error);
        return res.status(500).json({ Message: 'Internal Server Error' });
    }
};

const updateState = (req, res) => {
    try {
        const sql = 'UPDATE state SET state = ?, c_id = ? WHERE id = ?';
        const id = req.params.id;

        db.query(sql, [req.body.state, req.body.c_id, id], (err, result) => {
            if (err) {
                console.error('Error updating state:', err);
                return res.status(500).json({ Message: 'Internal Server Error' });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({ Message: 'State not found.' });
            }

            return res.status(200).json({ Message: 'State updated successfully.' });
        });
    } catch (error) {
        console.error('Unexpected error:', error);
        return res.status(500).json({ Message: 'Internal Server Error' });
    }
};

const deleteState = (req, res) => {
    try {
        const sql = 'DELETE FROM state WHERE id =?';
        const id = req.params.id;
        db.query(sql, [id], (err, result) => {
            if (err) {
                console.error('Error deleting state:', err);
                return res.status(500).json({ Message: 'Internal Server Error' });
            }
            return res.status(200).json(result);
        });
    } catch (error) {
        console.error('Unexpected error:', error);
        return res.status(500).json({ Message: 'Internal Server Error' });
    }
}

//city
const addCity = (req, res) => {
    try {
        const insertStateQuery = `INSERT INTO city (city,s_id, c_id) VALUES (?,?,?)`;

        db.query(insertStateQuery, [req.body.city, req.body.s_id, req.body.c_id], (err, results) => {
            if (err) {
                console.error('Error creating city:', err);
                return res.status(500).json({ Message: 'Internal Server Error' });
            }
            return res.status(200).json(results);
        })
    } catch (error) {
        console.error('Unexpected error:', error);
        return res.status(500).json({ Message: 'Internal Server Error' });
    }
}
const getAllCity = (req, res) => {
    try {
        const sql = 'SELECT * FROM city';
        db.query(sql, (err, result) => {
            if (err) {
                console.error('Error fetching City:', err);
                return res.status(500).json({ Message: 'Internal Server Error' });
            }
            return res.status(200).json(result);
        });
    } catch (error) {
        console.error('Unexpected error:', error);
        return res.status(500).json({ Message: 'Internal Server Error' });
    }
};
//GET API for Sub-Category (According to the selected Category)
const getCitiesByCountryAndState = ((req, res) => {
    try {
        const sql = 'SELECT C.id, C.city FROM city C WHERE C.s_id = ?';
        db.query(sql, [req.query.s_id], (err, results) => {
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

const getCityById = (req, res) => {
    try {
        const sql = 'SELECT * FROM city WHERE id = ?';
        const id = req.params.id;
        db.query(sql, [id], (err, result) => {
            if (err) {
                console.error('Error querying City by ID:', err);
                return res.status(500).json({ Message: 'Internal Server Error' });
            }
            return res.status(200).json(result);
        });
    } catch (error) {
        console.error('Unexpected error:', error);
        return res.status(500).json({ Message: 'Internal Server Error' });
    }
};

const updateCity = (req, res) => {
    try {
        const sql = 'UPDATE city SET city = ?,s_id=?, c_id = ? WHERE id = ?';
        const id = req.params.id;

        db.query(sql, [req.body.city, req.body.s_id, req.body.c_id, id], (err, result) => {
            if (err) {
                console.error('Error updating city:', err);
                return res.status(500).json({ Message: 'Internal Server Error' });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({ Message: 'city not found.' });
            }

            return res.status(200).json({ Message: 'city updated successfully.' });
        });
    } catch (error) {
        console.error('Unexpected error:', error);
        return res.status(500).json({ Message: 'Internal Server Error' });
    }
};

const deleteCity = (req, res) => {
    try {
        const sql = 'DELETE FROM city WHERE id =?';
        const id = req.params.id;
        db.query(sql, [id], (err, result) => {
            if (err) {
                console.error('Error deleting city:', err);
                return res.status(500).json({ Message: 'Internal Server Error' });
            }
            return res.status(200).json(result);
        });
    } catch (error) {
        console.error('Unexpected error:', error);
        return res.status(500).json({ Message: 'Internal Server Error' });
    }
}

//area
const addArea = (req, res) => {
    try {
        const insertStateQuery = `INSERT INTO area (area,city_id,s_id, c_id) VALUES (?,?,?,?)`;

        db.query(insertStateQuery, [req.body.area, req.body.city_id, req.body.s_id, req.body.c_id], (err, results) => {
            if (err) {
                console.error('Error creating area:', err);
                return res.status(500).json({ Message: 'Internal Server Error' });
            }
            return res.status(200).json(results);
        })
    } catch (error) {
        console.error('Unexpected error:', error);
        return res.status(500).json({ Message: 'Internal Server Error' });
    }
}
const getAllArea = (req, res) => {
    try {
        const sql = 'SELECT * FROM area';
        db.query(sql, (err, result) => {
            if (err) {
                console.error('Error fetching area:', err);
                return res.status(500).json({ Message: 'Internal Server Error' });
            }
            return res.status(200).json(result);
        });
    } catch (error) {
        console.error('Unexpected error:', error);
        return res.status(500).json({ Message: 'Internal Server Error' });
    }
};
const getAreaByCountryAndStateandcity = ((req, res) => {
    try {
        const sql = 'SELECT A.id, A.area FROM area A WHERE A.city_id = ?';
        db.query(sql, [req.query.city_id], (err, results) => {
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
const getAreaById = (req, res) => {
    try {
        const sql = 'SELECT * FROM area WHERE id = ?';
        const id = req.params.id;
        db.query(sql, [id], (err, result) => {
            if (err) {
                console.error('Error querying area by ID:', err);
                return res.status(500).json({ Message: 'Internal Server Error' });
            }
            return res.status(200).json(result);
        });
    } catch (error) {
        console.error('Unexpected error:', error);
        return res.status(500).json({ Message: 'Internal Server Error' });
    }
};

const updateArea = (req, res) => {
    try {
        const sql = 'UPDATE area SET area = ?, city_id=?, s_id=?, c_id = ? WHERE id = ?';
        const id = req.params.id;

        db.query(sql, [req.body.area, req.body.city_id, req.body.s_id, req.body.c_id, id], (err, result) => {
            if (err) {
                console.error('Error updating area:', err);
                return res.status(500).json({ Message: 'Internal Server Error' });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({ Message: 'area not found.' });
            }

            return res.status(200).json({ Message: 'area updated successfully.' });
        });
    } catch (error) {
        console.error('Unexpected error:', error);
        return res.status(500).json({ Message: 'Internal Server Error' });
    }
};

const deleteArea = (req, res) => {
    try {
        const sql = 'DELETE FROM area WHERE id =?';
        const id = req.params.id;
        db.query(sql, [id], (err, result) => {
            if (err) {
                console.error('Error deleting area:', err);
                return res.status(500).json({ Message: 'Internal Server Error' });
            }
            return res.status(200).json(result);
        });
    } catch (error) {
        console.error('Unexpected error:', error);
        return res.status(500).json({ Message: 'Internal Server Error' });
    }
}


//                                  staff - type
//               call data
const getStaffType = (req, res) => {
    try {
        const sql = 'SELECT * FROM staff_type';
        db.query(sql, (err, result) => {
            if (err) {
                console.error('Error in staff_type query:', err);
                return res.status(500).json({ Message: 'Internal Server Error' });
            }
            return res.status(200).json(result);
        });
    } catch (error) {
        console.error('Unexpected error:', error);
        return res.status(500).json({ Message: 'Internal Server Error' });
    }
};

//              create staf_ftype
const createStaffType = (req, res) => {
    try {
        const sql = 'INSERT INTO staff_type (`staff_type`) VALUES (?)';
        const values = [
            req.body.staff_type
        ];
        db.query(sql, [values], (err, result) => {
            if (err) {
                console.error('Error creating staff_type', err);
                return res.status(500).json({ Message: 'Internal Server Error' });
            }
            return res.status(200).json(result); // 201 for successful creation
        });
    } catch (error) {
        console.error('Unexpected error:', error);
        return res.status(500).json({ Message: 'Internal Server Error' });
    }
};

//            edit staff_type
const editStaffType = (req, res) => {
    try {
        const sql = 'UPDATE staff_type SET `staff_type`=? WHERE  id=?'
        const id = req.params.id;
        db.query(sql, [req.body.staff_type, id], (err, result) => {
            if (err) {
                console.error('Error updating staff type:', err);
                return res.status(500).json({ Message: 'Internal Server Error' });
            }
            return res.status(200).json(result);
        });
    } catch (error) {
        console.error('Unexpected error:', error);
        return res.status(500).json({ Message: 'Internal Server Error' });
    }
};
const getEditStaffType = (req, res) => {
    try {
        const sql = 'SELECT * FROM staff_type WHERE id = ?';
        const id = req.params.id;
        db.query(sql, [id], (err, result) => {
            if (err) {
                console.error('Error querying staff_type by ID:', err);
                return res.status(500).json({ Message: 'Internal Server Error' });
            }
            return res.status(200).json(result);
        });
    } catch (error) {
        console.error('Unexpected error:', error);
        return res.status(500).json({ Message: 'Internal Server Error' });
    }
};

//         delete  staff-type
const deleteStaffType = (req, res) => {
    try {
        const sql = 'DELETE FROM staff_type WHERE id =?';
        const id = req.params.id;
        db.query(sql, [id], (err, result) => {
            if (err) {
                console.error('Error deleting staff_type', err);
                return res.status(500).json({ Message: 'Internal Server Error' });
            }
            return res.status(200).json(result);
        });
    } catch (error) {
        console.error('Unexpected error:', error);
        return res.status(500).json({ Message: 'Internal Server Error', success: false, data: null, error: err, });
    }
};

//                                  medium
//               call data
const getMedium = (req, res) => {
    try {
        const sql = 'SELECT * FROM medium';
        db.query(sql, (err, result) => {
            if (err) {
                console.error('Error in medium query:', err);
                return res.status(500).json({ Message: 'Internal Server Error' });
            }
            return res.status(200).json(result);
        });
    } catch (error) {
        console.error('Unexpected error:', error);
        return res.status(500).json({ Message: 'Internal Server Error' });
    }
};

//              create medium
const createMedium = (req, res) => {
    try {
        const sql = 'INSERT INTO medium (`medium`, `id_branch`, `id_board`) VALUES (?)';
        const values = [
            req.body.medium,
            req.body.id_branch,
            req.body.id_board
        ];
        db.query(sql, [values], (err, result) => {
            if (err) {
                console.error('Error creating medium', err);
                return res.status(500).json({ Message: 'Internal Server Error' });
            }
            return res.status(200).json(result); // 201 for successful creation
        });
    } catch (error) {
        console.error('Unexpected error:', error);
        return res.status(500).json({ Message: 'Internal Server Error' });
    }
};

//            edit medium
const editMedium = (req, res) => {
    try {
        const sql = 'UPDATE medium SET `medium`=?, `id_branch`=?, `id_board`=? WHERE  id=?'
        const id = req.params.id;
        db.query(sql, [req.body.medium, req.body.id_branch, req.body.id_board, id], (err, result) => {
            if (err) {
                console.error('Error updating medium', err);
                return res.status(500).json({ Message: 'Internal Server Error' });
            }
            return res.status(200).json(result);
        });
    } catch (error) {
        console.error('Unexpected error:', error);
        return res.status(500).json({ Message: 'Internal Server Error' });
    }
};
const getEditMedium = (req, res) => {
    try {
        const sql = 'SELECT * FROM medium WHERE id = ?';
        const id = req.params.id;
        db.query(sql, [id], (err, result) => {
            if (err) {
                console.error('Error querying medium by ID:', err);
                return res.status(500).json({ Message: 'Internal Server Error' });
            }
            return res.status(200).json(result);
        });
    } catch (error) {
        console.error('Unexpected error:', error);
        return res.status(500).json({ Message: 'Internal Server Error' });
    }
};

//         delete  medium
const deleteMedium = (req, res) => {
    try {
        const sql = 'DELETE FROM medium WHERE id =?';
        const id = req.params.id;
        db.query(sql, [id], (err, result) => {
            if (err) {
                console.error('Error deleting medium', err);
                return res.status(500).json({ Message: 'Internal Server Error' });
            }
            return res.status(200).json(result);
        });
    } catch (error) {
        console.error('Unexpected error:', error);
        return res.status(500).json({ Message: 'Internal Server Error', success: false, data: null, error: err, });
    }
};

//                                  Shift
//               call data
const getShift = (req, res) => {
    try {
        const sql = 'SELECT * FROM shift';
        db.query(sql, (err, result) => {
            if (err) {
                console.error('Error in shift query:', err);
                return res.status(500).json({ Message: 'Internal Server Error' });
            }
            return res.status(200).json(result);
        });
    } catch (error) {
        console.error('Unexpected error:', error);
        return res.status(500).json({ Message: 'Internal Server Error' });
    }
};

//              create shift
const createShift = (req, res) => {
    try {
        const sql = 'INSERT INTO shift (`shift`) VALUES (?)';
        const values = [
            req.body.shift
        ];
        db.query(sql, [values], (err, result) => {
            if (err) {
                console.error('Error creating shift', err);
                return res.status(500).json({ Message: 'Internal Server Error' });
            }
            return res.status(200).json(result); // 201 for successful creation
        });
    } catch (error) {
        console.error('Unexpected error:', error);
        return res.status(500).json({ Message: 'Internal Server Error' });
    }
};

//            edit shift
const editShift = (req, res) => {
    try {
        const sql = 'UPDATE shift SET `shift`=? WHERE  id=?'
        const id = req.params.id;
        db.query(sql, [req.body.shift, id], (err, result) => {
            if (err) {
                console.error('Error updating shift', err);
                return res.status(500).json({ Message: 'Internal Server Error' });
            }
            return res.status(200).json(result);
        });
    } catch (error) {
        console.error('Unexpected error:', error);
        return res.status(500).json({ Message: 'Internal Server Error' });
    }
};
const getEditShift = (req, res) => {
    try {
        const sql = 'SELECT * FROM shift WHERE id = ?';
        const id = req.params.id;
        db.query(sql, [id], (err, result) => {
            if (err) {
                console.error('Error querying shift by ID:', err);
                return res.status(500).json({ Message: 'Internal Server Error' });
            }
            return res.status(200).json(result);
        });
    } catch (error) {
        console.error('Unexpected error:', error);
        return res.status(500).json({ Message: 'Internal Server Error' });
    }
};

//         delete  shift
const deleteShift = (req, res) => {
    try {
        const sql = 'DELETE FROM shift WHERE id =?';
        const id = req.params.id;
        db.query(sql, [id], (err, result) => {
            if (err) {
                console.error('Error deleting shift', err);
                return res.status(500).json({ Message: 'Internal Server Error' });
            }
            return res.status(200).json(result);
        });
    } catch (error) {
        console.error('Unexpected error:', error);
        return res.status(500).json({ Message: 'Internal Server Error', success: false, data: null, error: err, });
    }
};


//                                  Board
//               call data
const getBoard = (req, res) => {
    try {
        const sql = 'SELECT * FROM board';
        db.query(sql, (err, result) => {
            if (err) {
                console.error('Error in board query:', err);
                return res.status(500).json({ Message: 'Internal Server Error' });
            }
            return res.status(200).json(result);
        });
    } catch (error) {
        console.error('Unexpected error:', error);
        return res.status(500).json({ Message: 'Internal Server Error' });
    }
};

//              create board
const createBoard = (req, res) => {
    try {
        const sql = 'INSERT INTO board (`board`,`id_branch`) VALUES (?)';
        const values = [
            req.body.board,
            req.body.id_branch
        ];
        db.query(sql, [values], (err, result) => {
            if (err) {
                console.error('Error creating board', err);
                return res.status(500).json({ Message: 'Internal Server Error' });
            }
            return res.status(200).json(result); // 201 for successful creation
        });
    } catch (error) {
        console.error('Unexpected error:', error);
        return res.status(500).json({ Message: 'Internal Server Error' });
    }
};

//            edit board
const editBoard = (req, res) => {
    try {
        const sql = 'UPDATE board SET `board`=?, `id_branch`=? WHERE  id=?'
        const id = req.params.id;
        db.query(sql, [req.body.board, req.body.id_branch, id], (err, result) => {
            if (err) {
                console.error('Error updating board', err);
                return res.status(500).json({ Message: 'Internal Server Error' });
            }
            return res.status(200).json(result);
        });
    } catch (error) {
        console.error('Unexpected error:', error);
        return res.status(500).json({ Message: 'Internal Server Error' });
    }
};
const getEditBoard = (req, res) => {
    try {
        const sql = 'SELECT * FROM board WHERE id = ?';
        const id = req.params.id;
        db.query(sql, [id], (err, result) => {
            if (err) {
                console.error('Error querying board by ID:', err);
                return res.status(500).json({ Message: 'Internal Server Error' });
            }
            return res.status(200).json(result);
        });
    } catch (error) {
        console.error('Unexpected error:', error);
        return res.status(500).json({ Message: 'Internal Server Error' });
    }
};

//         delete  board
const deleteBoard = (req, res) => {
    try {
        const sql = 'DELETE FROM board WHERE id =?';
        const id = req.params.id;
        db.query(sql, [id], (err, result) => {
            if (err) {
                console.error('Error deleting board', err);
                return res.status(500).json({ Message: 'Internal Server Error' });
            }
            return res.status(200).json(result);
        });
    } catch (error) {
        console.error('Unexpected error:', error);
        return res.status(500).json({ Message: 'Internal Server Error', success: false, data: null, error: err, });
    }
};

//category
const addCategory = (req, res) => {
    try {
        const sql = 'INSERT INTO category (`category_name`) VALUES (?)';
        db.query(sql, [req.body.category_name], (err, result) => {
            if (err) {
                console.error('Error creating category:', err);
                return res.status(500).json({ Message: 'Internal Server Error' });
            }
            return res.status(200).json(result);
        });
    } catch (error) {
        console.error('Unexpected error:', error);
        return res.status(500).json({ Message: 'Internal Server Error' });
    }
};

const getAllCategory = (req, res) => {
    try {
        const sql = 'SELECT * FROM category';
        db.query(sql, [req.query.id], (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).json({ err: "Error When Fetching Data" });
            } else {
                if (result.length > 0) {
                    res.status(200).json(result);
                } else {
                    res.status(200).json({ "msg": "Data not found!" });
                }
            }
        });
    } catch (error) {
        console.error('Unexpected error:', error);
        return res.status(500).json({ Message: 'Internal Server Error' });
    }
};
// const getCategory = (req, res) => {
//     try {
//         const selQuery = "select cat_id,category_name from CATEGORIES ";
//         mysql.query(selQuery, [req.query.cat_id], (err, results) => {
//             if (err) {
//                 console.log(err);
//                 res.status(500).json({ err: "Error When Fetching Data" });
//             } else {
//                 if (results.length > 0) {
//                     res.status(200).json(results);
//                 } else {
//                     res.status(200).json({ "msg": "Data not found!" });
//                 }
//             }
//         });
//     } catch (err) {
//         res.status(500).json({ err: "Error When Fetching Data" });
//     }
// };


const getCategoryById = (req, res) => {
    try {
        const sql = 'SELECT * FROM category WHERE id = ?';
        const id = req.params.id;
        db.query(sql, [id], (err, result) => {
            if (err) {
                console.error('Error querying category by ID:', err);
                return res.status(500).json({ Message: 'Internal Server Error' });
            }
            return res.status(200).json(result);
        });
    } catch (error) {
        console.error('Unexpected error:', error);
        return res.status(500).json({ Message: 'Internal Server Error' });
    }
};
const updateCategory = (req, res) => {
    try {
        const sql = 'UPDATE category SET category_name = ? WHERE id = ?'
        const id = req.params.id;
        db.query(sql, [req.body.category_name, id], (err, result) => {
            if (err) {
                console.error('Error updating category:', err);
                return res.status(500).json({ Message: 'Internal Server Error' });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({ Message: 'category not found.' });
            }

            return res.status(200).json({ Message: 'category updated successfully.' });
        });
    } catch (error) {
        console.error('Unexpected error:', error);
        return res.status(500).json({ Message: 'Internal Server Error' });
    }
};

const deleteCategory = (req, res) => {
    try {
        const sql = 'DELETE FROM category WHERE id =?';
        const id = req.params.id;
        db.query(sql, [id], (err, result) => {
            if (err) {
                console.error('Error deleting category:', err);
                return res.status(500).json({ Message: 'Internal Server Error' });
            }
            return res.status(200).json(result);
        });
    } catch (error) {
        console.error('Unexpected error:', error);
        return res.status(500).json({ Message: 'Internal Server Error' });
    }
};

//sub category
//   const addSubCategory = (req, res) => {
//     try {
//         const sql = `INSERT INTO sub_category (subcategory_name, cat_id) VALUES (?,?)`;
//         db.query(sql, [req.body.subcategory_name, req.body.cat_id], (err, results) => {
//             if (err) {
//                 console.error('Error creating Sub Category:', err);
//                 return res.status(500).json({ Message: 'Internal Server Error', error: err.message });
//             }
//             return res.status(200).json(results);
//         });
//     } catch (error) {
//         console.error('Unexpected error:', error);
//         return res.status(500).json({ Message: 'Internal Server Error', error: error.message });
//     }
// };
const addSubCategory = (req, res) => {
    try {
        const { subcategory_name, cat_id } = req.body;

        // Check if the specified cat_id exists in the category table
        const checkCategoryQuery = 'SELECT * FROM category WHERE id = ?';
        db.query(checkCategoryQuery, [cat_id], (checkErr, checkResults) => {
            if (checkErr || checkResults.length === 0) {
                console.error('Invalid cat_id:', checkErr);
                return res.status(400).json({ Message: 'Invalid cat_id' });
            }

            // If the category exists, proceed to insert the sub-category
            const insertSubCategoryQuery = 'INSERT INTO sub_category (subcategory_name, cat_id) VALUES (?, ?)';
            db.query(insertSubCategoryQuery, [subcategory_name, cat_id], (err, results) => {
                if (err) {
                    console.error('Error creating Sub Category:', err);
                    return res.status(500).json({ Message: 'Internal Server Error', error: err.message });
                }
                return res.status(200).json(results);
            });
        });
    } catch (error) {
        console.error('Unexpected error:', error);
        return res.status(500).json({ Message: 'Internal Server Error', error: error.message });
    }
}
const getAllSubCategory = (req, res) => {
    try {
        const sql = 'SELECT * FROM sub_category';
        db.query(sql, (err, result) => {
            if (err) {
                console.error('Error fetching Sub Category:', err);
                return res.status(500).json({ Message: 'Internal Server Error' });
            }
            return res.status(200).json(result);
        });
    } catch (error) {
        console.error('Unexpected error:', error);
        return res.status(500).json({ Message: 'Internal Server Error' });
    }
};
//GET API for Sub-Category (According to the selected Category)
const getSubCategory = ((req, res) => {
    try {
        const selQuery = "SELECT S.id,S.subcategory_name FROM sub_category S WHERE S.cat_id = ?";
        mysql.query(selQuery, [req.query.cat_id], (err, results) => {
            if (err) {
                console.log(err);
                res.status(500).json({ err: "Error When Fetching Data" })
            } else {
                if (results.length > 0) {
                    res.status(200).json(results);
                } else {
                    res.status(200).json({ "msg": "Data not found!" });
                }
            }
        })
    } catch (err) {
        res.status(500).json({ err: "Error When Fetching Data" });
    }
})
const getSubCategoryById = (req, res) => {
    try {
        const sql = 'SELECT * FROM sub_category WHERE id = ?';
        const id = req.params.id;
        db.query(sql, [id], (err, result) => {
            if (err) {
                console.error('Error querying Sub Category by ID:', err);
                return res.status(500).json({ Message: 'Internal Server Error' });
            }
            return res.status(200).json(result);
        });
    } catch (error) {
        console.error('Unexpected error:', error);
        return res.status(500).json({ Message: 'Internal Server Error' });
    }
};

const updateSubCategory = (req, res) => {
    try {
        const sql = 'UPDATE sub_category SET subcategory_name = ?, cat_id = ? WHERE id = ?';
        const id = req.params.id;

        db.query(sql, [req.body.subcategory_name, req.body.cat_id, id], (err, result) => {
            if (err) {
                console.error('Error updating Sub Category:', err);
                return res.status(500).json({ Message: 'Internal Server Error' });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({ Message: 'Sub Categorynot found.' });
            }

            return res.status(200).json({ Message: 'Sub Category updated successfully.' });
        });
    } catch (error) {
        console.error('Unexpected error:', error);
        return res.status(500).json({ Message: 'Internal Server Error' });
    }
};

const deleteSubCategory = (req, res) => {
    try {
        const sql = 'DELETE FROM sub_category WHERE id =?';
        const id = req.params.id;
        db.query(sql, [id], (err, result) => {
            if (err) {
                console.error('Error deleting Sub Category:', err);
                return res.status(500).json({ Message: 'Internal Server Error' });
            }
            return res.status(200).json(result);
        });
    } catch (error) {
        console.error('Unexpected error:', error);
        return res.status(500).json({ Message: 'Internal Server Error' });
    }
}




//                                  ReferenceType
//               call data
const getReferenceType = (req, res) => {
    try {
        const sql = 'SELECT * FROM reference_type';
        db.query(sql, (err, result) => {
            if (err) {
                console.error('Error in reference query:', err);
                return res.status(500).json({ Message: 'Internal Server Error' });
            }
            return res.status(200).json(result);
        });
    } catch (error) {
        console.error('Unexpected error:', error);
        return res.status(500).json({ Message: 'Internal Server Error' });
    }
};

//              create referenceType
const createReferenceType = (req, res) => {
    try {
        const sql = 'INSERT INTO reference_type (`name`) VALUES (?)';
        const values = [
            req.body.name
        ];
        db.query(sql, [values], (err, result) => {
            if (err) {
                console.error('Error creating reference type', err);
                return res.status(500).json({ Message: 'Internal Server Error' });
            }
            return res.status(200).json(result); // 201 for successful creation
        });
    } catch (error) {
        console.error('Unexpected error:', error);
        return res.status(500).json({ Message: 'Internal Server Error' });
    }
};

//            edit referenceType    
const editReferenceType = (req, res) => {
    try {
        const sql = 'UPDATE reference_type SET `name`=? WHERE  id=?'
        const id = req.params.id;
        db.query(sql, [req.body.name, id], (err, result) => {
            if (err) {
                console.error('Error updating reference type', err);
                return res.status(500).json({ Message: 'Internal Server Error' });
            }
            return res.status(200).json(result);
        });
    } catch (error) {
        console.error('Unexpected error:', error);
        return res.status(500).json({ Message: 'Internal Server Error' });
    }
};
const getEditReferenceType = (req, res) => {
    try {
        const sql = 'SELECT * FROM reference_type WHERE id = ?';
        const id = req.params.id;
        db.query(sql, [id], (err, result) => {
            if (err) {
                console.error('Error querying reference type by ID:', err);
                return res.status(500).json({ Message: 'Internal Server Error' });
            }
            return res.status(200).json(result);
        });
    } catch (error) {
        console.error('Unexpected error:', error);
        return res.status(500).json({ Message: 'Internal Server Error' });
    }
};

//         delete  referenceType
const deleteReferenceType = (req, res) => {
    try {
        const sql = 'DELETE FROM reference_type WHERE id =?';
        const id = req.params.id;
        db.query(sql, [id], (err, result) => {
            if (err) {
                console.error('Error deleting reference_type', err);
                return res.status(500).json({ Message: 'Internal Server Error' });
            }
            return res.status(200).json(result);
        });
    } catch (error) {
        console.error('Unexpected error:', error);
        return res.status(500).json({ Message: 'Internal Server Error', success: false, data: null, error: err, });
    }
};




//                                  Reference
//               call data
const getReference = (req, res) => {
    try {
        const sql = 'SELECT * FROM reference';
        db.query(sql, (err, result) => {
            if (err) {
                console.error('Error in reference query:', err);
                return res.status(500).json({ Message: 'Internal Server Error' });
            }
            return res.status(200).json(result);
        });
    } catch (error) {
        console.error('Unexpected error:', error);
        return res.status(500).json({ Message: 'Internal Server Error' });
    }
};

//              create reference
const createReference = (req, res) => {
    try {
        const sql = 'INSERT INTO reference (`name`,`id_tp`) VALUES (?)';
        const values = [
            req.body.name,
            req.body.id_tp
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

//            edit reference
const editReference = (req, res) => {
    try {
        const sql = 'UPDATE reference SET `name`=?, `id_tp`=? WHERE  id=?'
        const id = req.params.id;
        db.query(sql, [req.body.name, req.body.id_tp, id], (err, result) => {
            if (err) {
                console.error('Error updating reference', err);
                return res.status(500).json({ Message: 'Internal Server Error' });
            }
            return res.status(200).json(result);
        });
    } catch (error) {
        console.error('Unexpected error:', error);
        return res.status(500).json({ Message: 'Internal Server Error' });
    }
};
const getEditReference = (req, res) => {
    try {
        const sql = 'SELECT * FROM reference WHERE id = ?';
        const id = req.params.id;
        db.query(sql, [id], (err, result) => {
            if (err) {
                console.error('Error querying reference by ID:', err);
                return res.status(500).json({ Message: 'Internal Server Error' });
            }
            return res.status(200).json(result);
        });
    } catch (error) {
        console.error('Unexpected error:', error);
        return res.status(500).json({ Message: 'Internal Server Error' });
    }
};

//         delete  reference
const deleteReference = (req, res) => {
    try {
        const sql = 'DELETE FROM reference WHERE id =?';
        const id = req.params.id;
        db.query(sql, [id], (err, result) => {
            if (err) {
                console.error('Error deleting reference', err);
                return res.status(500).json({ Message: 'Internal Server Error' });
            }
            return res.status(200).json(result);
        });
    } catch (error) {
        console.error('Unexpected error:', error);
        return res.status(500).json({ Message: 'Internal Server Error', success: false, data: null, error: err, });
    }
};


//                                  Reasons
//               call data
const getReasons = (req, res) => {
    try {
        const sql = 'SELECT * FROM reasons';
        db.query(sql, (err, result) => {
            if (err) {
                console.error('Error in reasons query:', err);
                return res.status(500).json({ Message: 'Internal Server Error' });
            }
            return res.status(200).json(result);
        });
    } catch (error) {
        console.error('Unexpected error:', error);
        return res.status(500).json({ Message: 'Internal Server Error' });
    }
};

//              create reasons
const createReasons = (req, res) => {
    try {
        const sql = 'INSERT INTO reasons (`reasons`) VALUES (?)';
        const values = [
            req.body.reasons
        ];
        db.query(sql, [values], (err, result) => {
            if (err) {
                console.error('Error creating reasons', err);
                return res.status(500).json({ Message: 'Internal Server Error' });
            }
            return res.status(200).json(result); // 201 for successful creation
        });
    } catch (error) {
        console.error('Unexpected error:', error);
        return res.status(500).json({ Message: 'Internal Server Error' });
    }
};

//            edit reasons
const editReasons = (req, res) => {
    try {
        const sql = 'UPDATE reasons SET `reasons`=? WHERE  id=?'
        const id = req.params.id;
        db.query(sql, [req.body.reasons, id], (err, result) => {
            if (err) {
                console.error('Error updating reasons', err);
                return res.status(500).json({ Message: 'Internal Server Error' });
            }
            return res.status(200).json(result);
        });
    } catch (error) {
        console.error('Unexpected error:', error);
        return res.status(500).json({ Message: 'Internal Server Error' });
    }
};
const getEditReasons = (req, res) => {
    try {
        const sql = 'SELECT * FROM reasons WHERE id = ?';
        const id = req.params.id;
        db.query(sql, [id], (err, result) => {
            if (err) {
                console.error('Error querying reasons by ID:', err);
                return res.status(500).json({ Message: 'Internal Server Error' });
            }
            return res.status(200).json(result);
        });
    } catch (error) {
        console.error('Unexpected error:', error);
        return res.status(500).json({ Message: 'Internal Server Error' });
    }
};

//         delete  reasons
const deleteReasons = (req, res) => {
    try {
        const sql = 'DELETE FROM reasons WHERE id =?';
        const id = req.params.id;
        db.query(sql, [id], (err, result) => {
            if (err) {
                console.error('Error deleting reasons', err);
                return res.status(500).json({ Message: 'Internal Server Error' });
            }
            return res.status(200).json(result);
        });
    } catch (error) {
        console.error('Unexpected error:', error);
        return res.status(500).json({ Message: 'Internal Server Error', success: false, data: null, error: err, });
    }
};



//                                  School
//               call data
const getSchool = (req, res) => {
    try {
        const sql = 'SELECT * FROM school';
        db.query(sql, (err, result) => {
            if (err) {
                console.error('Error in school query:', err);
                return res.status(500).json({ Message: 'Internal Server Error' });
            }
            return res.status(200).json(result);
        });
    } catch (error) {
        console.error('Unexpected error:', error);
        return res.status(500).json({ Message: 'Internal Server Error' });
    }
};

//              create school
const createSchool = (req, res) => {
    try {
        const sql = 'INSERT INTO school (`school`) VALUES (?)';
        const values = [
            req.body.school
        ];
        db.query(sql, [values], (err, result) => {
            if (err) {
                console.error('Error creating school', err);
                return res.status(500).json({ Message: 'Internal Server Error' });
            }
            return res.status(200).json(result); // 201 for successful creation
        });
    } catch (error) {
        console.error('Unexpected error:', error);
        return res.status(500).json({ Message: 'Internal Server Error' });
    }
};

//            edit school
const editSchool = (req, res) => {
    try {
        const sql = 'UPDATE school SET `school`=? WHERE  id=?'
        const id = req.params.id;
        db.query(sql, [req.body.school, id], (err, result) => {
            if (err) {
                console.error('Error updating school', err);
                return res.status(500).json({ Message: 'Internal Server Error' });
            }
            return res.status(200).json(result);
        });
    } catch (error) {
        console.error('Unexpected error:', error);
        return res.status(500).json({ Message: 'Internal Server Error' });
    }
};
const getEditSchool = (req, res) => {
    try {
        const sql = 'SELECT * FROM school WHERE id = ?';
        const id = req.params.id;
        db.query(sql, [id], (err, result) => {
            if (err) {
                console.error('Error querying school by ID:', err);
                return res.status(500).json({ Message: 'Internal Server Error' });
            }
            return res.status(200).json(result);
        });
    } catch (error) {
        console.error('Unexpected error:', error);
        return res.status(500).json({ Message: 'Internal Server Error' });
    }
};

//         delete  school
const deleteSchool = (req, res) => {
    try {
        const sql = 'DELETE FROM school WHERE id =?';
        const id = req.params.id;
        db.query(sql, [id], (err, result) => {
            if (err) {
                console.error('Error deleting school', err);
                return res.status(500).json({ Message: 'Internal Server Error' });
            }
            return res.status(200).json(result);
        });
    } catch (error) {
        console.error('Unexpected error:', error);
        return res.status(500).json({ Message: 'Internal Server Error', success: false, data: null, error: err, });
    }
};


//                                  Income Type
//               call data
const getIncomeType = (req, res) => {
    try {
        const sql = 'SELECT * FROM income_type';
        db.query(sql, (err, result) => {
            if (err) {
                console.error('Error in income_type query:', err);
                return res.status(500).json({ Message: 'Internal Server Error' });
            }
            return res.status(200).json(result);
        });
    } catch (error) {
        console.error('Unexpected error:', error);
        return res.status(500).json({ Message: 'Internal Server Error' });
    }
};

//              create income_type
const createIncomeType = (req, res) => {
    try {
        const sql = 'INSERT INTO income_type (`income_type`) VALUES (?)';
        const values = [
            req.body.income_type
        ];
        db.query(sql, [values], (err, result) => {
            if (err) {
                console.error('Error creating income_type', err);
                return res.status(500).json({ Message: 'Internal Server Error' });
            }
            return res.status(200).json(result); // 201 for successful creation
        });
    } catch (error) {
        console.error('Unexpected error:', error);
        return res.status(500).json({ Message: 'Internal Server Error' });
    }
};

//            edit income_type
const editIncomeType = (req, res) => {
    try {
        const sql = 'UPDATE income_type SET `income_type`=? WHERE  id=?'
        const id = req.params.id;
        db.query(sql, [req.body.income_type, id], (err, result) => {
            if (err) {
                console.error('Error updating income_type', err);
                return res.status(500).json({ Message: 'Internal Server Error' });
            }
            return res.status(200).json(result);
        });
    } catch (error) {
        console.error('Unexpected error:', error);
        return res.status(500).json({ Message: 'Internal Server Error' });
    }
};
const getEditIncomeType = (req, res) => {
    try {
        const sql = 'SELECT * FROM income_type WHERE id = ?';
        const id = req.params.id;
        db.query(sql, [id], (err, result) => {
            if (err) {
                console.error('Error querying income_type by ID:', err);
                return res.status(500).json({ Message: 'Internal Server Error' });
            }
            return res.status(200).json(result);
        });
    } catch (error) {
        console.error('Unexpected error:', error);
        return res.status(500).json({ Message: 'Internal Server Error' });
    }
};

//         delete  income_type
const deleteIncomeType = (req, res) => {
    try {
        const sql = 'DELETE FROM income_type WHERE id =?';
        const id = req.params.id;
        db.query(sql, [id], (err, result) => {
            if (err) {
                console.error('Error deleting income_type', err);
                return res.status(500).json({ Message: 'Internal Server Error' });
            }
            return res.status(200).json(result);
        });
    } catch (error) {
        console.error('Unexpected error:', error);
        return res.status(500).json({ Message: 'Internal Server Error', success: false, data: null, error: err, });
    }
};


//                                  Expanse Type
//               call data
const getExpanseType = (req, res) => {
    try {
        const sql = 'SELECT * FROM expanse_type';
        db.query(sql, (err, result) => {
            if (err) {
                console.error('Error in expanse_type query:', err);
                return res.status(500).json({ Message: 'Internal Server Error' });
            }
            return res.status(200).json(result);
        });
    } catch (error) {
        console.error('Unexpected error:', error);
        return res.status(500).json({ Message: 'Internal Server Error' });
    }
};

//              create expanse_type
const createExpanseType = (req, res) => {
    try {
        const sql = 'INSERT INTO expanse_type (`expanse_type`) VALUES (?)';
        const values = [
            req.body.expanse_type
        ];
        db.query(sql, [values], (err, result) => {
            if (err) {
                console.error('Error creating expanse_type', err);
                return res.status(500).json({ Message: 'Internal Server Error' });
            }
            return res.status(200).json(result); // 201 for successful creation
        });
    } catch (error) {
        console.error('Unexpected error:', error);
        return res.status(500).json({ Message: 'Internal Server Error' });
    }
};

//            edit expanse_type
const editExpanseType = (req, res) => {
    try {
        const sql = 'UPDATE expanse_type SET `expanse_type`=? WHERE  id=?'
        const id = req.params.id;
        db.query(sql, [req.body.expanse_type, id], (err, result) => {
            if (err) {
                console.error('Error updating expanse_type', err);
                return res.status(500).json({ Message: 'Internal Server Error' });
            }
            return res.status(200).json(result);
        });
    } catch (error) {
        console.error('Unexpected error:', error);
        return res.status(500).json({ Message: 'Internal Server Error' });
    }
};
const getEditExpanseType = (req, res) => {
    try {
        const sql = 'SELECT * FROM expanse_type WHERE id = ?';
        const id = req.params.id;
        db.query(sql, [id], (err, result) => {
            if (err) {
                console.error('Error querying expanse_type by ID:', err);
                return res.status(500).json({ Message: 'Internal Server Error' });
            }
            return res.status(200).json(result);
        });
    } catch (error) {
        console.error('Unexpected error:', error);
        return res.status(500).json({ Message: 'Internal Server Error' });
    }
};

//         delete  expanse_type
const deleteExpanseType = (req, res) => {
    try {
        const sql = 'DELETE FROM expanse_type WHERE id =?';
        const id = req.params.id;
        db.query(sql, [id], (err, result) => {
            if (err) {
                console.error('Error deleting expanse_type', err);
                return res.status(500).json({ Message: 'Internal Server Error' });
            }
            return res.status(200).json(result);
        });
    } catch (error) {
        console.error('Unexpected error:', error);
        return res.status(500).json({ Message: 'Internal Server Error', success: false, data: null, error: err, });
    }
};


//          Standers    
//      call data
const getStanderd = (req, res) => {
    try {
        const sql = 'SELECT * FROM standard';
        db.query(sql, (err, result) => {
            if (err) {
                console.error('Error in standard query:', err);
                return res.status(500).json({ Message: 'Internal Server Error' });
            }
            return res.status(200).json(result);
        });
    } catch (error) {
        console.error('Unexpected error:', error);
        return res.status(500).json({ Message: 'Internal Server Error' });
    }
};

//              create standerd
const createStanderd = (req, res) => {
    try {
        const sql = 'INSERT INTO standard (`standard`,`branch_id`,`id_board`,`id_medium`) VALUES (?)';
        const values = [
            req.body.standard,
            req.body.branch_id,
            req.body.id_board,
            req.body.id_medium
        ];
        db.query(sql, [values], (err, result) => {
            if (err) {
                console.error('Error creating standard', err);
                return res.status(500).json({ Message: 'Internal Server Error' });
            }
            return res.status(200).json(result); // 201 for successful creation
        });
    } catch (error) {
        console.error('Unexpected error:', error);
        return res.status(500).json({ Message: 'Internal Server Error' });
    }
};

//            edit standerd
const editStanderd = (req, res) => {
    try {
        const sql = 'UPDATE standard SET `standard`=?, `branch_id`=?, `id_board`=?, `id_medium`=? WHERE  id=?'
        const id = req.params.id;
        db.query(sql, [req.body.standard, req.body.branch_id, req.body.id_board, req.body.id_medium, id], (err, result) => {
            if (err) {
                console.error('Error updating standard', err);
                return res.status(500).json({ Message: 'Internal Server Error' });
            }
            return res.status(200).json(result);
        });
    } catch (error) {
        console.error('Unexpected error:', error);
        return res.status(500).json({ Message: 'Internal Server Error' });
    }
};
const getEditStanderd = (req, res) => {
    try {
        const sql = 'SELECT * FROM standard WHERE id = ?';
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

//   selected by branch get data
const getStanderdByBranch = (req, res) => {
    try {
        const branchIds = req.query.branch_id.split(',').map(Number);
        const sql = 'SELECT S.id, S.standard FROM standard S WHERE S.branch_id IN (?)';
        db.query(sql, [branchIds], (err, results) => {
            if (err) {
                console.log(err);
                res.status(500).json({ err: "Error When Fetching Data" });
            } else {
                res.status(200).json(results);
            }
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ err: "Error When Fetching Data" });
    }
};

//         delete  standerd
const deleteStanderd = (req, res) => {
    try {
        const sql = 'DELETE FROM standard WHERE id =?';
        const id = req.params.id;
        db.query(sql, [id], (err, result) => {
            if (err) {
                console.error('Error deleting standard', err);
                return res.status(500).json({ Message: 'Internal Server Error' });
            }
            return res.status(200).json(result);
        });
    } catch (error) {
        console.error('Unexpected error:', error);
        return res.status(500).json({ Message: 'Internal Server Error', success: false, data: null, error: err, });
    }
};

//subject
const createSubject = (req, res) => {
    try {
        const sql = 'INSERT INTO subject (`subject`,`id_branch`,`id_board`,`id_medium`,`id_stand`) VALUES (?)';
        const values = [
            req.body.subject,
            req.body.id_branch,
            req.body.id_board,
            req.body.id_medium,
            req.body.id_stand
        ];
        db.query(sql, [values], (err, result) => {
            if (err) {
                console.error('Error creating subject', err);
                return res.status(500).json({ Message: 'Internal Server Error' });
            }
            return res.status(200).json(result);
        });
    } catch (error) {
        console.error('Unexpected error:', error);
        return res.status(500).json({ Message: 'Internal Server Error' });
    }
};
const getSubject = (req, res) => {
    try {
        const sql = 'SELECT * FROM subject';
        db.query(sql, (err, result) => {
            if (err) {
                console.error('Error in subject query:', err);
                return res.status(500).json({ Message: 'Internal Server Error' });
            }
            return res.status(200).json(result);
        });
    } catch (error) {
        console.error('Unexpected error:', error);
        return res.status(500).json({ Message: 'Internal Server Error' });
    }
};
const getSubjectById = (req, res) => {
    try {
        const sql = 'SELECT * FROM subject WHERE id = ?';
        const id = req.params.id;
        db.query(sql, [id], (err, result) => {
            if (err) {
                console.error('Error querying subject by ID:', err);
                return res.status(500).json({ Message: 'Internal Server Error' });
            }
            return res.status(200).json(result);
        });
    } catch (error) {
        console.error('Unexpected error:', error);
        return res.status(500).json({ Message: 'Internal Server Error' });
    }
};
const getSubjectByStanderd = (req, res) => {
    try {
        const sql = 'SELECT * FROM subject S WHERE S.id_branch  = ? AND S.id_board  =? AND S.id_medium = ? AND S.id_stand = ?';
        db.query(sql, [req.query.id_branch, req.query.id_board, req.query.id_medium, req.query.id_stand], (err, results) => {
            if (err) {
                console.log(err);
                res.status(500).json({ err: "Error When Fetching Data" });
            } else {
                res.status(200).json(results);
            }
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ err: "Error When Fetching Data" });
    }
};

const editSubject = (req, res) => {
    try {
        const sql = 'UPDATE subject SET `subject`=?,`id_branch`=?,`id_board`=?,`id_medium`=?,`id_stand`=? WHERE  id=?'
        const id = req.params.id;
        const values = [
            req.body.subject,
            req.body.id_branch,
            req.body.id_board,
            req.body.id_medium,
            req.body.id_stand,
            id
        ];
        db.query(sql, values, (err, result) => {
            if (err) {
                console.error('Error updating subject', err);
                return res.status(500).json({ Message: 'Internal Server Error' });
            }
            return res.status(200).json(result);
        });
    } catch (error) {
        console.error('Unexpected error:', error);
        return res.status(500).json({ Message: 'Internal Server Error' });
    }
};
const deleteSubject = (req, res) => {
    try {
        const sql = 'DELETE FROM subject WHERE id =?';
        const id = req.params.id;
        db.query(sql, [id], (err, result) => {
            if (err) {
                console.error('Error deleting subject', err);
                return res.status(500).json({ Message: 'Internal Server Error' });
            }
            return res.status(200).json(result);
        });
    } catch (error) {
        console.error('Unexpected error:', error);
        return res.status(500).json({ Message: 'Internal Server Error', success: false, data: null, error: err, });
    }
};

//Class
const addClass = (req, res) => {
    try {
        const sql = 'INSERT INTO classroom (`name`) VALUES (?)';
        db.query(sql, [req.body.name], (err, result) => {
            if (err) {
                console.error('Error creating classroom:', err);
                return res.status(500).json({ Message: 'Internal Server Error' });
            }
            return res.status(200).json(result);
        });
    } catch (error) {
        console.error('Unexpected error:', error);
        return res.status(500).json({ Message: 'Internal Server Error' });
    }
};

const getAllClass = (req, res) => {
    try {
        const sql = 'SELECT * FROM classroom';
        db.query(sql, (err, result) => {
            if (err) {
                console.error('Error fetching classroom:', err);
                return res.status(500).json({ Message: 'Internal Server Error' });
            }
            return res.status(200).json(result);
        });
    } catch (error) {
        console.error('Unexpected error:', error);
        return res.status(500).json({ Message: 'Internal Server Error' });
    }
};
const getClassById = (req, res) => {
    try {
        const sql = 'SELECT * FROM classroom WHERE id = ?';
        const id = req.params.id;
        db.query(sql, [id], (err, result) => {
            if (err) {
                console.error('Error querying classroom by ID:', err);
                return res.status(500).json({ Message: 'Internal Server Error' });
            }
            return res.status(200).json(result);
        });
    } catch (error) {
        console.error('Unexpected error:', error);
        return res.status(500).json({ Message: 'Internal Server Error' });
    }
};
const updateClass = (req, res) => {
    try {
        const sql = 'UPDATE classroom SET name = ? WHERE id = ?'
        const id = req.params.id;
        db.query(sql, [req.body.name, id], (err, result) => {
            if (err) {
                console.error('Error updating classroom:', err);
                return res.status(500).json({ Message: 'Internal Server Error' });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({ Message: 'classroom not found.' });
            }

            return res.status(200).json({ Message: 'classroom updated successfully.' });
        });
    } catch (error) {
        console.error('Unexpected error:', error);
        return res.status(500).json({ Message: 'Internal Server Error' });
    }
};

const deleteClass = (req, res) => {
    try {
        const sql = 'DELETE FROM classroom WHERE id =?';
        const id = req.params.id;
        db.query(sql, [id], (err, result) => {
            if (err) {
                console.error('Error deleting classroom:', err);
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
    //country
    country,
    getAllCountries,
    updateCountry,
    deleteCountry,
    getCountryById,

    //state
    addState,
    getAllState,
    getStatesByCountry,
    getStateById,
    updateState,
    deleteState,

    //city
    addCity,
    getAllCity,
    getCitiesByCountryAndState,
    getCityById,
    updateCity,
    deleteCity,

    //area
    addArea,
    getAllArea,
    getAreaByCountryAndStateandcity,
    getAreaById,
    updateArea,
    deleteArea,

    //  staff
    getStaffType,
    createStaffType,
    editStaffType,
    getEditStaffType,
    deleteStaffType,

    // medium
    getMedium,
    createMedium,
    editMedium,
    getEditMedium,
    deleteMedium,

    // Shift
    getShift,
    createShift,
    editShift,
    getEditShift,
    deleteShift,

    // Board
    getBoard,
    createBoard,
    editBoard,
    getEditBoard,
    deleteBoard,

    //category
    addCategory,
    getAllCategory,
    getCategoryById,
    updateCategory,
    deleteCategory,

    //sub category
    addSubCategory,
    getAllSubCategory,
    // get category by sub category
    getSubCategory,
    getSubCategoryById,
    updateSubCategory,
    deleteSubCategory,

    // ReferenceType
    getReferenceType,
    createReferenceType,
    editReferenceType,
    getEditReferenceType,
    deleteReferenceType,

    // Reference
    getReference,
    createReference,
    editReference,
    getEditReference,
    deleteReference,

    // Reasons
    getReasons,
    createReasons,
    editReasons,
    getEditReasons,
    deleteReasons,

    // School
    getSchool,
    createSchool,
    editSchool,
    getEditSchool,
    deleteSchool,

    // IncomeType
    getIncomeType,
    createIncomeType,
    editIncomeType,
    getEditIncomeType,
    deleteIncomeType,

    // IncomeType
    getExpanseType,
    createExpanseType,
    editExpanseType,
    getEditExpanseType,
    deleteExpanseType,

    //  Standerd
    getStanderd,
    createStanderd,
    editStanderd,
    getEditStanderd,
    deleteStanderd,
    getStanderdByBranch,

    //  Subject
    getSubject,
    createSubject,
    editSubject,
    getSubjectById,
    getSubjectByStanderd,
    deleteSubject,

    //class
    addClass,
    getAllClass,
    getClassById,
    updateClass,
    deleteClass
};