import EventDetail from "../entities/EventDetail";
import moment from "moment";

export const event_detail = new EventDetail(
    'Event Name', 'Site Name', 'Start Date',
    'End Date', 'Duration', ['Staff1', 'Staff2'],
    '20', '$40', 'Event Description', '$50', 10, moment().format('YYYY-MM-DD')
);
