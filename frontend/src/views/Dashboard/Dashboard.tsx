import { Box, Breadcrumbs, Button, Card, CardActions, CardContent, Grid, Link, Paper, Stack, styled, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";

const Item = styled(Paper)(({ theme }) => ({
	backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
	...theme.typography.body2,
	padding: theme.spacing(1),
	textAlign: 'center',
	color: theme.palette.text.secondary,
}));


const bull = (
	<Box
		component="span"
		sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
	>
		•
	</Box>
);

function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
	event.preventDefault();
	console.info('You clicked a breadcrumb.');
}

function Dashboard() {
	return (

		<Box component="main" sx={{ flexGrow: 1, p: 3 }}>
			{/* <DrawerHeader /> */}
			<div role="presentation" onClick={handleClick}>
				<Breadcrumbs aria-label="breadcrumb">
					<Link underline="hover" color="inherit" href="/">
						Make
					</Link>
					<Link
						underline="hover"
						color="inherit"
						href="/material-ui/getting-started/installation/"
					>
						This work
					</Link>
					<Typography color="text.primary">Breadcrumbs</Typography>
				</Breadcrumbs>
			</div>
			<Box sx={{ width: '100%' }}>
				<Stack
					direction="row"
					justifyContent="center"
					alignItems="stretch"
					spacing={2}
				>
					<Item sx={{ minWidth: 500 }}>Item 1</Item>
					<Item sx={{ maxWidth: 500 }}>Item 2</Item>
				</Stack>
			</Box>
			<Grid container spacing={2}>
				<Grid xs={8} item container>
					<Item sx={{ minWidth: 275, maxWidth: 500 }}>
						<Card>
							<CardContent>
								<Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
									Word of the Day
								</Typography>
								<Typography variant="h5" component="div">
									be{bull}nev{bull}o{bull}lent
								</Typography>
								<Typography sx={{ mb: 1.5 }} color="text.secondary">
									adjective
								</Typography>
								<Typography variant="body2">
									well meaning and kindly.
									<br />
									{'"a benevolent smile"'}
								</Typography>
							</CardContent>
							<CardActions>
								<Button size="small">Learn More</Button>
							</CardActions>
						</Card>
					</Item>
					<Item sx={{ minWidth: 275, maxWidth: 500 }}>
						<Card>
							<CardContent>
								<Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
									Word of the Day
								</Typography>
								<Typography variant="h5" component="div">
									be{bull}nev{bull}o{bull}lent
								</Typography>
								<Typography sx={{ mb: 1.5 }} color="text.secondary">
									adjective
								</Typography>
								<Typography variant="body2">
									well meaning and kindly.
									<br />
									{'"a benevolent smile"'}
								</Typography>
							</CardContent>
							<CardActions>
								<Button size="small">Learn More</Button>
							</CardActions>
						</Card>
						<br /><br />
					</Item>
					<Item>Main Content <br /><br /> </Item>
				</Grid>
				<Grid item xs={4}>
					Side Content <br /> This section will summarize upcoming dates either in a list or calendar view. Maybe the timeline MUI component

				</Grid>
			</Grid>
			<Typography paragraph>
				Coming Soon
			</Typography>
			<Typography paragraph>
				To a theatre near you
			</Typography>
		</Box>
	);
}
export default observer(Dashboard);
