import React, { Component } from 'react';
import styled from 'styled-components'
import { Link } from 'react-router-dom'


const Nav = styled.div`
display: flex;
flex-direction: row;
justify-content: space-around;
align-items: center;
background-color: red;
height: 70px;
`

class componentName extends Component {

    render() {
        return (
            <Nav>
                <div>Tailgates!</div>
                <Link to={`/`}>Home</Link>
                {this.props.signedIn ? <button onClick={this.props.signOut}>Sign out</button> : <Link to={`/signup`}>Sign In</Link>}
            </Nav>
        );
    }
}

export default componentName;