import { isPortAvailable } from "./port-checker";

export type PortScanResult = {
    port:number;
    available:Boolean;
}

export async function scanPorts(
    startPort:number,
    endPort:number,
):Promise<PortScanResult[]> {

    const results:PortScanResult[]=[];

    for (let port = startPort; port <= endPort;port++ ){
        const available = await isPortAvailable(port)

        results.push({
            port,
            available,
        });
    }

    return results;
    
}