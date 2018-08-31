import React from 'react';
import './FaceDetect.css';

const FaceDetect = ({ imageUrl, box }) => {
	return (
		<div className="center">
			<div className="absolute mt2">
				<img id="input-image" src={imageUrl} alt="" width="500px" height="auto" />
				<div className='bounding-box' style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}></div>
			</div>
		</div>

	);
}

export default FaceDetect;