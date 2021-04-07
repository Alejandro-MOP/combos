/*  COMBOS HEROKU
 *  March 2021
 *
 *  Author: Alejandro Montes de Oca TS4
 *  Description: here is a configuration about the routing
 *  =========================================================================
 *  Information about changes:
 *
 *  No.         Date.        Author.      Description.
 *
 *
 */
import React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';

import { CombosGeneratorRouter, RevenueRouter } from './index';


const AppRouter = () => {
	return (
		<Router>
			<Switch>
				<Route path='/combos-generator' component={CombosGeneratorRouter} />
				<Route path='/' component={RevenueRouter} />
				<Redirect to='/' />
			</Switch>
		</Router>
	);
};

export default AppRouter;
