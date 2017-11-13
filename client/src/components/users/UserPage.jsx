import React, { Component } from 'react';
import axios from 'axios'

class componentName extends Component {

    state = {
        events: [],
        tailgates: []
    }

    componentWillMount() {
        this.getEvents()
        this.getUserTailgates()
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
        return (
            <div>
                
            </div>
        );
    }
}

export default componentName;