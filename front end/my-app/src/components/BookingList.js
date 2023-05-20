// import React from 'react';
// import { useState } from "react";

// export default function BookingList() {

// return (
//     <body>
    
//     {/* <!-- Navbar--> */}
    



//     {/* <!-- Navbar Start --> */}
//     <nav classNameNameName="navbar navbar-expand-lg fixed-top">
//       <div classNameNameName="container-fluid">
//         <div classNameNameName="container head">
//           <a href="#" classNameNameName="navbar-brand">
//             <div classNameNameName="logoW-wrapper">
//               <img src="images/logo-white.svg" alt="Rishabh Software"/>
//               <span>Meal Facility</span>
//             </div>
//         </a>
//           <button classNameNameName="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
//             <span classNameNameName="navbar-toggler-icon"></span>
//           </button>
//           <div classNameNameName="collapse navbar-collapse" id="navbarSupportedContent">
//             <ul classNameNameName="navbar-nav me-auto mb-2 mb-lg-0">
//               <li classNameNameName="nav-item">
//                 <a classNameNameName="nav-link active" aria-current="page" href="#">Calendar</a>
//               </li>
//               <li classNameNameName="nav-item">
//                 <a classNameNameName="nav-link" href="#">Booking List</a>
//               </li>
//             </ul>
//             <div classNameNameName="h-100 d-lg-inline-flex align-items-center">
//               <ul classNameNameName="app-nav">
//                 {/* <!--Notification Menu--> */}
//                 <li classNameNameName="dropdown"><a classNameNameName="app-nav__item notification-num" href="#" data-toggle="dropdown" aria-label="Show notifications"><i classNameNameName="icon-bell"></i>
//                 <span classNameNameName="num">5</span>
//                 </a></li>
//                 {/* <!-- User Menu--> */}
//                 <li classNameNameName="dropdow"><a classNameNameName="app-nav__item dropdown-toggle" href="#" data-toggle="dropdown" aria-label="Open Profile Menu">Admin</a>
//                   <ul classNameNameName="dropdown-menu settings-menu dropdown-menu-left">
//                     <li><a classNameNameName="dropdown-item" href="#" data-toggle="modal" data-target="#changepwdModal">Change Password</a></li>
//                     <li><a classNameNameName="dropdown-item" href="#">Logout</a></li>
//                   </ul>
//                 </li>
//               </ul>
//             </div>
//           </div>
//         </div>
//       </div>
    
    
      
        
      
//   </nav>
//   {/* <!-- Navbar End --> */}
    
//     <div classNameNameName="container-fluid">
//       <div classNameNameName="container pt-30 mb-30">
//         <div classNameNameName="container-head">
//           <div classNameNameName="container-left">
//             <h3 classNameNameName="container-title">Booking List</h3>
//           </div>
//           <div classNameNameName="container-right">
//             <a href="#" aria-label="Add Booking" classNameNameName="btn btn-primary" data-toggle="modal" data-target="#addBookingModal">Add Booking</a>
//           </div>
//         </div>

//         <div classNameNameName="content-tab">
//           <a classNameNameName="content-tab_link active" href="#">Rishabh Employees</a>
//           <a classNameNameName="content-tab_link" href="#">Others</a>
//         </div> 

//       </div>
      
//     </div>

//     <div classNameNameName="footer">
//       <div classNameNameName="container">
//         <div classNameNameName="footer-block">
//           <p>Copyright © 2022 Rishabh Software. All Rights Reserved.</p>
//           <div classNameNameName="social">
//             <a href="#" aria-label="Facebook"><i classNameNameName="icon-facebook"></i></a>
//             <a href="#" aria-label="Instagram"><i classNameNameName="icon-instagram"></i></a>
//             <a href="#" aria-label="Linkedin"><i classNameNameName="icon-linkedin"></i></a>
//             <a href="#" aria-label="Twitter"><i classNameNameName="icon-twitter"></i></a>
//           </div>
//         </div>
//       </div>
//     </div>



