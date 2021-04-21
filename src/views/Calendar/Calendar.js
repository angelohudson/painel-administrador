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
        const user = userService.getLoggedUser();
        this.state = {
            loading: false,
            data: []
        }

        httpService.getActivitiesByPeriod(user, props.currentMinistrieObject.id, "2020-01-18T00:00:00", "2022-04-18T00:00:00").then((response) => {
            console.log(response);
            this.setState((state, props) => {
                let datas = this.groupBy(response.data, d => d.titulo + d.data + d.subtitulo);
                let data = Array.from(datas.values()).map((d) => {
                    return {
                        title: d.value.titulo,
                        startDate: new Date(d.value.data),
                        endDate: new Date(d.value.data),
                        id: d.value.id,
                        location: d.value.subtitulo,
                    }
                });
                return {
                    data: data,
                    loading: false,
                    currentDate: new Date(),
                };
            });
        });
        this.currentDateChange = (currentDate) => { this.setState({ currentDate }); };
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
