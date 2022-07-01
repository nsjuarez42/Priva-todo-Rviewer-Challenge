import {IBlock} from './IBlock'

interface IBlockchain {
    blockchain:IBlock[]
    addBlock(block: IBlock) : IBlock
    isValid(blockchain:IBlockchain) : boolean
    replace(blockchain:IBlockchain) : boolean
    createGenesis() : IBlock
}

export {IBlockchain}