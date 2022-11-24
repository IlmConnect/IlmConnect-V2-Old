export default abstract class PluginTemplate{
    abstract name: string;
    abstract version: string;
    
    constructor (){
    }
    
    abstract load(): Promise<void>;
    abstract unload(): Promise<void>; 
}