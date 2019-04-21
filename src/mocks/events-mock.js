import event from '../entities/event'

export const mock_events = [
    new event('name', 'price', 'capacity', 'min_staff', 'start_date', 'end_date', 'description',
        ['staff1', 'staff2', 'staff3'],
        'revenue',
        [
            {
                date: 'today',
                visits: 1,
                revenue: 2
            },
            {
                date: 'yesterday',
                visits: 5,
                revenue: 4
            },
            {
                date: 'tomorrow',
                visits: 10,
                revenue: 9
            },
        ]
    ),
    new event('name', 'price', 'capacity', 'min_staff', 'start_date', 'end_date', 'description',
        ['staff1', 'staff2', 'staff3'],
        'revenue',
        [{
            date: 'tomorrow',
            visits: 123,
            revenue: 4321
        }]),
];
