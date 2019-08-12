var category = require('../../../model/categoryModel');


var fetchCategory = ((req,res)=>{
    try{
        category.find({})
        .then((category)=>{
            console.log('DDDDDDDDDDDDDDDD',category);
            if(category){
                return res.json({status : true, message: '' , category})
            }else{
                return res.json({status: false , message: 'Category Not Found'});
            }
        })
    }catch(error){
        return res.json({status: false, message: 'SomeThing Went Wrong'})
    }
})



module.exports = {fetchCategory};