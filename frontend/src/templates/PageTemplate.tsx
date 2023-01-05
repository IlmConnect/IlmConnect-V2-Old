import { observer } from "mobx-react-lite";
import MiniDrawer from "components/MiniDrawer/MiniDrawer";
import React from "react";
import ToolBarComponent from "components/ToolBar/ToolBarComponent";
import { Outlet } from "react-router-dom";
import { styled } from "@mui/material";

const RootContainer = styled('div')`
	display: flex;
	padding-top: 65px
`;

function PageTemplate() {
	const [open, setOpen] = React.useState(false);

	const handleDrawerOpenToggle = () => {
	setOpen(!open);
	};
	return (
	<RootContainer>
		<ToolBarComponent
		handleDrawerOpenToggle={handleDrawerOpenToggle}
		isOpen={open}
		/>
		<MiniDrawer
		handleDrawerOpenToggle={handleDrawerOpenToggle}
		isOpen={open}
		/>
		<Outlet />
	</RootContainer>
	);
}
export default observer(PageTemplate);
