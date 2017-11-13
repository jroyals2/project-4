import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import styled from 'styled-components'

const TitleWrapper = styled.div`
text-align: center;
`

class TailgatesPage extends Component {

    state = {
        tailgate: {}
    }

    async componentWillMount() {
        this.getUserTailgate()
    }

    getUserTailgate = async () => {
        try {
            const id = this.props.match.params.tailgate_id
            const res = await axios.get(`/api/tailgate_events/${id}`)
            console.log(res.data)
            this.setState({ tailgate: res.data })

        } catch (error) {
            console.log(error)
        }


    }

    render() {
        if (!localStorage['access-token']) {
            return <Redirect to='/' />
        }
        return (
            <div>
                <TitleWrapper>
                <h1>{this.state.tailgate.tailgate_name}</h1>
                <h3>{this.state.tailgate.about}</h3>
                <p>{this.state.tailgate.cost}</p>
                </TitleWrapper>
            </div>
        );
    }
}

export default TailgatesPage;