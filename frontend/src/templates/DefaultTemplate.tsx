import { observer } from "mobx-react-lite";
import Drawer from "components/Drawer/Drawer";
import React from "react";
import Navbar from "components/Navbar/Navbar";
import { Outlet } from "react-router-dom";
import { styled } from "@mui/material";

const RootContainer = styled('div')`
	display: flex;
	padding-top: 65px;
`

function PageTemplate() {
	const [open, setOpen] = React.useState(false);

	const toggleOpen = () => {
		setOpen(!open);
	};
	return (
		<RootContainer>
			<Navbar
				onToggle={toggleOpen}
			/>
			<Drawer
				onToggle={toggleOpen}
				open={open}
			/>
			<Outlet />
		</RootContainer>
	);
}
export default observer(PageTemplate);
