import React, { Component } from 'react';

class SignIn extends Component {

	constructor(props){
		super(props);
		this.state = {
			signInEmail: '',
			signInPassword: '',
			error: ''
		};
	}

	onEmailChange = (event) => {
		this.setState({signInEmail:event.target.value})
	}

	onPasswordChange = (event) => {
		this.setState({signInPassword:event.target.value})
	}

	onSignInSubmit = () => {
		fetch('http://localhost:3001/signin', {
			method: 'post',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				email: this.state.signInEmail,
				password: this.state.signInPassword,
			})
		})
		.then( res => res.json())
		.then( data => {
			
			if(data.id){
			// if(data === 'signin successful'){
				// this.props.isSignedin = true; 
				this.props.loadUser(data);
				this.props.onRouteChange('home');
			} else {
				this.setState({error: data})
			}
		})

	}

	render(){
		
		const { onRouteChange } = this.props;

		return (
			<article className="br2 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw5 center shadow-5">
				<main className="pa4 black-80">
				  <div className="measure">
				    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
				      <legend className="f1 fw6 ph0 mh0">Sign In</legend>
				      <div className="mt3">
				        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
				        <input onChange = {this.onEmailChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address" required />
				      </div>
				      <div className="mv3">
				        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
				        <input onChange = {this.onPasswordChange} className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password" required />
				      </div>
				    </fieldset>
				    <div className="">
				      <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Sign in" onClick={ this.onSignInSubmit } />
				    </div>
				  	<div className='error'>{this.state.error}</div> 
				    <div className="lh-copy mt3">
				      <p onClick = {() => onRouteChange('register')} className="f6 link dim black db pointer">Register</p>
				    </div>
				  </div>
				</main>
			</article>

		);
	}

	
}

export default SignIn;