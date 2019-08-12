import React from 'react';
import ReactDOM from 'react-dom';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
// import action from '../action/action';
import validator from 'validator';
import axios from 'axios';
import swal from 'sweetalert';
import './addnewproductpage.css';
import { access } from 'fs';
import action from '../action/action';
class Addnewproductpage extends React.Component{
  constructor(props){
    super(props);
    this.state = {
          businesscategory : {value: '', isValidate: true, message:''},
          category     : {value: '', isValidate: true, message:''},
          subCategory  : {value: '', isValidate: true, message: ''},
          productName  : {value: '', isValidate: true, message: ''},
          brandName    : {value: '', isValidate: true, message: ''},
          productPrice : {value: '', isValidate: true, message: ''},
          quantity     : {value: '', isValidate: true, message: ''},
          discount     : {value: '', isValidate: true, message: ''},
          aboutProduct : {value: '', isValidate: true, message: ''},
          file         : '',
          brandList : [],
          businessList : [],
          categoryList : [],
          subCategoryList : [],

    }
    this.handleChange = this.handleChange.bind(this);
    this.submit       = this.submit.bind(this);
    this.handleChageImage = this.handleChageImage.bind(this);
    this.fetchBrand = this.fetchBrand.bind(this);
    this.fetchBusinessCategory = this.fetchBusinessCategory.bind(this);
    this.fetchCategory = this.fetchCategory.bind(this);
    this.fetchSubCategory = this.fetchSubCategory.bind(this);
  }

  handleChange(event){
    const{name,value} = event.target;
    let state = this.state;
    state[name].message = '';
    state[name].value = value;
    this.setState(state);
  }

  handleChageImage(e){
    e.preventDefault();
    var aa = '';
    let reader = new FileReader();
    let data = e.target.files[0];
    reader.readAsDataURL(data);
    reader.onloadend = ()=>{
      aa = reader.result;
      this.setState({file: aa})
    }
  }  

  validate(){
    let state = this.state;

    if(validator.isEmpty(state.businesscategory.value)){
      state.businesscategory.isValidate = false;
      state.businesscategory.message = 'Please Select The Category';
      this.setState(state);
      return false;
    }

    if(validator.isEmpty(state.category.value)){
      state.category.isValidate = false;
      state.category.message = 'Please Select The Category';
      this.setState(state);
      return false;
    }
    if(validator.isEmpty(state.subCategory.value)){
      state.subCategory.isValidate = false;
      state.subCategory.message = 'Please Select The SUB-Category';
      this.setState(state);
      return false;
    }
    if(validator.isEmpty(state.productName.value)){
      state.productName.isValidate = false;
      state.productName.message = 'Please Fill The Product Name';
      this.setState(state);
      return false;
    }
      if (!state.productName.value.match(/^[A-Za-z ]+$/)) {
        state.productName.isValidate = false;
        state.productName.message = "Must Be Letters";
        this.setState(state);
        return false;
      }
  
    if(validator.isEmpty(state.brandName.value)){
      state.brandName.isValidate = false;
      state.brandName.message = "Please Fill The Brand Name";
      this.setState(state);
      return false;
    }
    if(!validator.isEmpty(state.productPrice.value)){
      if(!validator.isNumeric(state.productPrice.value)){
      state.productPrice.isValidate = false;
      state.productPrice.message = "Must Be A Number";
      this.setState(state);
      return false;
      }
    }else{
      state.productPrice.isValidate = false;
      state.productPrice.message = 'Please Fill The Price'
      this.setState(state);
      return false;
    }

    if(!validator.isEmpty(state.quantity.value)){
      if(!validator.isNumeric(state.quantity.value)){
      state.quantity.isValidate = false;
      state.quantity.message = "Must Be A Number";
      this.setState(state);
      return false;
    }
  }else{
    state.quantity.isValidate = false;
    state.quantity.message = 'Please Fill The Quantity Of Product';
    this.setState(state);
    return false;
  }
    if(!validator.isEmpty(state.discount.value)){
      if(!validator.isNumeric(state.discount.value)){
      state.discount.isValidate = false;
      state.discount.message = "Must Be a Number";
      this.setState(state);
      return false;
    }
  }else{
    state.discount.isValidate = false;
    state.discount.message = 'Please Fill The Discount Rate';
    this.setState(state);
    return false;
  }
    if(!validator.isEmpty(state.aboutProduct.value)) {
      if(!validator.isLength(state.aboutProduct.value, 100, 1000)){
      state.aboutProduct.isValidate = false;
      state.aboutProduct.message = 'Description must be of 100- 1000 characters'
      this.setState(state);
       return false;
      }
      // return false;

   }else{
      state.aboutProduct.isValidate = false;
      state.aboutProduct.message = 'Job Description cannot be blank'
      this.setState(state);
      return false;
   }
    return true;
  }


//   onChange(e){
//     const re = /^[0-9]+$/;

//     // if value is not blank, then test the regex

//     if (e.target.value === '' || re.test(e.target.value)) {
//       // this.setState({productName: e.target.value})
//       console.log('hello',e.target.value)
//       this.setState({productName:'shiv'});
//     }
// }


componentWillMount(){
  this.fetchBrand();
  this.fetchBusinessCategory(); 
  this.fetchCategory();
  this.fetchSubCategory();
}

fetchBrand(){
  axios.post('http://localhost:3200/api/fetchBrand').then((response)=>{
    console.log('BrandResponse',response.data.doc);
    this.setState({
      brandList :  response.data.doc
    })
  })
}

fetchBusinessCategory(){
  axios.post('http://localhost:3200/api/fetchBusiness').then((response)=>{
    console.log('BusinessResponse',response.data.doc);
    this.setState({
      businessList :  response.data.doc
    })
  })
}

fetchCategory(){
  axios.post('http://localhost:3200/api/fetchCategory').then((response)=>{
    console.log('CategoryResponse',response.data.category);
    this.setState({
      categoryList :  response.data.category
    })
  })
}

fetchSubCategory(){
  axios.post('http://localhost:3200/api/fetchsubCategory').then((response)=>{
    console.log('SubCAtegoryResponse',response.data.subcategory);
    this.setState({
      subCategoryList :  response.data.subcategory
    })
  })
}

