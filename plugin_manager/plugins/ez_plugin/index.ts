import { Request, Response } from "express";
import PluginTemplate from "../template";


const EzPlugin: PluginTemplate = {
    async load(): Promise<void>{
        console.log("Loaded EzPlugin!");
    },

    async unload(): Promise<void>{
        console.log("Unloaded EzPlugin!");
    }
} 

export default EzPlugin;