import { Box, Button, CardContent, CircularProgress, Grid, styled, TextField, Typography, Unstable_Grid2 } from "@mui/material"
import axios from "axios"
import config from "config"
import { useEffect, useState } from "react"

import FullScreenGrid from "views/auth/components/FullScreenGrid/FullScreenGrid"
import { observer } from 'mobx-react-lite';
import { useLocation, useParams } from "react-router-dom"
import CourseDescriptionView from "./components/CourseDescriptionView"
import courseStore from "store/course"


const RegisterHomeView : React.FC = () => {
	const [loading, setLoading] = useState(false)
    let {id} = useParams();
	const [courseId, setCourseId] = useState(id)
	const location = useLocation()
	
    useEffect(() => {
    });

    const registerCourse = async (id: string | undefined) => {

		try {

            if(!courseId){
                throw new Error("Course does not exist!")
            }

            const data = {
                courseId: courseId
            }
          
			setLoading(true);
            const endpointUrl = config.backend.url + 'courses/' + courseId + "/users"
			const res = await axios.post(endpointUrl, data)
			console.log(res.data)
			//navigate('/');
		}
		catch (e: any) {
			const errorMessage = e?.response?.data?.error?.message
            /* TODO refactor error handling, this could be done better */
            if(e.message){
                alert(e.message)
            } else if (errorMessage){
                alert(errorMessage)
            }
		}
		finally {
			setLoading(false)          
		}

        /* TODO: Force UI to go back to course list view */

	}
	return (

	<FullScreenGrid
			container
			gap={2}
		>
		<Typography
			variant="h4"
		>
			{showCourseTitle(location.state.title)}
		</Typography>

		<CourseDescriptionView description={location.state.description} title={location.state.title}></CourseDescriptionView>
		<Button
			fullWidth
			variant="contained"
			onClick={() => registerCourse(courseId)}
			disabled={loading}
		>
		 Enroll
		</Button>
	</FullScreenGrid>
	)
}
function showCourseTitle(title: string | undefined){
	if(!title){
		console.log(title)
		return "No title found!"
	}
	else {
		return title
	}
}
export default observer(RegisterHomeView) 
