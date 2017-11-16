import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import styled from 'styled-components'

const TitleWrapper = styled.div`
text-align: center;
`

const StyledForm = styled.form`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
margin: 5%;

`

const PageWrapper = styled.div`
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
`

const FormDiv = styled.div`
display: flex;
margin: 5%;
`
const InputWrapper = styled.input`
height: 30px;
width: 280px;

`
const CardWrapperTwo = styled.div`
background-color: white;
box-shadow: 3px 4px 8px 0 rgba(0,0,0,0.2);
transition: 0.3s;
width: 70vw;
height: 10vw;
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
width: 30vw;
height: 30vw;
text-align: center;
border: 2px solid silver;
:hover {
    box-shadow: 2px 8px 16px 0 rgba(0,0,0,0.2);
}
  padding: 2px 16px;
margin: 40px;
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
        const noEdit =
         <PageWrapper>
            <TitleWrapper>
            <CardWrapperTwo>
                <h1>{this.state.tailgate.tailgate_name}</h1>
                </CardWrapperTwo>
                <CardWrapper>
                <h2>Hosted by: {this.state.tailgate.user}</h2>
                <h3>{this.state.tailgate.about}</h3>
                <p>{this.state.tailgate.cost}</p>
                <button onClick={this.handleToggle}>Edit</button>
                <button onClick={this.deleteTailgateEvent}>Delete</button>
                <button onClick={this.addCurrentUserToTailgate}>Attend this tailgate</button>
                </CardWrapper>
            </TitleWrapper>
            
            <CardWrapper>
                <h2>People Attending</h2>
                <hr/>
            {this.state.members.map((user) => {
                return(
                    <div>
                        <h3>{user.user}</h3>
                    </div>
                )
            })}
            </CardWrapper>
        </PageWrapper>

        const edit = <div>
            <PageWrapper>
            <StyledForm onSubmit={this.handleSubmit}>
                <div>Tailgate Name</div>
                <FormDiv>
                    <InputWrapper type="text" name="tailgate_name" placeholder="Name Your Tailgate!" value={this.state.tailgate.tailgate_name} onChange={this.handleChange} />
                </FormDiv>
                <div>Description</div>
                <FormDiv>
                    <InputWrapper type="text" name="about" placeholder="Decribe the tailgate!" value={this.state.tailgate.about} onChange={this.handleChange} />
                </FormDiv>
                <div>Cost</div>
                <FormDiv>
                    <InputWrapper type="text" name="cost" placeholder="Cost of admission?" value={this.state.tailgate.cost} onChange={this.handleChange} />
                </FormDiv>
                <button>Submit</button>
            </StyledForm>
            <button onClick={this.handleToggle}>Go back</button>
            </PageWrapper>
        </div>

        return (
            <div>
                {this.state.edit ? edit : noEdit}
            </div>
        );
    }
}

export default TailgatesPage;