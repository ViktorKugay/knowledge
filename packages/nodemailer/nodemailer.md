# Nodemailer

```javascript
import nodemailer from 'nodemailer';

let transport = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  auth: {
    user: '',
    pass: '',
  },
});

const message = {
  from: '', // Sender address
  to: '', // List of recipients
  subject: 'Design Your Model S | Tesla', // Subject line
  text: 'Have the most fun you can in a car. Get your Tesla today!', // Plain text body
};

transport.sendMail(message, function(err, info) {
  if (err) {
    console.log(err);
  } else {
    console.log(info);
  }
});
```
