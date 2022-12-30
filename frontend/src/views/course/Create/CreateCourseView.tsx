import { Button, CircularProgress, TextField, Typography } from "@mui/material"
import axios from "axios"
import HtmlEditor from "components/HtmlEditor/HtmlEditor"
import config from "config"
import { useState } from "react"
import { useForm } from "react-hook-form"
import authStore from "store/auth"
import LoadingSpinner from "ui/LoadingٍSpinner"
import FullScreenGrid from "views/auth/components/FullScreenGrid/FullScreenGrid"

interface FormData {
	title: string
	description: string | object | null | undefined
}

const CreateCourseView: React.FC = () => {
	const { register, formState: { errors }, handleSubmit, setValue } = useForm<FormData>()
	const [loading, setLoading] = useState(false)

	const createCourse = async (data: FormData) => {
		try {
			setLoading(true);
			const res = await axios.post(config.backend.url + 'courses', data)
			console.log(res.data)
			//navigate('/');
		}
		catch (e: any) {
			const errorMessage = e?.response?.data?.error?.message
			alert(errorMessage)
		}
		finally {
			setLoading(false)
		}
	}

	return (
		<FullScreenGrid
			container
			gap={2}
		>
			<Typography
				variant="h4"
			>
				Create Course
			</Typography>

			<TextField
				id="title"
				label="Title"
				{...register(
					'title',
					{
						required: {
							value: true,
							message: 'Title is required'
						}
					}
				)}
				error={!!errors.title}
				helperText={errors.title?.message}
				disabled={loading}
			/>

			<HtmlEditor
				onChange={v => setValue('description', v)}
			/>

			<Button
				fullWidth
				variant="contained"
				onClick={handleSubmit(createCourse)}
				disabled={loading}
			>
				<LoadingSpinner loading={loading}>
					Create Course
				</LoadingSpinner>
			</Button>
		</FullScreenGrid>
	)
}
export default CreateCourseView
