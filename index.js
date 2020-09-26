// This is a simple nodejs website using handlebars for templating

const express = require('express');
const app = express();

//path variable for working with local directories
var path = require('path');

//Use the envioremt's port variable otherwise use port 8081
const port = process.env.port || 8081;

//Tells express to serve static files from the public directory
app.use(express.static(path.join(__dirname, '/public')));

// response to: URL/ . Renders home view with index layout
app.get('/', (req, res) => {
	
	res.render('home' , {layout: 'index'});
});

// response to: URL/portfolio . Renders portfolio view with index layout
app.get('/portfolio', (req, res) => {
	
	res.render('portfolio' , {layout: 'index'});
});

// response to: URL/contact . Renders contact view with index layout
app.get('/contact', (req, res) => {
	
	res.render('contact' , {layout: 'index'});
});

//app listens on port variable
app.listen( port, () => console.log(`Online at port ${port}`));