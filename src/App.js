/*  COMBOS HEROKU
 *  March 2021
 *
 *  Author: Alejandro Montes de Oca TS4
 *  Description: This document is the main node of the application,
 *  here is a configuration about the routing
 *  =========================================================================
 *  Information about changes:
 *
 *  No.         Date.        Author.      Description.
 *
 *
*/
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { store, persistor } from './redux/store';
import { AppRouter } from './routers'


function App() {
	return (
		<>
			<Provider store={store}>
				<PersistGate persistor={persistor}>
					<AppRouter />
				</PersistGate>
			</Provider>
		</>

	);
}

export default App;
