import {combineReducers} from 'redux';
import { ADD_EXPENSE, ADD_BALANCE, SET_BALANCE, ADD_EVENT, SET_VIEW, SET_DATE,DELETE_EVENT } from '../actions';
import moment from 'moment';

function expenses( state = [], action) {
    switch (action.type){
        case ADD_EXPENSE:
            return [...state, action.expenses ];
        case DELETE_EVENT:
            return state.filter( (item) => {
                return item.id !== action.id
            });
        default:
            return state;
    }
}

function eventBalances( state = {mainBalance:{},accountBalance:0,selectedEvent:{},eventView:'hide',currentDate:moment()},action){
    switch(action.type){
        case ADD_BALANCE:
            return { ...state, mainBalance: {balance: action.balanceData.balance, date: action.balanceData.date} };
        case SET_BALANCE:
            return { ...state, accountBalance:action.balance };
        case ADD_EVENT:
            return { ...state, selectedEvent:action.event };
        case SET_VIEW:
            return { ...state, eventView:action.eventView };
        case SET_DATE:
            return { ...state, currentDate:action.date };
        default:
            return state;
    }
}

const rootReducers = combineReducers({expenses,eventBalances});

export default rootReducers;