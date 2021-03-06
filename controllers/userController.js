const User = require ('./models/userModel')

exports.getSignup = async (req, res) => {
    res.render('index');
  };


  exports.postSignup = async(req, res) => {
	if (!req.body.userName || !req.body.email || !req.body.password) {
		res.render('signup', {err: "Please provide all credentials"});
		return;
	}
	const user = new User({
		userName: req.body.userName,
		email: req.body.email,
		password: req.body.password
	});
	let isDuplicate = false;
	await user.save().catch((reason) => {
		res.render('signup', {err: "A user with this user name or password already exists"});
		isDuplicate = true;
		return;
	});
	if (isDuplicate) {
		return
	}
	res.redirect(`/profile/?userName=${req.body.userName}`);
};

exports.getLogin = async (req, res) => {

    res.render ('login')
}

exports.postLogin =  async (req, res) => {
    let user = await User.findOne({userName: req.body.userName})
    let password = await User.findOne({password: req.body.password})
    console.log(req.body.userName)
    console.log(req.body.password)
    // console.log(User.findOne({userName: req.body.userName}))

    if (!req.body.userName || !req.body.password) {
        let err = "Please provide all credentials"
        res.render('login', {err: "Please provide all credentials"})
        console.log(err);
        return
    }

   else if (user == null){
        res.render('login', {err: "that user name does not exist"})
        let err = "user doesn't exist "
        console.log(err);
        return 

    }   


    // else if (user.password == req.body.password) {
    //     res.render('profile', {user: user.toObject})
    // return
    // }
     // res.render('login', {err: the entered password is incorrect})

   else if (password == null) {
    res.render('login', {err: "that password does not exist "})
    let err = "password doesn't exist"
    console.log(err);
    return 
}

else  	res.redirect(`/profile/?userName=${req.body.userName}`);

}

exports.getProfile = async(req, res) => {
	let user = await User.findOne({userName: req.query.userName});
    
    if (user == null) {
		res.render('profile', {err: "that user doesn't exist"});
		return;
	}

    res.render('profile', {user: user.toObject()});
};
