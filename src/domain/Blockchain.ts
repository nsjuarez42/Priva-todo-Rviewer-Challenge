
import { Block } from '../domain/Block';
import {IBlockchain} from '../domain/interfaces/IBlockchain'
const crypto = require("crypto")

class Blockchain implements IBlockchain{

   blockchain: Block[];

   constructor(blockchain?: Block[]){
    if(typeof blockchain !== 'undefined'){
        this.blockchain = blockchain
    }else{
        this.blockchain = [this.createGenesis()]
    }
   }

   createGenesis() : Block{
    const genesisBlock = {timestamp:Date.now(),data:{
      task:"0d20aaed9bf73681790ad8955049cd50a2641addcd9fa34a8edf5ff7245fbafe",
      completed:false
    }}
    const {timestamp,data} = genesisBlock
    const block = new Block(timestamp,crypto.createHash('sha256').update(data.task).digest('hex'),data)
    block.hash = Block.generateHashFromBlock(block)
    return block
   }
   
    addBlock(block: Block): Block {
        this.blockchain.push(block);
        return block
    }
      /**
   * Validates the chain by checking if:
   * - every element's last hash value matches previous block's hash
   * - data hasn't been tampered (which will produce a different hash value)
   */
    isValid(chain: IBlockchain): boolean {
       var valid = true;
       var i = 1
       const {blockchain} = chain
       while(valid || i<blockchain.length){
       if(blockchain[i].lasthash !== blockchain[i-1].hash){
          valid = false
       }
       }
       return valid;
    }
     /** The new blockchain that is a candidate for replacing the current blockchain */
   //use to replace if there is a blockchain already written,
    replace(blockchain: IBlockchain): boolean {
        throw new Error('Method not implemented.');
    }

}

export {Blockchain}