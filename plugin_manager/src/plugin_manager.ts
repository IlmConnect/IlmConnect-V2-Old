import * as fs from 'fs';
import * as path from 'path';
import PluginManifest from '../plugins/manifest';
import express, { Express, Request, Response } from 'express';
import PluginTemplate from "../plugins/template";
import {httpMethod} from './plugin_types';
/* Plugin wrapper object. Can be used for holding more relevant data to our manager
for enabling/disabling plugins, handling permissions and more in the future. 
Can be refactored though.. */ 

export class PluginObject {
    core : PluginTemplate      // Where plugin actually sits. NOTE: Plugin name and version sits here too...
    isEnabled : boolean        // Not used now but maybe later? 
    path: string              
    endpoints : [httpMethod, string]
    permissions?: any
    plugin_name : string
    version: string
    author_name: string


    // Default the plugin to be enabled
    // TODO: Enforce plugin type to be of some soft of plugintemplate/interface
    constructor(plugin: PluginTemplate, manifest: PluginManifest){
        this.core = plugin
        this.isEnabled = true
        this.endpoints = manifest.endpoints
        this.path = manifest.plugin_name
        this.plugin_name = manifest.plugin_name
        this.version = manifest.version
        this.author_name = manifest.author_name
    }
}

/* Plugin Manager that handles loading and unloading plugins. 
Also parses endpoints, permissions and other info from manifest.json per each plugin */

export default class PluginManager {
    private plugins : PluginObject[];
    private root : string; 

    constructor(dir : string){
        this.plugins = [];
        this.root = dir
    }

    private async loadPlugin(plugin: PluginObject){
        if(!this.isValidPlugin(plugin)){
            throw new Error("Invalid plugin.");
        } 
        this.plugins.push(plugin);
        await plugin.core.load(); 
    }
    async unloadPlugin(plugin: PluginObject){
        //TODO: Find in plugin list and remove, then call .core.unload()
    }

    async loadPlugins(){
      // Assuming plugin objects will be entirely in index.ts files
      // of their plugin folders, and their respective manifests
      // in manifest.json files

      const manifestFile = 'manifest.json';
      const pluginFile = 'index.ts';

      const paths = await this.getPluginPaths(this.root);

      for (let file of paths){
        let plugin = await import(path.join(process.cwd(), file, pluginFile));
        let manifest = await import(path.join(process.cwd(), file, manifestFile));
        let Plugin = plugin['default']; // Probably can do without default index if imported correctly?
        let pluginObject = new PluginObject(Plugin, manifest);
       
        await this.loadPlugin(pluginObject);
      }
    }

    async loadPermissions(pluginName : string){
        //TODO: Implement this once permissions logic is complete...
    }


    isValidPlugin(plugin: PluginObject) : boolean{
        //TODO: Implement this...
        return true 
    }

    pluginExists(plugin: PluginObject) : boolean{
        //TODO: Logic to check if plugin is in list...
        return false;
    }

    async getAllPlugins(): Promise<PluginObject[]> {
        return this.plugins;
    }

    async unloadAllPlugins(){
        for (let plugin of this.plugins){
            await plugin.core.unload();
        }
    }

    async getPluginPaths(dir : string) {
        let pluginPaths: string [] = [];
        const files = await fs.promises.readdir(dir);
        for (let file of files){
          let fullPath = path.join(dir, file);
          const isDirectory =  (await fs.promises.lstat(fullPath)).isDirectory();
          if(isDirectory){
            // For now, we are assuming that each folder in plugins
            // folder are actual plugins 
            pluginPaths.push(fullPath);
      
          }
        }
        //console.log(pluginPaths);
        return pluginPaths;
      }
      async loadEndpoints(app: Express){
        let defaultPrefix = "/";
        let plugins = await this.getAllPlugins();
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
                switch(method){
                    case "GET":
                        app.get(defaultPrefix + route, endpointFunc.bind(plugin.core));
                        break;
                    case "POST":
                        app.post(defaultPrefix + route, endpointFunc.bind(plugin.core));
                        break;
                    default:
                        throw new Error("Unsupported or invalid HTTP request method!");
                        break;
                }
            }
        }
    }

    async init(app : Express){
        await this.loadPlugins();
        await this.loadEndpoints(app);
    }
    
}

