import React, { Component } from 'react';
import axios from 'axios'
import styled from 'styled-components'
import { Redirect } from 'react-router-dom'

const PageWrapper = styled.div`
margin: 15px;
`
const FlexWrap = styled.div`
display: flex;
justify-content: space-between;
`

const HeaderTag = styled.h1`
margin: 50px;
`

class componentName extends Component {

    state = {
        events: [],
        tailgates: []
    }

    async componentWillMount() {
        await this.getEvents()
        await this.getUserTailgates()
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
                    
                    {event.event_name}
                </div>)
            })}
        </div>
        const tailgates = <div>
            <h3>Your Upcoming Tailgates</h3>
            {this.state.tailgates.map((tailgate) => {
                return (
                <div>
                    {tailgate.tailgate_name}
                </div>)
            })}
        </div>
        return (
            <PageWrapper>
                <HeaderTag>Welcome to Your Tailgates Home Base!</HeaderTag>
                <FlexWrap>
                    <div>
                        {eventList}
                    </div>
                    <div>
                        {tailgates}
                    </div>
                </FlexWrap>
            </PageWrapper>
        );
    }
}

export default componentName;