// Import the required modules
const express = require("express")
const router = express.Router()
const { isDemo } = require("../middlewares/demo")


const { capturePayment, verifyPayment, sendPaymentSuccessEmail } = require("../controllers/Payments")
const { auth, isInstructor, isStudent, isAdmin } = require("../middlewares/auth")
router.post("/capturePayment", auth,isDemo, isStudent, capturePayment)
router.post("/verifyPayment",auth, verifyPayment)
router.post("/sendPaymentSuccessEmail", auth, sendPaymentSuccessEmail)

module.exports = router;