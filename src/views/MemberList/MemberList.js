import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Tasks from "components/Tasks/Tasks.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import Button from "components/CustomButtons/Button.js";
import { LinearProgress } from "@material-ui/core";

import UserService from 'services/userService';
import HttpService from 'services/httpService';
import { NotificationManager } from 'react-notifications';

const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1"
    }
  }
};

const useStyles = makeStyles(styles);

export default function MemberList(props) {
  const [loading, setLoading] = React.useState({ ...props.loading });
  const [members, setMembers] = React.useState([])
  const classes = useStyles();


  async function getMembers() {
    setLoading(true);
    try {
      const user = UserService.getLoggedUser()
      await HttpService.getMembers(user, props.currentMinistrieObject.id)
        .then((response) => {
          setMembers(response.data);
          setLoading(false);
        });
    } catch (e) {
      console.log(e.message);
      NotificationManager.warning(e.message);
      setLoading(false);
    }
  }

  function doAssociate() {
    props.history.push('/admin/associate-members');
  }

  async function doRemove(id) {
    try {
      const user = UserService.getLoggedUser()
      await HttpService.removeMemberOnMinistry(user, id, props.currentMinistrieObject.id)
        .then((response) => {
          console.log(response);
          setMembers(members.filter((m) => m.id != id));
        });
    } catch (e) {
      console.log(e.message);
      NotificationManager.warning(e.message);
    }
  }

  function doEdit(id) {
    NotificationManager.warning("Funcionalidade ainda não implementada");
    //props.history.push('/admin/update-member/' + id);
  }

  React.useEffect(() => {
    getMembers();
  }, []);

  return (
    loading ?
      <LinearProgress /> :
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Lista de Membros</h4>
            </CardHeader>
            <CardBody>
              <Table
                idColumn={"id"}
                tableActions={[{
                  buttonText: "Remover",
                  doAction: doRemove,
                  buttonColor: "danger"
                }, {
                  buttonText: "Editar",
                  doAction: doEdit,
                }]}
                tableHeaderColor="primary"
                tableHead={["nome", "email", "nascimento"]}
                tableData={members}
              />
            </CardBody>
            <CardFooter>
              <Button onClick={doAssociate} color="primary">Associar Membro</Button>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
  );
}
