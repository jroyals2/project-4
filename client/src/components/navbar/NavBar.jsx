import React, { Component } from 'react';
import styled from 'styled-components'
import { Link, Redirect } from 'react-router-dom'


const Nav = styled.div`
display: flex;
flex-direction: row;
justify-content: space-around;
align-items: center;
background-color: red;
height: 70px;
`

class NavBar extends Component {
    state ={
        redirect: false
    }

signOutRedirect = async (event) => {
    await this.props.signOut(event)
    // await this.setState({redirect: true})
    
}
    render() {
        if (this.state.redirect) {
           return <Redirect to="/" />
        }
        return (
            <Nav>
                <div>Tailgates!</div>
                <Link to={`/`}>Home</Link>
                {this.props.signedIn ? <button onClick={this.signOutRedirect}>Sign out</button> : <Link to={`/signup`}>Sign In</Link>}
            </Nav>
        );
    }
}

export default NavBar;