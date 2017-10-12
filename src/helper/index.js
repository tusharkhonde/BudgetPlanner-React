import moment from 'moment';

export function calculateBalance(date,expenses,mainBalance,balanceDate,currentDate) {
    
    let balance = mainBalance;
    let mainDate = balanceDate;
    let isChanged = false; 
    const startDate = moment(moment(currentDate).startOf('month').add(date-1,'days').format('YYYY-MM-DD'));
    expenses.map( (item,index) => {
        const itemStartDate = moment(item.startDate,'YYYY-MM-DD');
        if(itemStartDate.isSameOrBefore(startDate)){
            isChanged = true;
            if(item.frequency > 27){
                const totalDays = startDate.diff(itemStartDate,'days');
                balance -= item.dollarAmount * (totalDays);
            }
            if(item.frequency === 7){
                const totalWeeks = startDate.diff(itemStartDate,'weeks');
                balance -= item.dollarAmount * (totalWeeks+1);
            }
            if(item.frequency === 1){
                const totalMonths = startDate.diff(itemStartDate,'months');
                balance -= item.dollarAmount * (totalMonths+1);
            }
        }
        return item;
    });

    return {isChanged,balance};
}

export function sortExpenses(expenses,month) {

    const date = moment().startOf('year').add(month.month(),'months');  
    const start = moment(date).startOf('month');
    const end = moment(date).endOf('month');
    
    return expenses.filter( (expense) => {

        const startDate = moment(expense.startDate);
        const startMatch = start.isSameOrBefore(startDate, 'day');
        const endMatch = end.isSameOrAfter(startDate, 'day');
        return startMatch && endMatch;
    }).sort((a, b) => {
        return moment(a.startDate).isSameOrBefore(moment(b.startDate)) ? 1 : -1;
    });
};
