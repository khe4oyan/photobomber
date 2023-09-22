import React from 'react';
import './Home.css';
import BACKEND_LINK from '../../backend'
import Album from '../../components/Album/Album';

export default function Home() {
	const [albums, setAlbums] = React.useState([]);

	React.useEffect(() => {
		fetch(BACKEND_LINK + '/albums')
		.then(r => r.json())
		.then(d => setAlbums(d));
	}, []);

	return (
		<div className='home'>
			<h1 className='home__title'>Albums</h1>
			{
				albums.map(album => 
					<Album 
						key={ album.id }
						data={ album }
					/>
				)
			}
		</div>
	)
}
