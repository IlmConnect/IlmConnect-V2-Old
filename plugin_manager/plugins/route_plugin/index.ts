import { Request, Response, NextFunction } from 'express';
import axios, { AxiosResponse } from 'axios';

//TODO: Add some routes for this test plugin
import PluginTemplate from "../template";

export default class RoutePlugin extends PluginTemplate {
    name = "Route_Plugin";
    version = "1.0";
   
    async load(): Promise<void> {
        console.log("Loaded Plugin: " + this.name + "\nVersion: " + this.version);
    }

    async unload(): Promise<void> {
        console.log("Unloaded " + this.name);
    }

    async 'test/route/get'(req: Request, res: Response){
        res.send("Get route test from " + this.name);
    } 

    async 'test/route/post'(req: Request, res: Response){
        console.log("Post route test from " + this.name);
    }
}