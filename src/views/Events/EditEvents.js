import React from "react";

import { LinearProgress } from "@material-ui/core";
import GridContainer from "components/Grid/GridContainer.js";


export default function EditEvents(props) {
    const [loading, setLoading] = React.useState({ ...props.loading });
    const [id, setId] = React.useState(null)

    async function getEvents() {
    }

    function formatDate(date) {
        return new Date(date).toLocaleDateString("pt-Br");
    }

    React.useEffect(() => {
        if (props.match.params) {
            console.log(props.match.params.id);
            setId(props.match.params.id);
            setLoading(false);
        }
        getEvents();
    }, []);

    return (
        loading ? <LinearProgress /> :
            <GridContainer>
                {id}
            </GridContainer>
    );
}
