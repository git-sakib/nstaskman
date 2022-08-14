import './App.css';
import { useEffect } from "react";
import { useSelector,useDispatch } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginScreen from './screens/LoginScreen';
import DashboardScreen from './screens/DashboardScreen';
import TasksScreen from './screens/TasksScreen';
import MembersScreen from './screens/MembersScreen';
import TasksFormScreen from './screens/TasksFormScreen';
import MemberFormScreen from './screens/MemberFormScreen';
import Header from './components/Header';
import Footer from './components/Footer';
import AuthActions from './state/actions/AuthActions';

function App() {

	const auth = useSelector((state) => state.auth);
	const dispatch = useDispatch();

    useEffect(() => {
        dispatch(AuthActions.check());
    }, []);

	return (
		<div className='page'>
			{auth.loading && <div className="loading">
				<div className="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-gray-700 opacity-75 flex flex-col items-center justify-center">
					<div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
					<h2 className="text-center text-white text-xl font-semibold">Loading ...</h2>
				</div>				
			</div>}
			{!auth.loading && <div className="app">
				<Router>
					<Header />
					<main className='main  min-h-screen p-6'>
						<Routes>
							<Route path='/' element={<LoginScreen />} />
							<Route path='/login' element={<LoginScreen />} />
							<Route path='/dashboard' element={<DashboardScreen />} />
							<Route path='/members' element={<MembersScreen />} />
							<Route path='/tasks' element={<TasksScreen />} />
							<Route path='/tasks/form' element={<TasksFormScreen />} />
							<Route path='/tasks/form/:id' element={<TasksFormScreen />} />
							<Route path='/members/form' element={<MemberFormScreen />} />
							<Route path='/members/form/:id' element={<MemberFormScreen />} />
						</Routes>
					</main>
					<Footer />    				
				</Router>
			</div>}			
		</div>
	);
}

export default App;
