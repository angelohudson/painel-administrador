/*!

=========================================================
* Material Dashboard React - v1.9.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// @material-ui/icons
import AppsIcon from '@material-ui/icons/Apps';
// core components/views for Admin layout
import Ministries from "views/Ministries/Ministries.js";


const mainRoutes = [
  {
    path: "/ministries",
    name: "Meus Ministérios",
    icon: AppsIcon,
    component: Ministries,
    layout: "/admin"
  }
];

export default mainRoutes;