  submit(event){
    event.preventDefault();
    let isValid = this.validate();
    if(isValid){
      let obj = {};
      obj.userId = this.props.userId;
      obj.businesscategory = this.state['businesscategory'].value;
      obj.category = this.state['category'].value;
      obj.subCategory = this.state['subCategory'].value;
      obj.productName = this.state['productName'].value;
      obj.brandName = this.state['brandName'].value;
      obj.productPrice = this.state['productPrice'].value;
      obj.quantity = this.state['quantity'].value;
      obj.discount = this.state['discount'].value;
      obj.aboutProduct = this.state['aboutProduct'].value;
      obj.file = this.state.file;

      console.log('objjjjjjjjjjjjjjjjj',obj);
      axios.post('http://localhost:3200/api/addProduct',obj).then((response)=>{
        console.log('++++++++++++++++++++++++++++++',response);
        if(response.data.status === true){
          swal("Successful",
          `${response.data.message}`,
          "success",).then((d)=>{
            if(d) {
              return this.props.history.replace('/Addnewproduct');
            }
          })
   
        }else{
          swal("Error",
         `${response.data.message}`,
         "error", ).then((d)=>{
           if(d){
            return this.props.history.replace('/Addnewproduct');
           }
         })
        }
      })
    }
  }


	render(){
    const state = this.state;
		return(
        <div className="my-3 my-md-5">
          <div className="container">
            <div className="page-header">
              <h4 className="page-title">Add  New Product</h4>
              <ol className="breadcrumb">
                <li className="breadcrumb-item"><a href="#">Home</a></li>
                <li className="breadcrumb-item active" aria-current="page">Add  New Product</li>
              </ol>
            </div>
            <div className="row">
              <div className="col-12">
                <form  method="post" className="card" onSubmit = {this.submit}>
                  <div className="card-header">
                    <h3 className="card-title">Hi ! Vendor Uopload Your New Product</h3>
                  </div>
                  <div className="card-body">
                    <div className="row">
                    <div className="col-md-6 col-lg-6">
                        <div className="form-group">
                          <label className="form-label">Business Category</label>
                          <select name="Category"  className="form-control custom-select" name = "businesscategory" value = {state.businesscategory.value} onChange = {this.handleChange}>
                            <option value ="" hidden selected>Select</option>
                            {
                              this.state.businessList.map((e,i)=>{
                                return(
                                  <React.Fragment key = {i}>
                                     <option>{e.businesscategory}</option>
                                  </React.Fragment>
                                )
                              })
                            }
                          </select>
                          <div style = {{fontSize:13, color:"red"}}>
                            {state.businesscategory.message} 
                          </div>
                        </div>
                    </div>
                      <div className="col-md-6 col-lg-6">
                        <div className="form-group">
                          <label className="form-label">Category</label>
                          <select name="Category"  className="form-control custom-select" name = "category" value = {state.category.value} onChange = {this.handleChange}>
                            <option value ="" hidden selected>Select</option>
                            {
                              this.state.categoryList.map((e,i)=>{
                                return(
                                  <React.Fragment key = {i}>
                                     <option>{e.category}</option>
                                  </React.Fragment>
                                )
                              })
                            }
                          </select>
                          <div style = {{fontSize:13, color:"red"}}>
                            {state.category.message} 
                          </div>
                        </div>
                    </div>
                      <div className="col-md-6 col-lg-6">
                        <div className="form-group">
                          <label className="form-label">Select Sub Category</label>
                          <select  className="form-control custom-select" name = "subCategory" value={state.subCategory.value} onChange = {this.handleChange}>
                            <option value= "" hidden selected>Select</option>
                            {
                              this.state.subCategoryList.map((e,i)=>{
                                return(
                                  <React.Fragment key = {i}>
                                     <option>{e.Subcategory}</option>
                                  </React.Fragment>
                                )
                              })
                            }
                          </select>
                          <div style = {{fontSize:13, color:"red"}}>
                            {state.subCategory.message} 
                          </div>
                        </div>
                    </div>
                      <div className="col-md-6 col-lg-6">
                        <div className="form-group">
                          <label className="form-label">Product Name </label>
                          <input type="text" className="form-control" name="productName" value = {state.productName.value} onChange={this.handleChange}/>
                          <div style = {{fontSize:13, color:"red"}}>
                            {state.productName.message} 
                          </div>
                        </div>
                      </div>

                      <div className="col-md-6 col-lg-6">
                        <div className="form-group">
                          <label className="form-label">Brand Name </label>
                          <select name="Category"  className="form-control custom-select" name = "brandName" value={state.brandName.value} onChange = {this.handleChange}>
                            <option value= "" hidden selected>Select</option>
                            {
                              this.state.brandList.map((e,i)=>{
                                return(
                                  <React.Fragment key = {i}>
                                     <option>{e.brandName}</option>
                                  </React.Fragment>
                                )
                              })
                            }
                          </select>
                          <div style = {{fontSize:13, color:"red"}}>
                            {state.brandName.message} 
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4 col-lg-4">
                        <div className="form-group">
                          <label className="form-label">Product Price </label>
                          <input type="number" className="form-control" name="productPrice"  value={state.productPrice.value} onChange = {this.handleChange} />
                          <div style = {{fontSize:13, color:"red"}}>
                            {state.productPrice.message} 
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4 col-lg-4">
                        <div className="form-group">
                          <label className="form-label">Total Quantity </label>
                          <input type="number" className="form-control" name="quantity" value = {state.quantity.value} onChange= {this.handleChange} />
                          <div style = {{fontSize:13, color:"red"}}>
                            {state.quantity.message} 
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4 col-lg-4">
                        <div className="form-group">
                          <label className="form-label">Total Discount </label>
                          <input type="text" className="form-control" name="discount" value = {state.discount.value} onChange = {this.handleChange} />
                          <div style = {{fontSize:13, color:"red"}}>
                            {state.discount.message} 
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4 col-lg-4">
                      <div className="input-group">
                        <div className="form-group label-floating">
                         <label className="control-label uploadprofile">Upload Product Image </label>
                          <div className="custom-file">
                           <input type="file"  name = "myImage" id = "file" onChange = {this.handleChageImage}   className="custom-file-input"  />
                            <label className="custom-file-label">Choose file</label>
                           </div>
                        </div>
                       </div>
                      </div>
                      <div className="col-md-12 col-lg-12">
                        <div className="form-group">
                          <label className="form-label">About Product </label>
                          <textarea className="form-control" name="aboutProduct" value = {state.aboutProduct.value} onChange = {this.handleChange} rows="6" placeholder="text here.."></textarea>
                          <div style = {{fontSize:13, color:"red"}}>
                            {state.aboutProduct.message} 
                          </div>
                        </div>
                      </div>

                      <div className="col-md-12 col-lg-12">
                      <button type="submit" class="btn btn-primary pull-right">Add New Product</button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
			)
	}
}

function mapstateToProps(state){
  return{
    authenticateState : state.inititateState.authenticateState,
    userId : state.inititateState.userId
  }
}

// function mapDispatchToProps(dispatch){
// 	return {
// 		product : bindActionCreators(action.product, dispatch)
// 	}
// }

export default withRouter(connect(mapstateToProps)(Addnewproductpage));