import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import RouteRoot from './RouteRoot'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<BrowserRouter>
			<RouteRoot></RouteRoot>
		</BrowserRouter>
	</React.StrictMode>
)
