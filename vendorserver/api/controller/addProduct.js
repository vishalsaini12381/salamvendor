var Product = require('../../model/productSchema');
var User = require('../../model/vendorSchema');

var addProduct = ((req,res)=>{
    // console.log('request',req.body);
    // req.checkBody({
    //     'userId':{
    //         notEmpty : true,
    //         errorMessage : 'userId Can Not Be Blank'
    //     },
    //     'productName':{
    //         notEmpty : true,
    //         errorMessage : 'productName Can Not Be Blank'
    //     },
    //     'productPrice':{
    //         notEmpty : true,
    //         errorMessage : 'productPrice Can Not Be Blank'
    //     },
    //     'discount':{
    //         notEmpty : true,
    //         errorMessage : 'discount Can Not Be Blank'
    //     }, 
    //     'category':{
    //         notEmpty : true,
    //         errorMessage : 'category Can Not Be Blank'
    //     },
    //     'subCategory':{
    //         notEmpty : true,
    //         errorMessage : 'subCategory Can Not Be Blank'
    //     },
    //     'brandName':{
    //         notEmpty : true,
    //         errorMessage : 'brandName Can Not Be Blank'
    //     },
    //     'quantity':{
    //         notEmpty : true,
    //         errorMessage : 'quantity Can Not Be Blank'
    //     },
    //     'aboutProduct':{
    //         notEmpty : true,
    //         errorMessage : 'aboutProduct Can Not Be Blank'
    //     },
    // });
    // const errors = req.validationErrors();
    // if(errors){
    //     var errorMessage = [];
    //     errors.forEach((err)=>{
    //         errorMessage.push(err.msg);
    //     });
    //     return res.json({status: false, message: errorMessage[0], });
    // }else {
    try{

        var a = req.body.file;
        var m = a.indexOf('data:')
        var n = a.indexOf(';');
        var o = a.slice(m,n);
        var p = o.split('/')
        var arr = (["jpeg","jpg","png"]);
        // console.log('\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\',m,n,o,p)


        const product = new Product({
            userId : req.body.userId,
            file   : req.body.file,
            productName: req.body.productName,
            productPrice: req.body.productPrice,
            discount: req.body.discount,
            businesscategory : req.body.businesscategory,
            category:  req.body.category,
            subCategory: req.body.subCategory,
            brandName: req.body.brandName,
            quantity: req.body.quantity,
            aboutProduct: req.body.aboutProduct,
            createdAt: new Date(),
            updateAt: new Date().getTime()
        })
        User.findById({_id: req.body.userId}).then((user)=>{
            console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!',user.adminStatus);
            if(!user){
                return res.json({status: false, message: "User not Exist"})
            }
            if(user){  
             if(user.adminStatus !== 'null' && user.adminStatus !== 'Block'){           
            user.productId.push(product)
            user.save();
            if(arr.includes(p[1])){
            product.save(function(err,save){
               if(err){
               return res.json({status: false, message: "Error Occured"});
               }
               return res.json({
                status: true,
                message: 'Product is SuccessFully Saved',
                _id : save._id,
                file   : save.file,
                productName: save.productName,
                productPrice: save.productPrice,
                discount: save.discount,
                businesscategory : save.businesscategory,
                category:  save.category,
                subCategory: save.subCategory,
                brandName: save.brandName,
                quantity: save.quantity,
                aboutProduct : save.aboutProduct,
            });
           }) 
        }else{
            return res.json({status: false, message: 'File Type Not Match'})
        }
      }else{
          return res.json({status : false , message :"Not Verified By Admin"})
      }
    }
        })
    }catch(error)
    {
        console.log('.................',error);
        return res.json({status: false, message: "Something Went Wrong"})
    }
// }
});

module.exports = {addProduct};