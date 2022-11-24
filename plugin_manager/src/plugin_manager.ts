import { countReset } from 'console';
import * as fs from 'fs';
import * as path from 'path';
import PluginManifest from './plugins/manifest';
import PluginTemplate from "./plugins/template";

/* Plugin wrapper object. Can be used for holding more relevant data to our manager
for enabling/disabling plugins, handling permissions and more in the future. 
Can be refactored though.. */ 

export class PluginObject {
    core : PluginTemplate;      // Where plugin actually sits. NOTE: Plugin name and version sits here too...
    isEnabled : boolean;        // Not used now but maybe later? 
    path: string;               
    endpoints : string[][];
    permissions?: any;

    // Default the plugin to be enabled
    constructor(plugin: PluginTemplate, manifest: PluginManifest){
        this.core = plugin;
        this.isEnabled = true; 
        this.endpoints = manifest.endpoints;
        this.path = this.core.name // Eh defs a better way of doing this...
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
        if(!this.pluginExists(plugin)){
            this.plugins.push(plugin);
        }
        
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
        
        let Plugin = new plugin['default'](); // Probably can do without default index if imported correctly?
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
        return true;
    }

    getAllPlugins(): PluginObject [] {
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
}