//     {/* <!-- Change Password Modal--> */}
//     <div classNameNameName="modal fade" id="changepwdModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
//         aria-hidden="true">
//         <div classNameNameName="modal-dialog modal-dialog-centered" role="document">
//             <div classNameNameName="modal-content">
//                 <div classNameNameName="modal-header">
//                     <h5 classNameNameName="modal-title" id="exampleModalLabel">Change Password</h5>
//                     <button type="button" classNameNameName="close" data-dismiss="modal" aria-label="Close">
//                         <span aria-hidden="true">&times;</span>
//                     </button>
//                 </div>
//                 <div classNameNameName="modal-body">
//                     <form>
//                         <div classNameNameName="form-group">
//                             <label for="exampleInputPassword1">Old Password<span classNameNameName="extric">*</span></label>
//                             <input type="password" classNameNameName="form-control" id="exampleInputPassword1"/>
//                         </div>
//                         <div classNameNameName="form-group">
//                             <label for="exampleInputPassword1">New Password<span classNameNameName="extric">*</span></label>
//                             <input type="password" classNameNameName="form-control" id="exampleInputPassword1"/>

//                         </div>
//                         <div classNameNameName="form-group">
//                             <label for="exampleInputPassword1">Confirm Password<span classNameNameName="extric">*</span></label>
//                             <input type="password" classNameNameName="form-control" id="exampleInputPassword1"/>
//                             <div classNameNameName="error-block">Error display here</div>
//                         </div>
//                     </form>
//                 </div>
//                 <div classNameNameName="modal-footer">
//                     <button type="button" classNameNameName="btn btn-secondary" data-dismiss="modal">Close</button>
//                     <button type="button" classNameNameName="btn btn-primary">Save changes</button>
//                 </div>
//             </div>
//         </div>
//     </div>
//     {/* <!-- End Change Password Modal--> */}

//     {/* <!-- Start Filter Modal--> */}
//     <div classNameNameName="modal fade side-modal" id="addBookingModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel">
// 		<div classNameNameName="modal-dialog modal-md" role="document">
// 			<div classNameNameName="modal-content">
// 				<div classNameNameName="modal-header">
// 					<h5 classNameNameName="modal-title" id="exampleModalLabel">Book a Meal</h5>
// 					<button type="button" classNameNameName="close" data-dismiss="modal" aria-label="Close">
// 						<span aria-hidden="true">×</span>
// 					</button>
// 				</div>
// 				<div classNameNameName="modal-body">
//           <div classNameNameName="form-group custom-radio">
//             <label>Select Catagory</label>
//             <div classNameNameName="d-flex align-content-center justify-content-start">
//               <div classNameNameName="radio-block">
//                 <input type="radio" id="test1" name="radio-group" checked/>
//                 <label for="test1" classNameNameName="mr-0">Employees</label>
//             </div>
//             <div classNameNameName="radio-block">
//               <input type="radio" id="test2" name="radio-group" checked/>
//               <label for="test2" classNameNameName="mr-0">Non Employees</label>
//           </div>
//           <div classNameNameName="radio-block">
//             <input type="radio" id="test3" name="radio-group" checked/>
//             <label for="test3" classNameNameName="mr-0">Custom Booking</label>
//         </div>
//             </div>
            
//           </div>
//           <div classNameNameName="form-group custom-radio">
//             <label>Select Catagory</label>
//             <div classNameNameName="d-flex align-content-center justify-content-start">
//               <div classNameNameName="radio-block">
//                 <input type="radio" id="test4" name="radio-group" checked/>
//                 <label for="test4" classNameNameName="mr-0">Lunch</label>
//             </div>
//             <div classNameNameName="radio-block">
//               <input type="radio" id="test5" name="radio-group" checked/>
//               <label for="test5" classNameNameName="mr-0">Dinner</label>
//           </div>
//             </div>
            
