import React, { Component } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	BrowserRouter as Router,
	Route,
	Routes,
	useNavigate,
} from "react-router-dom";
import "./App.css";

import Auth from "./components/Auth/Auth";
import Dashboard from "./components/Dashboard/Dashboard";

function App() {
	const dispatch = useDispatch();
	const isLogged = useSelector((state) => state.isLogged);
	// const Navigate = useNavigate();

	// return (
	// 	<div className='App'>
	// 		{isLogged ? (
	// 			<>
	// 				<Router>
	// 					<>
	// 						<Routes>
	// 							<Route path='/' element={<Dashboard />} />
	// 							<Route path='*' element={<Dashboard />} />
	// 						</Routes>
	// 					</>
	// 				</Router>
	// 			</>
	// 		) : (
	// 			<>
	// 				<Router>
	// 					<>
	// 						<Routes>
	// 							<Route path='/auth' element={<Auth />} />
	// 							<Route path='*' element={<Auth />} />
	// 						</Routes>
	// 					</>
	// 				</Router>
	// 			</>
	// 		)}
	// 	</div>
	// );

	
	return (
		<div className='App'>
			{isLogged ? (
				<Dashboard/>
			) : (
				<Auth />
			)}
		</div>
	);
}

export default App;
