let config;

console.log(process.env.NODE_ENV);

if (process.env.NODE_ENV === 'development') {
    config = {
        twilio_sid: process.env.TWILIO_SID,
        twilio_token: process.env.TWILIO_AUTH_TOKEN,
        twilio_phone: process.env.TWILIO_PHONE_NUMBER,
        my_phone: process.env.MY_PHONE_NUMBER
    }
} else {
    config = {
        twilio_sid: process.env.TWILIO_SID,
        twilio_token: process.env.TWILIO_AUTH_TOKEN,
        twilio_phone: process.env.TWILIO_PHONE_NUMBER,
        my_phone: process.env.MY_PHONE_NUMBER
    }
}
console.log(config)


export default config;