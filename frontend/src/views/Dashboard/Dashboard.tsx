import { Box, Grid, Typography } from "@mui/material";
import MiniDrawer, { DrawerHeader } from "components/MiniDrawer/MiniDrawer";
import { observer } from "mobx-react-lite";

function Dashboard() {
  return <MiniDrawer />;
}
export default observer(Dashboard);
