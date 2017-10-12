export const ADD_BALANCE = 'ADD_BALANCE';
export const ADD_EXPENSE = 'ADD_EXPENSE';
export const ADD_DATE = 'ADD_DATE';
export const SET_BALANCE = 'SET_BALANCE';
export const ADD_EVENT = 'ADD_EVENT';
export const SET_VIEW = 'SET_VIEW';
export const SORT_DATE = 'SORT_DATE';
export const SET_DATE = 'SET_DATE';
export const DELETE_EVENT = 'DELETE_EVENT';

export function addBalance(balanceData){
    return {
        type: 'ADD_BALANCE',
        balanceData
    }
}

export function addExpense(expenses){
    return {
        type: ADD_EXPENSE,
        expenses
    }
}
export function setBalance(balance){
    return {
        type: 'SET_BALANCE',
        balance
    }
}

export function addEvent(event){
    return {
        type: 'ADD_EVENT',
        event
    }
}

export function setInfoView(eventView){
    return {
        type: 'SET_VIEW',
        eventView
    }
}

export function addDate(date){
    return {
        type: ADD_DATE,
        date
    }
}

export function setDate(date){
    return {
        type: SET_DATE,
        date
    }
}

export function sortExpenses(month){
    return {
        type: SORT_DATE,
        month
    }
}

export function deleteEvent(id){
    return {
        type: DELETE_EVENT,
        id
    }
}