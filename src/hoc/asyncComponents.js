import React, { Component } from 'react';
const asyncComponents = (importComponent) => {
    return class AsyncComponents extends Component {
        
        constructor(){
            super();
        }

        state = {
            component: null
        }

        componentDidMount(){
            importComponent().then((loadedComponent) => {
                this.setState({
                    component: loadedComponent.default
                });
            })
        }

        render(){
            const C = this.state.component;
            return C ? <C {...this.props}/> : null;
        };
    }
}

export default asyncComponents;