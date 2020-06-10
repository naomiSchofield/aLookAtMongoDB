const express = require('express');
const hbs = require('express-handlebars');
const path = require('path');
const app = express();
const bodyParser = require ('body-parser')
const mongoose = require ('mongoose')
const userRouter  = require('./routes/user')

require('dotenv').config()

mongoose.connect(`mongodb+srv://NaomiSchofield:${process.env.password}@cluster0-c1rm4.mongodb.net/users?retryWrites=true&w=majority`, {useNewUrlParser: true, useUnifiedTopology: true})


app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'public')));

app.engine('.hbs', hbs({
    defaultLayout: 'layout',
    extname: 'hbs'
}));

app.set('view engine', '.hbs');


app.use('/', userRouter)

app.listen(3000, () => {
    console.log('listening on port 3000');
});


