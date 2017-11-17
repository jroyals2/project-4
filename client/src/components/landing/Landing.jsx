import React, { Component } from 'react';
import styled from 'styled-components'
import { Redirect } from 'react-router-dom'


const Headline = styled.h1`
display: flex;
flex-direction: row;
justify-content: flex-start;
margin: 5%;

`
const Content = styled.div`
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
text-align: center;
p {
    width: 50vw;
    font-size: 20px;
}
`
const ImageWrapper = styled.img`
margin: 10px;
width: 70%;
float: left;
display: flex;

`
const SideText = styled.h2`
text-align: right;
`

const CardWrapper = styled.div`
background-color: white;
box-shadow: 3px 4px 8px 0 rgba(0,0,0,0.2);
transition: 0.3s;
width: 90vw;
height: 40vw;
text-align: center;
border: 2px solid silver;
background-color: rgba(255, 255, 255, .8);
:hover {
    box-shadow: 2px 8px 16px 0 rgba(0,0,0,0.2);
    
}
padding: 2px 16px;
margin: 40px;
`
class Landing extends Component {
    render() {
        if (localStorage['access-token']) {
            return <Redirect to='/users' />
        }
        return (
            <CardWrapper>
                <Headline>Welcome to Tailgates!</Headline>
                <Content><p>Do you love going to tailgates but sometimes don't know where the best one is?  This is the spot for you! Here you can see all the tailgates coming up for any sporting event! Here you can also set up a tailgate for all of your freinds and fellow fans to attend as well!</p></Content>
                <SideText>Every event could be your best tailgate!</SideText>

            </CardWrapper>
        );
    }
}

export default Landing;