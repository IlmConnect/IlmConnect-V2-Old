import { useState } from 'react'
import reactLogo from './assets/react.svg'
import {Routes, Route} from "react-router-dom" 

import CoursePage from './routes/coursePage';
import CreateCourse from './routes/createCourse';

function App() {
	return (
		<>
		  <Routes>
			  <Route path = "/course-page" element = {<CoursePage/>}/>
			  <Route path = "/course-creation" element = {<CreateCourse/>}/>
		  </Routes>
		</>
	  );
}

export default App
