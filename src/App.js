import './App.css';
import { useEffect } from "react";
import { useSelector,useDispatch } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginScreen from './screens/LoginScreen';
import DashboardScreen from './screens/DashboardScreen';
import TasksScreen from './screens/TasksScreen';
import MembersScreen from './screens/MembersScreen';
import Header from './components/Header';
import Footer from './components/Footer';
import AuthActions from './state/actions/AuthActions';

function App() {

	//const state = useSelector((state) => state);
	const dispatch = useDispatch();

    useEffect(() => {
        dispatch(AuthActions.check());
    }, []);

	return (
		<div className="app">
			<Router>
				<Header />
				<main className='main  min-h-screen p-6'>
					<Routes>
						<Route path='/' element={<LoginScreen />} />
						<Route path='/login' element={<LoginScreen />} />
						<Route path='/dashboard' element={<DashboardScreen />} />
						<Route path='/members' element={<MembersScreen />} />
						<Route path='/tasks' element={<TasksScreen />} />
					</Routes>
				</main>
				<Footer />    				
			</Router>

		</div>
	);
}

export default App;
