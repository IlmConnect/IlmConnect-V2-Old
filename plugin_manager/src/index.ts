import express, { Express, Request, Response } from 'express';
import PluginManager  from './plugin_manager';
const app: Express = express();
const port: number = 9000;

let pm = new PluginManager('\plugins')
pm.init(app);

app.get('/', (req: Request, res: Response) => {
	res.send('Plugin Server!');
});

app.listen(port, () => {
	console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
