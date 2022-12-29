import { Button, CircularProgress, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import config from 'config';
import authStore from 'store/auth';
import FullScreenGrid from '../components/FullScreenGrid/FullScreenGrid';
import { useForm } from "react-hook-form"

interface FormData {
	email: string
	password: string
}

function LogInView() {
	const { register, formState: { errors }, handleSubmit } = useForm<FormData>()
	const navigate = useNavigate()
	const [loading, setLoading] = useState(false)

	const logIn = async (data: FormData) => {
		try {
			setLoading(true);
			const res = await axios.post(config.backend.url + 'login', data)
			authStore.setUser(res.data?.user, res.data?.token)
			navigate('/');
		}
		catch (e) {
			alert('There was an error singing you up. Please try again later')
		}
		finally {
			setLoading(false)
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
				{...register(
					'email',
					{
						required: {
							value: true,
							message: 'Email is required'
						}
					}
				)}
				error={!!errors.email}
				helperText={errors.email?.message}
				disabled={loading}
			/>
			<TextField 
				id="password"
				label="Password"
				type="password"
				{...register(
					'password',
					{
						required: {
							value: true,
							message: 'Password is required'
						}
					}
				)}
				error={!!errors.password}
				helperText={errors.password?.message}
				disabled={loading}
			/>

			<Button
				variant="contained"
				onClick={handleSubmit(logIn)}
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
