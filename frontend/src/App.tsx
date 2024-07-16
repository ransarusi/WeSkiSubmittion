import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { IResort } from './models/IResort'
import { MainPage } from './Components/MainPage/MainPage';

function App() {
	const [resorts, setResorts] = useState<IResort[]>([]);

	useEffect(() => {
		const fetchResorts = async () => {
			const { data } = await axios<IResort[]>('http://localhost:5000/resorts')
			setResorts(data);
		}
		fetchResorts();
	}, []);

	return (
		<div className="App">
			<header className="App-header">
				<MainPage />
			</header>
		</div>
	);
}

export default App;
