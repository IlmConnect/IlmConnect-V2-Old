import { Route, Routes, Navigate } from 'react-router-dom';
import Page from './components/page/Page';
import DrawerLayout from './layouts/Drawer';
import CreateCourse from './routes/createCourse';
import SignUpView from './views/auth/SignUpView/SignUpView';
import LogInView from './views/auth/LoginView/LoginView';
import Dashboard from 'views/Dashboard/Dashboard';
import CreateCourseView from 'views/course/Create/CreateCourseView';
import PageTemplate from 'templates/PageTemplate';

export default function RouteRoot() {
	return (
		<div>
			<Routes>
				<Route path='/course-creation' element = {<CreateCourse/>}/>
                <Route element={<PageTemplate/>}>
                <Route 
					path='/signup' 
					element={<SignUpView />}
				/>
				<Route 
					path='/login' 
					element={<LogInView />}
				/>

				<Route 
					path='/courses/create' 
					element={<CreateCourseView />}
				/>

				<Route 
					element={<DrawerLayout />}
				>
                    </Route>
                    <Route path='*' element={<Dashboard/>}/>
                </Route>
			</Routes>
		</div>
	);
}
