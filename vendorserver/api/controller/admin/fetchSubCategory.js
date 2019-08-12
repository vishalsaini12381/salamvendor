var subCategory = require('../../../model//subCategoryModel');

var fetchsubCategory = ((req,res)=>{
    try{
        subCategory.find({})
        .populate('businessId','businesscategory')
        .populate('categoryId','category')
        .then((subcategory)=>{
            console.log('DDDDDDDDDDDDDDDD',subcategory);
            if(subcategory){
                return res.json({status : true, message: '' , subcategory})
            }else{
                return res.json({status: false , message: 'Category Not Found'});
            }
        })
    }catch(error){
        return res.json({status: false, message: 'SomeThing Went Wrong'})
    }
})

module.exports = {fetchsubCategory};