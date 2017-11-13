import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'

class EventPage extends Component {
    
    render() {
        if (!localStorage['access-token']) {
            return <Redirect to='/' />
        }
        return (
            <div>
                Sup Playa
            </div>
        );
    }
}

export default EventPage;