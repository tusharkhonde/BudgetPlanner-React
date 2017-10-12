import React, { Component } from 'react';
import InfoEvent from './InfoEvent';
import AddEvent from './AddEvent';
import { connect } from 'react-redux';
import numeral from 'numeral';

numeral.locale('en');

class RightBox extends Component{
    
    render(){
        const balance = this.props.expenses.eventBalances;
        return(
            <div>
                <div className="right-box">
                    <h4> <center> <strong>Account Balance </strong> </center> </h4>
                    <h4> <center> <strong style={{fontSize:'40px'}}>  {numeral(balance['accountBalance']).format('$0,0.00')} </strong> </center> </h4>
                </div>
                <AddEvent/>
                <InfoEvent balance={balance}/>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        expenses: state
    }
}

export default connect(mapStateToProps,{})(RightBox);
