import { Route, Routes, Navigate } from 'react-router-dom';
import Home from './components/page/Page'

export default function RouteRoot() {
    return (
        <div>
            <Routes>
                <Route path='/tab1' element = {<Home pageName='tab1'></Home>}/>
                <Route path='/tab2' element = {<Home pageName='tab2'></Home>}/>
                <Route path='/tab3' element = {<Home pageName='tab3'></Home>}/>
                <Route path='*'element = {<Navigate to='/tab1' replace></Navigate>}/>
            </Routes>
        </div>
    )
};