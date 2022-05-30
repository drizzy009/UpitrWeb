import moment from 'moment';

export const FormatLongDate = (dateValue) => {
    return moment(dateValue).format('MMM-DD-YYYY h:mm:ss a');
}

export const FormatShortDate = (dateValue) => {
    return moment(dateValue).format('DD-MM-YYYY');
}