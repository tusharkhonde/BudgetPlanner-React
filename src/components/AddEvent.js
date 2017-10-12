import React,{Component} from 'react';
import { Form, FormControl, FormGroup, ControlLabel } from 'react-bootstrap';
import {addExpense} from '../actions';
import {connect} from 'react-redux';
import uuid from 'uuid';
import moment from 'moment';

class AddEvent extends Component{

    constructor(){
        super();
        this.state = {
            startDate: '',
            frequency: moment(new Date(),'YYYY-MM-DD').daysInMonth(),
            dollarAmount: 0,
        }
        this.addEvent = this.addEvent.bind(this); 
    }

    addEvent(items){
        items['id'] = uuid();
        this.props.addExpense(items);
    }
    clearFields(e){
        e.preventDefault();
        var date = this.refs.date;
        var frequency = this.refs.frequency;
        var amount = this.refs.amount;
        console.log(date);
        date.value = "";
        frequency.value = "";
        amount.value = "";
    }

    render(){
        const date = this.props.eventBalances.currentDate;   
        const start = moment(date).startOf('month').format('YYYY-MM-DD').toString();
        const end = moment(date).endOf('month').format('YYYY-MM-DD').toString();

        return(
            <div className="right-box">
                <div>
                    <h4><center> <strong>Add Event</strong></center></h4>
                    <Form inline>
                        <FormGroup>
                            <ControlLabel style={{marginRight:'25px'}}>Start Date</ControlLabel>
                            {' '}
                            <FormControl
                                style={{width:'160px'}}
                                type="date"
                                ref="date"
                                onChange={event=>this.setState({startDate:event.target.value})}
                                max={end} min={start}
                                required
                            >
                            </FormControl>
                            <ControlLabel style={{marginRight: '25px'}}>Frequency</ControlLabel>
                            {' '}
                            <FormControl 
                                componentClass="select" style={{width:'160px'}}
                                ref="frequency"
                                onChange={
                                    event => this.setState({
                                        frequency: event.target.value === 'day' ? date.daysInMonth() :
                                                event.target.value === 'week' ? 7 : 1

                                    })
                                }
                                required
                            >
                                <option value="day">Daily</option>
                                <option value="week">Weekly</option>
                                <option value="month">Monthly</option>
                            </FormControl>
                            <br/>
                            <ControlLabel>Dollar Amount</ControlLabel>
                            {' '}
                            <FormControl
                                style={{width:'160px'}}
                                type="number"
                                ref="amount"
                                onChange={event=>this.setState({dollarAmount:Number(event.target.value)})}
                                required    
                            >
                            </FormControl>
                            <br/><br/>
                            <div className="btn" id="add-button"
                                    onClick={event=>{
                                        this.addEvent(this.state);
                                        this.clearFields(event);
                                    }}    
                            >
                                    Add Event
                            </div>
                        </FormGroup>
                    </Form>
                </div>
            </div>
        )
    }
}

let mapStateToProps = (state) => {
    return state;
}
export default connect(mapStateToProps ,{addExpense})(AddEvent);