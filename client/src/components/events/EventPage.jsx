import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom'
import axios from 'axios'
import styled from 'styled-components'
import NewTailgateForm from './NewTailgateForm.jsx'


const PageWrapper = styled.div`
display: flex;
justify-content: space-around;

`

const TitleWrapper = styled.div`
text-align: center;
display: flex;
justify-content: center;
`

const FormWrapper = styled.div`

`
const CardWrapperTwo = styled.div`
background-color: white;
box-shadow: 3px 4px 8px 0 rgba(0,0,0,0.2);
transition: 0.3s;
width: 50vw;
height: 23vw;
text-align: center;
border: 2px solid silver;
:hover {
    box-shadow: 2px 8px 16px 0 rgba(0,0,0,0.2);
}
  padding: 2px 16px;
margin: 40px;
`

const CardWrapper = styled.div`
background-color: white;
box-shadow: 3px 4px 8px 0 rgba(0,0,0,0.2);
transition: 0.3s;
width: 23vw;
height: 23vw;
text-align: center;
border: 2px solid silver;
:hover {
    box-shadow: 2px 8px 16px 0 rgba(0,0,0,0.2);
}
  padding: 2px 16px;
margin: 40px;
`
const StyleWrapper = styled.div`


`

class EventPage extends Component {
    state = {
        event: {},
        tailgates: [],
        toggleForm: false,
        weather: {}
    }
    async componentWillMount() {
        await this.getEvent()
        await this.getEventTailgates()
        await this.getWeather()
    }

    getWeather = async () => {
        const zip = this.state.event.zipcode
        const res = await axios.get(`/api/weather/${zip}`)
        console.log(res.data)
        const formattedResponse = {
            temp: res.data.main.temp,
            weatherCondition: res.data.weather[0].description

        }
        this.setState({weather: formattedResponse})

    }

    getEvent = async () => {
        try {
            const id = this.props.match.params.event_id
            console.log(id)
            const res = await axios.get(`/api/events/${id}`)
            console.log(res.data)
            this.setState({ event: res.data })
        } catch (error) {
            console.log(error)
        }

    }


    getEventTailgates = async () => {
        try {
            const id = this.props.match.params.event_id
            const res = await axios.get(`/events/${id}/tailgates`)
            this.setState({ tailgates: res.data })

        } catch (error) {
            console.log(error)
        }
    }
    handleToggle = () => {
        this.setState({ toggleForm: !this.state.toggleForm })
    }

    render() {
        if (!localStorage['access-token']) {
            return <Redirect to='/' />
        }
        const host = <div>
            <h3>Don't see an event you like? Host one!</h3>
            <button onClick={this.handleToggle}>Host an event!</button>
        </div>
        const tailgates = <div>
            {this.state.tailgates.map((tailgate) => {
                return (
                    <CardWrapper>
                        <Link to={`/users/tailgates/${tailgate.id}`}><h3>{tailgate.tailgate_name}</h3></Link>
                        <br />
                        <h4>{tailgate.about}</h4>
                        <br />
                        <div>{tailgate.cost}</div>
                        <br />
                    </CardWrapper>

                )
            })}
        </div>
        return (
            <div>
                <TitleWrapper>
                    <CardWrapperTwo>
                    <h1>{this.state.event.event_name}</h1>
                    <h3>{this.state.event.location}</h3>
                    <h3>{this.state.event.date}</h3>
                    <h4>{this.state.event.teams}</h4>
                    <h4>Temp: {this.state.weather.temp}°F</h4>
                    <h4>Conditions: {this.state.weather.weatherCondition}</h4>
                    </CardWrapperTwo>
                </TitleWrapper>
                <PageWrapper>
                <StyleWrapper>
                    {tailgates}
                </StyleWrapper>
                <FormWrapper>
                    {this.state.toggleForm ? <NewTailgateForm handleToggle={this.handleToggle} getEventTailgates={this.getEventTailgates} eventId={this.props.match.params.event_id} /> : host}
                </FormWrapper>
                </PageWrapper>
            </div>
        );
    }
}

export default EventPage;