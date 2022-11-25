import { Request, Response } from "express";
import PluginTemplate from "../template";

// First test plugin, simple load and reload actions
export default class EzPlugin extends PluginTemplate {
    name = "EZ_Plugin";
    version = "1.0";
    
    async load(): Promise<void> {
        console.log("Loaded Plugin: " + this.name + "\nVersion: " + this.version);
    }

    async unload(): Promise<void> {
        console.log("Unloaded " + this.name);
    }
}