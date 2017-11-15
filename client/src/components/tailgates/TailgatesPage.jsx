import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import styled from 'styled-components'

const TitleWrapper = styled.div`
text-align: center;
`

class TailgatesPage extends Component {

    state = {
        tailgate: {},
        members: [],
        redirect: false,
        edit: false
    }

    async componentWillMount() {
        this.getUserTailgate()
        this.getAttendingMembers()
    }

    getAttendingMembers = async () => {
        const id = this.props.match.params.tailgate_id
        const res = await axios.get(`/api/tailgate_events/${id}/tailgate_members/${id}`)
        this.setState({members: res.data})
    }
    getUserTailgate = async () => {
        try {
            const id = this.props.match.params.tailgate_id
            const res = await axios.get(`/api/tailgate_events/${id}`)
            console.log(res.data)
            this.setState({ tailgate: res.data })
            console.log(res.data)
        } catch (error) {
            console.log(error)
        }


    }
    deleteTailgateEvent = async () => {
        try {   
            const id = this.props.match.params.tailgate_id
            const res = await axios.delete(`/api/tailgate_events/${id}`)
            this.setState({redirect: true})
        } catch (error) {
            console.log(error)
        } 
    }
    handleToggle = () => {
        this.setState({edit: !this.state.edit})
    }

    handleChange = (event) => {
        const attribute = event.target.name
        const tailgate = {...this.state.tailgate}
        tailgate[attribute] = event.target.value
        this.setState({tailgate})

    }
    handleSubmit = async (event) => {
        event.preventDefault()
        const id = this.props.match.params.tailgate_id
        const payload = {
            tailgate_name: this.state.tailgate.tailgate_name,
            about: this.state.tailgate.about,
            cost: this.state.tailgate.cost
        }
        await axios.put(`/api/tailgate_events/${id}`, payload)
        await this.setState({edit: !this.state.edit})
    }
    addCurrentUserToTailgate = async () => {
        const id = this.props.match.params.tailgate_id
        const payload = {
            tailgate_event_id: id
        }
        console.log(payload)
        await axios.post(`/api/tailgate_events/${id}/tailgate_members`, payload)
        await this.getAttendingMembers()
    }

    render() {
        if (!localStorage['access-token']) {
            return <Redirect to='/' />
        }
        if (this.state.redirect) {
            return <Redirect to={`/users`}/>
        }
        const noEdit = <div>
            <TitleWrapper>
                <h1>{this.state.tailgate.tailgate_name}</h1>
                <h2>Hosted by: {this.state.tailgate.user}</h2>
                <h3>{this.state.tailgate.about}</h3>
                <p>{this.state.tailgate.cost}</p>
                <button onClick={this.handleToggle}>Edit</button>
                <button onClick={this.deleteTailgateEvent}>Delete</button>
                <button onClick={this.addCurrentUserToTailgate}>Attend this tailgate</button>
            </TitleWrapper>
            {this.state.members.map((user) => {
                return(
                    <div>
                        <h3>{user.user}</h3>
                    </div>
                )
            })}
        </div>

        const edit = <div>
            <form onSubmit={this.handleSubmit}>
                <div>
                    <label htmlFor="tailgate_name">Tailgate name: </label>
                    <input type="text" name="tailgate_name" placeholder="Name Your Tailgate!" value={this.state.tailgate.tailgate_name} onChange={this.handleChange} />
                </div>
                <div>
                    <label htmlFor="about">Description: </label>
                    <input type="text" name="about" placeholder="Decribe the tailgate!" value={this.state.tailgate.about} onChange={this.handleChange} />
                </div>
                <div>
                    <label htmlFor="cost">Cost: </label>
                    <input type="text" name="cost" placeholder="Cost of admission?" value={this.state.tailgate.cost} onChange={this.handleChange} />
                </div>
                <button>Submit</button>
            </form>
            <button onClick={this.handleToggle}>Go back</button>
        </div>

        return (
            <div>
                {this.state.edit ? edit : noEdit}
            </div>
        );
    }
}

export default TailgatesPage;