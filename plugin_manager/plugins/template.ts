import { Request, Response, NextFunction } from 'express';
type ExpressEndpointFunction = (req: Request, res: Response) => Promise<void>
type AsyncFunction = () => Promise<void>

export default interface PluginTemplate{
   load: AsyncFunction
   unload: AsyncFunction
   [endpoint: string]: ExpressEndpointFunction | undefined
}

