import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom'
import axios from 'axios'
import styled from 'styled-components'
import NewTailgateForm from './NewTailgateForm.jsx'

const TitleWrapper = styled.div`
text-align: center;
`

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
            const id = this.props.match.params.event_id
            const res = await axios.get(`/events/${id}/tailgates`)
            this.setState({tailgates: res.data})

        } catch (error) {
            console.log(error)
        }
    }

    render() {
        if (!localStorage['access-token']) {
            return <Redirect to='/' />
        }

        const tailgates = <div>
            {this.state.tailgates.map((tailgate) => {
                return(
                    <div>
                    <Link to={`/users/tailgates/${tailgate.id}`}><h3>{tailgate.tailgate_name}</h3></Link>
                    <br/>
                    <h4>{tailgate.about}</h4>
                    <br/>
                    <div>{tailgate.cost}</div>
                    <br/>
                    <hr/>
                    </div>
                    
                )
            })}
        </div>
        return (
            <div>
                <TitleWrapper>
               <h1>{this.state.event.event_name}</h1>
               <h3>{this.state.event.location}</h3>
               <h4>{this.state.event.teams}</h4>
               </TitleWrapper>
                {tailgates}
                <NewTailgateForm />
            </div>
        );
    }
}

export default EventPage;