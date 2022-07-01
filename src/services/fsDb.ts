import { Blockchain } from "../domain/Blockchain";
import { Block} from '../domain/Block'
import { Todo } from "../domain/Todo";
import { IDb } from "./IDb";
const fs =require("fs")

const PATH = './src/services/data/data.json'

class fsDb implements IDb{

    private readDb() : Blockchain {
        const db = fs.readFileSync(PATH)
        const data : Blockchain = JSON.parse(db)
        if(data.blockchain.length == 0){
            return new Blockchain();
        }else{
            return new Blockchain(data.blockchain)
        }
    }

    private writeDb(db:any) : boolean{
      try {
        fs.writeFileSync(PATH,JSON.stringify(db))
        return true
      } catch (error) {
        console.log(error)
        return false
      }
    }

    private findTodo(todo:string,blockchain:Blockchain) :Block | undefined{
      return blockchain.blockchain.find(el=>el.data.task.title == todo)
    }

    createTodo(todo: Todo): Todo | undefined {
        const blockchain = this.readDb()
        const existingTodo = this.findTodo(todo.task,blockchain)
        if(existingTodo !== undefined){
            return undefined
        }
        var previousIndex;
        if(blockchain.blockchain.length == 1){
            previousIndex = 0
        }else{
         previousIndex=blockchain.blockchain.length - 2
        }
        const previousHash = blockchain.blockchain[previousIndex].hash
        const block = new Block(Date.now(),previousHash,todo) 
        block.hash = Block.generateHashFromBlock(block)
        blockchain.addBlock(block)
        const db = {
            blockchain:blockchain.blockchain
        }
        if(this.writeDb(db)){
            return todo
        }else{
            return undefined
        }
    }
    
    //completing todo twice
    completeTodo(name: string): boolean {
        const blockchain =this.readDb()
        const todo = this.findTodo(name,blockchain)

        if(todo !== undefined){
         //create block with completed todo and add to blockchain
         var previousIndex;
            if(blockchain.blockchain.length == 1){
                previousIndex = 0
            }else{
                previousIndex =blockchain.blockchain.length-2
            }
         const previousHash = blockchain.blockchain[previousIndex].hash
         const completedTodo = new Todo(todo.data.task.title,true)
         const block = new Block(Date.now(),previousHash,completedTodo)
         block.hash = Block.generateHashFromBlock(block)
         blockchain.addBlock(block)
         const db = {
            blockchain: blockchain.blockchain
         }
         return this.writeDb(db)
        }else{
            return false
        }
    }
}

export {fsDb}