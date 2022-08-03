import moment from 'moment';
import numeral from 'numeral';

export const GetUnixTime = () => {
    return moment().unix();
}

export const FormatMoney = (numberValue) => {
    return numeral(numberValue).format('0,0.00');
}

export const FormatAge = (dateValue) => {
    if (dateValue === "" || dateValue === null || dateValue === undefined) return "";
    const ageFraction = moment().diff(moment(dateValue), 'years', true);
    return Math.floor(ageFraction);
}

export const FormatLongDate = (dateValue) => {
    if (dateValue === "" || dateValue === null || dateValue === undefined) return "";
    return moment(dateValue).format('MMM-DD-YYYY h:mm:ss a');
}

export const FormatDate = (dateValue, formatString) => {
    if (dateValue === "" || dateValue === null || dateValue === undefined) return "";
    return moment(dateValue).format(formatString);
}


export const FormatShortDate = (dateValue) => {
    if (dateValue === "" || dateValue === null || dateValue === undefined) return "";
    return moment(dateValue).format('DD-MM-YYYY');
}

export const FormatMonthYear = (dateValue) => {
    if (dateValue === "" || dateValue === null || dateValue === undefined) return "";
    return moment(dateValue).format('MMM, YYYY');
}

export const ConvertDateToDays = (dateValue) => {
    if (dateValue === "" || dateValue === null || dateValue === undefined) return "";
    return moment(dateValue).endOf('days').fromNow();
}

export const FormatLongDate2 = (dateValue) => {
    if (dateValue === "" || dateValue === null || dateValue === undefined) return "";
    return moment(dateValue).format('MMMM Do, YYYY');
}

export const FormatTime = (dateValue) => {
    if (dateValue === "" || dateValue === null || dateValue === undefined) return "";
    return moment(dateValue).format('h:mm:ss a');
}

// export const FormatNumber = (value) => {
//     const num = new Intl.NumberFormat('en-US', { style: 'number' }).format(value);
//     return num;
// }