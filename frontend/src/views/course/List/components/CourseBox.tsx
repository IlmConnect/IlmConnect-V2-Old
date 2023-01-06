import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box, Button, CardActionArea, CardActions } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface Props {
  id : string
  title: string
  subtitle: string
  description: string
  createdAt?: Date
  updatedAt?: Date
}
const defaultImgUrl = "https://images.pexels.com/photos/53594/blue-clouds-day-fluffy-53594.jpeg"

const CourseBox : React.FC<Props> = ({id, title, subtitle, description}) => {
  const navigate = useNavigate();

  const enrollPage = (id: string | undefined) => {

    if(id){
      navigate("/courses/register/" + id)
    }
    else {
      console.log("Invalid course ID")
    }
  }
  return (

    <Card sx={{width: 300 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="170"
          image= {defaultImgUrl}
          alt="image"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" >
            {subtitle}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions style ={{justifyContent: "center"}}>
        <Button size="small" color="primary" onClick={() => enrollPage(id)}>
          Enroll
        </Button>
      </CardActions>
    </Card>
  
  );
}
export default CourseBox