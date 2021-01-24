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
import AssignmentIcon from '@material-ui/icons/Assignment';
import Person from "@material-ui/icons/Person";
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import EventIcon from '@material-ui/icons/Event';
import AppsIcon from '@material-ui/icons/Apps';
// core components/views for Admin layout
import DashboardPage from "views/Dashboard/Dashboard.js";
import UserProfile from "views/UserProfile/UserProfile.js";
import TableList from "views/TableList/TableList.js";
import Activities from "views/Activities/Activities.js";
import Calendar from "views/Calendar/Calendar.js";
import Ministries from "views/Ministries/Ministries.js";


const dashboardRoutes = [
  {
    path: "/ministries",
    name: "Meus Ministérios",
    icon: AppsIcon,
    component: Ministries,
    layout: "/admin"
  },
  // {
  //   path: "/table",
  //   name: "Cadastro no Ministério",
  //   icon: "content_paste",
  //   component: TableList,
  //   layout: "/admin"
  // },
  // {
  //   path: "/dashboard",
  //   name: "Relatórios",
  //   icon: TrendingUpIcon,
  //   component: DashboardPage,
  //   layout: "/admin"
  // },
  // {
  //   path: "/calendar",
  //   name: "Agenda",
  //   icon: EventIcon,
  //   component: Calendar,
  //   layout: "/admin"
  // },
  // {
  //   path: "/activities",
  //   name: "Cadastro de Atividade",
  //   icon: AssignmentIcon,
  //   component: Activities,
  //   layout: "/admin"
  // },
  {
    path: "/user",
    name: "Cadastro de Membro",
    icon: Person,
    component: UserProfile,
    layout: "/admin"
  }
];

export default dashboardRoutes;
