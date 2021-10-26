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
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import Group from '@material-ui/icons/Group';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import EventIcon from '@material-ui/icons/Event';

// core components/views for Admin layout

import MemberList from "views/MemberList/MemberList.js";
import AssociateMembers from "views/AssociateMembers/AssociateMembers.js";
import Activities from "views/Activities/Activities.js";
import Leadership from "views/Leadership/Leadership.js";
import AssociateLeaders from "views/AssociateLeaders/AssociateLeaders.js";
import ScaleReport from 'views/ScaleReport/ScaleReport';

import Groups from "views/Groups/Groups.js";
import Functions from "views/Functions/Functions.js";
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import BuildIcon from '@material-ui/icons/Build';
import Events from 'views/Events/Events';
import ScheduleIcon from '@material-ui/icons/Schedule';
import UserProfile from 'views/UserProfile/UserProfile';

const leaderRoute = [
  {
    path: "/ministrie",
    hidden: false,
    name: "Ministério",
    icon: "content_paste",
    component: MemberList,
    layout: "/admin"
  },
  {
    path: "/update-member/:id",
    hidden: true,
    name: "Editar de Membro",
    icon: PersonAddIcon,
    component: UserProfile,
    layout: "/admin"
  },
  {
    path: "/associate-members",
    hidden: true,
    name: "Associar Membros",
    icon: GroupAddIcon,
    component: AssociateMembers,
    layout: "/admin"
  },
  {
    path: "/add-member/",
    hidden: false,
    name: "Cadastro de Membro",
    icon: PersonAddIcon,
    component: UserProfile,
    layout: "/admin"
  },
  {
    path: "/leadership",
    hidden: false,
    name: "Liderança",
    icon: SupervisorAccountIcon,
    component: Leadership,
    layout: "/admin"
  },
  {
    path: "/add-leaders",
    hidden: true,
    name: "Associar Líderes",
    icon: GroupAddIcon,
    component: AssociateLeaders,
    layout: "/admin"
  },
  {
    path: "/groups",
    hidden: false,
    name: "Grupos",
    icon: Group,
    component: Groups,
    layout: "/admin"
  },
  {
    path: "/functions",
    hidden: false,
    name: "Funções",
    icon: BuildIcon,
    component: Functions,
    layout: "/admin"
  },
  {
    path: "/activities",
    hidden: false,
    name: "Cadastro de Atividade",
    icon: AssignmentIcon,
    component: Activities,
    layout: "/admin"
  },
  {
    path: "/events",
    hidden: false,
    name: "Eventos",
    icon: EventIcon,
    component: Events,
    layout: "/admin"
  },
  {
    path: "/edit-event/:id",
    hidden: true,
    name: "Evento",
    icon: EventIcon,
    component: Activities,
    layout: "/admin"
  },
  {
    path: "/scale",
    hidden: false,
    name: "Escala",
    icon: ScheduleIcon,
    component: ScaleReport,
    layout: "/admin"
  },
];

export default leaderRoute;
