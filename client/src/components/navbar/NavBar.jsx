import React, { Component } from 'react';
import styled from 'styled-components'
import { Link, Redirect } from 'react-router-dom'


const Nav = styled.div`
display: flex;
flex-direction: row;
justify-content: space-around;
box-shadow: 3px 4px 8px 0 rgba(0,0,0,0.2);
align-items: center;
background-color: red;
color: silver;
height: 70px;
a {
    text-decoration: none;
    color: silver;
}
a:clicked {
    color: silver;
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
                {this.props.signedIn ? <p onClick={this.signOutRedirect}>Sign out</p> : <Link to={`/signup`}>Sign In</Link>}
            </Nav>
        );
    }
}

export default NavBar;