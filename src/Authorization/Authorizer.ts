import { Account, SessionToken, TokenGenerator } from "../server/Model";
import { UserCredentialsDBAccess } from "./UserCredentialsDBAccess";


export class Authorizer implements TokenGenerator{
    
    private userCredDBAccess: UserCredentialsDBAccess = new UserCredentialsDBAccess();
    
    async generateToken(account: Account): Promise<SessionToken | undefined> {

        const resultAccount = await this.userCredDBAccess.getUserCredentials(account.username, account.password);
        if(resultAccount){
            return {
                tokenId: 'some tokenId',
            }
        }else{
            return undefined;
        }
    }

}