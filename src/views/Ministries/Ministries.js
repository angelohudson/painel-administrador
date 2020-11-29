import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import AssignmentIndOutlinedIcon from '@material-ui/icons/AssignmentIndOutlined';
import FolderOutlinedIcon from '@material-ui/icons/FolderOutlined';
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
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

export default function Ministries() {
    const classes = useStyles();
    return (
        <GridContainer>
            <GridItem xs={12} sm={12} md={4}>
                <Card>
                    <CardHeader color="primary">
                        <h4 className={classes.cardTitleWhite}>Ministério de Louvor</h4>
                        <p className={classes.cardCategoryWhite}>Líder - Paulo Aquino</p>
                    </CardHeader>
                    <CardBody>
                    </CardBody>
                    <CardFooter stats={styles.stats}>
                        <div className={styles.stats}>
                            <AssignmentIndOutlinedIcon />
                            <FolderOutlinedIcon />
                        </div>
                    </CardFooter>
                </Card>
            </GridItem>
            <GridItem xs={12} sm={12} md={4}>
                <Card>
                    <CardHeader color="danger">
                        <h4 className={classes.cardTitleWhite}>Secretaria</h4>
                        <p className={classes.cardCategoryWhite}>Líder - Geska Mendes</p>
                    </CardHeader>
                    <CardBody>
                    </CardBody>
                    <CardFooter stats={styles.stats}>
                        <div className={styles.stats}>
                            <AssignmentIndOutlinedIcon />
                            <FolderOutlinedIcon />
                        </div>
                    </CardFooter>
                </Card>
            </GridItem>
            <GridItem xs={12} sm={12} md={4}>
                <Card>
                    <CardHeader color="success">
                        <h4 className={classes.cardTitleWhite}>Ministério de Jovens</h4>
                        <p className={classes.cardCategoryWhite}>Líder - Pr. Gerson Mendes</p>
                    </CardHeader>
                    <CardBody>
                    </CardBody>
                    <CardFooter stats={styles.stats}>
                        <div className={styles.stats}>
                            <AssignmentIndOutlinedIcon />
                            <FolderOutlinedIcon />
                        </div>
                    </CardFooter>
                </Card>
            </GridItem>
            <GridItem xs={12} sm={12} md={4}>
                <Card>
                    <CardHeader color="success">
                        <h4 className={classes.cardTitleWhite}>Ministério Infantil</h4>
                        <p className={classes.cardCategoryWhite}>Líder - Geska Mendes</p>
                    </CardHeader>
                    <CardBody>
                    </CardBody>
                    <CardFooter stats={styles.stats}>
                        <div className={styles.stats}>
                            <AssignmentIndOutlinedIcon />
                            <FolderOutlinedIcon />
                        </div>
                    </CardFooter>
                </Card>
            </GridItem>
            <GridItem xs={12} sm={12} md={4}>
                <Card>
                    <CardHeader color="primary">
                        <h4 className={classes.cardTitleWhite}>Coral</h4>
                        <p className={classes.cardCategoryWhite}>Líder - Gizelle Mendes</p>
                    </CardHeader>
                    <CardBody>
                    </CardBody>
                    <CardFooter stats={styles.stats}>
                        <div className={styles.stats}>
                            <AssignmentIndOutlinedIcon />
                            <FolderOutlinedIcon />
                        </div>
                    </CardFooter>
                </Card>
            </GridItem>
        </GridContainer>
    );
}
