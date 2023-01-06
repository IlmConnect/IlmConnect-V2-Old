import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import RouteRoot from './RouteRoot';
import { CssBaseline } from '@mui/material';


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<CssBaseline />
		<BrowserRouter>
			<RouteRoot></RouteRoot>
		</BrowserRouter>
	</React.StrictMode>
);
