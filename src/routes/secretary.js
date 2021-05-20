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
import PersonAddIcon from '@material-ui/icons/PersonAdd';
// core components/views for Admin layout
import UserProfile from "views/UserProfile/UserProfile.js";

const secretaryRoute = [
  {
    path: "/add-member/",
    hidden: false,
    name: "Cadastro de Membro",
    icon: PersonAddIcon,
    component: UserProfile,
    layout: "/admin"
  }
];

export default secretaryRoute;
