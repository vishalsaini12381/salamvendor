var user = require('../../model/vendorSchema');
var bcrypt = require('bcryptjs');
var nodemailer = require('nodemailer');
var jwt = require('jsonwebtoken');
var JWTSECRET = 'shivendra123';

var transporter = nodemailer.createTransport({
    service : 'Gmail',
    auth : {
        user:  'shivendra.techgropse@gmail.com',
        pass: 'gropse@7117'
    }
});

var registerVendor = ((req,res)=>{

    req.checkBody({
        'name':{
            notEmpty : true,
            errorMessage : 'Name Can Not Be Blank'
        },
        'email' : {
            notEmpty : true,
            isEmail: {
                errorMessage: 'Invalid E-mail'
            },
            errorMessage: 'Email Can Not Be Blank'
        },
        'password' : {
            notEmpty : true,
            errorMessage: 'Password Can Not Be Blank'
        }
    });

    const errors = req.validationErrors();
    if(errors){
        var errorMessage = [];
        errors.forEach((err)=>{
            errorMessage.push(err.msg);
        });
        return res.json({status: false, message: errorMessage[0], });
    }else {

    try{
        user.findOne({email: req.body.email}).then((response)=>{
            if(response){
                return res.json({status: false, message: "The E-mail You Entered is already taken"});
            }

            var pass = bcrypt.hashSync(req.body.password);
            var otp = Math.floor(1000 + Math.random() * 9000);
            const type = req.body.type;
            var User = new user({
                accountType              : type,
                name                     : req.body.name,
                email                    : req.body.email,
                password                 : pass,
                createdAt                : new Date(),
                'status.activeEmailToken': otp
            });

            const mailOptions = {
                from    : "shivendra.techgropse@gmail.com",
                to      : req.body.email,
                subject : 'Account Activation | Salamtrade',
                html    : `<body>
                           <h1>Hello ${req.body.email} </h1>
                           <h2><a title = "Reset" href = "http://localhost:3200/api/activate/${otp}/${type}">Click here to verify your account </a> </h2>
                           </body>`
            };
            transporter.sendMail(mailOptions, function(err,info){
                console.log('errrrrrrrrrrrr',err);
                if(err){
                    return res.json({status: false, message: "'Network Error. Unable to send email currently'"});
                }else{
                    User.save((err,saved)=>{
                        console.log('3333333333333333',saved);
                        if(err){
                            return res.json({status: false, message: "Error Registering the user details"});
                        }else{
                            return res.json({status: true, message: "User SuccessFully saved, Please verify Your Account Link Sent on Your given E-mail Address"});
                        }
                    })
                }
            })
            
        })
    }catch(error){
        return res.json({status : false, message : "Some Error Occured"});
    }
};
});

var verifyEmail = ((req,res)=>{
    const Token = req.params.token;
    var Account = req.params.type;
    console.log('111111111111111111111111111',)
    try{
        if(Account === 'Vendor'){
            if(!Token)
             return res.json({status: false, message:"There is something wrong with the verification.Please retry."});
             user.findOne({$and:[{'status.activeEmailToken': Token},{accountType: Account}]},function(err,vendor){
                 console.log('vendorrrrrrr',vendor);
                if(err){
                    return res.json({status: false, message:"Error, Please try again"});
                }
                if(!vendor){
                    return res.json({status: false, message: "Error! Account already activated"});
                }else{
                    vendor.status.activeEmail      = true;
                    vendor.status.activeEmailToken = null;

                    vendor.save((err,saved)=>{
                        if(err){
                            return res.json({status: false, message: "Something went wrong"});
                        }
                        if(!saved){
                            return res.json({status: false, message: "Please try again"});
                        }
                        return res.redirect('http://localhost:3000');
                })
            }
        })
    }

    }catch(error){
        return res.json({status: false, message: "Some Error Occured"});
    }
})

