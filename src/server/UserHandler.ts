
import { IncomingMessage, ServerResponse } from "http";
import { UserDBAccess } from '../User/userDBAccess';
import { HTTP_CODES, HTTP_METHODS } from '../Shared/Model';
import { Utils } from './Utils';
import { BaseRequestHandler } from './BaseRequestHandler';

export class UserHandler extends BaseRequestHandler{

    private userDBAccess: UserDBAccess = new UserDBAccess();


    public constructor(req: IncomingMessage, res: ServerResponse) {
     super(req, res);
    }

    async handleRequest(): Promise<void> {
        switch (this.req.method) {  
            case HTTP_METHODS.GET: 
                await this.handleGet();
            break;
            default:
                await this.handleNotFound();
            break;
        }
    }

    private async handleGet() {
        const parsedUrl = Utils.getUrlParameters(this.req.url);
        if(parsedUrl) {
            const userId = parsedUrl?.query.id;
            if(userId) {
                const User = await this.userDBAccess.getUserById(userId as string);

                if(User) {
                    this.res.writeHead(HTTP_CODES.OK, { 'Content-Type': 'application/json'});
                    this.res.write(JSON.stringify(User));
                } else {
                    this.handleNotFound();
                }
            }
        }
    }
 }