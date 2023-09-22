import React, { useRef } from 'react'
import './AddIMages.css'
import BACKEND_LINK from '../../backend'

export default function AddIMages() {
	const inputRef = useRef(null);

	const handleFileChange = () => {
		const selectedFiles = inputRef.current.files;
		const formData = new FormData();

		if (!selectedFiles.length) { return; }
		
		for (let i = 0; i < selectedFiles.length; i++) {
			formData.append('images', selectedFiles[i]);
		}
	
		fetch(`${BACKEND_LINK}/add`, {
			method: 'POST',
			body: formData,
		})
		.then((response) => {
			if (response.ok) {
				console.log('Files uploaded successfully.');
			} else {
				console.error('Error uploading files.');
			}
		})
		.catch((error) => {
			console.error('Error uploading files:', error);
		});
	};

	return (
		<div className='addImages center'>
			<div className='addImages__box'>
				<input
					type="file"
					multiple
					ref={inputRef}
				/>
				<button onClick={handleFileChange}>загрузить</button>
			</div>
		</div>
	);
}