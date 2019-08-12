import React from 'react';
import ReactDOM from 'react-dom';
import './orderdetailpage.css';
class Orderdetailpage extends React.Component{
	render()
	{
		return(
        <div className="my-3 my-md-5">
          <div className="container">
            <div className="page-header">
              <h4 className="page-title">Order Detail</h4>
              <ol className="breadcrumb">
                <li className="breadcrumb-item"><a href="#">Home</a></li>
                <li className="breadcrumb-item active" aria-current="page">Order Detail</li>
              </ol>
            </div>
            <div className="row">
              <div className="col-lg-12">
                <div className="card">
                  <div className="card-body">
                    <div className=" " id="profile-log-switch">
                      <div className="fade show active " >
                        <div className="table-responsive border userdetail ">
                          <table className="table row table-borderless w-100 m-0 ">
                            <tbody className="col-lg-4 p-0">
                              <tr>
                                <td><strong>Order Id:</strong> #O2551255</td>
                              </tr>
                              <tr>
                                <td><strong>Order Date :</strong> 20-07-2019</td>
                              </tr>
                              <tr>
                                <td><strong>Order Amount :</strong> $500</td>
                              </tr>
                              <tr>
                                <td><strong>Order Status :</strong> Delivered</td>
                              </tr>
                            </tbody>
                            <tbody className="col-lg-4 p-0">
                              <tr>
                                <td><strong>User Id :</strong> #524585552</td>
                              </tr>
                              <tr>
                                <td><strong>User Name :</strong> John Smith</td>
                              </tr>
                              <tr>
                                <td><strong>Email Id :</strong> abc@gmail.com</td>
                              </tr>
                              <tr>
                                <td><strong>Mobile No :</strong> +971 3542 5244</td>
                              </tr>
                            </tbody>
                            <tbody className="col-lg-4 p-0">
                              <tr>
                                <td><strong>Address :</strong> GFD 24 Dubai</td>
                              </tr>
                              <tr>
                                <td><strong>Delivered Date :</strong> 25-07-2019</td>
                              </tr>
                              <tr>
                                <td><strong>Delivery Boy Name :</strong> Mo Danish </td>
                              </tr>
                              <tr>
                                <td><strong>Mobile No :</strong> +987 3254 2541</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>

                        </div>
                      </div>
                    </div>
                  </div>


              </div>
            </div>
            <div className="row row-cards order-detailpage">
              <div className="col-lg-12">
                <div className="card mt-5 store">
                  <div className="table-responsive">
                    <table className="table card-table table-vcenter">
                      <tr>
                        <th className="wd-15p">Images</th>
                        <th className="wd-15p">Category</th>
                        <th className="wd-15p">Product Name</th>
                        <th className="wd-15p">Price</th>
                        <th className="wd-15p">Quantity</th>
                        <th className="wd-20p">Discount</th>
                        <th className="wd-20p">Total Price</th>
                      </tr>
                      <tr>
                        <td><img src="./images/tshirt/1.png" alt="" className="h-8 w-8 bg-white" /></td>
                        <td>Mens Fashion</td>
                        <td>Mens Neck T-Shirt</td>
                        <td >
                          <strong>$50</strong>
                        </td>
                        <td>2</td>
                        <td>10%</td>
                        <td>
                          <strong>$90</strong>
                        </td>
                      </tr>
                      <tr>
                        <td><img src="./images/tshirt/2.png" alt="" className="h-8 w-8 bg-white" /></td>
                        <td>Mens Fashion</td>
                        <td>Mens Neck T-Shirt</td>
                        <td >
                          <strong>$50</strong>
                        </td>
                        <td>2</td>
                        <td>10%</td>
                        <td>
                          <strong>$90</strong>
                        </td>
                      </tr>
                      <tr>
                        <td><img src="./images/tshirt/3.png" alt="" className="h-8 w-8 bg-white" /></td>
                        <td>Mens Fashion</td>
                        <td>Mens Neck T-Shirt</td>
                        <td >
                          <strong>$50</strong>
                        </td>
                        <td>2</td>
                        <td>10%</td>
                        <td>
                          <strong>$90</strong>
                        </td>
                      </tr>
                      <tr>
                        <td><img src="./images/tshirt/4.png" alt="" className="h-8 w-8 bg-white" /></td>
                        <td>Mens Fashion</td>
                        <td>Mens Neck T-Shirt</td>
                        <td >
                          <strong>$50</strong>
                        </td>
                        <td>2</td>
                        <td>10%</td>
                        <td>
                          <strong>$90</strong>
                        </td>
                      </tr>
                      <tr>
                        <td><img src="./images/tshirt/5.png" alt="" className="h-8 w-8 bg-white" /></td>
                        <td>Mens Fashion</td>
                        <td>Mens Neck T-Shirt</td>
                        <td >
                          <strong>$50</strong>
                        </td>
                        <td>2</td>
                        <td>10%</td>
                        <td>
                          <strong>$90</strong>
                        </td>
                      </tr>
                    </table>
                  </div>
                </div>
                <div className="card ">
                  <div className="card-header "><div className="card-title">Order Summery</div></div>
                  <div className="card-body">
                    <div className="table-responsive">
                      <table className="table table-bordered">
                        <tbody>
                          <tr>
                            <td>Cart Total</td>
                            <td className="text-right">$500</td>
                          </tr>
                          <tr>
                            <td><span>Discount</span></td>
                            <td className="text-right text-muted"><span>$50</span></td>
                          </tr>
                          <tr>
                            <td><span>Order Total</span></td>
                            <td><h2 className="price text-right">$450</h2></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>


			)
	}
}

export default Orderdetailpage;