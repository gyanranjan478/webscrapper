import { IncomingMessage, ServerResponse } from "http";
import { HTTP_METHODS,HTTP_CODES } from "../Shared/Model";
import { Account, TokenGenerator } from "../Server/Model";
import { BaseRequestHandler } from "./BaseRequestHandler";

export class LoginHandler extends BaseRequestHandler{
 
    private tokenGenerator: TokenGenerator;

    public constructor(req: IncomingMessage, res: ServerResponse, tokenGenerator: TokenGenerator) {
        super(req, res);
        this.tokenGenerator = tokenGenerator;
    }

    public async handleRequest(): Promise<void>{
        switch (this.req.method) {
            case HTTP_METHODS.POST:
                await  this.handlePost()
                break;
            default:
                await this.handleNotFound();
                break;
        }
    }


    private async handlePost(): Promise<void>{
        try {
            const body = await this.getRequestBody();    
            const sessionToken  = await this.tokenGenerator.generateToken(body);
            if(sessionToken) {
              this.res.statusCode = HTTP_CODES.CREATED;
              this.res.writeHead(HTTP_CODES.CREATED, {
                'Content-Type': 'application/json',
              });
              this.res.write(JSON.stringify(sessionToken));
            } else {
                this.res.statusCode = HTTP_CODES.NOT_FOUND;
                this.res.write('wrong username or password');
            }
        } catch (error) {
            this.res.write('error: ' + error);
        }
    }

    
}