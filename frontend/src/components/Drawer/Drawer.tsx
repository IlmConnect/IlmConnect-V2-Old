import * as React from 'react';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import { observer } from 'mobx-react-lite';
import DrawerItem, { NavigationItem } from './DrawerItem';
import { AnnouncementOutlined, DashboardOutlined, GroupOutlined, LibraryBooksOutlined, SettingsOutlined, TodayOutlined } from '@mui/icons-material';
import { Box, Divider, Drawer as MuiDrawer, List } from '@mui/material';


const StyledDivider = styled(Divider)`
	&:last-child {
		display: none;
	}
`

const items: NavigationItem[][] = [
	[
		{
			text: 'Dashboard',
			icon: <DashboardOutlined />,
			route: '/dashboard',
			children: [
				{
					text: 'DashboardChild',
					icon: <DashboardOutlined />,
					route: '/dashboard',
					children: []
				}
			]
		},
		{
			text: 'Announcement',
			icon: <AnnouncementOutlined />,
			route: '/announcement',
		},
		{
			text: 'Users',
			icon: <GroupOutlined />,
			route: '/users'
		},
		{
			text: 'Courses',
			icon: <LibraryBooksOutlined />,
			route: '/courses',
			children: [
				{
					text: 'Create',
					icon: <LibraryBooksOutlined />,
					route: '/courses/create'
				}
			]
		},
		{
			text: 'My Bookings',
			icon: <TodayOutlined />,
			route: '/bookings'
		},
	],
	[
		{
			text: 'Settings',
			icon: <SettingsOutlined />,
			route: '/settings'
		}
	]
]

const DRAWER_WIDTH = 275

interface DrawerProps {
	open?: boolean
	onToggle: () => void
}

const Drawer: React.FC<DrawerProps> = ({
	open = false,
	onToggle
}) => {
	const theme = useTheme()

	const Items = () => {
		return <List>
			{
				items.flatMap(itemGroup => [
					...itemGroup.map(item => (
						<DrawerItem
							key={item.route}
							item={item}
							onToggle={onToggle}
						/>
					)),
					<StyledDivider />
				])
			}
		</List>
	}

	return (
		<Box
			sx={{
				width: { sm: DRAWER_WIDTH },
			}}
		>
			{/* mobile */}
			<MuiDrawer
				variant='temporary'
				sx={{
					display: { xs: 'block', sm: 'none' },
					'& .MuiDrawer-paper': {
						width: DRAWER_WIDTH,
					}
				}}
				open={open}
				onClose={onToggle}
			>
				<Items />
			</MuiDrawer>

			{/* pc */}
			<MuiDrawer
				variant='permanent'
				sx={{
					display: { xs: 'none', sm: 'block' },
					'& .MuiDrawer-paper': {
						width: DRAWER_WIDTH,
						boxSizing: 'border-box',
						marginTop: { xs: 0, sm: '64px' }
					},
				}}
			>
				<Items />
			</MuiDrawer>
		</Box>
	)
}

export default observer(Drawer)
