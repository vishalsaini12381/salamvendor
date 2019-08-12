var express = require('express');
var router = express.Router();

var multer = require('multer');
var path = require('path');
var jwt = require('jsonwebtoken');
var JWTSECRET = 'shivendra123';
var Vendor = require('../api/controller/commonVendor');
var Product = require('../api/controller/addProduct');
var ClientProfile = require('../api/controller/clientProfile');
var uploadPic = require('../api/controller/profilePic');
var FetchProduct = require('../api/controller/fetchProduct')
var User = require('../model/vendorSchema');
var Brand = require('../api/controller/admin/fetchBrand');
var Business = require('../api/controller/admin/fetchBusinessCategory');
var Category = require('../api/controller/admin/fetchCagtegory');
var SubCategory = require('../api/controller/admin/fetchSubCategory');




var storage = multer.diskStorage({
  destination : './public/uploads',
  filename    :  function(req,file,cb){
    console.log('JJJJJJJJJJJJ',file);
    cb(null, file.fieldname + '_' + Date.now()+path.extname(file.originalname));
  }
});

const fileFilter = (req,file,cb)=>{
  console.log('||||||||||||',file);
  if(file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
    cb(null,true);
  }else{
    cb(new Error ('Not support file Format'),false)
  }
}

var upload = multer({storage: storage,
limits: {
  fieldSize : 1024 * 1024 * 5,
},
fileFilter: fileFilter
})

var verifyTokenAPII=function(req,res,next){
  console.log('qqqqq',req.cookies.jwtToken[0]);
  if(req.cookies.jwtToken){
     token = req.cookies.jwtToken[0];
    console.log('ssss',token);
      // tokenStatus	=req.cookies.jwtToken[1];
      jwt.verify(token,JWTSECRET, function(err, decoded) {
        console.log('wwwwww',decoded);
        if (err)return res.redirect('/');
          User.findOne({_id: decoded.id}).then(function(res){
            console.log('ssss',user.findOne,res);
            if(res==null || res=='')return res.redirect('/');
            console.log('35521',res)
            if(res){
              req.currentUser = res;
              console.log('current',res);
              return next();
            }
          }).catch(function(err){
            return res.redirect('/');
          });
      });
    
  }else {
    return res.redirect('/');
  }
};

/* GET users listing. */
router.post('/Signup',Vendor.registerVendor);
router.post('/Login', Vendor.loginVendor);
router.get('/activate/:token/:type',Vendor.verifyEmail);
router.post('/resetPassword', Vendor.forgetPassword);
router.get('/verifyResetPassword/:token',Vendor.verifyResetPassword);
router.post('/SavePassword',Vendor.saveNewPassword);
router.post('/fetchUser',Vendor.fetchUser);
router.get('/logOut',Vendor.logOut);
router.post('/clientProfile',ClientProfile.clientProfile);
router.post('/profilePic',upload.single("myImage"),uploadPic);
router.post('/addProduct',Product.addProduct);
router.post('/fetchProduct',FetchProduct.fetchProduct);
router.post('/fetchProductList',FetchProduct.fetchProductList);
router.post('/deleteProduct',FetchProduct.deleteProduct);
router.post('/editProduct',FetchProduct.editProduct);
router.post('/fetchBrand',Brand.fetchBrands);
router.post('/fetchBusiness',Business.fetchBusinessCategory);
router.post('/fetchCategory',Category.fetchCategory);
router.post('/fetchsubCategory',SubCategory.fetchsubCategory);



module.exports = router;
