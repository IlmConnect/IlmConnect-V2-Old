import axios from 'axios';
import config from 'config';
import { makeAutoObservable, runInAction } from 'mobx';
import authStore from './auth';

interface CourseModel {
    id : string
    title: string
    subtitle: string 
    description: string 
    createdAt: Date
    updatedAt: Date
}

class CourseStore {
    byId: { [key: string]: CourseModel } = {}
	constructor() {
		makeAutoObservable(this)
	}
   
    /* TODO: Course query fetch instead of simply fetches all courses, and cache by query */
    async fetch(){
        try {
            //alert("courses: " + authStore.getToken())
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
			console.log(e)
		}
		finally {
			
		}
    }
    getCourses(){
        return this.byId
    }
    /* Not a fan of passing and returning undefined and null types. Perhaps there's a 
     * cleaner way to handle type validation on inputs/outputs (ie. using just string instead
     * of string | undefined and CourseModel instead of CourseModel | null )
     */
    async getCourse(courseId : string | undefined) : Promise<CourseModel | null> {
        if(!courseId){
            return null 
        }
        try{
            if(!this.byId[courseId]){
                console.log("fetching courses, token:  " + authStore.token)
                const res = await axios.get(config.backend.url + 'courses/' + courseId, 
                        { 
                            headers: {"Authorization" : `Bearer ${authStore.token}`
                        }})
            
                /* course is stored in a data object within the data object in the http response */
                this.byId[courseId] = res.data.data
                return res.data.data
            } else {
                return this.byId[courseId]
            }
        } catch (e: any) {
            const errorMessage = e?.response?.data?.error?.message
            throw new Error(errorMessage)
        } finally {

        }
    }
}

const courseStore = new CourseStore();
export default courseStore;
