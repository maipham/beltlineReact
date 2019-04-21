import event from '../entities/event'
import {DailyDetail} from "../entities/DailyDetail";

export const mock_daily_events = [
    new DailyDetail('bebde fest', [
            {name: 'mai pham', username: 'maipham'},
            {name: 'my bede', username: 'bede'},
            {name: 'dog cat', username: 'catdog'},
            {name: 'ree eeee', username: 'helloworld'}
        ], 23, 300
    ),
    new DailyDetail('trai dep', [
            {name: 'mai pham', username: 'maipham'},
            {name: 'my bede', username: 'bede'},
            {name: 'dog cat', username: 'catdog'},
            {name: 'ree eeee', username: 'helloworld'}
        ], 50, 100
    ),
    new DailyDetail('mai loves trai', [
            {name: 'mai pham', username: 'maipham'},
            {name: 'dog cat', username: 'catdog'},
            {name: 'ree eeee', username: 'helloworld'}
        ], 50, 30
    ),
];
