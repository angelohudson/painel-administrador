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
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import AppsIcon from '@material-ui/icons/Apps';
// core components/views for Admin layout
import UserProfile from "views/UserProfile/UserProfile.js";
import MemberList from "views/MemberList/MemberList.js";
import AssociateMembers from "views/AssociateMembers/AssociateMembers.js";
import Activities from "views/Activities/Activities.js";
import Ministries from "views/Ministries/Ministries.js";
import Leadership from "views/Leadership/Leadership.js";
import AssociateLeaders from "views/AssociateLeaders/AssociateLeaders.js";

const secretaryRoute = [
  {
    path: "/ministries",
    name: "Meus Ministérios",
    icon: AppsIcon,
    component: Ministries,
    layout: "/admin"
  },
  {
    path: "/ministrie",
    name: "Ministério",
    icon: "content_paste",
    component: MemberList,
    layout: "/admin"
  },
  {
    path: "/add-member",
    name: "Cadastro de Membro",
    icon: PersonAddIcon,
    component: UserProfile,
    layout: "/admin"
  },
  {
    path: "/associate-members",
    name: "Associar Membros",
    icon: GroupAddIcon,
    component: AssociateMembers,
    layout: "/admin"
  },
  {
    path: "/leadership",
    name: "Liderança",
    icon: SupervisorAccountIcon,
    component: Leadership,
    layout: "/admin"
  },
  {
    path: "/add-leaders",
    name: "Associar Líderes",
    icon: GroupAddIcon,
    component: AssociateLeaders,
    layout: "/admin"
  },
  {
    path: "/activities",
    name: "Cadastro de Atividade",
    icon: AssignmentIcon,
    component: Activities,
    layout: "/admin"
  },
];

export default secretaryRoute;
