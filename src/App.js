import './App.css';
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginScreen from './screens/LoginScreen';
import DashboardScreen from './screens/DashboardScreen';

function App() {

	const state = useSelector((state) => state);

	console.log(state);

	return (
		<div className="app">

			<Router>
				<header className="header">
					<h2>Header</h2>
				</header>
				<main className='main'>
					<Routes>
						<Route path='/' element={<DashboardScreen />} />
						<Route path='/login' element={<LoginScreen />} />
						<Route path='/dashboard' element={<DashboardScreen />} />
					</Routes>
				</main>
				<footer className="footer">
					<h2>Footer</h2>
				</footer>    				
			</Router>

		</div>
	);
}

export default App;
