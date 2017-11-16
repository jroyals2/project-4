import React, { Component } from 'react';
import axios from 'axios'
import styled from 'styled-components'
import { Redirect, Link } from 'react-router-dom'

const PageWrapper = styled.div`
margin: 15px;
`
const FlexWrap = styled.div`
display: flex;
justify-content: space-around;
`

const HeaderTag = styled.h2`
margin: 50px;
`

const CardWrapper = styled.div`
background-color: white;
box-shadow: 3px 4px 8px 0 rgba(0,0,0,0.2);
transition: 0.3s;
:hover {
    box-shadow: 2px 8px 16px 0 rgba(0,0,0,0.2);
}
  padding: 2px 16px;
margin: 50px;
`
const AnotherFlexWrap = styled.div`
display: flex;
justify-content: center;
`

class UserPage extends Component {

    state = {
        user: {},
        events: [],
        tailgates: [],
        attending: []
    }

    async componentWillMount() {
        await this.getEvents()
        await this.getUserTailgates()
        await this.getUser()
        await this.getAttendingTailgates()
    }
    getAttendingTailgates = async () => {
        const res = await axios.get(`users/attending`)
        this.setState({attending: res.data})
        console.log(res.data)

    }

    getUser = async () => {
        const res = await axios.get('/users')
        this.setState({user: res.data})
    }
    getEvents = async () => {
        try {
            const res = await axios.get(`/api/events`)
            this.setState({events: res.data})
        } catch (error) {
            console.log(error)
        }

    }
    getUserTailgates = async () => {
        try {
            const res = await axios.get(`/api/tailgate_events`)
            this.setState({tailgates: res.data})

        } catch (error) {
            console.log(error)
        }


    }

    render() {
        // if (this.props.signedIn === false) {
        //    return <Redirect to='/' />
        // }
        if (!localStorage['access-token']) {
            return <Redirect to='/' />
        }
        const eventList = <div>
            <h3>Upcoming events near you!</h3>
            {this.state.events.map((event) => {
                return(<div>
                    
                    <Link to={`/events/${event.id}`}>{event.event_name}</Link>
                </div>)
            })}
        </div>
        const tailgates = <div>
            <h3>Tailgates You Are Hosting</h3>
            {this.state.tailgates.map((tailgate) => {
                return (
                <div>
                    <Link to={`/users/tailgates/${tailgate.id}`}>{tailgate.tailgate_name}</Link>
                </div>)
            })}

        </div>
        const tailgatesAttending = <div>
            <h3>Tailgates You Are Going To!</h3>
            {this.state.attending.map((events) => {
                return (
                    <div>
                   <Link to={`/users/tailgates/${events.tailgate_id}`}>{events.tailgate_name}</Link>
                   </div>
                )
            })}
        </div>
        return (
            <PageWrapper>
                <HeaderTag>Welcome to Your Tailgates Home Base, {this.state.user.name}!</HeaderTag>
                <FlexWrap>
                    <CardWrapper>
                        {eventList}
                    </CardWrapper>
                    <CardWrapper>
                        {tailgates}
                    </CardWrapper>
                </FlexWrap>
                <AnotherFlexWrap>
                <CardWrapper>
                {tailgatesAttending}
                </CardWrapper>
                </AnotherFlexWrap>
            </PageWrapper>
        );
    }
}

export default UserPage;