import express, { Express, Request, Response } from 'express';
import PluginManager  from './plugin_manager';
const app: Express = express();
const port: number = 9000;

async function loadEndpoints(app: Express, pm : PluginManager){
	let defaultPrefix = "/";
	let plugins = await pm.getAllPlugins();
	//console.log(plugins);
	for (let plugin of plugins){
		let endpoints = plugin.endpoints;

		if(!endpoints){
			console.log("Plugin doesn't not use any endpoints");
			break;
		}
		
		for (let endpoint of endpoints){
			let method = endpoint[0];
			let route =  endpoint[1];
			let endpointFunc = plugin.core[route]
			// TODO: Better way of handling how some plugins have endpoints and some don't?
			// Perhaps can be changed in the abstract class somehow.
	
			/// Either something went wrong or plugin actually doesn't have endpoints 
			if(!endpointFunc){
				break;
			}
			//console.log(route);
			//console.log(endpointFunc);
			//console.log(method);
			
			// Support post and get methods for now...
			if(method == "GET"){
				app.get(defaultPrefix + route, endpointFunc.bind(plugin.core));
			} else if(method == "POST"){
				app.post(defaultPrefix + route, endpointFunc.bind(plugin.core));
			} else {
				throw new Error("Unsupported or invalid HTTP request method!")
			}
		}
	}
}

async function setupPluginsAndEndpoints(app : Express){
	let pm = new PluginManager('\plugins');
	await pm.loadPlugins();
	loadEndpoints(app, pm);
}

function loadApp(app : Express){
	app.get('/test/route/gets', (req: Request, res: Response) => {
		res.send('Plugin Server!');
	});
}

setupPluginsAndEndpoints(app);

//loadApp(app);
app.get('/', (req: Request, res: Response) => {
	res.send('Plugin Server!');
});


app.listen(port, () => {
	console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
