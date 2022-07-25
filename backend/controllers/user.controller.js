const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../model/user.model')
const {verifySignUpData} = require('../utils/verify')

exports.postRegister = (req, res, next) => {
	const { username, password } = req.body;
	verifySignUpData(username,password)
		.then(()=>{
			User.findOne({username})
				.then((user)=>{
					if(user){
						return res.send({
							success:false,
							message:'Username already in use'
						})
					}
					bcrypt.hash(password, 10, function(err, hash) {
						if(err){
							return res.send({
								success:false,
								message:'An error occured'
							})
						}
						const newUser = new User({
							username,
							password:hash
						})
						newUser.save()
							.then((user)=>{
								if(!user){
									return res.send({
										success:false,
										message:'Unable to add new User'
									})
								}
	
								const token = jwt.sign({ id: user._id }, process.env.TOKEN_KEY, {
									expiresIn: "48h",
								});
	
								return res.send({
									success:true,
									message:'User registered in Successful',
									token
								})
							})
							.catch((err)=>{
								console.log(err)
							})
					});
				})
				.catch((err)=>{
					console.log(err)
				})
		})
		.catch((err)=>{
			return res.send({
				success:false,
				message:err
			})
		})
};

exports.postLogin = (req, res, next) => {
	const { username, password } = req.body;
	User.findOne({ username }).then((user) => {
		if (user) {
			bcrypt.compare(password, user.password, (err, result) => {
				if (!result) {
					return res.send({
						success: false,
						message: "Invalid password",
					});
				}
				
				const token = jwt.sign({ id: user._id }, process.env.TOKEN_KEY, {
					expiresIn: "48h",
				});

                return res.send({
                    success:true,
                    message:'User logged in Successful',
                    token
                })
			});
		} else {
			res.send({
				success: false,
				message: "Invalid username",
			});
		}
	});
};