import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import { MonthView, ViewState } from '@devexpress/dx-react-scheduler';
import {
    Scheduler,
    WeekView,
    Toolbar,
    DateNavigator,
    Appointments,
    TodayButton,
} from '@devexpress/dx-react-scheduler-material-ui';
import httpService from 'services/httpService';
import userService from 'services/userService';
import { LinearProgress } from '@material-ui/core';

export default class Calendar extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            data: []
        }

        var dataInicial = new Date();
        var dataFinal = new Date();
        dataInicial.setMonth(dataInicial.getMonth());
        dataFinal.setMonth(dataFinal.getMonth() + 1);
        dataInicial.setDate(1);
        dataFinal.setDate(0);

        this.updateSchedules(
            dataInicial.toISOString().slice(0, 10) + "T" + dataInicial.toLocaleTimeString("pt-br"),
            dataFinal.toISOString().slice(0, 10) + "T" + dataFinal.toLocaleTimeString("pt-br"),
            new Date(),
            props.currentMinistrieObject.id
        );

        this.currentDateChange = (currentDate) => {
            var dataInicial = new Date(currentDate);
            var dataFinal = new Date(currentDate);
            dataFinal.setDate(dataFinal.getDate() + 7);
            this.updateSchedules(
                dataInicial.toISOString().slice(0, 10) + "T" + dataInicial.toLocaleTimeString("pt-br"),
                dataFinal.toISOString().slice(0, 10) + "T" + dataFinal.toLocaleTimeString("pt-br"),
                currentDate,
                props.currentMinistrieObject.id
            );
        };
    }

    updateSchedules(beginDate, endDate, currentDate, id) {
        const user = userService.getLoggedUser();
        httpService.getActivitiesByPeriod(user, id, beginDate, endDate).then((response) => {
            console.log(response);
            this.setState((state, props) => {
                let datas = this.groupBy(response.data, d => d.titulo + d.data + d.subtitulo);
                let data = Array.from(datas.values()).map((d) => {
                    return {
                        title: d.value.titulo,
                        startDate: new Date(d.value.data),
                        endDate: new Date(d.value.dataFim),
                        id: d.value.id,
                        location: d.value.subtitulo,
                    }
                });
                return {
                    data: data,
                    loading: false,
                    currentDate: currentDate,
                };
            });
        });
    }

    groupBy(list, keyGetter) {
        const map = new Map();
        list.forEach((item) => {
            const key = keyGetter(item);
            const collection = map.get(key);
            map.set(key, { value: item, count: 1 });
            if (collection) {
                map.set(key, { value: item, count: collection.count + 1 });
            }
        });
        return map;
    }

    render() {
        const { data, currentDate, loading } = this.state;
        return (
            loading ? <LinearProgress /> :
                <Paper>
                    <Scheduler data={data} height={660}>
                        <ViewState currentDate={currentDate} onCurrentDateChange={this.currentDateChange} />
                        <WeekView startDayHour={0} endDayHour={24} />
                        <Toolbar />
                        <DateNavigator />
                        <TodayButton />
                        <Appointments />
                    </Scheduler>
                </Paper>
        );
    }
}
