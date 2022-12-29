import { Button, CircularProgress, Grid, styled, TextField, Typography, Unstable_Grid2 } from '@mui/material';
import axios from 'axios';
import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import config from 'config';
import authStore from 'store/auth';

export const FullScreenGrid = styled(Unstable_Grid2)`
	width: 600px;
	margin: auto;
	padding-top: 50px;

	flex-direction: column;
	justify-content: center;
`;

function SignUpView() {
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState(false);

	const signUp = async () => {
		try {
			setLoading(true);
			const res = await axios.post(config.backend.url + 'signup', { email, password });
			authStore.setUser(res.data?.user, res.data?.token);
			navigate('/');
		}
		catch (e) {
			setError(true);
		}
		finally {
			setLoading(false);
		}		
	};

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
				value={email}
				onChange={e => setEmail(e.target.value)}
				disabled={loading}
			/>
			<TextField 
				id="password"
				label="Password"
				type="password"
				value={password}
				onChange={e => setPassword(e.target.value)}
				disabled={loading}
			/>

			<Button
				variant="contained"
				onClick={signUp}
				disabled={loading}
			>
				{ loading? 
					<CircularProgress 
						color="inherit"
						size={24}
					/>: 
					'Sign Up' 
				}
			</Button>

			<Typography>
				Already have an account?&nbsp;
				<Link to="/login">
					Log In
				</Link>
			</Typography>
		</FullScreenGrid>
	);
}
export default observer(SignUpView);
