import {ITodo} from '../domain/interfaces/ITodo'

class Todo implements ITodo{
    task: string;
    completed: boolean;

    constructor(task:string,completed:boolean){
        this.task =task
        this.completed = completed
    }
}

export {Todo}
   