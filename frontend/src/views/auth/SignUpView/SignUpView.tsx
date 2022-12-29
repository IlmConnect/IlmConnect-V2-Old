import { Button, CircularProgress, TextField, Typography } from '@mui/material';
import axios from 'axios'
import { observer } from 'mobx-react-lite'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import config from 'config'
import authStore from 'store/auth'
import FullScreenGrid from '../components/FullScreenGrid/FullScreenGrid'
import { useForm } from "react-hook-form"

interface FormData {
	email: string
	password: string
}

function SignUpView() {
	const { register, formState: { errors }, handleSubmit } = useForm<FormData>()
	const navigate = useNavigate()
	const [loading, setLoading] = useState(false)
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	console.log(errors)
	const signUp = async (data: FormData) => {
		
		try {
			setLoading(true);
			const res = await axios.post(config.backend.url + 'signup', data)
			authStore.setUser(res.data?.user, res.data?.token)
			navigate('/');
		}
		catch (e) {
			alert('There was an error singing you up. Please try again later' + e)
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
				{...register(
					'email',
					{ 
						required: { 
							value: true, 
							message: 'Email is required' 
						},
						pattern: {
							value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
							message: 'Must be a valid email'
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
						},
						minLength: {
							value: 8, 
							message: 'Password must be longer than 8 characters' 
						},
						pattern: {
							value: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-])/,
							message: 'Password must contain one uppercase letter, one lowercase letter, and one special character(#?!@$%^&*-)'
						}
					}
				)}
				error={!!errors.password}
				helperText={errors.password?.message}
				disabled={loading}
			/>

			<Button
				variant="contained"
				onClick={handleSubmit(signUp)}
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
