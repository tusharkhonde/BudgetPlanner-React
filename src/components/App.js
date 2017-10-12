import React,{Component} from 'react';
import Slider from './Slider.js';
import Calendar from './Calendar.js';
import RightBox from './RightBox.js';

class App extends Component{
    render(){
        return(
            <div>
                <h1>Reside Finance Planner</h1>
                <Slider/>
                <Calendar/>
                <RightBox/>
            </div>
        )
    }
}

export default App;