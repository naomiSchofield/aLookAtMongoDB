const express = require('express');
const hbs = require('express-handlebars');
const path = require('path');
const app = express();
const bodyParser = require ('body-parser')
const mongoose = require ('mongoose')
const User = require ('./models/userModel')

mongoose.connect(`mongodb+srv://NaomiSchofield:I3AnAAx9HvOwtzwf@cluster0-c1rm4.mongodb.net/users?retryWrites=true&w=majority`, {useNewUrlParser: true, useUnifiedTopology: true});
// mongoose.connect(`mongodb+srv://NaomiSchofield:${process.env.password}@cluster0-c1rm4.mongodb.net/users?retryWrites=true&w=majority`, {useNewUrlParser: true, useUnifiedTopology: true});


app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'public')));

app.engine('.hbs', hbs({
    defaultLayout: 'layout',
    extname: 'hbs'
}));

app.set('view engine', '.hbs');


app.get('/', async (req, res) => {
    res.render('index');
  });
  

app.get('/signUp', async (req, res) => {
    res.render ('signUp')
})
app.post ('/signUp', async (req, res) => {

    // let {userName, email, password} = req.body ----> use this if you are going to use the saved information again. 

    let user = new User({
        userName: req.body.userName,
        email: req.body.email,
        password: req.body.password,
    })
    
   await user.save()
   res.redirect(`/profile/?userName=${req.body.userName}`);
    

})


app.get('/profile', async(req, res) => {
	let user = await User.findOne({userName: req.query.userName});
    
    res.render('profile', {user: user.toObject()});
});

app.listen(3000, () => {
    console.log('listening on port 3000');
});





//const Port = process.env.port || 3000 

// app.get('/login', async (req, res) => {
//     res.render ('login')
// })

// app.post ('/login', async (req, res) => {
//     let user = await User.findOne ({
//         userName: req.query.userName
//     })

//     console.log(req.body.email)
//     console.log(req.body.password)
//     res.render('login', user)

// })

// app.get('/profile', async (req, res) => {
//     res.render ('profile', {userName: req.query.userName}) 
// })
