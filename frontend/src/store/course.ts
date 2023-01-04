import axios from 'axios';
import config from 'config';
import { makeAutoObservable, runInAction } from 'mobx';

interface CourseModel {
    id : string
    title: string
    subtitle: string 
    description: string 
    createdAt: Date
    updatedAt: Date
}

class CourseStore {
   // byId : {[key: string]: CourseModel, }[]
    byId: { [key: string]: CourseModel } = {}
	constructor() {
        
		makeAutoObservable(this)
	}
   
    /* TODO: Course query fetch instead of simply fetches all courses, and cache by query */
    async fetch(){
        try {
            const res = await axios.get(config.backend.url + 'courses/')
         
            /* TODO: Error handling? Check if courseArray is empty? */

            const courseArray = res.data?.data?.courses
            /* Mapping courseArray by courseId */
            /* TODO: typing */
            const coursesById = Object.fromEntries(courseArray.map((c: { id: any; }) => [c.id, c]))

            runInAction(()=> {
                this.byId = coursesById
            })
            
		}
		catch (e: any) {
			const errorMessage = e?.response?.data?.error?.message
			alert(errorMessage)
		}

		finally {
			
		}
    }
    getCourses(){
        return this.byId
    }
    getCourse(courseId : string) : CourseModel {
        return this.byId[courseId]
    }
}

const courseStore = new CourseStore();
export default courseStore;
