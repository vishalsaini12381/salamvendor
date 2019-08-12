import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { MDBDataTable } from 'mdbreact';
import $ from 'jquery';
import loadjs from 'jquery';
import './productlistpage.css';
import swal from 'sweetalert';
import action from '../action/action';
import DataTable from '../DataTable';


class Productlistpage extends React.Component{

	render(){
    var that = this;
    // console.log('qqqqqqqqq',this.state.contList);
    const state = this.state;
		return(
        <div className="my-3 my-md-5">
          <div className="container">
            <div className="page-header">
              <h4 className="page-title">Product List</h4>
              <ol className="breadcrumb">
                <li className="breadcrumb-item"><a href="#">Home</a></li>
                <li className="breadcrumb-item active" aria-current="page">Product List</li>
              </ol>
            </div>
            <DataTable/> 
          </div>
        </div>
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
	}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Productlistpage));