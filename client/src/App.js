import React from 'react';
import { Routes, Route } from 'react-router-dom';
import 'resetcss_khc/index.css';
import './App.css';
import Home from './pages/Home/Home';
import Album from './pages/Album/Album';
import AddImages from './pages/AddImages/AddIMages'

export default function App() {
	return (
		<div className="app">
			<Routes>
				<Route path='/' element={ <Home /> }/>
				<Route path='/album/:id' element={ <Album /> } />
				<Route path='/add' element={ <AddImages /> } />
			</Routes>
		</div>
	);
}
