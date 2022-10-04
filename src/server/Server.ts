import { createServer, IncomingMessage, ServerResponse } from "http";
import { Authorizer } from "../Authorization/Authorizer";
import { LoginHandler } from "../Server/LoginHandler";
import { Utils } from "../Server/Utils";
import { UserHandler } from "./UserHandler";

export class Server {


  private authorizer: Authorizer = new Authorizer();

  createServer() {
     createServer(async (req: IncomingMessage, res: ServerResponse) => {
      console.log("got request from " + req.url);
      const basePath = Utils.getUrlBasePath(req.url);

      switch (basePath) {
        case "login":
          await new LoginHandler(req, res, this.authorizer).handleRequest()
          break;
          case "users" :
            await new UserHandler(req, res).handleRequest();
            break;
        default:
          break;
      }
      res.end();
      
    }).listen(8000);
    console.log("Server started");
  }
}