//           </div>
//           <div classNameNameName="form-group mb-30">
//             <label classNameNameName="custom-checkbox mb-0"><span classNameNameName="checkbox__title">Weekend</span>
//               <input classNameNameName="checkbox__input" type="checkbox"/><span classNameNameName="checkbox__checkmark"></span>
//             </label>
//           </div>
//           <div classNameNameName="form-group">
//             <label>Select Date (s)</label>
//             <div classNameNameName="input-group date-picker-input">
//               <input type="text" classNameNameName="form-control border-right-0" placeholder="Select Date" id="demoDate"/>
//               <div classNameNameName="input-group-append bg-transparent">
//                   <span classNameNameName="input-group-text bg-transparent" id="basic-addon2"><i classNameNameName="icon-calendar"></i></span>
//               </div>
//           </div>
//         </div>
//         <div classNameNameName="form-group">
//           <label>Select Account</label>
//           <div classNameNameName="search-wrapper">
//               <input type="text" classNameNameName="form-control" placeholder="Search Department.."/>
//               <i classNameNameName="icon-search search-icon"></i>
//           </div>
//       </div>
//       <div classNameNameName="form-group">
//         <label>Notes</label>
//         <textarea classNameNameName="form-control" rows="4" placeholder="Type here.."></textarea>
//     </div>
//     <div classNameNameName="form-group">
//       <label>Booking Count</label>
//       <input type="text" classNameNameName="form-control" placeholder="100"/>
//     </div>
//       <div classNameNameName="form-group">
//         <label>Select Employees</label>
//     </div>
//     <div classNameNameName="table-responsive">
//       <table classNameNameName="table table-hover responsive nowrap table-bordered">
//         <thead>
//           <tr>
//               <th>
//                 <div classNameNameName="form-group mb-0">
//                   <label classNameNameName="custom-checkbox">
//                     <input classNameNameName="checkbox__input" type="checkbox"/><span classNameNameName="checkbox__checkmark"></span>
//                   </label>
//                 </div>
//               </th>
//             <th>Employee ID</th>
//             <th>Employee Name</th>
//             <th>Department</th>
//           </tr>
//         </thead>
//         <tbody>

//           <tr>
//             <td>
//                 <div classNameNameName="form-group mb-0">
//                   <label classNameNameName="custom-checkbox m-0">
//                     <input classNameNameName="checkbox__input" type="checkbox"/><span classNameNameName="checkbox__checkmark"></span>
//                   </label>
//                 </div>
//             </td>
//             <td>2001</td>
//             <td>Thomas</td>
//             <td>Analytics</td>
//           </tr>
//           <tr>
//             <td>
//                 <div classNameNameName="form-group mb-0">
//                   <label classNameNameName="custom-checkbox m-0">
//                     <input classNameNameName="checkbox__input" type="checkbox"/><span classNameNameName="checkbox__checkmark"></span>
//                   </label>
//                 </div>
//             </td>
//             <td>2001</td>
//             <td>Thomas</td>
//             <td>Analytics</td>
//           </tr>
//           <tr>
//             <td>
//                 <div classNameNameName="form-group mb-0">
//                   <label classNameNameName="custom-checkbox m-0">
//                     <input classNameNameName="checkbox__input" type="checkbox"/><span classNameNameName="checkbox__checkmark"></span>
//                   </label>
//                 </div>
//             </td>
//             <td>2001</td>
//             <td>Thomas</td>
//             <td>Analytics</td>
//           </tr>
//           <tr>
//             <td>
//                 <div classNameNameName="form-group mb-0">
//                   <label classNameNameName="custom-checkbox m-0">
//                     <input classNameNameName="checkbox__input" type="checkbox"/><span classNameNameName="checkbox__checkmark"></span>
//                   </label>
//                 </div>
//             </td>
//             <td>2001</td>
//             <td>Thomas</td>
//             <td>Analytics</td>
//           </tr>
//         </tbody>
//       </table>
//     </div>
// 				</div>
// 				<div classNameNameName="modal-footer">
// 					<button type="button" classNameNameName="btn btn-outline-primary">Cancel</button>
//           <button type="button" classNameNameName="btn btn-primary">Book</button>
// 				</div>
// 			</div>
// 		</div>
//     </div>
//     {/* <!-- End Filter Modal--> */}





