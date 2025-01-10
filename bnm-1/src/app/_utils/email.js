const nodemailer = require('nodemailer');

export const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'mugisheloge@gmail.com',
        pass: 'kowiecfgkqxsobml  '
    }
});