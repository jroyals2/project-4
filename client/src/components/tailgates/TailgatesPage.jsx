import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'

class TailgatesPage extends Component {
    render() {
        if (!localStorage['access-token']) {
            return <Redirect to='/' />
        }
        return (
            <div>
                sup sup
            </div>
        );
    }
}

export default TailgatesPage;