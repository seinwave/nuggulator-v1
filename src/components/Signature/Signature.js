import React from 'react';



class Signature extends React.Component {
    render() {

        return (
            <div style = {{display: 'flex', justifyContent: 'flex-end'}}>
                <p 
                className = 'f5 white pa3'>A nonsense project by <a 
                rel="noopener noreferrer" target = "_blank" 
                href ="https://mattseidholz.com" 
                className = 'f5 link dim white underline pointer'>Matt Seidholz</a>
                </p>
            </div>
        )
    }
}

export default Signature
