/*  COMBOS HEROKU
 *  March 2021
 *
 *  Author: Alejandro Montes de Oca TS4
 *  Description: here is a configuration about the routing for module in the app "Combos Generator"
 *  =========================================================================
 *  Information about changes:
 *
 *  No.         Date.        Author.      Description.
 *
 *
 */
import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Head, Nav, LimitOfCombos, TabsCreateCombo } from '../components';
import Home from '../views/combos-generator/Home';
import CreateLimitOfCombo from '../views/combos-generator/CreateLimitOfCombo';

const CombosGeneratorRouter = () => {
	return (
		<>
			<Switch>
				<Route exact path='/combos-generator'>
					<header>
						<Head />
					</header>
					<Home />
				</Route>
				<Route exact path='/combos-generator/crear-limite-combo'>
					<header>
						<Head />
						<Nav />
					</header>
					<CreateLimitOfCombo />
				</Route>
				<Route exact path='/combos-generator/crear-combo'>
					<header>
						<Head />
						<Nav />
					</header>
					<TabsCreateCombo />
				</Route>
				<Route exact path='/combos-generator/limite-combos'>
					<header>
						<Head />
						<Nav />
					</header>
					<LimitOfCombos />
				</Route>
				<Redirect to='/combos-generator' />
			</Switch>
		</>
	);
};

export default CombosGeneratorRouter;
