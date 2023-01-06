import { Button, CardActionArea, CardActions, CardContent, CardMedia, CircularProgress, Grid, Paper, TextField, Typography } from "@mui/material"
import axios from "axios"
import HtmlEditor from "components/HtmlEditor/HtmlEditor"
import config from "config"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import authStore from "store/auth"
import LoadingSpinner from "ui/LoadingٍSpinner"
import FullScreenGrid from "views/auth/components/FullScreenGrid/FullScreenGrid"
import { observer } from 'mobx-react-lite';
import { useLocation, useParams } from "react-router-dom"
import Box from '@mui/material/Box';
import Card from "components/UI/Card/Card"
import { LoremIpsum } from "react-lorem-ipsum";
import courseStore from "store/course"
import Parser from 'html-react-parser'
import { Editor } from "@tinymce/tinymce-react"

interface Props {
	title : string | undefined
	description : string | undefined
}

const CourseDescriptionView :React.FC<Props> = ({title, description}) => {
	useEffect(() => {
    }, []);
	return (
		<Box 
			minHeight={500}
		>
			<Paper variant="outlined">
   				<img src="url" />
			</Paper>
			<Typography gutterBottom variant="h5" component="div">
				Details
			</Typography>
			<HtmlEditor 
				value={showCourseDescription(description)} 
				disabled={true} 
				hideAllBars={true}></HtmlEditor>
		</Box>
	);
  };

function showCourseDescription(description: string | undefined){
	if(!description){
		console.log(description)
		return "<p> No course info! </p>"
	}
	else {
		return description
	}
}
export default CourseDescriptionView
