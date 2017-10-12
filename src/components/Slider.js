import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormControl,ControlLabel } from 'react-bootstrap';
import { addBalance } from '../actions';

class Slider extends Component{

    constructor(){
        super();
        this.state = {
            balance:'',
            date:''
        }
        this.handleBalance = this.handleBalance.bind(this);
        this.handleDate = this.handleDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    handleBalance(balance){
        this.setState({balance});
    }

    handleDate(date){
        this.setState({date});
    }

    onSubmit(){
        this.props.addBalance({
            balance: this.state.balance,
            date: this.state.date
        });    
    }

    render(){      
        return(
            <div>
                <div className="slider-box">
                    <h4> <strong>Starting Conditions</strong> </h4>
                    <div className="slider-item">
                        <ControlLabel>Date</ControlLabel>
                        {' '}
                        <FormControl
                            type="date"
                            onChange={event=> this.handleDate(event.target.value)}
                        >
                        </FormControl>
                    </div>    
                    <div className="slider-item">    
                        <ControlLabel>Balance</ControlLabel>
                        {' '}
                        <FormControl
                            type="number"
                            onChange={event=> this.handleBalance(event.target.value)}
                        >
                        </FormControl> 
                    </div>
                    <div className="slider-item">    
                        <a
                            onClick={event=> this.onSubmit()}
                        >
                        SET Conditions
                         </a> 
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(null,{addBalance})(Slider);;