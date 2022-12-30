import { Route, Routes, Navigate } from 'react-router-dom';
import Page from './components/page/Page';
import DrawerLayout from './layouts/Drawer';
import CreateCourse from './routes/createCourse';

import DynamicForm from 'components/DynamicForm/DynamicForm';
import SignUpView from './views/auth/SignUpView/SignUpView';
import LogInView from './views/auth/LoginView/LoginView';
import Dashboard from 'views/Dashboard/Dashboard';

export default function RouteRoot() {
	return (
		<div>
			<Routes>
				<Route 
					path='/signup' 
					element={<SignUpView />}
				/>
				<Route 
					path='/login' 
					element={<LogInView />}
				/>

				<Route 
					element={<DrawerLayout />}
				>
                    
				</Route>

				<Route path='/tab1' element = {<Page pageName='tab1'></Page>}/>
				<Route path='/tab2' element = {<Page pageName='tab2'></Page>}/>
				<Route path='/tab3' element = {<Page pageName='tab3'></Page>}/>
				<Route path='/course-creation' element = {<CreateCourse/>}/>
				{/* <Route path='*'element = {<Navigate to='/tab1' replace></Navigate>}/> */}
                <Route path='*' element = {<Dashboard/>}/>
			</Routes>
		</div>
	);
}
