import { AppBarProps, Button, IconButton, Toolbar } from "@mui/material";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import MenuIcon from '@mui/icons-material/Menu';
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import authStore from 'store/auth';
import { AppBar } from "components/MiniDrawer/MiniDrawer";

const ToolbarFlex = styled(Toolbar)`
  justify-content: space-between;
`
function ToolBarComponent(props) {
    const navigate = useNavigate()
  return (
    <AppBar position="fixed" open={props.isOpen}>
      <ToolbarFlex>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={props.handleDrawerOpenToggle}
          edge="start"
          sx={{
            marginRight: 5,
          }}
        >
          <MenuIcon />
        </IconButton>
        <Button
          variant='contained'
          color='secondary'
          onClick={() => authStore.user ?
            authStore.logout() :
            navigate('/login')
          }
        >
          {authStore.user ? 'Logout' : 'Login'}
        </Button>
      </ToolbarFlex>
    </AppBar>
  );
}
export default observer(ToolBarComponent);
