import React from 'react';



class Signature extends React.Component {
    render() {

        return (
            <div style = {{display: 'flex', justifyContent: 'flex-end'}}>
                <p 
                className = ''>A nonsense project by <a 
                target = "_blank"
                rel="noopener noreferrer"
                href ="https://mattseidholz.com" 
                className = ''>Matt Seidholz</a>
                </p>
            </div>
        )
    }
}

export default Signature
