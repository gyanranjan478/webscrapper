import { UserCredentials } from "../Shared/Model";
import Nedb from 'nedb';


export class UserCredentialsDBAccess {

    private nedb: Nedb;

    constructor() {
        this.nedb = new Nedb('database/UserCredentials.db');
        this.nedb.loadDatabase();
    }

    public async putUserCredentials(userCredentials: UserCredentials): Promise<any>{

        return new Promise((resolve, reject) =>{

          

              this.nedb.insert(userCredentials, ( (err, newDoc) =>{  

                if (err) {
                    return reject(err);
                }   else {  
                    return resolve(newDoc); 
                }   
              }));

        });
    }

    public async getUserCredentials(username: string, password: string): Promise<UserCredentials | undefined>{
        
    }
}