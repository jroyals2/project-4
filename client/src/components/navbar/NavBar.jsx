import React, { Component } from 'react';
import styled from 'styled-components'
import { Link, Redirect } from 'react-router-dom'


const ButtonP = styled.a`
p:hover {
    color: grey;
}
`
const Nav = styled.div`
display: flex;
flex-direction: row;
justify-content: space-around;
box-shadow: 3px 4px 8px 0 rgba(0,0,0,0.2);
align-items: center;
background-color: black;
color: white;
height: 70px;
a {
    text-decoration: none;
    color: white;
}
a:clicked {
    color: white;
}
a:hover {
    color: grey;
}
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
                {this.props.signedIn ? <ButtonP onClick={this.signOutRedirect}>Sign out</ButtonP> : <Link to={`/signup`}>Sign In</Link>}
            </Nav>
        );
    }
}

export default NavBar;