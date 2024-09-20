import twilio from "twilio"
import crypto from 'crypto-js';
import { config } from 'dotenv'
config()


const accountSid = process.env.TWILIO_ACC_SID;
const authToken = process.env.TWILIO_AUTH;  //twilio.com/console



var bytes = crypto.AES.decrypt("U2FsdGVkX1+9FTi1HIMC7qNkHXEEeAVWxU0+B7E0b1Y=", process.env.TWILIO_SECRET_KEY);
var mymbNo = bytes.toString(crypto.enc.Utf8);








export default async function sendWhatsAppMessage(body) {
    let client = twilio(accountSid, authToken)
    client.messages
        .create({
            body: body,
            from: 'whatsapp:+14155238886',
            to: `whatsapp:${mymbNo}`
        })
        .then(message => console.log(message.sid))
}
