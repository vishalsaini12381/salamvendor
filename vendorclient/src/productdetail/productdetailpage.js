import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import './productdetailpage.css';
class Productdetailpage extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      contList : []
    }
  }


	render(){
    console.log('FFFFFFFFFFFFFFFF',this.props);
		return(
        <div className="my-3 my-md-5">
          <div className="container">
            <div className="page-header">
              <h4 className="page-title">Product Detail</h4>
              <ol className="breadcrumb">
                <li className="breadcrumb-item"><a href="#">Home</a></li>
                <li className="breadcrumb-item active" aria-current="page">Product Detail</li>
              </ol>
            </div>
            {/* {
              this.state.contList.map((e,i)=>{
                return(
                  <React.Fragment key = {i}> */}
                        <div className="row">
              <div className="col-md-12 col-lg-12">
                <div className="card">
                  <div className="card-header">
                    <h3 className="card-title">Product Image</h3>
                  </div>
                  <div className="card-body">
                    <div className="row mt-4">
                      <div className="col-xs-6 col-md-3">
                        <a href="#" className="thumbnail ">
                          <img src={this.props.file} alt="thumb1" className="thumbimg"/>
                        </a>
                      </div>
                      {/* <div className="col-xs-6 col-md-3">
                        <a href="#" className="thumbnail">
                          <img src="./images/tshirt/2.png" alt="thumb1" className="thumbimg"/>
                        </a>
                      </div>
                      <div className="col-xs-6 col-md-3">
                        <a href="#" className="thumbnail">
                          <img src="./images/tshirt/3.png" alt="thumb1" className="thumbimg"/>
                        </a>
                      </div>
                      <div className="col-xs-6 col-md-3">
                        <a href="#" className="thumbnail">
                          <img src="./images/tshirt/5.png" alt="thumb1" className="thumbimg"/>
                        </a>
                      </div> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12">
                <div className="card">
                  <div className="card-header">
                    <h3 className="card-title">Product Detail</h3>
                  </div>
                  <div className="card-body">
                    <div className=" " id="profile-log-switch">
                      <div className="fade show active " >
                        <div className="table-responsive border userdetail ">
                          <table className="table row table-borderless w-100 m-0 ">
                            <tbody className="col-lg-4 p-0">
                              <tr>
                                <td><strong>Product Id:</strong> {this.props.productId}</td>
                              </tr>
                              <tr>
                                <td><strong>Product Name :</strong>{this.props.productName}</td>
                              </tr>
                              <tr>
                                <td><strong>Color :</strong> Black</td>
                              </tr>
                              <tr>
                                <td><strong>Size :</strong> XL</td>
                              </tr>
                            </tbody>
                            <tbody className="col-lg-4 p-0">
                              <tr>
                                <td><strong>Price :</strong>{this.props.productPrice} </td>
                              </tr>
                              <tr>
                                <td><strong>Discount:</strong> {this.props.discount}</td>
                              </tr>
                              <tr>
                                <td><strong>Vendor Name :</strong> Mo Danish</td>
                              </tr>
                              <tr>
                                <td><strong>Company Name :</strong> ASD Pvt Ltd</td>
                              </tr>
                            </tbody>
                            <tbody className="col-lg-4 p-0">
                              <tr>
                                <td><strong>Quantity :</strong> {this.props.quantity}</td>
                              </tr>
                              <tr>
                                <td><strong>Status :</strong> Available</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                        <div class="row mt-5 profie-img">
                          <div class="col-md-12">
                            <div class="media-heading">
                            <h5><strong>About Product</strong></h5>
                          </div>
                          <p>
                             Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure.</p>
                          </div>

                        </div>
                        </div>
                      </div>
                    </div>
                  </div>


              </div>
            </div>
                  {/* </React.Fragment>
                )
              })
            } */}
        

          </div>
        </div>


			)
	}
}

function mapStateToProps(state){
  console.log('8888888888888888888',state.productReduce.productId);
  return{
    productId : state.productReduce.productId,
    file  : state.productReduce.file,
    productName : state.productReduce.productName,
    productPrice  : state.productReduce.productPrice,
    discount  :  state.productReduce.discount,
    category : state.productReduce.category,
    subCategory : state.productReduce.subCategory,
    brandName : state.productReduce.brandName,
    quantity : state.productReduce.quantity,
  }
}

export default withRouter(connect(mapStateToProps)(Productdetailpage));