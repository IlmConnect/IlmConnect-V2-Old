/* Emailer interface functionality for IlmConnect
*/

import PostMarkEmailer  from "./emailer_postmark";

enum EmailerServiceType {
    PostMark = 1,
    SendGrid,
    Undefined 
}

export class Emailer {
    /* TODO: 
            1) Maybe better mechanism for setting default emailer 3rd library type 
            maybe load from which library we want to use from a config file
            2) Exception handling lol
     */

    // Default to PostMark
    static emailerService: number = EmailerServiceType.PostMark;

    static setEmailerType(type: number): void {
        this.emailerService = type
    }

    static sendWelcome(email: string): void {
        if(this.emailerService == EmailerServiceType.PostMark){
            PostMarkEmailer.sendWelcome(email);
        } else{
            /* We don't support any other emailer libraries, do exception stuff */
            console.log("Unsupported emailer service!")
        }
    }
    
    //static sendPasswordReset(email: string): void;
    //static sendUserInvitation(): void;

}