var loginVendor = ((req,res)=>{
    req.checkBody({
        'email' : {
            notEmpty : true,
            isEmail: {
                errorMessage: 'Invalid E-mail'
            },
            errorMessage: 'Email Can Not Be Blank'
        },
        'password' : {
            notEmpty : true,
            errorMessage: 'Password Can Not Be Blank'
        }
    });
    const errors = req.validationErrors();
    if(errors){
        var errorMessage = [];
        errors.forEach((err)=>{
            errorMessage.push(err.msg);
        });
        return  res.json({status: false, message: errorMessage[0]});
    }else{
    var log = {
        email    : req.body.email,
        password : req.body.password
    }
    try{
        if(req.body.type === 'Vendor'){
            user.findOne({$and:[{email: log.email},{accountType:req.body.type}]}).then(async(doc)=>{
             console.log('22222222222222222222',doc);
            if(!doc){
                return res.json({status: false, message: "User not Exist"})
            }
            if(doc){
                if(doc.status.activeEmail == true){
                    if(doc.adminStatus == 'Block'){
                        return res.json({status: false , message :'Block By Admin Side' })
                }else{
                if(await bcrypt.compare(req.body.password,doc.password)){
                    const token = jwt.sign({_id: doc._id},JWTSECRET);
                    console.log('token',token);
                    return res.json({
                        status      : true, 
                        message     : "Login SuccessFully",
                        token       : token,
                        name        : doc.name,
                        email       : doc.email,
                        id          : doc._id,
                        accountType : doc.accountType,
                        mobile      : doc.mobile,
                        storeEmail  : doc.storeEmail,
                        storeMobile : doc.storeMobile,
                        storeName   : doc.storeName,
                        streetName  : doc.streetName,
                        location    : doc.location,
                        zipCode     : doc.zipCode,
                        city        : doc.city,
                        image       : doc.image,
                        // productId   : doc.productId
                    })
                }else{
                    return res.json({status: false, message: "Incorrect Password"});
                }
            }
            // }else{
            //     return res.json({status : false , message : 'Block By Admin Side'});
            // }
            }else{
                return res.json({status: false, message: "Please Activate your account First"});
            }
            }else{
                return res.json({status: false, message: "Email or Password Incorrect"});
            }
         })
        }
    }catch(error){
        return res.json({status: true, message:"Some Error Occured"});
    }
}
})

var forgetPassword = ((req,res)=>{
    console.log('req.body',req.body);
    req.checkBody({
        'email' : {
            notEmpty : true,
            isEmail: {
                errorMessage: 'Invalid E-mail'
            },
            errorMessage: 'Email Can Not Be Blank'
        }
    });

    const errors = req.validationErrors();
    if(errors){
        var errorMessage = [];
        errors.forEach((err)=>{
            errorMessage.push(err.msg);
        });
        return res.json({status: false, message: errorMessage[0]});
    }else{
    
    var otp             = Math.floor(1000 + Math.random() * 9000);
    var email           = req.body.email;
    var resetPassToken  = otp;
    try {
        if(!email || email == null || email == '') return res.json({status: false, message: "Please enter the valid E-mail Address"});
        user.findOne({email: email},function(err,vendor){
            console.log('errrreererererere',vendor);
            if(err) return res.json({status: false, message: "Oops Error Occured"});
            
            if(!vendor || vendor == null || vendor == "") return res.json({status: false, message:"User does not exist"})
            if(vendor.status.activeEmail == false){
                return res.json({status: false , message: "Please activate first, using the link sent to your email address"})
            }else {
                var mailOptions = {
                    from    : "shivendra.techgropse@gmail.com",
                    to      : req.body.email,
                    subject : 'Forget Password | Salamtrade',
                    html    : `<body>
                               <h1>Hello ${req.body.email}</h1>
                               <h2>This is your OTP to reset password: ${otp}.  <a title = "Reset" href = "http://localhost:3200/api/verifyResetPassword/${resetPassToken}/">Click here to Reset Password </a> </h2>
                              </body>`

                };
                transporter.sendMail(mailOptions, function(err,info){
                    if(err){
                        return res.json({status: false, message: "Network Error"})
                    }
                    else {
                        vendor.status.resetPassToken = resetPassToken;

                        vendor.save(async(err,saved)=>{
                            if(err){
                                return res.json({status: false, message: "Error. Please try again"})
                            }
                            if(await saved && saved !== null){
                                return res.json({status: true, message: "Otp Sent On registered Email id"})
                            }else{
                                return res.json({status: false, message: "Please Try Again"})
                            }
                        })
                    }
                })
            }
        })
    }catch(error){
        return res.json({status: false, message:"Some Error Occured"});
    }
}
})

