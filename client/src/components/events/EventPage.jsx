import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import axios from 'axios'

class EventPage extends Component {
    state = {
        event: {},
        tailgates: []
    }
   async componentWillMount() {
    await this.getEvent()
    await this.getEventTailgates()
    }

    getEvent = async () => {
        try {
            const id = this.props.match.params.event_id
            console.log(id)
            const res = await axios.get(`/api/events/${id}`)
            console.log(res.data)
            this.setState({event: res.data})
        } catch (error) {
            console.log(error)
        }

    }

    getEventTailgates = async () => {
        try {
            const res = await axios.get(`/api/tailgate_events`)
            this.setState({tailgates: res.data})

        } catch (error) {
            console.log(error)
        }
    }

    render() {
        if (!localStorage['access-token']) {
            return <Redirect to='/' />
        }
        return (
            <div>
               <h1>{this.state.event.event_name}</h1>
               <h3>{this.state.event.location}</h3>
               <h4>{this.state.event.teams}</h4>
               

            </div>
        );
    }
}

export default EventPage;