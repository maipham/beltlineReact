import event from '../entities/event'
import {DailyDetail} from "../entities/DailyDetail";
import {SiteReport} from "../entities/SiteReport";

export const mock_daily_events = [
    new SiteReport('2019-02-01', [
            {eventname: 'happy lola', startDate: '2019-02-01'},
            {eventname: 'happy ', startDate: '2019-02-01'},
            {eventname: 'happylola', startDate: '2019-02-01'},
            {eventname: 'l lola', startDate: '2019-02-01'},
        ], [
            {name: 'mai pham', username: 'maipham'},
            {name: 'my bede', username: 'bede'},
            {name: 'dog cat', username: 'catdog'},
            {name: 'ree eeee', username: 'helloworld'}
        ], 23, 300
    ),
    new DailyDetail('2019-02-03', [
            {eventname: 'detail', startDate: '2019-02-03'},
            {eventname: 'daily ', startDate: '2019-02-03'},
        ], [
            {name: 'mai pham', username: 'maipham'},
            {name: 'my bede', username: 'bede'},
            {name: 'dog cat', username: 'catdog'},
            {name: 'ree eeee', username: 'helloworld'}
        ], 50, 100
    ),
    new DailyDetail('2019-02-03', [
            {eventname: 'happydsaf lola', startDate: '2019-02-03'},
            {eventname: 'happdy ', startDate: '2019-02-03'},
            {eventname: 'hasf', startDate: '2019-02-03'},
        ], [
            {name: 'mai pham', username: 'maipham'},
            {name: 'dog cat', username: 'catdog'},
            {name: 'ree eeee', username: 'helloworld'}
        ], 50, 30
    ),
];
