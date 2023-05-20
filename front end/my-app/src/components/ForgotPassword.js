import React from 'react';
import { useState } from "react";

export default function ForgotPassword() {

return (

    <body className="mt-0">
    <section className="login-content">
      <div className="login-content-lt"></div>
      <div className="login-content-rt">
        <div className="login-box">
        <form className="login-form" action="#">
          <div className="logo-wrapper">
            <img src="images/logo.svg" alt="Rishabh Software" />
            <span>Meal Facility</span>
          </div>
          <h3 className="login-head">Forgot Password?</h3>
          <p className="login-text">Enter the email below to continue.</p>
          <div className="form-group">
            <label className="control-label">Email</label>
            <div className="input-addon">
              <input className="form-control" type="text" placeholder="Robert@rishabhsoft.com" autofocus />
            <div className="icon-after icon-green"><i className="icon-check"></i></div>
            </div>
            {/* <!-- <div className="error-block">Error display here</div> --> */}
          </div>

        
          <div className="form-group btn-container">
            <button className="btn btn-xl btn-primary">Submit</button>
          </div>
        </form>
      </div>
      </div>
      
      
      
    </section>
    {/* <!-- End Footer -->
    <!-- End  Page Content --> */}
    {/* <!-- Essential javascripts for application to work--> */}
    <script src="js/jquery-3.3.1.min.js"></script>
    <script src="js/popper.min.js"></script>
    <script src="js/bootstrap.min.js"></script>
    <script src="js/main.js"></script>
    {/* <!-- The javascript plugin to display page loading on top--> */}
    <script src="js/plugins/pace.min.js"></script>
    {/* <!-- Page specific javascripts--> */}
     
    
  
  </body>

)}