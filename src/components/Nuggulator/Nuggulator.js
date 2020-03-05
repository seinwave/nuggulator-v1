import React, { Component }  from 'react'
import nuggImages from '../images/nuggImages'


class Nuggulator extends Component{

    constructor(props){
        super(props);
        this.state = { currentCount: 3 }
    }


    countDown() {
        this.setState({
            currentCount: this.state.currentCount - .2
        })
        if(this.state.currentCount < 1) { 
          this.props.onRouteChange('results');
        }
      }

    componentDidMount() {
    this.intervalId = setInterval(this.countDown.bind(this), 200);
        }

    componentWillUnmount(){
    clearInterval(this.intervalId);
        }

    render() {

        return (
                <div className = "center pa4 br3 shadow-5">
                    <p className ="f3">
                    {"Nuggulating..."}
                    </p>
                    <img
                    key = {nuggImages[Math.floor(Math.random()*Math.floor(4))].key}
                    src = {nuggImages[Math.floor(Math.random()*Math.floor(4))].src}
                    alt = {nuggImages[Math.floor(Math.random()*Math.floor(4))].alt}/>
                </div>
                
            )
    }
    }

export default Nuggulator