//     {/* <!-- Essential javascripts for application to work--> */}
//     <script src="js/jquery-3.4.1.min.js"></script>
//     <script src="js/bootstrap.bundle.min.js"></script>
//     <script src="js/popper.min.js"></script>
//     <script src="js/bootstrap.min.js"></script>
//     <script src="js/main.js"></script>
//     {/* <!-- The javascript plugin to display page loading on top--> */}
//     <script src="js/plugins/pace.min.js"></script>
//     {/* <!-- Page specific javascripts--> */}
  

//   </body>

// );
// }

import React from 'react';
import { Navbar, Nav, Button, Modal,Form } from 'react-bootstrap';
import { useState } from 'react';

  

export default function BookingList()  {

  const [showModal, setShowModal] = useState(false);

  const onHide = () => {
    // Handle save changes logic here
    setShowModal(false); // Hide the modal after changes have been saved
  };


  return (
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
              
          </div>
        </div>
      </div>

      
        
      
  </nav>
  {/* <!-- Navbar End --> */}
    
    <div className="container-fluid">
      <div className="container pt-30 mb-30">
        <div className="container-head">
          <div className="container-left">
            <h3 className="container-title">Booking List</h3>
          </div>
          <div className="container-right">
            <a href="#" aria-label="Add Booking" className="btn btn-primary" data-toggle="modal" data-target="#addBookingModal">Add Booking</a>
          </div>
        </div>

        <div className="content-tab">
          <a className="content-tab_link active" href="#">Rishabh Employees</a>
          <a className="content-tab_link" href="#">Others</a>
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



    {/* <!-- Change Password Modal--> */}
    <div className="modal fade" id="changepwdModal" tabindex={-1} role="dialog" aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">Change Password</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                    <form>
                        <div className="form-group">
                            <label for="exampleInputPassword1">Old Password<span className="extric">*</span></label>
                            <input type="password" className="form-control" id="exampleInputPassword1"/>
                        </div>
                        <div className="form-group">
                            <label for="exampleInputPassword1">New Password<span className="extric">*</span></label>
                            <input type="password" className="form-control" id="exampleInputPassword1"/>

                        </div>
                        <div className="form-group">
                            <label for="exampleInputPassword1">Confirm Password<span className="extric">*</span></label>
                            <input type="password" className="form-control" id="exampleInputPassword1"/>
                            <div className="error-block">Error display here</div>
                        </div>
                    </form>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" className="btn btn-primary">Save changes</button>
                </div>
            </div>
        </div>
    </div>
    {/* <!-- End Change Password Modal--> */}

    {/* <!-- Start Filter Modal--> */}
    <div className="modal fade side-modal" id="addBookingModal" tabindex={-1} role="dialog" aria-labelledby="exampleModalLabel">
		<div className="modal-dialog modal-md" role="document">
			<div className="modal-content">
				<div className="modal-header">
					<h5 className="modal-title" id="exampleModalLabel">Book a Meal</h5>
					<button type="button" className="close" data-dismiss="modal" aria-label="Close">
						<span aria-hidden="true">×</span>
					</button>
				</div>
				<div className="modal-body">
          <div className="form-group custom-radio">
            <label>Select Catagory</label>
            <div className="d-flex align-content-center justify-content-start">
              <div className="radio-block">
                <input type="radio" id="test1" name="radio-group" checked/>
                <label for="test1" className="mr-0">Employees</label>
            </div>
            <div className="radio-block">
              <input type="radio" id="test2" name="radio-group" checked/>
              <label for="test2" className="mr-0">Non Employees</label>
          </div>
          <div className="radio-block">
            <input type="radio" id="test3" name="radio-group" checked/>
            <label for="test3" className="mr-0">Custom Booking</label>
        </div>
            </div>
            
          </div>
          <div className="form-group custom-radio">
            <label>Select Catagory</label>
            <div className="d-flex align-content-center justify-content-start">
              <div className="radio-block">
                <input type="radio" id="test4" name="radio-group" checked/>
                <label for="test4" className="mr-0">Lunch</label>
            </div>
            <div className="radio-block">
              <input type="radio" id="test5" name="radio-group" checked/>
              <label for="test5" className="mr-0">Dinner</label>
          </div>
            </div>
            
          </div>
          <div className="form-group mb-30">
            <label className="custom-checkbox mb-0"><span className="checkbox__title">Weekend</span>
              <input className="checkbox__input" type="checkbox"/><span className="checkbox__checkmark"></span>
            </label>
          </div>
          <div className="form-group">
            <label>Select Date (s)</label>
            <div className="input-group date-picker-input">
              <input type="text" className="form-control border-right-0" placeholder="Select Date" id="demoDate"/>
              <div className="input-group-append bg-transparent">
                  <span className="input-group-text bg-transparent" id="basic-addon2"><i className="icon-calendar"></i></span>
              </div>
          </div>
        </div>
        <div className="form-group">
          <label>Select Account</label>
          <div className="search-wrapper">
              <input type="text" className="form-control" placeholder="Search Department.."/>
              <i className="icon-search search-icon"></i>
          </div>
      </div>
      <div className="form-group">
        <label>Notes</label>
        <textarea className="form-control" rows="4" placeholder="Type here.."></textarea>
    </div>
    <div className="form-group">
      <label>Booking Count</label>
      <input type="text" className="form-control" placeholder="100"/>
    </div>
      <div className="form-group">
        <label>Select Employees</label>
    </div>
    <div className="table-responsive">
      <table className="table table-hover responsive nowrap table-bordered">
        <thead>
          <tr>
              <th>
                <div className="form-group mb-0">
                  <label className="custom-checkbox">
                    <input className="checkbox__input" type="checkbox"/><span className="checkbox__checkmark"></span>
                  </label>
                </div>
              </th>
            <th>Employee ID</th>
            <th>Employee Name</th>
            <th>Department</th>
          </tr>
        </thead>
        <tbody>

          <tr>
            <td>
                <div className="form-group mb-0">
                  <label className="custom-checkbox m-0">
                    <input className="checkbox__input" type="checkbox"/><span className="checkbox__checkmark"></span>
                  </label>
                </div>
            </td>
            <td>2001</td>
            <td>Thomas</td>
            <td>Analytics</td>
          </tr>
          <tr>
            <td>
                <div className="form-group mb-0">
                  <label className="custom-checkbox m-0">
                    <input className="checkbox__input" type="checkbox"/><span className="checkbox__checkmark"></span>
                  </label>
                </div>
            </td>
            <td>2001</td>
            <td>Thomas</td>
            <td>Analytics</td>
          </tr>
          <tr>
            <td>
                <div className="form-group mb-0">
                  <label className="custom-checkbox m-0">
                    <input className="checkbox__input" type="checkbox"/><span className="checkbox__checkmark"></span>
                  </label>
                </div>
            </td>
            <td>2001</td>
            <td>Thomas</td>
            <td>Analytics</td>
          </tr>
          <tr>
            <td>
                <div className="form-group mb-0">
                  <label className="custom-checkbox m-0">
                    <input className="checkbox__input" type="checkbox"/><span className="checkbox__checkmark"></span>
                  </label>
                </div>
            </td>
            <td>2001</td>
            <td>Thomas</td>
            <td>Analytics</td>
          </tr>
        </tbody>
      </table>
    </div>
				</div>
				<div className="modal-footer">
					<button type="button" className="btn btn-outline-primary">Cancel</button>
          <button type="button" className="btn btn-primary">Book</button>
				</div>
			</div>
		</div>
    </div>
    {/* <!-- End Filter Modal--> */}





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
);
}
