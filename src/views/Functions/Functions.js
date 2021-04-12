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
import CreateFunctions from "views/CreateFunctions/CreateFunctions";
import AssociateMembersFunction from "views/AssociateMembersFunction/AssociateMembersFunction";

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

export default function Functions(props) {
    const ref = React.useRef(null);
    const [loading, setLoading] = React.useState({ ...props.loading });
    const [newFunctionSelected, setNewFunctionSelected] = React.useState(false);
    const [functions, setFunctions] = React.useState([])
    const classes = useStyles();

    async function getFunctions() {
        setLoading(true);
        try {
            const user = UserService.getLoggedUser()
            await HttpService.getFunctions(user, props.currentMinistrieObject.id)
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

    function doCreateFunctions() {
        setNewFunctionSelected(!newFunctionSelected);
    }    

    function doAction(id) {
        ref.current.setId(id);
    }

    return (
        loading ? <LinearProgress /> :
        <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
                <Card>
                    <CardHeader color="primary">
                        <h4 className={classes.cardTitleWhite}>Lista de Funções</h4>
                    </CardHeader>
                    <CardBody>
                        <Table
                            idColumn={"id"}
                            tableAction={true}
                            doAction={doAction}
                            tableHeaderColor="primary"
                            tableHead={["id", "titulo"]}
                            tableData={functions}
                        />
                    </CardBody>
                    <CardFooter>
                        <Button onClick={doCreateFunctions} color="primary"> {newFunctionSelected ? "Ocultar Criação" : "Criar Função"} </Button>
                    </CardFooter>
                </Card>
                {newFunctionSelected ? <CreateFunctions onCreate={getFunctions} currentMinistrieId={props.currentMinistrieObject.id} /> : null}
                <AssociateMembersFunction ref={ref}/>
            </GridItem>
        </GridContainer>
    );
}
