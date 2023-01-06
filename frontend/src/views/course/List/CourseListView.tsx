import { Grid } from "@mui/material"
import { useEffect, useState } from "react"
import { observer } from 'mobx-react-lite';
import CourseBox from "./components/CourseBox"
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
