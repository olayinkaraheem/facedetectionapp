import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({onInputChange, onDetectSubmit}) => {
	return (
		<div>
			<p className="f3">
				{'This magic brain will detect faces in your application'}
			</p>
			<div className="center">
				<div className="pa4 br3 shadow-5 center form">
					<input type="text" className="f4 pa2 center w-70" onChange={onInputChange}/>
					<button className="w-30 grow f4 link ph3 pv2 dib white bg-light-purple" onClick={onDetectSubmit}>Detect</button>
				</div>
			</div>
		</div>

	);
}

export default ImageLinkForm;