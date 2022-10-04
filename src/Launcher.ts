import {Server} from './Server/Server'


class Launcher {
    // instance variable
    //private name: string;
    private server:Server;

    constructor() {
      this.server = new Server();
        
    }

    launchApp(){
        this.server.createServer();
        console.log('started app');
    }
}

new Launcher().launchApp();