import React, { Component } from 'react';

class Register extends Component { 

	constructor(props){
		super(props);
		this.state = {
			signupName: '',
			signupEmail: '',
			signupPassword: ''
		}
	}

	onSignupNameChange = (event) => {
		this.setState({signupName: event.target.value});
	}

	onSignupPasswordChange = (event) => {
		this.setState({signupPassword: event.target.value});
	}

	onSignupEmailChange = (event) => {
		this.setState({signupEmail: event.target.value});
	}


	onSignupSubmit = () => {
		fetch('http://localhost:3001/signup', {
			method: 'post',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
					name: this.state.signupName,
					email: this.state.signupEmail,
					password: this.state.signupPassword
				})
		})
		.then( res => res.json())
		.then( data => {
			if(data.id){
				this.props.loadUser(data);
				this.props.onRouteChange('home');
			}
		})
		// this.props.isSignedin = true;
	}

	render(){
		// const { onRouteChange, loadUser } = this.props;
		return (
			<article className="br2 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw5 center shadow-5">
				<main className="pa4 black-80">
				  <div className="measure">
				    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
				      <legend className="f1 fw6 ph0 mh0">Register</legend>
				      <div className="mt3">
				        <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
				        <input onChange = { this.onSignupNameChange } className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" name="name"  id="name" />
				      </div>
				      <div className="mv3">
				        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
				        <input onChange = { this.onSignupEmailChange } className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email"  id="email" />
				      </div>
				      <div className="mv3">
				        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
				        <input onChange = { this.onSignupPasswordChange } className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password" />
				      </div>
				    </fieldset>
				    <div className="">
				      <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Register" onClick = { this.onSignupSubmit } />
				    </div>
				  </div>
				</main>
			</article>

		);		
	}
	
}

export default Register;