import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// import InputLabel from "@material-ui/core/InputLabel";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
// import CardAvatar from "components/Card/CardAvatar.js";
import UserService from 'services/userService';
import HttpService from 'services/httpService';
import { NotificationManager } from "react-notifications";
import { LinearProgress, Table, TableBody, TableCell, TableHead, TableRow } from "@material-ui/core";
import CustomSelect from "components/CustomInput/CustomSelect";

// import avatar from "assets/img/faces/gerson.jpg";

export default function Schedule(props) {
  const { onAddSchedule, currentMinistrieObject } = props;
  const [schedules, setSchedules] = React.useState([]);
  const [loading, setLoading] = React.useState({ ...props.loading });
  const [functions, setFunctions] = React.useState([]);

  function addFunction(selected) {
    let schedule = {id:selected};
    setSchedules([...schedules, schedule]);
    onAddSchedule(schedule);
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
      {loading ? <LinearProgress/> :
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
          </GridItem>
          <GridItem xs={12} sm={12} md={12}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    Id
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  schedules.map((s) =>{
                    return <TableRow>
                    <TableCell>
                      <CustomSelect 
                        formControlProps={{
                          fullWidth: true
                        }}
                        itens = {functions.map((f) => { return {id: f.id, value: f.titulo}; })}
                        name = "Funções"
                        id = "function"
                        onChange = {addFunction}
                      />
                    </TableCell>
                    <TableCell>
                      <CustomSelect 
                        formControlProps={{
                          fullWidth: true
                        }}
                        itens = {functions.map((f) => { return {id: f.id, value: f.titulo}; })}
                        name = "Funções"
                        id = "function"
                        onChange = {addFunction}
                      />
                    </TableCell>
                    </TableRow>
                  })
                }
              </TableBody>
            </Table>
          </GridItem>
        </GridContainer>
      }
    </div>
  );
}
