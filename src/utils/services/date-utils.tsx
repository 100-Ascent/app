export const toLocalString = (date: Date) => {
    const newDate = new Date(date.getTime() - date.getTimezoneOffset()*60*1000);
    return newDate;
}