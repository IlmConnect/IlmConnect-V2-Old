import { Button, CircularProgress, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import config from 'config';
import authStore from 'store/auth';
import FullScreenGrid from '../components/FullScreenGrid/FullScreenGrid';


function LogInView() {
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState(false);

	const logIn = async () => {
		try {
			setLoading(true);
			const res = await axios.post(config.backend.url + 'login', { email, password });
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
				Log In
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
				onClick={logIn}
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
export default observer(LogInView);
