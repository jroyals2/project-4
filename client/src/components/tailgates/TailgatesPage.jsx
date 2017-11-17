import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import styled from 'styled-components'

const TitleWrapper = styled.div`
text-align: center;
`
const FlexThing = styled.div`
flex-direction: row;
justify-content: center;
`
const ButtonWrapper = styled.button`
    background: #000000;
    background-image: -webkit-linear-gradient(top, #000000, #305973);
    background-image: -moz-linear-gradient(top, #000000, #305973);
    background-image: -ms-linear-gradient(top, #000000, #305973);
    background-image: -o-linear-gradient(top, #000000, #305973);
    background-image: linear-gradient(to bottom, #000000, #305973);
    -webkit-border-radius: 10;
    -moz-border-radius: 10;
    border-radius: 10px;
    font-family: Georgia;
    margin: 2px;
    color: #adadad;
    font-size: 13px;
    padding: 10px 20px 10px 20px;
    text-decoration: none;
hover {
    background: #000000;
    background-image: -webkit-linear-gradient(top, #000000, #000000);
    background-image: -moz-linear-gradient(top, #000000, #000000);
    background-image: -ms-linear-gradient(top, #000000, #000000);
    background-image: -o-linear-gradient(top, #000000, #000000);
    background-image: linear-gradient(to bottom, #000000, #000000);
    text-decoration: none;
  }
`
const StyledForm = styled.form`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
margin: 5%;

`
const CardWrapperThree = styled.div`
display: flex;
flex-direction: column;
background-color: white;
box-shadow: 3px 4px 8px 0 rgba(0,0,0,0.2);
transition: 0.3s;
width: 30vw;
height: 40vw;
text-align: center;
border: 2px solid silver;
:hover {
    box-shadow: 2px 8px 16px 0 rgba(0,0,0,0.2);
}
  padding: 2px 16px;
margin: 40px;
`

const PageWrapper = styled.div`
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
`
const HeadlineWrapper = styled.h3`
margin: 2px
`
const FormDiv = styled.div`
display: flex;
margin: 5%;
`
const InputWrapper = styled.input`
height: 30px;

width: 280px;
background-color: silver;

`
const CardWrapperTwo = styled.div`
background-color: white;
box-shadow: 3px 4px 8px 0 rgba(0,0,0,0.2);
transition: 0.3s;
width: 70vw;
height: 8vw;
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
const FlexRow = styled.div`
    display: flex;
`
const SmallDiv = styled.div`
background-color: white;
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
             <FlexThing>
            {/* <TitleWrapper> */}
            <CardWrapperTwo>
                <h1>{this.state.tailgate.tailgate_name}</h1>
                </CardWrapperTwo>
                <FlexRow>
                <CardWrapper>
                <h2>Hosted by: {this.state.tailgate.user}</h2>
                <h3>{this.state.tailgate.about}</h3>
                <p>{this.state.tailgate.cost}</p>
                <div>
                <ButtonWrapper onClick={this.handleToggle}>Edit</ButtonWrapper>
                </div>
                <div><ButtonWrapper onClick={this.deleteTailgateEvent}>Delete</ButtonWrapper></div>
                <ButtonWrapper onClick={this.addCurrentUserToTailgate}>Attend this tailgate</ButtonWrapper>
                </CardWrapper>
            {/* </TitleWrapper> */}
            
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
            </FlexRow>
            </FlexThing>
        </PageWrapper>

        const edit = <div>
            <PageWrapper>
                <CardWrapperThree>
            <StyledForm onSubmit={this.handleSubmit}>
                <HeadlineWrapper>Tailgate Name</HeadlineWrapper>
                <FormDiv>
                    <InputWrapper type="text" name="tailgate_name" placeholder="Name Your Tailgate!" value={this.state.tailgate.tailgate_name} onChange={this.handleChange} />
                </FormDiv>
                <HeadlineWrapper>Description</HeadlineWrapper>
                <FormDiv>
                    <InputWrapper type="text" name="about" placeholder="Decribe the tailgate!" value={this.state.tailgate.about} onChange={this.handleChange} />
                </FormDiv>
                <HeadlineWrapper>Cost</HeadlineWrapper>
                <FormDiv>
                    <InputWrapper type="text" name="cost" placeholder="Cost of admission?" value={this.state.tailgate.cost} onChange={this.handleChange} />
                </FormDiv>
                <ButtonWrapper>Submit</ButtonWrapper>
            </StyledForm>
            <div>
            <ButtonWrapper onClick={this.handleToggle}>Go back</ButtonWrapper>
            </div>
            </CardWrapperThree>
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