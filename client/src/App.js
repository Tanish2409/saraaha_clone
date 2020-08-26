import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import setAuthToken from './utils/setAuthToken';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Navbar from './components/layout/Navbar';
import Alert from './components/layout/Alert';
import Dashboard from './components/layout/Dashboard';
import Home from './components/layout/Home';
import SendMessage from './components/layout/SendMessage';
import './assets/index.css';
import { loadUser } from './redux/actions/auth';

/**
 * REDUX
 */
import { Provider } from 'react-redux';
import store from './redux/store';

setAuthToken();

const App = () => {
	useEffect(() => {
		store.dispatch(loadUser());
	}, []);

	return (
		<Provider store={store}>
			<Router>
				<div className='App'>
					<Navbar />

					<Switch>
						<Route exact path='/' component={Home} />
						<Route exact path='/login' component={Login} />
						<Route exact path='/register' component={Register} />
						<Route exact path='/dashboard' component={Dashboard} />
						<Route
							exact
							path='/send/:userName'
							component={SendMessage}
						/>
					</Switch>
					<Alert />
				</div>
			</Router>
		</Provider>
	);
};

export default App;
