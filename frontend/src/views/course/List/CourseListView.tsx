import { Box, Button, CircularProgress, Grid, TextField, Typography, Container } from "@mui/material"
import axios from "axios"
import HtmlEditor from "components/HtmlEditor/HtmlEditor"
import config from "config"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import authStore from "store/auth"
import LoadingSpinner from "ui/LoadingٍSpinner"
import FullScreenGrid from "views/auth/components/FullScreenGrid/FullScreenGrid"
import { observer } from 'mobx-react-lite';
import { useParams } from "react-router-dom"
import CourseBox from "./components/CourseBox"
import CourseScreenGrid from "./components/CourseScreenGrid"
import courseStore from "store/course"


const CourseListView : React.FC = () => {
	const [loading, setLoading] = useState(false)
    const courses = Object.values(courseStore.byId)
    useEffect(() => {
        courseStore.fetch()
    }, []);
	return (

            <Grid 
                container 
                spacing={2} 
                direction="row" 
                justifySelf="flex-start" 
                alignItems="flex-start" 
                gap={2}
                justifyContent="center"
            >
                {courses.map((c: any) => {
                  return <CourseBox 
                            key={c.id} 
                            id={c.id} 
                            title={c.title} 
                            subtitle={c.subtitle} 
                            description={c.description} ></CourseBox>
                }) }
            </Grid>
	)
}
export default observer(CourseListView) 
