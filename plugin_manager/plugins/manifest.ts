/* Manifest JSON interface. Change here accordingly whenever modifying 
manifest format */

type httpMethod = "GET" | "POST" | "PATCH" | "DELETE";  // Add more as needed

export default interface PluginManifest {
    plugin_name: string
    version: string
    author_name: string
    prefix : string
    endpoints: [httpMethod, string]
    //events : Map<string, any[]>  not using for now, also type is wrong.
    permissions: string [] //unused for now
}
