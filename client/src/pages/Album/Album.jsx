import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import './Album.css'
import BACKEND_LINK from '../../backend'

export default function Album() {
	const albumId = useParams().id;
	const [imagesLinks, setImagesLinks] = useState({ images: [] });
	const [step, setStep] = useState(0);

	React.useEffect(() => {
		fetch(`${ BACKEND_LINK }/album/${ albumId }/${ step }`)
		.then(r => r.json())
		.then(d => {
			setImagesLinks(prev => {
				const newImagesLinks = { ...prev };
				newImagesLinks.images = [...newImagesLinks.images, ...d.images];
				newImagesLinks.haveNext = d.haveNext;
				return newImagesLinks;
			})
		});
	}, [step]);

	const loadMoreButton = () => {
		if ( !imagesLinks.haveNext ) { return; }
		setStep(prev => prev + 1);
	}
	
	return (
		<div className='fullAlbum'>
			{
				imagesLinks.images?.map((item, i) => 
					<div key={ i } className='fullALbum__box'>
						<img 
							className='fullAlbum__image'
							src={`${ BACKEND_LINK }/img/${ item }`}
							alt="image"
						/>
						<p className='fullALbum__box__number'>{i + 1}</p>
					</div>
				)
			}
			{
				imagesLinks.haveNext &&
				<button className='fullAlbum__loadMoreButton' onClick={ loadMoreButton }>load more</button>
			}
		</div>
	)
}
