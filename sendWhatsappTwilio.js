import twilio from "twilio"
import crypto from 'crypto-js';
const accountSid = 'AC3fac7bfb026f0fdfd3e5d430974891bd';
const authToken = '252ce718120788b3563bdd34db1e0b1d';  //twilio.com/console



var bytes = crypto.AES.decrypt("U2FsdGVkX1+9FTi1HIMC7qNkHXEEeAVWxU0+B7E0b1Y=", 'secret key 123');
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


