import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import { ViewState } from '@devexpress/dx-react-scheduler';
import {
    Scheduler,
    WeekView,
    Toolbar,
    DateNavigator,
    Appointments,
    TodayButton,
} from '@devexpress/dx-react-scheduler-material-ui';

export default class Calendar extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            data: [
                {
                    title: 'Culto de celebração',
                    startDate: new Date('2020-11-29T09:30:00'),
                    endDate: new Date('2020-11-29T11:00:00'),
                    id: 1,
                    location: 'Igreja'
                },
                {
                    title: 'Apresentação do painel',
                    startDate: new Date('2020-11-29T11:30:00'),
                    endDate: new Date('2020-11-29T12:00:00'),
                    id: 2,
                    location: 'Igreja'
                },
                {
                    title: 'Culto de celebração',
                    startDate: new Date('2020-11-29T16:00:00'),
                    endDate: new Date('2020-11-29T17:30:00'),
                    id: 1,
                    location: 'Igreja'
                },
                {
                    title: 'Culto de celebração',
                    startDate: new Date('2020-11-29T18:00:00'),
                    endDate: new Date('2020-11-29T19:30:00'),
                    id: 1,
                    location: 'Igreja'
                },
                {
                    title: 'Circulo de Oração',
                    startDate: new Date('2020-11-30T14:00:00'),
                    endDate: new Date('2020-11-30T15:00:00'),
                    id: 1,
                    location: 'Igreja'
                },
            ],
            currentDate: '2020-11-29',
        };
        this.currentDateChange = (currentDate) => { this.setState({ currentDate }); };
    }

    render() {
        const { data, currentDate } = this.state;

        return (
            <Paper>
                <Scheduler
                    data={data}
                    height={660}
                >
                    <ViewState
                        currentDate={currentDate}
                        onCurrentDateChange={this.currentDateChange}
                    />
                    <WeekView
                        startDayHour={9}
                        endDayHour={19}
                    />
                    <Toolbar />
                    <DateNavigator />
                    <TodayButton />
                    <Appointments />
                </Scheduler>
            </Paper>
        );
    }
}
