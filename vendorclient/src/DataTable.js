import moment from 'moment'; // Example for onSort prop
import React, { Component } from 'react'; // Import React
import axios from 'axios';
import {Link, withRouter} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import action from '../src/action/action';
import { render } from 'react-dom'; // Import render method
import Datatable from 'react-bs-datatable'; // Import this package
import { connect } from 'react-redux';
import swal from 'sweetalert';
 
class DataTable extends Component{ 
  constructor(props){
    super(props);
    this.state = {
      contList : []
    }
    this.productFetch = this.productFetch.bind(this);
   
  }  

  productFetch(){
    axios.post('http://localhost:3200/api/fetchProduct',{
      userId: this.props.userId,
      // email: this.props.email,
    }).then((resp)=>{
      console.log('##################',resp.data.user);
      this.setState({
       contList: resp.data.user,
      })
    })
  }

  componentWillMount (){
    this.productFetch();
  }


  product(e,i){
    axios.post('http://localhost:3200/api/fetchProductList',{
      productId :e.state.contList[i]._id
    }).then((response)=>{
      console.log('DDDDDDDDDDDDDDDDD',response);
          if(response){
            console.log('this.props.product',this.props.product);
            this.props.product({
              type: 'product',
              payload: response.data
            })
          }
    })
    this.props.history.push('/Productdetail');
   }

   editProduct(e,i){
    console.log('WWWWWWWWWWWWWWWWWWWWWWWWWWWW',e.state.contList[i]._id);
     axios.post('http://localhost:3200/api/fetchProductList',{
       productId : e.state.contList[i]._id
     }).then((response)=>{
       if(response){
         this.props.editproduct({
           type: 'editproduct',
           payload : response.data
         })
       }
      console.log('---------------------------',response);
     })
     this.props.history.replace('/Editproductpage');
   }

   deleteProduct(e){
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete)=>{
      if(willDelete){
        axios.post('http://localhost:3200/api/deleteProduct',{
          productId: e,
        }).then(res=>{
          swal("Poof! Your imaginary file has been deleted!",{
            icon:"success",
          });
        })
        setTimeout(function(){
          return window.location = '/Datatable';
        },2000)
      }else{
        swal("Your imaginary file is safe!");
      }
    });
   }

render(){
const header = [
  { title: 'Business Category', prop: 'businesscategory', sortable: true, filterable: true },
  { title: 'Category', prop: 'category', sortable: true, filterable: true },
  { title: 'Product Name', prop: 'name', sortable: true ,filterable: true},
  // { title: 'Name Uppercased', prop: 'realnameuppercase', cell: (row) => row.realname.toUpperCase() },
  { title: 'Price', prop: 'price',      sortable: true,filterable: true },
  { title: 'Quantity', prop: 'quantity',sortable: true,filterable: true },
  { title: 'Discount', prop: 'discount',sortable: true,filterable: true },
  { title: 'Action', prop: 'action'    ,sortable: true , filterable: true },
  ];
 
let state = this.state;
const body = [];
  state.contList.map((e,i)=>{
    body.push({
     'businesscategory': e.businesscategory,
     'category' : e.category,
     'name':e.productName,
     'price': e.productPrice,
      'quantity': e.quantity,
      'discount': e.discount,
      'action': <div className="actiontrans" > <Link to = "#" onClick = {(e)=>this.product(this,i)} value = {e._id} > <i className="fa fa-eye "></i></Link> &nbsp;
       <Link to = "#" onClick = {(e)=>this.editProduct(this,i)} value = {e._id} > <i className="fa fa-edit"></i></Link> &nbsp;
       <Link to = "#" onClick = {this.deleteProduct.bind(this,e._id)} > <i className="fa fa-trash"></i> </Link> </div>  });
  })
 
const onSortFunction = {
  date(columnValue) {
    // Convert the string date format to UTC timestamp
    // So the table could sort it by number instead of by string
    return moment(columnValue, 'Do MMMM YYYY').valueOf();
  },
};
 
const customLabels = {
  first: '<<',
  last: '>>',
  prev: '<',
  next: '>',
  show: 'Display',
  entries: 'rows',
  noResults: 'There is no data to be displayed',
};
 
// In your render method
return(

<Datatable
  tableHeader={header}
  tableBody={body}
  keyName="userTable"
  tableClass="striped hover responsive"
  rowsPerPage={5}
  rowsPerPageOption={[5, 10, 15, 20]}
  initialSort={{prop: "username", isAscending: true}}
  onSort={onSortFunction}
  labels={customLabels}
/>
  )
 }
}

function mapStateToProps(state){
  return {
  
    authenticateState : state.inititateState.authenticateState,
    email: state.inititateState.email,
    userId: state.inititateState.userId,
  }
}

function mapDispatchToProps(dispatch){
	return {
    product : bindActionCreators(action.product, dispatch),
    editproduct : bindActionCreators(action.editproduct,dispatch),
	}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DataTable));