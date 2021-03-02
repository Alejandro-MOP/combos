import React, { useState } from "react";
import "./TabsCreateCombo.css";
import SwipeableViews from "react-swipeable-views";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { AppBar, Tabs, Tab } from "@material-ui/core";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";

import { TabPanel , ComboData, ExclusionsAndInclusions } from "../index";
import PopoverExclusionsAndInclusions from './PopoverExclusionsAndInclusions/PopoverExclusionsAndInclusions';


const useStyles = makeStyles((theme) => ({
	root: {
		backgroundColor: theme.palette.background.paper,
		width: 1200,
	},
	Tab: {
		flexDirection: 'row-reverse'
	}
}));

function a11yProps(index) {
	return {
		id: `full-width-tab-${index}`,
		"aria-controls": `full-width-tabpanel-${index}`,
	};
}


const TabsCreateCombo = () => {
	/*
	 * For de Tabs in nav
	 */
	const classes = useStyles();
	const theme = useTheme();

	const [value, setValue] = useState(0);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	const handleChangeIndex = (index) => {
		setValue(index);
	};

	/*
	 * for Tab & PopoverExclusionsAndInclusions
	 */

	const [anchorEl, setAnchorEL] = useState(null);
	const [view, setView] = useState(0);

	const handleClick = (event) => {
		event.stopPropagation();
		setAnchorEL(event.currentTarget);
	};


	return (
		<div className={classes.root}>
			<AppBar position="static" color="default" className="mt-2">
				<Tabs
					value={value}
					onChange={handleChange}
					indicatorColor="primary"
					textColor="primary"
					variant="fullWidth"
					style={{ height: "1rem" }}
				>
					<Tab label="DATOS DEL COMBO" {...a11yProps(0)} />
					<Tab
						label={"Exclusiones e Inclusiones"}
						icon={<ArrowDropDownIcon onClick={handleClick} />}
					/>
					<Tab label="BUSQUEDA DE MATERIALES" {...a11yProps(2)} />
					<Tab label="RESUMEN DEL COMBO" {...a11yProps(3)} />
				</Tabs>

				<PopoverExclusionsAndInclusions anchorEl={anchorEl} setAnchorEL={setAnchorEL} setView={setView}/>

			</AppBar>

			<SwipeableViews
				axis='x'
				index={value}
				onChangeIndex={handleChangeIndex}
			>
				<TabPanel value={value} index={0} dir={theme.direction}>
					<ComboData setValue={setValue} />
				</TabPanel>

				<TabPanel value={value} index={1} dir={theme.direction}>
					<ExclusionsAndInclusions view={view} setView={setView}/>
				</TabPanel>

				<TabPanel value={value} index={2} dir={theme.direction}>

				</TabPanel>

				<TabPanel value={value} index={3} dir={theme.direction}>

				</TabPanel>

			</SwipeableViews>
		</div>
	);
}

export default TabsCreateCombo;