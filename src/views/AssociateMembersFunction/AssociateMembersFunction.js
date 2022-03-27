import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
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

const AssociateMembersFunction = React.forwardRef((props, ref) => {
  const [id, setId] = React.useState(props.id);
  const [loading, setLoading] = React.useState({ ...props.loading });
  const [membersNotAssociated, setMembersNotAssociated] = React.useState([]);
  const [tableCheckedIndexNotAssociated, setTableCheckedIndexNotAssociated] = React.useState([]);
  const [members, setMembers] = React.useState([]);
  const [tableCheckedIndex, setTableCheckedIndex] = React.useState([]);
  const classes = useStyles();
  const { ministerId } = props

  React.useImperativeHandle(ref, () => {
    return {
      setId: setNewId
    };
  });

  async function setNewId(id) {
    setId(id);
    getMembers(id);
  }

  async function getMembers(id) {
    setLoading(true);
    try {
      const user = UserService.getAccessToken()
      await HttpService.getMembersNotAssociateOnFunction(user, ministerId, id)
        .then((response) => {
          setMembersNotAssociated(response.data);
        });
      await HttpService.getMembersByFunction(user, id)
        .then((response) => {
          setMembers(response.data.map((f) => { return f.membro }));
        });
      setLoading(false);
    } catch (e) {
      console.log(e.message);
      NotificationManager.warning(e.message);
      setLoading(false);
    }
  }

  async function doAssociate() {
    setLoading(true);
    try {
      const user = UserService.getAccessToken();
      await HttpService.associateMembersOnFunction(user, tableCheckedIndexNotAssociated, id)
        .then((response) => {
          console.log(response);
          getMembers(id);
        });
    } catch (e) {
      console.log(e.message);
      NotificationManager.warning(e.message);
      setLoading(false);
    }
  }

  async function doRemove() {
    setLoading(true);
    try {
      const user = UserService.getAccessToken();
      await HttpService.removeMembersOnFunction(user, tableCheckedIndex, id)
        .then((response) => {
          console.log(response);
          getMembers(id);
        });
    } catch (e) {
      console.log(e.message);
      NotificationManager.warning(e.message);
      setLoading(false);
    }
  }

  React.useEffect(() => {
    setLoading(false);
  }, []);

  return (
    loading ?
      <LinearProgress /> :
      <GridContainer>
        <GridItem spacing={6} sm={6} md={6}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Lista de membros assocciados a função</h4>
              <p className={classes.cardCategoryWhite}>Selecione os membros para remover da função</p>
            </CardHeader>
            <CardBody>
              <Table
                tableHeaderColor="primary"
                tableHead={["id", "nome"]}
                tableData={members}
                tableSelectable={true}
                tableCheckedIndex={tableCheckedIndex}
                tableSetCheckedIndex={setTableCheckedIndex}
              />
            </CardBody>
            <CardFooter>
              <Button onClick={doRemove} disabled={!tableCheckedIndex.length} color="primary">Remover</Button>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem spacing={6} sm={6} md={6}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Lista de membros não associados a função</h4>
              <p className={classes.cardCategoryWhite}>Selecione os membros para associar a função</p>
            </CardHeader>
            <CardBody>
              <Table
                tableHeaderColor="primary"
                tableHead={["id", "nome"]}
                tableData={membersNotAssociated}
                tableSelectable={true}
                tableCheckedIndex={tableCheckedIndexNotAssociated}
                tableSetCheckedIndex={setTableCheckedIndexNotAssociated}
              />
            </CardBody>
            <CardFooter>
              <Button onClick={doAssociate} disabled={!tableCheckedIndexNotAssociated.length} color="primary">Associar</Button>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
  );
})

export default AssociateMembersFunction;