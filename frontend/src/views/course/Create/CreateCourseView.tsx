import { Button, CircularProgress, TextField } from "@mui/material"
import HtmlEditor from "components/HtmlEditor/HtmlEditor"
import { useState } from "react"
import { useForm } from "react-hook-form"
import LoadingSpinner from "ui/LoadingٍSpinner"
import FullScreenGrid from "views/auth/components/FullScreenGrid/FullScreenGrid"

interface FormData {
	title: string
	description: string | object | null | undefined
}

const CreateCourseView: React.FC = () => {
	const { register, formState: { errors }, handleSubmit, setValue } = useForm<FormData>()
	const [loading, setLoading] = useState(false)

	const createCourse = (data: FormData) => {
		console.log(data)
	}

	return (
		<FullScreenGrid
			container
			gap={2}
		>
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
