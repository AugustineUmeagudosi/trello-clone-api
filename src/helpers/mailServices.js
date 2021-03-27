const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');
require('dotenv').config();

let options = {
    viewEngine: {
        extName: '.hbs',
        partialsDir: './src/helpers/email-templates', // path to email templates are saved
        layoutsDir: '',
        defaultLayout: '',
    },
    viewPath: './src/helpers/email-templates', // path to email templates are saved
};

let transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    secure: true, // true for 465, false for other ports,
    pool: true,
    rateLimit: 20,
    auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD
    },
    //use the following lines if you are testing the endpoint offline
    tls:{
        rejectUnauthorized:false
    }
});
transporter.use('compile', hbs(options));

//email services
module.exports = {
    sendVerificationEmail: function (emails) {
        const email = emails;
        const data = {
            email: email, verifyUrl: `${process.env.FRONTEND_BASEURL}/verifyEmail/32489reijfsre97r8gsybfj`, 
            baseUrl: `${process.env.FRONTEND_BASEURL}`, mailBanner: `${process.env.MAIL_BANNER}`, mailLogo: `${process.env.LOGO}`,
            instagramIcon: `${process.env.INSTAGRAM_ICON}`, twitterIcon: `${process.env.TWITTER_ICON}`, 
            linkedinIcon: `${process.env.LINKEDIN_ICON}`, facebookIcon: `${process.env.FACEBOOK_ICON}`            
        };
        const subject = "Invitation to collaborate";
        const template = "emailVerification"; // name of template file
        module.exports.sendMail(email, subject, template, data);
    },

    //email sending service
    sendMail: function(to, subject, template, data) {
        let mailOptions = {
            from: `${process.env.MAIL_FROM_NAME} <${process.env.MAIL_FROM_ADDRESS}>`,
            to: to,
            replyTo: process.env.MAIL_USERNAME,
            subject: subject,
            template: template,
            context: data
        };
        // send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) return console.log(error);
            console.log('Mail sent: %s', info.messageId);
        });
    }
};