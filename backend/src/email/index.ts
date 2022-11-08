import config from '../config'
import postmark from 'postmark' 

/* TODO: Data structure for template aliases to account for potential name changes */

export default class Emailer {

  static client = new postmark.Client(config.postmark.apiKey);
  /* Test names until functionality for retrieving actual user data is in place */
  // -------------------------------------------------------------------------- //
  static getName(email: string) : string {
    return "Blah"
  }

  static getUsername(email: string) : string {
    return "blahblah"
  }
  // -------------------------------------------------------------------------- //

  static sendWelcome(email: string):void{
    Emailer.client.sendEmailWithTemplate({
      "From": "noreply@ilmconnect.com", 
      "TemplateAlias": "welcome",
      "To": email, 
      "TemplateModel": {
          "name" : this.getName(email),
          "username" : this.getUsername(email)
      }
  });
  }

 //sendPasswordReset(email: string):void{}
 //sendUserInvitation():void{}

}
