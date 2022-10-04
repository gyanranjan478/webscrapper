import Nedb from 'nedb';
import { SessionToken } from "../Server/Model";
import { User } from '../Shared/Model';


export class UserDBAccess {

    private nedb: Nedb;

    constructor() {
        this.nedb = new Nedb('database/Users.db');
        this.nedb.loadDatabase();
    }

    public async putUser(user: User): Promise<User>{
        return new Promise((resolve, reject) =>{
              this.nedb.insert(user, ( (err, newDoc) =>{  
                
                if (err) {
                    return reject(err);
                }   else {  
                    return resolve(newDoc); 
                }   
              }));
        });
    }

    public async getUserById ( userId: string): Promise<User |undefined>{
        return new Promise((resolve, reject) =>{
            this.nedb.find({ id:userId}, (err: Error, docs: User[]) =>{
                if (err) {
                    return reject(err); 
                } else {
                    if(docs.length > 0) {    
                        return resolve(docs[0]);
                    } else { 
                        return resolve(undefined);
                    }
                }
            })
        });
    }
}