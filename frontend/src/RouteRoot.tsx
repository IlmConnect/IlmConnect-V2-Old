import { Route, Routes, Navigate } from 'react-router-dom';
import SignUpView from './views/auth/SignUpView/SignUpView';
import LogInView from './views/auth/LoginView/LoginView';
import Dashboard from 'views/Dashboard/Dashboard';
import CreateCourseView from 'views/course/Create/CreateCourseView';
import DefaultTemplate from 'templates/DefaultTemplate';
import CourseListView from 'views/course/List/CourseListView';
import RegisterHomeView from 'views/course/Register/RegisterHomeView';

export default function RouteRoot() {
	return (
		<div>
			<Routes>
				<Route element={<DefaultTemplate />}>
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
						path='/courses'
						element={<CourseListView />}
					/>

					<Route 
					path='/courses/register/:id' 
					element={<RegisterHomeView />}
					/>

					<Route
						path='*'
						element={<Dashboard />}
					/>
				</Route>
			</Routes>
		</div>
	);
}
