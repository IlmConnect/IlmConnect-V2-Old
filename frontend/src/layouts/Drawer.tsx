import { AppBar, Unstable_Grid2 } from "@mui/material";
import { Box } from "@mui/system";
import { Outlet } from "react-router-dom";
import Sidebar from "../ui/Sidebar";


function DrawerLayout() {
	return (
		<Unstable_Grid2
			container

		>
			<Box>
				<Sidebar />
			</Box>

			<Box>
				<AppBar>

				</AppBar>

				<Outlet />
			</Box>
		</Unstable_Grid2>
	)
}
export default DrawerLayout
