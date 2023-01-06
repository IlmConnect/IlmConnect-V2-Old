import { AppBar, AppBarProps, Button, IconButton, Toolbar } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import authStore from 'store/auth';
//import { AppBar } from "components/MiniDrawer/MiniDrawer";

const ToolbarFlex = styled(Toolbar)`
	justify-content: right;
`

interface Props {
	onToggle: () => void
}

const Navbar: React.FC<Props> = ({ onToggle }) => {
	const navigate = useNavigate()
	return (
		<AppBar>
			<ToolbarFlex>
				<IconButton
					color="inherit"
					aria-label="open drawer"
					edge="start"
					sx={{
						display: { xs: 'block', sm: 'none' }
					}}
					onClick={onToggle}
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
export default observer(Navbar);
