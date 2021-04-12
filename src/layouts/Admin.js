import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
// creates a beautiful scrollbar
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import Navbar from "components/Navbars/Navbar.js";
import Footer from "components/Footer/Footer.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import FixedPlugin from "components/FixedPlugin/FixedPlugin.js";

import secretaryRoute from "routes/secretary.js";
import mainRoute from "routes/main.js";
import commonRoute from "routes/common.js"

import UserService from 'services/userService';
import HttpService from 'services/httpService';
import { NotificationManager } from 'react-notifications';

import styles from "assets/jss/material-dashboard-react/layouts/adminStyle.js";

import bgImage from "assets/img/sidebar-2.jpg";
import logo from "assets/img/logo.png";

let ps;

const useStyles = makeStyles(styles);

export default function Admin({ ...rest }) {
    // styles
    const classes = useStyles();
    // ref to help us initialize PerfectScrollbar on windows devices
    const mainPanel = React.createRef();
    // states and functions
    const [image, setImage] = React.useState(bgImage);
    const [color, setColor] = React.useState("blue");
    const [loading, setLoading] = React.useState(true);
    const [fixedClasses, setFixedClasses] = React.useState("dropdown");
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [ministries, setMinistries] = React.useState([]);
    const [routes, setRoutes] = React.useState(mainRoute);
    const [currentMinistrie, setCurrentMinistrie] = React.useState("None");
    const [currentMinistrieObject, setCurrentMinistrieObject] = React.useState({});

    const handleImageClick = image => {
        setImage(image);
    };
    const handleColorClick = color => {
        setColor(color);
    };
    const handleFixedClick = () => {
        if (fixedClasses === "dropdown") {
            setFixedClasses("dropdown show");
        } else {
            setFixedClasses("dropdown");
        }
    };
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const resizeFunction = () => {
        if (window.innerWidth >= 960) {
            setMobileOpen(false);
        }
    };
    // verifies if routeName is the one active (in browser input)
    function activeRoute(routeName) {
        return window.location.href.indexOf(routeName) > -1 ? true : false;
    }

    function changeMinistrie(ministrie) {
        setCurrentMinistrie(ministrie);
        if (ministrie === "None") {
            setRoutes(mainRoute);
            setCurrentMinistrieObject({});
        }
        else
        {
            setCurrentMinistrieObject(ministries.find(x => x.titulo == ministrie));
        }
        if (ministrie === "Secretaria") {
            setRoutes(commonRoute.concat(secretaryRoute));
            rest.history.push('/admin/ministrie')
        }
        if (ministrie !== "None" && ministrie !== "Secretaria") {
            setRoutes(commonRoute);
            rest.history.push('/admin/ministrie')
        }
    }

    async function getMinistries() {
        try {
            const user = UserService.getLoggedUser()
            await HttpService.getMinistries(user)
                .then((response) => {
                    setMinistries(response.data);
                    setLoading(false);
                });
        } catch (e) {
            console.log(e.message);
            NotificationManager.warning(e.message);
        }
    }

    // initialize and destroy the PerfectScrollbar plugin
    React.useEffect(() => {
        if (navigator.platform.indexOf("Win") > -1) {
            ps = new PerfectScrollbar(mainPanel.current, {
                suppressScrollX: true,
                suppressScrollY: false
            });
            document.body.style.overflow = "hidden";
        }
        window.addEventListener("resize", resizeFunction);
        // Specify how to clean up after this effect:
        return function cleanup() {
            if (navigator.platform.indexOf("Win") > -1) {
                ps.destroy();
            }
            window.removeEventListener("resize", resizeFunction);
        };
    }, [mainPanel]);

    React.useEffect(() => {
        if (!UserService.hasLoggedUser()) {
            rest.history.push('/login')
            NotificationManager.warning('Por favor, autentique-se');
            return
        }
        getMinistries();
    }, []);
    return (
        <div className={classes.wrapper}>
            <Sidebar
                routes={routes}
                logoText={"Ad Timbó"}
                logo={logo}
                image={image}
                handleDrawerToggle={handleDrawerToggle}
                open={mobileOpen}
                color={color}
                ministrie={currentMinistrie}
                {...rest}
            />
            <div className={activeRoute("admin/ministries") ? classes.ministriesPanel : classes.mainPanel} ref={mainPanel}>
                <Navbar
                    routes={routes}
                    handleDrawerToggle={handleDrawerToggle}
                    ministrie={ministries}
                    {...rest}
                />
                {/* On the /maps route we want the map to be on full screen - this is not possible if the content and conatiner classes are present because they have some paddings which would make the map smaller */}
                <div className={classes.content}>
                    <div className={classes.container}>
                        <Switch>
                            {routes.map((prop, key) => {
                                if (prop.layout === "/admin") {
                                    return (
                                        <Route
                                            path={prop.layout + prop.path}
                                            render={() => (<prop.component loading={true} loading={loading} ministries={ministries} changeMinistrie={changeMinistrie} currentMinistrieObject={currentMinistrieObject} history={rest.history} />)}
                                            key={key}
                                        />
                                    );
                                }
                                return null;
                            })}
                            <Redirect from="/admin" to="/admin/ministries" />
                        </Switch>
                    </div>
                </div>
                <Footer />
                <FixedPlugin
                    handleImageClick={handleImageClick}
                    handleColorClick={handleColorClick}
                    bgColor={color}
                    bgImage={image}
                    handleFixedClick={handleFixedClick}
                    fixedClasses={fixedClasses}
                />
            </div>
        </div>
    );
}
