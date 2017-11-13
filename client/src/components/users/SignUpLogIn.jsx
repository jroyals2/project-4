import React, {Component} from 'react'
import { Redirect } from 'react-router-dom'
import styled from 'styled-components'

const StyledForm = styled.form`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
margin: 25%;

`
const PageWrapper = styled.div`
display: flex;
justify-content: center;
align-items: center;
`
const FormDiv = styled.div`
display: flex;
margin: 5%;
`
const InputWrapper = styled.input`
height: 30px;
width: 280px;

`

class SignUpLogIn extends Component {

    state = {
        email: '',
        password: '',
        password_confirmation: '',
        redirect: false
    }

    signUp = (event) => {
        event.preventDefault()
        this.props.signUp(
            this.state.email,
            this.state.password,
            this.state.password_confirmation
        )
    }

    signIn = (event) => {
        event.preventDefault()
        this.props.signIn(
            this.state.email,
            this.state.password
        )
        this.setState({redirect: !this.state.redirect})
    }

    handleChange = (event) => {
        const newState = {...this.state}
        newState[event.target.name] = event.target.value
        this.setState(newState)
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to={`/users`} />
        }
        return (
            <PageWrapper>
                <StyledForm>
                    <FormDiv>
                        <InputWrapper onChange={this.handleChange} type="text" name="email" value={this.state.email} placeholder="YOUR EMAIL"/>
                    </FormDiv>
                    <FormDiv>
                        <InputWrapper onChange={this.handleChange} type="password" name="password" value={this.state.password} placeholder="PASSWORD"/>
                    </FormDiv>
                    <FormDiv>
                        <InputWrapper onChange={this.handleChange} type="password" name="password_confirmation"
                               value={this.state.password_confirmation} placeholder="CONFIRM PASSWORD"/>
                    </FormDiv>

                    <button onClick={this.signUp}>Sign Up</button>
                    <button onClick={this.signIn}>Log In</button>
                </StyledForm>
            </PageWrapper>
        )
    }
}

export default SignUpLogIn
