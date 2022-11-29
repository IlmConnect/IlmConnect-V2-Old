import { Request, Response } from "express";
import PluginTemplate from "../template";


const RoutePlugin: PluginTemplate = {
    async load(): Promise<void>{
        console.log("Loaded Route Plugin")
    },

    async unload(): Promise<void>{
        console.log("Unloaded " + this.name);
    },

    async 'test/route/get'(req: Request, res: Response){
        res.send("Get route test from RoutePlugin")
    },

    async 'test/route/post'(req: Request, res: Response){
        console.log("Post route test from RoutePlugin");
    }     
} 
export default RoutePlugin;