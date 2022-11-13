

export type Route<Metadata> = IndexRoute<Metadata> | PathRoute<Metadata> | LayoutRoute<Metadata>

export interface BaseRoute<Metadata> {
	element: JSX.Element
	metadata?: Metadata
}

export interface IndexRoute<Metadata> extends BaseRoute<Metadata> {
	index: true
}

export interface PathRoute<Metadata> extends BaseRoute<Metadata> {
	path: string
	children: Route<Metadata>[]
}

export interface LayoutRoute<Metadata> extends BaseRoute<Metadata> {
	children: Route<Metadata>[]
}

export interface MiddlewareProps<Metadata> {
	metadata?: Metadata
	route: Route<Metadata>
	navigate: (path: string) => void
}

export type RouterMiddleware<Metadata> = (props: MiddlewareProps<Metadata>) => void
