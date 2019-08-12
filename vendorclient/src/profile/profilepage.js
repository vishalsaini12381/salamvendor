import React from 'react';
import ReactDOM from 'react-dom';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import './profilepage.css';
class Profilepage extends React.Component{
	render()
	{
    console.log(']]]]]]]]]]]',this.props.image);
		return(
        <div className="my-3 my-md-5">
          <div className="container">
            <div className="page-header">
              <h4 className="page-title">Vendor Profile</h4>
              <ol className="breadcrumb">
                <li className="breadcrumb-item"><a href="#">Home</a></li>
                <li className="breadcrumb-item active" aria-current="page">Vendor Profile</li>
              </ol>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="card card-profile vendorprofile">
                  <div className="card-body text-center">
                    <img className="card-profile-img" src= {this.props.image} alt="img"/>
                    <h3 className="mb-3 text-white"> {this.props.name} </h3>
                    <p className="mb-4 text-white"> {this.props.type} </p>
                    <a href="/createprofile" className="btn btn-warning btn-sm"><i className="fa fa-pencil"></i> Edit profile</a>
                  </div>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="card p-5 ">
                  <div className="card-title">
                    Company Detail
                  </div>
                  <div className="media-list">
                    <div className="media mt-1 pb-2">
                      <div className="mediaicon">
                        <i className="fa fa-home" aria-hidden="true"></i>
                      </div>
                      <div className="media-body ml-5 mt-1">
                        <h6 className="mediafont text-dark">Address</h6> MHG 1235 Saudi Arabia
                      </div>
                    </div>
                    <div className="media mt-1 pb-2">
                      <div className="mediaicon">
                        <i className="fa fa-envelope-o" aria-hidden="true"></i>
                      </div>
                      <div className="media-body ml-5 mt-1">
                        <h6 className="mediafont text-dark">Email Address</h6><span className="d-block">{this.props.email}</span>
                      </div>
                    </div>
                    <div className="media mt-1 pb-2">
                      <div className="mediaicon">
                        <i className="fa fa-phone" aria-hidden="true"></i>
                      </div>
                      <div className="media-body ml-5 mt-1">
                         <h6 className="mediafont text-dark">Mobile No</h6><span className="d-block">{this.props.mobile}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="card">
                  <div className="card-body">
                    <div className="card-box tilebox-one">
                      <i className="icon-layers float-right text-muted"><i className="fa fa-cubes text-primary" aria-hidden="true"></i></i>
                      <h6 className="text-drak text-uppercase mt-0">No of Orders</h6>
                      <h2 className="m-b-20">678</h2>
                      <span className="badge badge-primary"> +78% </span> <span className="text-muted">From previous period</span>
                    </div>
                  </div>
                </div>
                <div className="card">
                  <div className="card-body">
                    <div className="card-box tilebox-one">
                      <i className="icon-layers float-right text-muted"><i className="fa fa-bar-chart text-secondary" aria-hidden="true"></i></i>
                      <h6 className="text-drak text-uppercase mt-0">Profits</h6>
                      <h2 className="m-b-20">$ 7,908</h2>
                      <span className="badge badge-secondary"> +66% </span> <span className="text-muted">Last year</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-8">
                <div className="card">
                  <div className="card-body">
                    <div className=" " id="profile-log-switch">
                      <div className="fade show active " >
                        <div className="table-responsive border ">
                          <table className="table row table-borderless w-100 m-0 ">
                            <tbody className="col-lg-6 p-0">
                              <tr>
                                <td><strong>Full Name :</strong> {this.props.name} </td>
                              </tr>
                              <tr>
                                <td><strong>Location :</strong> USA</td>
                              </tr>
                              <tr>
                                <td><strong>Address :</strong> 124 GHF Helton Dubai</td>
                              </tr>
                            </tbody>
                            <tbody className="col-lg-6 p-0">
                              <tr>
                                <td><strong>Website :</strong> www.salamtrades.com</td>
                              </tr>
                              <tr>
                                <td><strong>Email Id :</strong> {this.props.email} </td>
                              </tr>
                              <tr>
                                <td><strong>Phone Number :</strong> {this.props.mobile} </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                        <div className="row mt-5 profie-img">
                          <div className="col-md-12">
                            <div className="media-heading">
                            <h5><strong>About Vendor</strong></h5>
                          </div>
                          <p>
                             Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus</p>
                          <p >because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure.</p>
                          </div>
                        </div>
                      </div>
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

function mapStateToProps(state){
  console.log('pppppppppppppppppppppp',state.inititateState.image);
  return{
    authenticateState : state.inititateState.authenticateState,
    name : state.inititateState.name,
    email : state.inititateState.email,
    type : state.inititateState.type,
    image: state.inititateState.image,
    mobile : state.inititateState.mobile,
  }
}

export default withRouter(connect(mapStateToProps)(Profilepage));