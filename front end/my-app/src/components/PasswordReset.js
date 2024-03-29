import React from 'react';
import { useState } from "react";
import axios from 'axios';
import toast from "react-hot-toast";

export default function PasswordReset() {


  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();


      const loader = toast.loading(
      "please type ypur email id "
    );


    try {
      // Send a POST request to the backend API with the email
      await axios.post('/forgotPassword/forgotPasswordLink', { email });
      console.log('Reset password email sent.'); // Success message
        toast.success("Reset password email sent");
    } catch (error) {
      console.error('Error sending reset password email:', error);
      toast.error("Error sending reset password email please provide valid email");
      // Handle error
    }
    finally {
      toast.dismiss(loader);
    }
  };



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
              <input className="form-control" type="text" placeholder="Robert@rishabhsoft.com"  value={email}
                    onChange={(e) => setEmail(e.target.value)} autofocus />
            <div className="icon-after icon-green"><i className="icon-check"></i></div>
            </div>
            {/* <!-- <div className="error-block">Error display here</div> --> */}
          </div>

        
          <div className="form-group btn-container">
            <button className="btn btn-xl btn-primary" onClick={handleSubmit} >Submit</button>
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