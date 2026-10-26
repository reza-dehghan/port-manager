import { resolve } from "node:dns";
import { createServer } from "node:net";


export function isPortAvailable(port:number):Promise<Boolean>{
    return new Promise((resolve,reject)=>{
        const server = createServer();

        server.once("error",(error:NodeJS.ErrnoException)=>{
            if (error.code === "EADDRINUSE"){
                resolve(false);
                return ;
            }
            reject(error);
        });

        server.listen(port,"127.0.0.1",() => {
            server.close(()=>{
                resolve(true)
            });
        });
    });
}