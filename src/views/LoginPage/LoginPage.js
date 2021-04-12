import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import People from "@material-ui/icons/People";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";
import CustomInput from "components/CustomInput/CustomInput.js";

import image from "assets/img/cover.jpg";

import UserService from 'services/userService';
import HttpService from 'services/httpService';
import { NotificationManager } from 'react-notifications';
import { cpfMask } from 'utils/mask';

import styles from "assets/jss/material-dashboard-react/views/loginPage.js";

const useStyles = makeStyles(styles);

export default function LoginPage({ ...rest }) {
    const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
    setTimeout(function () {
        setCardAnimation("");
    }, 500);
    const classes = useStyles();
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [loading, setLoading] = React.useState(false);
    React.useEffect(() => {
        UserService.logout();
    }, []);

    async function handleSubmit() {
        setLoading(true);
        const user = { username: username, password: password };
        try {
            await HttpService.login(user)
                .then((response) => {
                    UserService.saveLoggedUser(user);
                    NotificationManager.success('Bem vindo!');
                    setLoading(false);
                    rest.history.push('/');
                });
        } catch (e) {
            setLoading(false);
            console.log(e.message);
        }
    }

    return (
        <div>
            <div
                className={classes.pageHeader}
                style={{
                    backgroundImage: "url(" + image + ")",
                    backgroundSize: "cover",
                    backgroundPosition: "top center"
                }}
            >
                <div className={classes.container}>
                    <GridContainer justify="center">
                        <GridItem xs={12} sm={8} md={4}>
                            <Card className={classes[cardAnimaton]}>
                                <CardHeader color="primary" className={classes.cardHeader} >
                                    <h4>Login</h4>
                                </CardHeader>
                                <CardBody>
                                    <CustomInput
                                        labelText="CPF"
                                        id="first"
                                        formControlProps={{
                                            fullWidth: true
                                        }}

                                        inputProps={{
                                            type: "text",
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <People className={classes.inputIconsColor} />
                                                </InputAdornment>
                                            ),
                                            onChange: (event => setUsername(cpfMask(event.target.value))),
                                            value: username
                                        }}
                                    />
                                    <CustomInput
                                        labelText="Senha"
                                        id="pass"
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                        onChange={event => setPassword(event.target.value)}
                                        value={password}
                                        inputProps={{
                                            type: "password",
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <Icon className={classes.inputIconsColor}>
                                                        lock_outline
                                                    </Icon>
                                                </InputAdornment>
                                            ),
                                            autoComplete: "off",
                                            onChange: (event => setPassword(event.target.value)),
                                            value: password
                                        }}
                                    />
                                </CardBody>
                                <CardFooter className={classes.cardFooter}>
                                    <Button simple color="primary" size="lg" onClick={handleSubmit}>
                                        Entrar
                                    </Button>
                                </CardFooter>
                            </Card>
                        </GridItem>
                    </GridContainer>
                </div>
            </div>
        </div>
    );
}
