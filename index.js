const express= require('express');
const bodyParser = require('body-parser');
const exphbs= require('express-handlebars');
const path= require('path');
const nodemailer= require('nodemailer');

const app= express();

//app.engine('handlebars', exphbs());
//app.set('view engine','handlebars');

//app.use('/public', express.static(path.join(__dirname,'public')));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res)=>
{
  res.render('contact');
});

app.post('/send',(req,res) => {
const emails= emailArraytoString(req.body.emails);
//const emails= req.body.emails;
const output=`<p>There is an emergency in your area</p>
<h3>Contact Details:</h3>
<ul>
<li>Name: ${req.body.name}</li>
<li>Address: ${req.body.company}</li>
<li>Email: ${req.body.email}</li>
<li>Phone: ${req.body.phone}</li>
</ul>
<h3>Message:</h3>
<p>${req.body.message}</p>`;
let transporter = nodemailer.createTransport({
  host: 'smtp.zoho.in',
  port: 465,
  secure: true, 
  auth: {
    user: 'succourance@zohomail.in', 
    pass: 'wSmuSM@eY8XTtzw', 
  },
  tls:{
    rejectUnautorized:false
  }
});

function emailArraytoString(emailArray)
{
  var emails="";

  for (i = 0; i < emailArray.length; i++) {
    emails += emailArray[i] + ",";
  }
  return emails
}

let mailOptions = {
  from: '"NodeMailer Contact" <succourance@zohomail.in>', 
  to: emails , //
  subject: "Emergency SOS", 
  text: "Hello world?", 
  html: output, 
};

transporter.sendMail(mailOptions, (error,info)=>{
  if(error){
    return console.log(error);
  }
console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
console.log("Message sent: %s", info.messageId);
 message= ('contact',{msg:'email has been sent'});
res.render('contact',{msg:'email has been sent'});
return message;
});
});
app.listen(3000, () => console.log('Server Started'));