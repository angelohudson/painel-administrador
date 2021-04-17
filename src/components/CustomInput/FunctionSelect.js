
import { NotificationManager } from "react-notifications";
import React from "react";
// services
import UserService from 'services/userService';
import HttpService from 'services/httpService';
import { LinearProgress } from "@material-ui/core";
// components
import CustomSelect from "./CustomSelect";

export default function FunctionSelect(props) {
    const { groupId, ministerId, functionId, type, addMeberFunctions, id } = props;
    const [loading, setLoading] = React.useState({ ...props.loading });
    const [members, setMembers] = React.useState([]);

    async function getMebersByFunctionId() {
        try {
            setLoading(true);
            const user = UserService.getLoggedUser();
            await HttpService.getMembersByFunction(user, functionId)
                .then((response) => {
                    setMembers(response.data.map((f) => f.membro));
                    setLoading(false);
                });
        } catch (e) {
            console.log(e.message);
            NotificationManager.warning(e.message);
        }
    }

    async function getMebersByGroupId() {
        try {
            setLoading(true);
            const user = UserService.getLoggedUser();
            await HttpService.getMembersByGroup(user, groupId)
                .then((response) => {
                    setMembers(response.data);
                    setLoading(false);
                });
        } catch (e) {
            console.log(e.message);
            NotificationManager.warning(e.message);
        }
    }

    async function getMebersByMinisterId() {
        try {
            setLoading(true);
            const user = UserService.getLoggedUser();
            await HttpService.getMembers(user, ministerId)
                .then((response) => {
                    setMembers(response.data);
                    setLoading(false);
                });
        } catch (e) {
            console.log(e.message);
            NotificationManager.warning(e.message);
        }
    }

    async function getMebers() {
        switch (type) {
            case 'function':
                getMebersByFunctionId();
                break;
            case 'group':
                getMebersByGroupId();
                break;
            case 'minister':
                getMebersByMinisterId();
                break;
        }
    }

    React.useEffect(() => {
        getMebers();
    }, []);

    return <div>
        {loading ? <LinearProgress /> :
            <CustomSelect
                formControlProps={{
                    fullWidth: true
                }}
                itens={members.map((f) => { return { id: f.id, value: f.nome }; })}
                name="Membros"
                id="id"
                onChange={function (value) { addMeberFunctions(id, value) }}
            />
        }
    </div>
}
