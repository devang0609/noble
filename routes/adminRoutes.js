const express = require("express");
const multer = require("multer");
const router = express.Router();
const { 

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
} = require("../controller/adminController")

router.post("/createadmin", createAdmin)
router.get("/admin", getAdmin)
router.get("/getadmin/:id", getAdminById)
router.put("/admin/update/:id", editAdmin)
router.delete("/admin/delete/:id", deleteAdmin)

router.post("/course", addCourse)
router.get("/getcourse", getCourse)
router.get("/getcourse/:id", getCourseById)
router.put("/course/update/:id", editCourse)
router.delete("/course/delete/:id", deleteCourse)
router.get('/getCoursebyids', getCoursebyids)

router.post("/material", createMaterial)
router.get("/getmaterial", getMaterial)
router.get("/getmaterial/:id", getMaterialById)
router.put("/material/update/:id", editMaterial)
router.delete("/material/delete/:id", deleteMaterial)

router.post("/income", createIncome)
router.get("/getincome", getIncome)
router.get("/getincome/:id", getIncomeById)
router.put("/income/update/:id", editIncome)
router.delete("/income/delete/:id", deleteIncome)

router.post("/expense", createExpanse)
router.get("/getexpanse", getExpanse)
router.get("/getexpanse/:id", getExpanseById)
router.put("/expanse/update/:id", editExpanse)
router.delete("/expanse/delete/:id", deleteExpanse)

router.post("/login",login)
router.get("/logout", logoutRoute);

router.post("/createTimetable",timetables )
router.get("/getTimetableMonday", getTimetableMnday)
router.get("/getTimetableTuesday", getTimetableTuesday)
router.get("/getTimetableWednesday", getTimetableWednesday)
router.get("/getTimetableThursday", getTimetableThursday)
router.get("/getTimetableFriday", getTimetableFriday)
router.get("/getTimetableSaturday", getTimetableSaturday)
router.get("/getTimetableSunday", getTimetableSunday)
module.exports = router;