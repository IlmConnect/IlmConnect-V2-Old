import express, { Express, Request, Response } from 'express';
import PluginManager  from './plugin_manager';
const app: Express = express();
const port: number = 9000;

app.get('/', (req: Request, res: Response) => {
	res.send('Plugin Server!');
});

let pm = new PluginManager('\src\\plugins');
pm.loadPlugins();

//Next step: load endpoints from plugins.


app.listen(port, () => {
	console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
