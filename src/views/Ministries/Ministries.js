import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import FolderOutlinedIcon from '@material-ui/icons/FolderOutlined';
import LinearProgress from '@material-ui/core/LinearProgress';

// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardActionArea from '@material-ui/core/CardActionArea';
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import {
    grayColor,
} from "assets/jss/material-dashboard-react.js";

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
    }
};

const useStyles = makeStyles(styles);

export default function Ministries(props) {
    const classes = useStyles();
    const [ministries, setMinistries] = React.useState({ ...props.ministries });
    const [loading, setLoading] = React.useState({ ...props.loading });

    React.useEffect(() => {
        props.changeMinistrie("None");
    }, [])

    React.useEffect(() => {
        setMinistries(props.ministries);
    }, [props.ministries])

    React.useEffect(() => {
        setLoading(props.loading);
    }, [props.loading])

    return (
        loading ?
            <LinearProgress /> :
            <GridContainer>
                {ministries.map((value, index) => {
                    return (
                        <GridItem key={index} xs={12} sm={12} md={4}>
                            <Card >
                                <CardActionArea onClick={() => props.changeMinistrie(value.titulo)}>
                                    <CardHeader color="primary">
                                        <h4 className={classes.cardTitleWhite}>{value.titulo}</h4>
                                    </CardHeader>
                                    <CardBody>
                                    </CardBody>
                                    <CardFooter stats={styles.stats}>
                                        <div className={styles.stats}>
                                            <FolderOutlinedIcon />
                                        </div>
                                    </CardFooter>
                                </CardActionArea>
                            </Card>
                        </GridItem>)
                })}
            </GridContainer>
    );
}
