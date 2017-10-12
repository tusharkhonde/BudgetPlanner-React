import React, {Component} from 'react';
import { connect } from 'react-redux';
import { sortExpenses } from '../helper';
import { setInfoView, addEvent } from '../actions';
import numeral from 'numeral';

class ExpenseList extends Component{

    setEvent(item){
        this.props.addEvent(item);
        this.props.setInfoView('show');
    }
    
    render(){
        let {expenses} = this.props;
        const sortedExpenses = sortExpenses(expenses.expenses,expenses.date);
        return(
            <div>
                <h1>Expense List</h1>
                {
                    sortedExpenses.map( (item,index) => {
                        return(
                            <div className="star" key={index} onClick={()=>this.setEvent(item)}> 
                                <br/>
                                {
                                    item.frequency > 27 ?
                                        <div> &#9733; { numeral(item.dollarAmount).format('$0,0.00')} Daily</div> 
                                        :
                                        item.frequency === 7 ? 
                                            <div> &#9733; { numeral(item.dollarAmount).format('$0,0.00')} Weekly </div> 
                                            :
                                            <div> &#9733; { numeral(item.dollarAmount).format('$0,0.00')} Monthly </div>
                                }
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}   

export default connect(null,{setInfoView,addEvent})(ExpenseList);