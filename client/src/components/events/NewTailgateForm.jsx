import React, { Component } from 'react';
import axios from 'axios'
import styled from 'styled-components'

const FormDiv = styled.form`
display: flex;
flex-direction: column;
margin: 5%;
`
const InputWrapper = styled.input`
height: 30px;
width: 280px;
margin: 5px;

`
// Thanks http://css3buttongenerator.com/!!!!
const SumbitButton = styled.button`
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
    color: #adadad;
    font-size: 15px;
    width: 9vw;
    height: 3vw;
    padding: 10px 20px 10px 20px;
    text-decoration: none;
    :hover {
    background: #45535c;
    background-image: -webkit-linear-gradient(top, #45535c, #000000);
    background-image: -moz-linear-gradient(top, #45535c, #000000);
    background-image: -ms-linear-gradient(top, #45535c, #000000);
    background-image: -o-linear-gradient(top, #45535c, #000000);
    background-image: linear-gradient(to bottom, #45535c, #000000);
    text-decoration: none;
  }
`

class NewTailgateForm extends Component {
    state = {
        newTailgate: {
            tailgate_name: '',
            about: '',
            cost: ''
        },
        username: '' 
    }

    getUser = async () => {
        await axios.get()
    } 

    handleChange = (event) => {
        const attribute = event.target.name
        const newTailgate = {...this.state.newTailgate}
        newTailgate[attribute] = event.target.value
        this.setState({newTailgate})

    }
    handleSubmit = async (event) => {
        event.preventDefault()
        const eventId = this.props.eventId
        const payload = {
            tailgate_name: this.state.newTailgate.tailgate_name,
            about: this.state.newTailgate.about,
            cost: this.state.newTailgate.cost,
            event_id: eventId
        }
        const emptyForm = {
            tailgate_name: '',
            about: '',
            cost: ''
        }
       await axios.post('/api/tailgate_events', payload)
        this.props.getEventTailgates()
        this.props.handleToggle()
        this.setState({newTailgate: emptyForm})
        
    }
    render() {
        return (
            <div>
                <FormDiv onSubmit={this.handleSubmit}>
                    <h3>Create Your Tailgate!</h3>
                    <div>
                    <InputWrapper required type="text" name="tailgate_name" placeholder="Name Your Tailgate!" value={this.state.newTailgate.tailgate_name} onChange={this.handleChange}/>
                    </div>
                    <div>
                    <InputWrapper required type="text" name="about" placeholder="Decribe the tailgate!" value={this.state.newTailgate.about} onChange={this.handleChange}/>
                    </div>
                    <div>
                    <InputWrapper required type="text" name="cost" placeholder="Cost of admission?" value={this.state.newTailgate.cost} onChange={this.handleChange}/>
                    </div>
                    <SumbitButton>Submit</SumbitButton>
                </FormDiv>
                <SumbitButton onClick={this.props.handleToggle}>Close</SumbitButton>
            </div>
        );
    }
}

export default NewTailgateForm;