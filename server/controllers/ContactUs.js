const mailSender = require("../utils/mailSender");
const ContactFormRes = require("../mail/templates/ContactFormRes")



exports.contactUs = async (req, res) => {
    const { firstName, lastName, email, message, phoneNo } = req.body;
    if (!firstName || !email || !message) {
        return res.status(403).send({
            success: false,
            message: "All Fields are required",
        });
    }
    try {
        const data={
            firstName,
            lastName: `${lastName ? lastName : "null"}`,
            email,
            message,
            phoneNo: `${phoneNo ? phoneNo : "null"}`,
        }
        
        const temp = ContactFormRes.ContactFormRes(email,
            firstName,
            lastName,
            message,
            phoneNo)

            
        const info = await mailSender("jigargokani100@gmail.com","binit",temp)    
        if(info){
            return res.status(200).send({
                success: true,
                message: "Your message has been sent successfully",
            });
        }
        else{
            return res.status(403).send({
                success: false,
                message: "Something went wrong",
            });
        }
    } catch (error) {
        return res.status(403).send({
            success: false,
            message: "Something went wrong",
        });
    }
};