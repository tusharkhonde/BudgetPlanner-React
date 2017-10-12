import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Table,Button} from 'react-bootstrap';
import moment from 'moment';
import {setBalance,setInfoView,setDate} from '../actions';
import {calculateBalance} from '../helper';
import ExpenseList from './ExpenseList';

const style = {
    marginTop:'10px',
    fontSize: '20px'
}

class Calendar extends Component{

    constructor(){
        super();
        this.state = {
            selectedView:'',
            date: moment().startOf('month'),
        }
        this.addDate = this.addDate.bind(this);
        this.handleView = this.handleView.bind(this);
        this.handleSlider = this.handleSlider.bind(this);
    }

    addDate(date){
        let balance = Number(this.props.eventBalances.mainBalance.balance);
        let balanceDate = this.props.eventBalances.mainBalance.date;
        const currentDate = this.props.eventBalances.currentDate;
        const currentBalance = calculateBalance(date,this.props.expenses,balance,balanceDate,currentDate);
        if(currentBalance.isChanged){
            balance = currentBalance.balance;
            this.props.setBalance(balance);
        }
    }

    handleView(viewState){
        this.setState({selectedView: viewState});
        if(viewState === 'calendar') 
            this.props.setInfoView('hide');
        
    }

    handleSlider(event){
        let setDate = this.props.setDate;
        event === 'back' ?
            this.setState({ date: moment(this.state.date).add(-1,'months')},
            () => { setDate(this.state.date) })
            : 
            this.setState({ date: moment(this.state.date).add(1,'months')},
            () => {setDate(this.state.date) })
        
        this.props.setInfoView('hide');
    }

    render(){
       let counter = 1;
       const days = ['Sunday','Monday','Tuesday', 'Wednesday','Thursday','Friday', 'Saturday']
       const date = moment(this.state.date);
       const daysInMonth = date.daysInMonth();
       
       return(
          <div className="calendar">
            <div className="cal-box" onClick={() => this.handleSlider('back')}>
                <div> Back </div>
            </div>
            <div className="cal-box">
                <h4>{ date.format('MMMM') + ' ' + date.format('YYYY')}</h4>
            </div>
            <div className="cal-box" onClick={() => this.handleSlider('next')}>
                <div> Next </div>
            </div>
            <div className="view-box">
                {
                    this.state.selectedView === 'calendar' ?
                        <div style={style} onClick={(event) => this.handleView('events')}>Switch to Events View</div>
                        :
                        <div style={style} onClick={(event) => this.handleView('calendar')}>Switch to Calendar View</div>
                        
                }
            </div>
            {
                this.state.selectedView === 'calendar' ?
                    <div>
                        <Table responsive>
                            <thead>
                                <tr>
                                    <th className="cell-box">Sunday</th>
                                    <th className="cell-box">Monday</th>
                                    <th className="cell-box">Tuesday</th>
                                    <th className="cell-box">Wednesday</th>
                                    <th className="cell-box">Thursday</th>
                                    <th className="cell-box">Friday</th>
                                    <th className="cell-box">Saturday</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    [1,2,3,4,5].map((item,index) => {
                                        return(
                                            <tr key={index}>
                                                {
                                                    days.map( (d,idx) => {
                                                        return(
                                                            counter <= daysInMonth ? 
                                                                index === 0 ? 
                                                                    idx >= date.day() ?
                                                                        <td 
                                                                            key= {idx} 
                                                                            className="cell-box" 
                                                                            onClick={(event) => this.addDate(event.currentTarget.innerText)}
                                                                        >
                                                                            {daysInMonth-daysInMonth+ (counter++)}
                                                                        </td> 
                                                                    : 
                                                                    <td key = {idx} className="cell-box"></td>
                                                                :
                                                                <td 
                                                                    key = {idx} className="cell-box"
                                                                    onClick={(event) => this.addDate(event.currentTarget.innerText)}
                                                                >{daysInMonth-daysInMonth+ (counter++)}</td>

                                                            : 
                                                            <td key={counter++}></td>
                                                        )
                                                    })
                                                }
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </Table>
                    </div>
                    :
                    <div>
                        <ExpenseList expenses={{expenses:this.props.expenses,date:date}}/>
                    </div>
                }
          </div>
        )
    }
}

function mapStateToProps(state) {
    return state;
}

export default connect(mapStateToProps,{setBalance,setInfoView,setDate})(Calendar);
