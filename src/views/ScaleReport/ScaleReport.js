import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
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
import CustomInput from "components/CustomInput/CustomInput";

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

export default function ScaleReport(props) {
  const [loading, setLoading] = React.useState({ ...props.loading });
  const [scale, setScale] = React.useState([]);
  const [beginDate, setBeginDate] = React.useState(new Date());
  const [endDate, setEndDate] = React.useState(new Date());
  const classes = useStyles();

  async function getScale() {
    setLoading(true);
    let beginDateStr = beginDate.toISOString().slice(0, 10) + "T" + '00:00:00';
    let endDateStr = endDate.toISOString().slice(0, 10) + "T" + '23:59:59';
    try {
      const user = UserService.getAccessToken();
      await HttpService.getActivitiesByPeriod(user, props.currentMinistrieObject.id, beginDateStr, endDateStr)
        .then((response) => {
          setScale(response.data.filter((task) => task.funcaoEscala !== null).map(task => {
            return {
              titulo: task.evento.titulo,
              data: new Date(task.evento.data).toLocaleDateString("pt-Br") + " " + new Date(task.evento.data).toLocaleTimeString("pt-Br"),
              funcao: task.funcaoEscala,
              nome: task.membro.nome,
              status: task.status === 'DEFAULT' ? "AGUARDANDO" : task.status,
              justificativa: task.justificativa !== null ? task.justificativa : "",
            };
          }));
          setLoading(false);
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
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Escala</h4>
          </CardHeader>
          <CardBody>
            <GridContainer>
              <GridItem xs={12} sm={12} md={6}>
                <CustomInput
                  id="beginDate"
                  type="date"
                  labelDate="Data Inicial"
                  selectedDate={beginDate}
                  handleDateChange={setBeginDate}
                  format="dd/MM/yyyy"
                  formControlProps={{
                    fullWidth: true
                  }}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={6}>
                <CustomInput
                  id="endDate"
                  type="date"
                  labelDate="Data Final"
                  selectedDate={endDate}
                  handleDateChange={setEndDate}
                  format="dd/MM/yyyy"
                  formControlProps={{
                    fullWidth: true
                  }}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={2}>
                <Button onClick={getScale} color="primary">Pesquisar</Button>
              </GridItem>
            </GridContainer>
            <GridContainer>
              <GridItem xs={12} sm={12} md={12}>
                {loading ?
                  <LinearProgress /> :
                  <Table
                    idColumn={"id"}
                    tableActions={[]}
                    tableHeaderColor="primary"
                    tableHead={["titulo", "data", "funcao", "nome", "justificativa", "status"]}
                    tableData={scale}
                  />}
              </GridItem>
            </GridContainer>
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}
