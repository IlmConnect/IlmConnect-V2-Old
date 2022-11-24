import PluginTemplate from "../template";
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