var  verifyResetPassword = ((req,res)=>{
    const Token = req.params.token;
    try{
        if(!Token || Token == null || Token == undefined){
            return res.json({status: false,message: "Something Went Wrong Please Please retry sending the reset link."});
        }
        user.findOne({'status.resetPassToken': Token},function(err,vendor){
            if(err) return res.json({status: false,message: "Error! Please Try Again"});

            if(!vendor){
                return res.json({status: false, message: "Error. Try resetting again and then find the email for activation"});
            }else{
                vendor.save((err,saved)=>{
                    if(err){
                        return res.json({status: false, message: "Something Went Wrong"})
                    }
                    if(!saved){
                        return res.json({status: false, message: "Please Try Again"});
                    }
                    return res.redirect('http://localhost:3000/Changepassword');
                })
            }
        })
    }catch(error){
        return res.json({status: false, message: "Some Error Occured"});
    }
})

var saveNewPassword = ((req,res)=>{
    req.checkBody({
        'password' : {
            notEmpty : true,
            errorMessage: 'Password Can Not Be Blank'
        }
    });

    const errors = req.validationErrors();
    if(errors){
        var errorMessage = [];
        errors.forEach((err)=>{
            errorMessage.push(err.msg);
        });
        return res.json({status: false, message: errorMessage[0]})
    }else{

    var password       = req.body.password;
    var resetPassToken = req.body.otp;
    try{
        if(!password || password === null || password === "") return res.json({status: false, message:"Enter Password"})
        user.findOne({'status.resetPassToken': resetPassToken},async(err,vendor)=>{
           console.log('vendorrrrrrrrrrrrrrrrrrrrrrr',vendor);
           if (err) return res.json({status: false, message: "Error! Please Try Again"})
           if(vendor){
               req.body.password = bcrypt.hashSync(req.body.password,10);
               if(await bcrypt.compare(req.body.password,vendor.password)){
               return res.json({status: false, message: "CanNot Set The Old Password"});
           }
           else {
               vendor.password              = req.body.password;
               vendor.status.resetPassToken = null;

               vendor.save((err,saved)=>{
                   if(err){
                       return res.json({status: false, message: "Error While saving the new Password Please Try Again"})
                   }
                   if(saved){
                       return res.json({status: true, message: "SuccessFully Password changed"});
                   }
               })
           }
        }else{
            return res.json({status: false, message: "Enter Correct Otp"})
        }
       })
    }catch(error){
        return res.json({status: false, message: "Some Error Occured"});
    }
}
})

var fetchUser = ((req,res)=>{
    try{
        user.findOne({email: req.body.email}).then((doc)=>{
            console.log('........................',doc.image);
            if(doc){
                if(doc.status.activeEmail == true){
                    return res.json({
                        status      : true,
                        message     : '',
                        email       : doc.email,
                        image       : doc.image,
                        name        : doc.name,
                        mobile      : doc.mobile,
                        storeName   : doc.storeName,
                        storeEmail  : doc.storeEmail,
                        storeMobile : doc.storeMobile,
                        streetName  : doc.streetName,
                        location    : doc.location,
                        zipCode     : doc.zipCode,
                        city        : doc.city,
                        accountType : doc.accountType,
                        file        : doc.file,
                        id          : doc._id
                    })
                }
            }
        })
    }catch(error){
        return res.json({status: false, message: "Something Went Wrong"});
    }
})

var logOut = ((req,res)=>{
    try{
        res.clearCookie('jwtToken');
        return res.json({
            status : true,
            message: "Logout SuccessFully"
        })
    }catch(error){
        return res.json({status: false, message: "Something Went Wrong"});
    }
})

module.exports = {registerVendor,loginVendor,verifyEmail,forgetPassword,verifyResetPassword,saveNewPassword,fetchUser,logOut};