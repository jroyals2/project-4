import React, { Component } from 'react';
import styled from 'styled-components'


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
const SideText = styled.h3`
float: right;
display: flex;
`
const WeirdDiv = styled.div`
display: flex;
align-items: center;

`
class componentName extends Component {
    render() {
        return (
            <div>
                <Headline>Welcome to Tailgates!</Headline>
                <Content><p>Do you love going to tailgates but sometimes don't know where the best one is?  This is the spot for you! Here you can see all the tailgates coming up for any sporting event! Here you can also set up a tailgate for all of your freinds and fellow fans to attend as well!</p></Content>
                <WeirdDiv>
                <ImageWrapper src="https://media.istockphoto.com/photos/twenty-and-thirty-yard-line-on-american-football-field-picture-id115773361?k=6&m=115773361&s=612x612&w=0&h=4Rmo5xKwjMwhhDmb0HdJ-mIVCDov0qLQWX5qBGs3DuE=" alt=""/>
                <SideText>Every event could be your best tailgate!</SideText>
                </WeirdDiv>
            </div>
        );
    }
}

export default componentName;