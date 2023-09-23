import React from 'react'
import './Album.css'
import { Link } from 'react-router-dom';

export default function Album({ data, id }) {
	const {
		title,
		banner
	} = data;

	return (
		<Link to={`/album/${ id }`}>
			<div className='album center'>
				<h2 className='album__title'>{ title }</h2>
				<div className='album__blurrer' ></div>
				<img className='album__banner' src={`http://localhost:5000/img/${ banner }`} alt="album_banner" />
			</div>
		</Link>
	)
}
