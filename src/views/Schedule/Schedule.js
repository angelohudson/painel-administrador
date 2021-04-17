import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import DeleteIcon from '@material-ui/icons/Delete';
import { LinearProgress, Table, TableBody, TableCell, TableHead, TableRow } from "@material-ui/core";
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
  const { onAddSchedule, currentMinistrieObject, addMeberFunctions } = props;
  const [schedules, setSchedules] = React.useState([]);
  const [loading, setLoading] = React.useState({ ...props.loading });
  const [functions, setFunctions] = React.useState([]);
  const meberFunctions = props.meberFunctions;

  function addFunction(selected) {
    if (!selected)
      return;
    let schedule = functions.filter((f) => f.id == selected)[0];
    setSchedules([...schedules, schedule]);
    onAddSchedule(schedule);
  }

  function doRemoveLatest() {
    setSchedules(schedules.slice(0, -1));
  }

  async function getFunctions() {
    setLoading(true);
    try {
      const user = UserService.getLoggedUser()
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

  React.useEffect(() => {
    getFunctions();
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
                    Id
                  </TableCell>
                  <TableCell width="70%" fullWidth="70%">
                    <CustomSelect
                      formControlProps={{
                        fullWidth: true
                      }}
                      itens={functions.map((f) => { return { id: f.id, value: f.titulo }; })}
                      name="Funções"
                      id="function"
                      onChange={addFunction}
                    />
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  schedules.map((s, index) => {
                    return <TableRow>
                      <TableCell>{s.titulo}</TableCell>
                      <TableCell width="70%" fullWidth="70%">
                        <FunctionSelect id={index} addMeberFunctions={addMeberFunctions} functionId={s.id} setMember={function (val) { console.log(val) }} />
                      </TableCell>
                    </TableRow>
                  })
                }
              </TableBody>
            </Table>
            {
              schedules.length == 0 ? null :
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <Button color="danger" startIcon={<DeleteIcon />} onClick={doRemoveLatest}> Remove </Button>
                  </GridItem>
                </GridContainer>
            }
          </GridItem>
        </GridContainer>
      }
    </div>
  );
}