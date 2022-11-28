import { Route, Routes, Navigate } from 'react-router-dom';
import Page from './components/page/Page'
import CreateCourse from './routes/createCourse';

export default function RouteRoot() {
    return (
        <div>
            <Routes>
                <Route path='/tab1' element = {<Page pageName='tab1'></Page>}/>
                <Route path='/tab2' element = {<Page pageName='tab2'></Page>}/>
                <Route path='/tab3' element = {<Page pageName='tab3'></Page>}/>
                <Route path='/course-creation' element = {<CreateCourse/>}/>
                <Route path='*'element = {<Navigate to='/tab1' replace></Navigate>}/>
            </Routes>
        </div>
    )
};