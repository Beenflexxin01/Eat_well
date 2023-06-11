//Built in server side.
const path = require('path')
//Third party installed server.
const express = require('express');  //install express
const app = express();


//Self generated server.
const defaultRoutes = require('./routes/default');
const restaurantRoutes = require('./routes/browse');

//Serving CSS files 
app.use(express.static('public'))
app.use(express.urlencoded({ extended: false }));

app.use('/', defaultRoutes);
app.use('/', restaurantRoutes);

//Serving HTML filles with Node & Express
app.set('views', path.join(__dirname, 'HTML'));
app.set('view engine', 'ejs'); // Install ejs first.


//To make the form active

app.use(function (req, res) {
    res.status(404).render('404');
});

app.use(function (error, req, res, next) {
    res.status(500).render('500');
})

app.listen(3000);