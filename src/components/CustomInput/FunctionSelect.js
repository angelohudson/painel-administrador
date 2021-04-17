
import { NotificationManager } from "react-notifications";
import React from "react";
// services
import UserService from 'services/userService';
import HttpService from 'services/httpService';
import { LinearProgress } from "@material-ui/core";
// components
import CustomSelect from "./CustomSelect";

export default function FunctionSelect(props) {
    const { functionId, addMeberFunctions, id } = props;
    const [loading, setLoading] = React.useState({ ...props.loading });
    const [members, setMembers] = React.useState([]);

    async function getMebersByFunctionId() {
        try {
            setLoading(true);
            const user = UserService.getLoggedUser();
            await HttpService.getMembersByFunction(user, functionId)
                .then((response) => {
                    setMembers(response.data);
                    setLoading(false);
                });
        } catch (e) {
            console.log(e.message);
            NotificationManager.warning(e.message);
        }
    }

    React.useEffect(() => {
        getMebersByFunctionId();
    }, []);

    return <div>
        {loading ? <LinearProgress /> :
            <CustomSelect
                formControlProps={{
                    fullWidth: true
                }}
                itens={members.map((f) => { return { id: f.id, value: f.membro.nome }; })}
                name="Membros"
                id="id"
                onChange={function (value) { addMeberFunctions(id, value) }}
            />
        }
    </div>
}
