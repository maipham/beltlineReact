import event from '../entities/event'
import {DailyDetail} from "../entities/DailyDetail";
import {SiteReport} from "../entities/SiteReport";

export const mock_daily_events = [
    new SiteReport('2019-02-01', [
            {eventname: 'happy lola', startDate: '2019-02-01'},
        ], [
            {name: 'mai pham', username: 'maipham'},
        ], 1, 301
    ),
    new SiteReport('2019-02-02', [
            {eventname: 'happy lola', startDate: '2019-02-01'},
            {eventname: 'happy ', startDate: '2019-02-01'},
        ], [
            {name: 'mai pham', username: 'maipham'},
            {name: 'my bede', username: 'bede'},
        ], 2, 302
    ),
    new SiteReport('2019-02-03', [
            {eventname: 'happy lola', startDate: '2019-02-01'},
            {eventname: 'happy ', startDate: '2019-02-01'},
            {eventname: 'happy ', startDate: '2019-02-01'},
        ], [
            {name: 'mai pham', username: 'maipham'},
            {name: 'my bede', username: 'bede'},
            {name: 'dog cat', username: 'catdog'},
        ], 3, 303
    ),
];
