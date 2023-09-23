import React, { useRef, useState } from 'react'
import './AddIMages.css'
import BACKEND_LINK from '../../backend'

export default function AddIMages() {
	const uploadStatuses = {
		NONE: 'NONE',
		UPLOADING: 'UPLOADING',
		LOADED: 'LOADED', 
		ERROR: 'ERROR',
	};
	const [uploadStatus, setUploadStatus] = useState(uploadStatuses.NONE);
	const inputRef = useRef(null);

	const  handleFileUploaded  = () => {
		setUploadStatus(uploadStatuses.UPLOADING);
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
				setUploadStatus(uploadStatuses.LOADED);
			} else {
				setUploadStatus(uploadStatuses.ERROR);
			}
		})
		.catch((_) => {
			setUploadStatus(uploadStatuses.ERROR);
		});
	};

	return (
		<div className='addImages center'>
			<div>
				<div className='addImages__box'>
					<input
						type="file"
						multiple
						ref={inputRef}
					/>
					<button onClick={ handleFileUploaded }>загрузить</button>
				</div>
				<div className={`uploadStatusBox status_${ uploadStatus }`}>
					<p className='uploadStatusBox__text'>
						{ uploadStatus === uploadStatuses.NONE && 'выберите все фотографии' }
						{ uploadStatus === uploadStatuses.LOADED && 'загрузка завершена' }
						{ uploadStatus === uploadStatuses.UPLOADING && 'фотографии загружаются на сервер..' }
						{ uploadStatus === uploadStatuses.ERROR && 'произошла какая-то ошибка.' }
					</p>
				</div>
			</div>
		</div>
	);
}