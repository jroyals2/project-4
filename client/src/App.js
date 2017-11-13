import React, {Component} from 'react'
import {Route, BrowserRouter as Router, Switch, Redirect} from 'react-router-dom'
import SignUpLogIn from './components/users/SignUpLogIn'
import axios from 'axios'
import {clearAuthTokens, saveAuthTokens, setAxiosDefaults, userIsLoggedIn} from "./util/SessionHeaderUtil"
import Landing from './components/landing/Landing.jsx'
import NavBar from './components/navbar/NavBar.jsx'
import UserPage from './components/users/UserPage.jsx'
import EventPage from './components/events/EventPage.jsx'
import TailgatesPage from './components/tailgates/TailgatesPage.jsx'

class App extends Component {

    state = {
        signedIn: false
    }

    async componentWillMount() {
      try {
          const signedIn = userIsLoggedIn()
  
          
          if (signedIn) {
              setAxiosDefaults()
          }
          this.setState({signedIn})
      } catch(error) {
          console.log(error)
      }
  }

    signUp = async (email, password, password_confirmation) => {
        try {
            const payload = {
                email: email,
                password: password,
                password_confirmation: password_confirmation
            }
            const response = await axios.post('/auth', payload)
            saveAuthTokens(response.headers)

            this.setState({signedIn: true})

        } catch (error) {
            console.log(error)
        }
    }

    signIn = async (email, password) => {
        try {
            const payload = {
                email,
                password
            }
            const response = await axios.post('/auth/sign_in', payload)
            saveAuthTokens(response.headers)

            this.setState({signedIn: true})

        } catch (error) {
            console.log(error)
        }
    }
    signOut = async (event) => {
      try {
          event.preventDefault()
          
          await axios.delete('/auth/sign_out')
  
          clearAuthTokens();
  
          this.setState({signedIn: false})
          
      } catch(error) {
          console.log(error)
      }
  }
  
  // {this.state.signedIn ? null : <Redirect to="/signUp"/>}

    render() {
   
        const SignUpLogInComponent = () => (
            <SignUpLogIn
                signUp={this.signUp}
                signIn={this.signIn}/>
        )
        const UserComponent = () => (
          <UserPage signedIn={this.state.signedIn}/>
      )

        return (
            <Router>
                <div>
                <NavBar signedIn={this.state.signedIn} signOut={this.signOut}/>
                    <Switch>
                        <Route exact path="/" component={Landing} />
                        <Route exact path="/signUp" render={SignUpLogInComponent}/>
                        <Route exact path="/users" render={UserComponent} />
                        <Route exact path="/events/:event_id" component={EventPage} />
                        <Route exact path="/users/tailgates/:tailgate_id" component={TailgatesPage}/>
                    </Switch>
                    
                </div>
            </Router>
        )
    }
}

export default App
