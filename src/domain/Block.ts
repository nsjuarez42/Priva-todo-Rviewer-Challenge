import { IBlock } from "./interfaces/IBlock";
const crypto = require('crypto')

class Block implements IBlock {
  timestamp: number;
  lasthash: string;
  data: any;
  hash: string;

  constructor(timestamp:number,lasthash:string,data:any,hash?:string){
      this.timestamp =timestamp;
      this.lasthash= lasthash;
      this.data = data;
      if(hash !== undefined){
        this.hash =hash
      }
      else{
        this.hash =''
      }
  }


static generateHashFromBlock(block: Block): string {
    const hashData = block.timestamp + block.lasthash + block.data
    return crypto.createHash('sha256').update(hashData).digest('hex')
  }
}

export { Block };
