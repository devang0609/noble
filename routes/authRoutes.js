const express = require("express");
const multer = require("multer");
const router = express.Router();
const db = require("../db/connection").db;
const {

    //  structure api
    getBoardbybranch,
    getMediumbybranchBoard,
    getStandardbyBrBoMd,
    getBatchbyBrBoMdSt,

    // batch
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

    //   Student
    getStudent,
    createStudent,
    editStudent,
    getStudentbyBrBoMdStBt,
    getEditStudent,
    deleteStudent,

    //   Student
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

    getStanderdbyBranch,

    // attendance
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

    //   StatusHomework
    getStatusHomework,
    createStatusHomework,
    editStatusHomework,
    getStatusHomeworkById,
    deleteStatusHomework,
    getHomeworkStatus,

    //exam marks
    createExamMarks,
    updateExamMarks,
    getExamMarks,
    getEditExamMarks,
    deleteExamMarks,
    getExamMarksReport,

    //   PTM
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

} = require("../controller/authController");

const imgconfig = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "./uploads");
    },
    filename: (req, file, callback) => {
        callback(null, `image-${Date.now()}.${file.originalname}`);
    },
});
const isImage = (req, file, callback) => {
    if (file.mimetype.startsWith("image")) {
        callback(null, true);
    } else {
        callback(new Error("Only image is allowed"));
    }
};
const upload = multer({
    storage: imgconfig,
    fileFilter: isImage,
});

const uploadnotice = multer({
    storage: imgconfig,
});

//  structure api
router.get('/boardbybr', getBoardbybranch)
router.get('/mediumbybrbo', getMediumbybranchBoard)
router.get('/standardbybrbomd', getStandardbyBrBoMd)
router.get('/batchbybrbomdst', getBatchbyBrBoMdSt)

//    batch
router.get('/batch', getBatch)
router.post('/createbatch', createBatch)
router.get("/batch/:id", getBatchById)
router.put("/batch/update/:id", editBatch)
router.delete("/batch/delete/:id", deleteBatch)


//      Branch
router.get('/branch', getBranch)
router.post('/createbranch', createBranch)
router.get("/branch/:id", getBranchById)
router.put("/branch/update/:id", editBranch)
router.delete("/branch/delete/:id", deleteBranch)

//      Homework Status
router.get('/statusHomework', getStatusHomework)
router.post('/createstatusHomework', createStatusHomework)
router.get("/statusHomework/:id", getStatusHomeworkById)
router.get('/homeworkstatus/:studentId', getHomeworkStatus);
router.put("/statusHomework/update/:id", editStatusHomework)
router.delete("/statusHomework/delete/:id", deleteStatusHomework)

//      Student
router.get('/student', getStudent)
router.post('/createstudent', upload.single("photo"), createStudent)
router.get("/student/:id", getEditStudent)
router.get("/getStudentbyBrBoMdStBt", getStudentbyBrBoMdStBt)
router.put("/student/update/:id", editStudent)
router.delete("/student/delete/:id", deleteStudent)

//      Inquiry
router.get('/inquiry', getInquiry)
router.post('/createinquiry', createInquiry)
router.get("/inquiry/:id", getEditInquiry)
router.put("/inquiry/update/:id", editInquiry)
router.delete("/inquiry/delete/:id", deleteInquiry)

//      Notice
router.get('/notice', getNotice)
router.post('/createnotice', uploadnotice.single("files"), createNotice)
router.get("/notice/:id", getNoticeById)
router.put("/notice/update/:id", editNotice)
router.delete("/notice/delete/:id", deleteNotice)

router.get('/getStanderdbyBranch', getStanderdbyBranch)

//      Attendance
router.get('/attendance', getAttendance)
router.get('/getWeeklyAttendance/:studentId', getWeeklyAttendance)
router.post('/createattendance', createAttendance)
router.get("/getedit/attendance/:id", getEditAttendance)
router.put("/attendance/update/:id", editAttendance)
router.delete("/attendance/delete/:id", deleteAttendance)

//      Assign HomeWork
router.get('/assignHomeWork', getAssignHomeWork)
router.post('/createAssignHomeWork', uploadnotice.single("files"), createAssignHomeWork)
router.get("/getedit/assignHomeWork/:id", getEditAssignHomeWork)
router.put("/assignHomeWork/update/:id", editAssignHomeWork)
router.delete("/assignHomeWork/delete/:id", deleteAssignHomeWork)
router.get("/getAssignHomeWorkbyBrBoMdStBt", getAssignHomeWorkbyBrBoMdStBt)

//      Add Exam
router.get('/addexam', getAddExam)
router.post('/createaddexam', uploadnotice.single("files"), createAddExam)
router.get("/getedit/addexam/:id", getEditAddExam)
router.put("/addexam/update/:id", editAddExam)
router.delete("/addexam/delete/:id", deleteAddExam)
router.get("/getExambyBrBoMdStSub", getExambyBrBoMdStSub)

//      ExamAttendance
router.get('/examattendance', getExamAttendance)
router.post('/createexamattendance', createExamAttendance)
router.get("/getedit/examattendance/:id", getEditExamAttendance)
router.put("/examattendance/update/:id", editExamAttendance)
router.delete("/examattendance/delete/:id", deleteExamAttendance)

//      ExamMarks
router.get('/exammarks', getExamMarks)
router.post('/createexammarks', createExamMarks)
router.get("/getedit/exammarks/:id/:id_student/:marks", getEditExamMarks);
router.get('/exammarksreport/:id', getExamMarksReport);
router.put("/exammarks/update/:id", updateExamMarks)
router.delete("/exammarks/delete/:id", deleteExamMarks)
router.get('/exammarksreport/:id', getExamMarksReport);
//      Fees
router.post("/create/fees", createFees)
router.get("/fees", getFees)
router.get("/totalfees", getFeesByAmount)
router.get("/getfees/:id", getFeesById)
router.put("/fees/update/:id", editFees)
router.delete("/fees/delete/:id", deleteFees)
//     PTM
router.get("/getptm", getPTM)
router.post("/createptm", createPTM)
router.get("/getbyidptm/:id", getEditPTM)
router.put("/editptm/:id", editPTM)
router.delete("/deleteptm/:id", deletePTM)

//    Conclusion
router.get("/getconclusion", getConclusion)
router.post("/createconclusion", createConclusion)
router.put("/editconclusion/:id", editConclusion)
router.get("/getbyidconclusion/:id", getEditConclusion)

module.exports = router;