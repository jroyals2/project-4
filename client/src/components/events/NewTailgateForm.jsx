import React, { Component } from 'react';
import axios from 'axios'

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
                <form onSubmit={this.handleSubmit}>
                    
                    <div>
                    <label htmlFor="tailgate_name">Tailgate name: </label>
                    <input type="text" name="tailgate_name" placeholder="Name Your Tailgate!" value={this.state.newTailgate.tailgate_name} onChange={this.handleChange}/>
                    </div>
                    <div>
                    <label htmlFor="about">Description: </label>
                    <input type="text" name="about" placeholder="Decribe the tailgate!" value={this.state.newTailgate.about} onChange={this.handleChange}/>
                    </div>
                    <div>
                    <label htmlFor="cost">Cost: </label>
                    <input type="text" name="cost" placeholder="Cost of admission?" value={this.state.newTailgate.cost} onChange={this.handleChange}/>
                    </div>
                    <button>Submit</button>
                </form>
            </div>
        );
    }
}

export default NewTailgateForm;