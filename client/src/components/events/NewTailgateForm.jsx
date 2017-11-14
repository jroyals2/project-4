import React, { Component } from 'react';
import axios from 'axios'

class NewTailgateForm extends Component {
    state = {
        newTailgate: {
            tailgate_name: '',
            about: '',
            cost: ''
        }
    }

    handleChange = (event) => {
        const attribute = event.target.name
        const newTailgate = {...this.state.newTailgate}
        newTailgate[attribute] = event.target.value
        this.setState({newTailgate})

    }
    handleSubmit = () => {
        
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