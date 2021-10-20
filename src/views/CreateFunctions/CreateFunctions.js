import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// import InputLabel from "@material-ui/core/InputLabel";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import { LinearProgress } from "@material-ui/core";

import { nameMask } from 'utils/mask';

import UserService from 'services/userService';
import HttpService from 'services/httpService';
import { NotificationManager } from 'react-notifications';

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

export default function CreateFunction(props) {
  const { currentMinistrieId, onCreate } = props
  const [functionName, setFunctionName] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const classes = useStyles();

  async function doCreateFunction() {
    setLoading(true);
    try {
      const user = UserService.getLoggedUser()
      await HttpService.createFunction(user, currentMinistrieId, functionName)
        .then((response) => {
          setLoading(false);
          onCreate();
        });
    } catch (e) {
      console.log(e.message);
      NotificationManager.warning(e.message);
      setLoading(false);
    }
  }

  return (
    loading ? <LinearProgress /> :
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Criar Função</h4>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <CustomInput
                    labelText="Título do Função"
                    id="function"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      type: "text",
                      onChange: (event => setFunctionName(nameMask(event.target.value))),
                      value: functionName
                    }}
                  />
                </GridItem>
              </GridContainer>
            </CardBody>
            <CardFooter>
              <Button onClick={doCreateFunction} disabled={!functionName.length} color="primary">Cadastrar Função</Button>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
