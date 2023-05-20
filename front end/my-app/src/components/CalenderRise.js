import React from 'react';
import { ArrowRight, Calendar } from 'lucide-react';
import { useState } from "react";
import Calender2 from './Calender2';

export default function CalenderRise() {

return (
    <>
    <body>
    {/* <!-- Navbar--> */}
    



    {/* <!-- Navbar Start --> */}
    <nav className="navbar navbar-expand-lg fixed-top">
      <div className="container-fluid">
        <div className="container head">
          <a href="#" className="navbar-brand">
            <div className="logoW-wrapper">
              <img src="images/logo-white.svg" alt="Rishabh Software"/>
              <span>Meal Facility</span>
            </div>
        </a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                
                <a className="nav-link active" aria-current="page" href="#">Calendar</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Booking List</a>
              </li>
            </ul>
            <div className="h-100 d-lg-inline-flex align-items-center">
              <ul className="app-nav">
                {/* <!--Notification Menu--> */}
                <li className="dropdown"><a className="app-nav__item notification-num" href="#" data-toggle="dropdown" aria-label="Show notifications"><i className="icon-bell"></i>
                <span className="num">5</span>
                </a></li>
                {/* <!-- User Menu--> */}
                <li className="dropdown"><a className="app-nav__item dropdown-toggle" href="#" data-toggle="dropdown" aria-label="Open Profile Menu">Admin</a>
                  <ul className="dropdown-menu settings-menu dropdown-menu-right">
                    <li><a className="dropdown-item" href="#" data-toggle="modal" data-target="#changepwdModal">Change Password</a></li>
                    <li><a className="dropdown-item" href="#">Logout</a></li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      
        
      
  </nav>
  {/* <!-- Navbar End --> */}
    
    <div className="container-fluid">
      <div className="calendar-wrapper">
        <div className="container">
          <h3 className="main-title">Calendar</h3>
          <div className="row">
            <div className="col-lg-9">
              <div className="tile">Calendar</div>
              <Calender2/>
            </div>
            <div className="col-lg-3">
              <div className="tile">
                <h3 className="tile-title">Saturday, 19 Dec 2022</h3>
                <div className="booking-wrapper">
                  <div className="booking-block">
                    <h5>Bookings</h5>
                    <a href="#"  aria-label="Add Employees"><img src="images/add-btn-1.svg" alt="Add"/></a>
                  </div>
                  <div className="booking-block employees">
                    <div className="booking-block-lt">
                      <div className="icon-block"><i className="icon-employees"></i></div>
                      <div className="info-block">
                        <h5>Employees</h5>
                        <h3>200</h3>
                      </div>
                    </div>
                    <a href="#" aria-label="Add Employees"><img src="images/add-btn-2.svg" alt="Add"/></a>
                  </div>
                  <div className="booking-block non-employees">
                    <div className="booking-block-lt">
                      <div className="icon-block"><i className="icon-employees"></i></div>
                      <div className="info-block">
                        <h5>Non Employees</h5>
                        <h3>160</h3>
                      </div>
                    </div>
                    <a href="#" aria-label="Add Employees"><img src="images/add-btn-2.svg" alt="Add"/></a>
                  </div>
                  <div className="booking-block buffer">
                    <div className="booking-block-lt">
                      <div className="icon-block"><i className="icon-buffer"></i></div>
                      <div className="info-block">
                        <h5>Buffer</h5>
                        <h3>180</h3>
                      </div>
                    </div>
                    <a href="#" aria-label="Add Buffer"><img src="images/add-btn-2.svg" alt="Add"/></a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </div>

    <div className="footer">
      <div className="container">
        <div className="footer-block">
          <p>Copyright © 2022 Rishabh Software. All Rights Reserved.</p>
          <div className="social">
            <a href="#" aria-label="Facebook"><i className="icon-facebook"></i></a>
            <a href="#" aria-label="Instagram"><i className="icon-instagram"></i></a>
            <a href="#" aria-label="Linkedin"><i className="icon-linkedin"></i></a>
            <a href="#" aria-label="Twitter"><i className="icon-twitter"></i></a>
          </div>
        </div>
      </div>
    </div>
    {/* <!-- Essential javascripts for application to work--> */}
    <script src="js/jquery-3.4.1.min.js"></script>
    <script src="js/bootstrap.bundle.min.js"></script>
    <script src="js/popper.min.js"></script>
    <script src="js/bootstrap.min.js"></script>
    <script src="js/main.js"></script>
    {/* <!-- The javascript plugin to display page loading on top--> */}
    <script src="js/plugins/pace.min.js"></script>
    {/* <!-- Page specific javascripts--> */}
  </body>
</>
)
}
