import { Button, Grid, styled, TextField, Typography, Unstable_Grid2 } from "@mui/material"
import { Link } from "react-router-dom"

const FullScreenGrid = styled(Unstable_Grid2)`
	width: 600px;
	margin: auto;
	padding-top: 50px;

	flex-direction: column;
	justify-content: center;
`

function SignUpView() {
	return (
		<FullScreenGrid
			container
			gap={2}
		>
			<Typography
				variant="h4"
			>
				Sign Up
			</Typography>

			<TextField 
				id="email"
				label="Email"
			/>
			<TextField 
				id="password"
				label="Password"
				type="password"
			/>

			<Button
				variant="contained"
			>
				Sign Up
			</Button>

			<Typography>
				Already have an account?&nbsp;
				<Link to="/login">
					Log In
				</Link>
			</Typography>
		</FullScreenGrid>
	)
}
export default SignUpView
