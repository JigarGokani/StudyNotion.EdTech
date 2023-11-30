const Razorpay = require("razorpay");


exports.instance = new Razorpay({
    key_id: "rzp_test_JG9At7fX4KlVrf",
    key_secret: process.env.RAZORPAY_SECRET,
});