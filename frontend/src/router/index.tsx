import { Route } from "./types";

export interface RouteMiddleware {

}

const routes: Route<RouteMiddleware>[] = [
	{
		index: true,
		element: <div />,

	},
]

// create routes object & export
