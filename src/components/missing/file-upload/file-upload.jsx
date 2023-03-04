import React, { useState, useEffect } from 'react';
import './file-upload.scss';

function FileUpload (){
	const [file, setFile] = useState([]);
	let files = [];

	const onFileChange = async(event) => {
		console.log(event)
		for await( let i of event.target.files){
			console.log(i)
			file.push(i)
		}
		console.log(file)
	}

	useEffect(() => {
		
	},[file])

	return(
		<div className="file-upload-main-container">
			<div>
				<input type="file" onChange={event => onFileChange(event)} multiple/>
				{/* {file &&  */}
					<div className="file-content-container">
					{file.map((file) => (
						<div className="file-item">
							<h2>{file.name}</h2>
							<h2 onClick={() => console.log('Splice')} className="delete-toggle">X</h2>
						</div>
					))}
					</div>
				{/* } */}
			</div>
		</div>
	)
}

export default FileUpload;