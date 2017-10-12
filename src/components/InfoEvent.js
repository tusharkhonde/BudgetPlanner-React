import React,{Component} from 'react';
import { Form, FormControl, FormGroup, ControlLabel, Col } from 'react-bootstrap';
import moment from 'moment';
import {connect} from 'react-redux';
import {deleteEvent,setInfoView} from '../actions';
import numeral from 'numeral';
numeral.locale('en');

class InfoEvent extends Component{

    handleDelete(id){
        this.props.deleteEvent(id);
        this.props.setInfoView('hide');
    }
    
    render(){
        let { balance } = this.props;
        const frequency = balance['selectedEvent']['frequency'];
        const eventView = balance['eventView'];
        const id = balance['selectedEvent']['id'];
        return(
            <div className="right-box">
                <h4><center><strong>Event Info</strong></center></h4> 
                {
                    eventView === 'show' ?
                        <Form horizontal>
                            <a onClick={()=>this.handleDelete(id)}><center> Delete </center></a>
                            <FormGroup>
                                <Col componentClass={ControlLabel} sm={6}>
                                    Start Date
                                </Col>
                                <Col sm={6}>
                                    <FormControl.Static>{moment(balance['selectedEvent']['startDate']).format('MM-DD-YYYY')}</FormControl.Static>
                                </Col>
                            </FormGroup>
                            <FormGroup>
                                <Col componentClass={ControlLabel} sm={6}>
                                    Frequency
                                </Col>
                                <Col sm={6}>
                                    <FormControl.Static>
                                    {
                                        frequency > 27 ?
                                            'Daily' 
                                            :
                                            frequency === 7 ?
                                                'Weekly'
                                                :
                                                'Monthly'
                                    }
                                    </FormControl.Static>
                                </Col>
                            </FormGroup>
                            <FormGroup>
                                <Col componentClass={ControlLabel} sm={6}>
                                    Dollar Amount
                                </Col>
                                <Col sm={6}>
                                    <FormControl.Static>{numeral(balance['selectedEvent']['dollarAmount']).format('$0,0.00')}</FormControl.Static>
                                </Col>
                            </FormGroup>
                        </Form>
                        :
                        <div> </div>
                }
                
            </div>
        )
    }
}

export default connect(null,{deleteEvent,setInfoView})(InfoEvent);