import React from 'react';

const Navigation =  ({ onRouteChange, isSignedin }) => {
	return (	
		<nav style={{display: 'flex', justifyContent: 'flex-end'}}>
			{
				(isSignedin === true)
				 ? <span onClick = {()=>onRouteChange('signout')} className="f3 link dim black underline pa3 pointer" >Sign Out</span>
				 : <p>
				 	<span onClick = {()=>onRouteChange('register')} className="f3 link dim black underline pa3 pointer" >Register</span>
				 	<span onClick = {()=>onRouteChange('signin')} className="f3 link dim black underline pa3 pointer" >Sign In</span>
				 </p>
			}
			

		</nav>
	);
}

export default Navigation;