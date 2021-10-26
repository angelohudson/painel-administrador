import React from "react";

import CardActionArea from '@material-ui/core/CardActionArea';
import { makeStyles } from "@material-ui/core/styles";
import { LinearProgress } from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import AssignmentIcon from '@material-ui/icons/Assignment';
import IconButton from '@material-ui/core/IconButton';

import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import CustomInput from "components/CustomInput/CustomInput";
import Button from "components/CustomButtons/Button.js";

import UserService from 'services/userService';
import HttpService from 'services/httpService';
import EventService from 'services/eventService';
import { NotificationManager } from 'react-notifications';

import { grayColor } from "assets/jss/material-dashboard-react.js";
import { OperationCanceledException } from "typescript";

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
    subtitle: {
        color: '#6a6868',
        fontWeight: 700,
        fontSize: 15,
    },
    description: {
        color: 'gray',
        fontSize: 12
    },
    stats: {
        color: grayColor[0],
        display: "inline-flex",
        fontSize: "25px",
        lineHeight: "44px",
        "& svg": {
            top: "4px",
            width: "25px",
            height: "25px",
            position: "relative",
            marginRight: "3px",
            marginLeft: "3px"
        },
        "& .fab,& .fas,& .far,& .fal,& .material-icons": {
            top: "4px",
            fontSize: "25px",
            width: "25px",
            height: "25px",
            position: "relative",
            marginRight: "3px",
            marginLeft: "3px"
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
    },
    cardFooter: {
        justifyContent: "space-between"
    },
    body: {
        justifyContent: "end"
    }
};

const useStyles = makeStyles(styles);

export default function Events(props) {
    const [loading, setLoading] = React.useState({ ...props.loading });
    const [events, setEvents] = React.useState([])
    const [beginDate, setBeginDate] = React.useState(new Date());
    const [endDate, setEndDate] = React.useState(new Date());
    const classes = useStyles();

    async function getEvents() {
        let beginDateStr = beginDate.getFullYear() + "-" + (beginDate.getMonth() < 9 ? "0" : "") + (beginDate.getMonth() + 1) + "-" + (beginDate.getDate() < 10 ? "0" : "") + beginDate.getDate() + "T" + '00:00:00';
        let endDateStr = endDate.getFullYear() + "-" + (endDate.getMonth() < 9 ? "0" : "") + (endDate.getMonth() + 1) + "-" + (endDate.getDate() < 10 ? "0" : "") + endDate.getDate() + "T" + '23:59:59';
        setLoading(true);
        try {
            const user = UserService.getLoggedUser()
            await HttpService.getEvents(user, props.currentMinistrieObject.id, beginDateStr, endDateStr)
                .then((response) => {
                    setEvents(response.data);
                    setLoading(false);
                });
        } catch (e) {
            console.log(e.message);
            NotificationManager.warning(e.message);
        }
    }

    function removeEvent(id) {
        const user = UserService.getLoggedUser();
        setLoading(true);
        EventService.deleteEvent(user, id).then((response) => {
            getEvents();
        });
    }

    function formatDate(date) {
        return new Date(date).toLocaleDateString("pt-Br");
    }

    React.useEffect(() => {
        setLoading(false);
    }, []);

    return (
        loading ? <LinearProgress /> :
            <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                    <Card>
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
                                    <Button onClick={function () { getEvents(); }} color="primary">Pesquisar</Button>
                                </GridItem>
                            </GridContainer>
                        </CardBody>
                    </Card>
                </GridItem>
                {events.map((value, index) => {
                    return (<GridItem key={index} xs={12} sm={12} md={4}>
                        <Card >
                            <CardActionArea onClick={() => props.history.push("/admin/edit-event/" + value.id)}>
                                <CardHeader color="primary">
                                    <h4 className={classes.cardTitleWhite}>{value.titulo}</h4>
                                </CardHeader>
                                <CardBody className={classes.cardFooter}>
                                    <div className={classes.subtitle}>{value.subtitulo}</div>
                                    <div className={classes.description}>{value.descricao}</div>
                                </CardBody>
                            </CardActionArea>
                            <CardFooter className={classes.cardFooter} stats={styles.stats}>
                                <div className={classes.description}>
                                    {formatDate(value.data)}
                                </div>
                                <IconButton onClick={function () { removeEvent(value.id) }} aria-label="delete" color="danger">
                                    <DeleteIcon />
                                </IconButton>
                            </CardFooter>
                        </Card>
                    </GridItem>)
                })}
            </GridContainer>
    );
}
