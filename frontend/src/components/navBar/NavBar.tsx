import { AppBar, Toolbar, Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';

//const menuItems = ['tab1', 'tab2', 'tab3']

export default function NavBar(props) {
    return (
        <AppBar position="static">
            <Toolbar>
                <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                {props.menuItems.map((menuItems) => (
                    <Link key={menuItems} to={'/' + menuItems}>
                <Button
                    // onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: 'white', display: 'block' }}>
                    {menuItems}
                </Button>
                </Link>
                ))}
            </Box>
            </Toolbar>
        </AppBar>
    )
};