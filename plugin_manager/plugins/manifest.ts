/* Manifest JSON interface. Change here accordingly whenever modifying 
manifest format */

export default interface PluginManifest {
    prefix : string;
    endpoints: string [][];
    //events : Map<string, any[]>  not using for now, also type is wrong.
    permissions: string [];
}
