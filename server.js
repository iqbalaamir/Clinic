var expr = require('express');
const hbs = require('hbs');
const _ = require('lodash');
const fs = require('fs');

var app = expr();

const port = process.env.PORT || 3000;

hbs.registerPartials(__dirname + '/views/partials')

app.use((req, res, next) => {
    console.log("Running" + new Date().getDate());
    next();
})

app.use((req, res, next) => {
    var log = `${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('somefile.log', log + '\n', (err) => {
        if (err) {
            console.log("Some Issue");
        }
    });
    next();
})


app.get('/', (req, res) => {

    res.render('index.hbs');
});

app.get('/doc', (req, res) => {
    res.render('doc.hbs', {

        d_name1: 'Dr.Witmore',
        p_name1: 'Jenna,Elena,Jeremy',
        date: '10 Jun 2020',
        time: '12:00 AM-2:00 AM',
        disease1: 'Heart disease',
        address1: 'Mystic Fall',
        d_name2: 'Dr.Gilbert',
        p_name2: 'Alaric,Damon,Tyler',
        address2: 'Orelands',
        disease2: 'Joint Pain'
    });

});

app.get('/about', (req, res) => {
    res.render('about.hbs');
});

app.get('/cancel', (req, res) => {
    res.render('cancel.hbs');
});

// app.get('/update', (req, res) => {
//     res.render('update.hbs');
// });

app.get('*', (req, res) => {
    res.send("<br><center><h1>OOPS!!! Something Wrong happened</h1><center>")
})

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});