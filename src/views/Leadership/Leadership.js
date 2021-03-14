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

export default function Leadership(props) {
    const [loading, setLoading] = React.useState({ ...props.loading });
    const [leaders, setLeaders] = React.useState([])
    const classes = useStyles();

    async function getLeaders() {
        setLoading(true);
        try {
            const user = UserService.getLoggedUser()
            await HttpService.getLeadership(user)
                .then((response) => {
                    setLeaders(response.data.filter(function (leader) {
                        return leader.ministerioDto.id === props.currentMinistrieObject.id;
                    }).map(function (leader) {
                        return leader.membroDto;
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
        getLeaders();
    }, []);

    function doCreateGroup() {
        props.history.push('/admin/add-leaders');
    }

    return (
        loading ?
            <LinearProgress /> :
            <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                    <Card>
                        <CardHeader color="primary">
                            <h4 className={classes.cardTitleWhite}>Liderança</h4>
                            <p className={classes.cardCategoryWhite}>Lista de líderes do ministério</p>
                        </CardHeader>
                        <CardBody>
                            <Table
                                tableHeaderColor="primary"
                                tableHead={["nome", "email", "nascimento"]}
                                tableData={leaders}
                            />
                        </CardBody>
                        <CardFooter>
                            <Button onClick={doCreateGroup} color="primary">Adicionar Líderes</Button>
                        </CardFooter>
                    </Card>
                </GridItem>
            </GridContainer>
    );
}
