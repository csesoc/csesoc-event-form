const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');


const port = 3001;
const app = express();
app.use(bodyParser.json());

app.get('/users', (req, res) => {
	res.json([{id: 0, name: "poopy"}, {id: 1, name: "melon"}]);
});

app.post('/api/send-emails/', (req, res) => {
	let transporter  = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: 'events.form@csesoc.org.au',
			pass: 'ninety9.60'
		},
	});

	console.log(req.body)
	req.body.forEach(element => {
		let mailOptions = {
			from: 'CSESoc Events <events.form@csesoc.org.au>',
			to: element.recipient,
			subject: element.subject,
			html: element.html 
		};
		
		transporter.sendMail(mailOptions, (err, info) => {
			if (err) {
				console.log(err);
			} else {
				console.log(info); 
			}
		});
	})
	res.send("emails sent successfully");
});

app.listen(port, () => console.log(`server started on port ${port}`));