import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { LinearProgress } from "@material-ui/core";
import ScheduleIcon from '@material-ui/icons/Schedule';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import Group from '@material-ui/icons/Group';
// import InputLabel from "@material-ui/core/InputLabel";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import CustomSelect from "components/CustomInput/CustomSelect.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import UserService from 'services/userService';
import HttpService from 'services/httpService';
import { NotificationManager } from "react-notifications";
import Schedule from "views/Schedule/Schedule";
import { validate } from "email-validator";

// import avatar from "assets/img/faces/gerson.jpg";

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  }
};

const useStyles = makeStyles(styles);

export default function Activities(props) {
  const [loading, setLoading] = React.useState({ ...props.loading });
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const [selectedEndDate, setSelectedEndDate] = React.useState(new Date());
  const [groups, setGroups] = React.useState([]);
  const [groupId, setGroupId] = React.useState("");
  const [apportionmentType, setApportionmentType] = React.useState("group");
  const classes = useStyles();
  let meberFunctions = new Map();

  function handleChange(event, value) {
    if (value)
      setApportionmentType(value);
  }

  function addMeberFunctions(index, memberId) {
    meberFunctions.set(index, memberId);
  }

  function clearMeberFunctions(index, meberFunctionsId) {
    meberFunctions = new Map();
  }

  async function getGroups() {
    setLoading(true);
    try {
      const user = UserService.getLoggedUser()
      await HttpService.getGroups(user, props.currentMinistrieObject.id)
        .then((response) => {
          setGroups(response.data);
          setLoading(false);
        });
    } catch (e) {
      console.log(e.message);
      NotificationManager.warning(e.message);
      setLoading(false);
    }
  }

  async function doRegister() {
    if (!validate())
      return;
    setLoading(true);
    try {
      const user = UserService.getLoggedUser()
      if (apportionmentType == 'group') {
        if (groupId) {
          await HttpService.addActivitiesByGroup(user, groupId, getActitvity()).then((response) => { setLoading(false); setGroupId(""); });
        } else {
          await HttpService.addActivities(user, props.currentMinistrieObject.id, getActitvity()).then((response) => setLoading(false));
        }
      } else if (apportionmentType == 'schedule') {
        await HttpService.addSchedule(user, props.currentMinistrieObject.id, getSchedule()).then((response) => setLoading(false));
      }
    } catch (e) {
      console.log(e.message);
      NotificationManager.warning(e.message);
      setLoading(false);
    }
  }

  function validate() {
    if (!document.getElementById("description").value) {
      NotificationManager.warning("Campo descrição não preenchido");
      return false;
    }
    if (!document.getElementById("sub-title").value) {
      NotificationManager.warning("Campo sub-título não preenchido");
      return false;
    }
    if (!document.getElementById("title").value) {
      NotificationManager.warning("Campo título não preenchido");
      return false;
    }
    if (!selectedDate.toISOString()) {
      NotificationManager.warning("Campo data não preenchido");
      return false;
    }
    if (!selectedEndDate.toISOString()) {
      NotificationManager.warning("Campo data final não preenchido");
      return false;
    }

    return true;
  }

  function getSchedule() {
    console.log(meberFunctions);
    return {
      funcao: Array.from(meberFunctions.keys()).map((index) => {
        let funcaoTitle = document.getElementById(index + "function-name");
        let memberId = meberFunctions.get(index);
        if (memberId && funcaoTitle) {
          return {
            funcaoTitulo: funcaoTitle.value,
            membroId: memberId,
          }
        } else {
          return false;
        }
      }).filter(v => v),
      task: {
        dataInicio: selectedDate.toLocaleDateString("pt-Br"),
        dataFim: selectedEndDate.toLocaleDateString("pt-Br"),
        descricao: document.getElementById("description").value,
        subtitulo: document.getElementById("sub-title").value,
        titulo: document.getElementById("title").value
      },
    };
  }

  function getActitvity() {
    var activity = {
      dataInicio: selectedDate.toLocaleDateString("pt-Br") + "T" + selectedDate.toLocaleTimeString("pt-br"),
      dataFim: selectedEndDate.toLocaleDateString("pt-Br") + "T" + selectedEndDate.toLocaleTimeString("pt-br"),
      descricao: document.getElementById("description").value,
      subtitulo: document.getElementById("sub-title").value,
      titulo: document.getElementById("title").value
    };
    return activity;
  }

  React.useEffect(() => {
    getGroups();
  }, []);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleEndDateChange = (date) => {
    setSelectedEndDate(date);
  };

  return (
    <div>
      {loading ? <LinearProgress /> :
        < GridContainer >
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>Cadastrar Atividade</h4>
                <p className={classes.cardCategoryWhite}>Preencha as informações da atividade</p>
              </CardHeader>
              <CardBody>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <CustomInput
                      labelText="Título da Atividade"
                      id="title"
                      formControlProps={{
                        fullWidth: true
                      }}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={3}>
                    <CustomInput
                      id="beginDate"
                      type="date"
                      selectedDate={selectedDate}
                      labelDate="Data de inicio da atividade"
                      handleDateChange={handleDateChange}
                      format="dd/MM/yyyy HH:mm"
                      formControlProps={{
                        fullWidth: true
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={3}>
                    <CustomInput
                      id="endDate"
                      type="date"
                      selectedDate={selectedEndDate}
                      labelDate="Data de fim da atividade"
                      handleDateChange={handleEndDateChange}
                      format="dd/MM/yyyy HH:mm"
                      formControlProps={{
                        fullWidth: true
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="Sub título"
                      id="sub-title"
                      formControlProps={{
                        fullWidth: true
                      }}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <CustomInput
                      labelText="Descrição da atividade"
                      id="description"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        multiline: true,
                        rows: 5
                      }}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={3}>
                    <ToggleButtonGroup value={apportionmentType} exclusive onChange={handleChange}>
                      <ToggleButton value="group" aria-label="list"> <Group /> </ToggleButton>
                      <ToggleButton value="schedule" aria-label="module"> <ScheduleIcon /> </ToggleButton>
                    </ToggleButtonGroup>
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    {apportionmentType == 'group' ?
                      <CustomSelect
                        formControlProps={{
                          fullWidth: true
                        }}
                        itens={groups.map((g) => { return { id: g.id, value: g.titulo }; })}
                        name="Grupos"
                        id="groups"
                        onChange={setGroupId}
                      /> :
                      <Schedule clearMeberFunctions={clearMeberFunctions} addMeberFunctions={addMeberFunctions} currentMinistrieObject={props.currentMinistrieObject} />
                    }
                  </GridItem>
                </GridContainer>
              </CardBody>
              <CardFooter>
                <Button color="primary" onClick={doRegister}>Cadastrar</Button>
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>}
    </div >
  );
}
