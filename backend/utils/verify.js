exports.verifySignUpData = (username, password) => {
	return new Promise((resolve, reject) => {
		if(!username || typeof username != 'string'){
            reject('Invalid Username...!')
        }
        if(username.length < 5){
            reject('Username must be include at least 6 charactors')
        }
        if(!password || typeof password != 'string'){
            reject('Invalid Password...!')
        }
        if(password.length < 5){
            reject('Password must be include at least 6 charactors')
        }
		resolve();
	});
};
