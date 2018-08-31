import React from 'react';
import './Rank.css';

const Rank = ({ user }) => {
	return (
		<div>
			<div className="white f3">
				{user.name}, your current rank is...
			</div>
			<div className="white f1">
				{user.rank}
			</div>
		</div>

	);
}

export default Rank;