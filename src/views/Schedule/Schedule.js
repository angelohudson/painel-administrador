import React from "react";
// @material-ui/core components
import { LinearProgress, Table, TableBody, TableCell, TableHead, TableRow } from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import BuildIcon from '@material-ui/icons/Build';
import AddIcon from '@material-ui/icons/Add';
import AppsIcon from '@material-ui/icons/Apps';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import Group from '@material-ui/icons/Group';
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import { NotificationManager } from "react-notifications";
import CustomSelect from "components/CustomInput/CustomSelect";
import FunctionSelect from "components/CustomInput/FunctionSelect";
import Button from "components/CustomButtons/Button.js";
// services
import UserService from 'services/userService';
import HttpService from 'services/httpService';

export default function Schedule(props) {
  const { currentMinistrieObject, addMeberFunctions, clearMeberFunctions } = props;
  const [loading, setLoading] = React.useState({ ...props.loading });
  const [schedules, setSchedules] = React.useState([]);
  const [functions, setFunctions] = React.useState([]);
  const [groups, setGroups] = React.useState([]);
  const [apportionmentType, setApportionmentType] = React.useState("group");

  async function getFunctions() {
    setLoading(true);
    try {
      const user = UserService.getAccessToken();
      await HttpService.getFunctions(user, currentMinistrieObject.id)
        .then((response) => {
          setFunctions(response.data);
          setLoading(false);
        });
    } catch (e) {
      console.log(e.message);
      NotificationManager.warning(e.message);
    }
  }

  async function getGroups() {
    setLoading(true);
    try {
      const user = UserService.getAccessToken()
      await HttpService.getGroups(user, currentMinistrieObject.id)
        .then((response) => {
          setGroups(response.data);
          setLoading(false);
        });
    } catch (e) {
      console.log(e.message);
      NotificationManager.warning(e.message);
    }
  }

  function addSchedule(selected) {
    let schedule = {};
    if (apportionmentType == 'function') {
      if (!selected) return;
      schedule = functions.filter((f) => f.id == selected)[0];
    } else if (apportionmentType == 'group') {
      if (!selected) return;
      let name = groups.filter((f) => f.id == selected)[0].titulo;
      schedule = { titulo: name, type: 'group', id: selected };
    } else if (apportionmentType == 'minister') {
      schedule = { titulo: currentMinistrieObject.titulo, type: 'minister', id: currentMinistrieObject.id };
    }
    setSchedules([...schedules, schedule]);
  }

  function doRemoveLatest() {
    setSchedules(schedules.slice(0, -1));
  }

  function getGroupSelector(index, id, title) {
    if (apportionmentType == 'function') {
      return <FunctionSelect addMeberFunctions={addMeberFunctions} functionTitle={title} type={apportionmentType} id={index} functionId={id} />
    } else if (apportionmentType == 'group') {
      return <FunctionSelect addMeberFunctions={addMeberFunctions} functionTitle={title} type={apportionmentType} id={index} groupId={id} />
    } else if (apportionmentType == 'minister') {
      return <FunctionSelect addMeberFunctions={addMeberFunctions} functionTitle={title} type={apportionmentType} id={index} ministerId={id} />
    }
  }

  function getSearchMethod() {
    if (apportionmentType == 'function') {
      return <CustomSelect
        formControlProps={{
          fullWidth: true
        }}
        itens={functions.map((f) => { return { id: f.id, value: f.titulo }; })}
        name="Funções"
        id="function"
        onChange={addSchedule}
      />
    } else if (apportionmentType == 'group') {
      return <CustomSelect
        formControlProps={{
          fullWidth: true
        }}
        itens={groups.map((f) => { return { id: f.id, value: f.titulo }; })}
        name="Grupos"
        id="group"
        onChange={addSchedule}
      />;
    } else if (apportionmentType == 'minister') {
      return <Button color="primary" startIcon={<AddIcon />} onClick={addSchedule}> Add </Button>
    }
  }

  function handleChange(event, value) {
    if (value) {
      clearMeberFunctions();
      setSchedules([]);
      setApportionmentType(value);
    }
  }

  React.useEffect(() => {
    getFunctions();
    getGroups();
  }, []);

  return (
    <div>
      {loading ? <LinearProgress /> :
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <ToggleButtonGroup value={apportionmentType} exclusive onChange={handleChange}>
                      <ToggleButton value="function" aria-label="module"> <BuildIcon /> </ToggleButton>
                      <ToggleButton value="group" aria-label="list"> <Group /> </ToggleButton>
                      <ToggleButton value="minister" aria-label="list"> <AppsIcon /> </ToggleButton>
                    </ToggleButtonGroup>
                  </TableCell>
                  <TableCell width="70%" fullWidth="70%">
                    {getSearchMethod()}
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {schedules.map((s, index) => {
                  return getGroupSelector(index, s.id, s.titulo)
                })}
              </TableBody>
            </Table>
            {schedules.length == 0 ? null :
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <Button color="danger" startIcon={<DeleteIcon />} onClick={doRemoveLatest}> Remove </Button>
                </GridItem>
              </GridContainer>}
          </GridItem>
        </GridContainer>
      }
    </div>
  );
}