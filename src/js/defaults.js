export default {
    startDate: new Date(),
    num: 7,
    onSelect: date => {},
    onChangePeriod: (oldStart, currentStart) => {},
    minDate: new Date(),
    maxDate: null,
    showHeader: true,
    headerText: date => date.toLocaleDateString(),
    dateText: date => date.getDate(),
    // add class to a cell whose date satisfies certain condition
    cellClass: {
        // 'week-end': function(date) {
        //     if ([6,0].includes(date.getDay())) {
        //         return true
        //     }
        // }
    },
    days: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
}