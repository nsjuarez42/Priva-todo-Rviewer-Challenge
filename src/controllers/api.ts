import { Application, Request, Response } from 'express';
import { PingService } from "../services/ping-service";
import {fsDb as IDb} from "../services/fsDb"
import {Todo} from '../domain/Todo'
 
async function postTask(req:Request,res:Response){
if(!req.params.title){
    res.status(400).send({error:"Invalid body provided, check the payload."})
}

const title = req.params

const todo = new Todo(title,false)
const db = new IDb()

if(db.createTodo(todo) !== undefined){
    res.status(201).send("Todo created successfully")
}else{
    res.status(409).send({error:"Todo already exists"})
}
}

async function patchTask(req:Request,res:Response){

if(!req.params.title){
    res.status(400).send({error:"Invalid body provided, check the payload"})
}

const {title} = req.params

const db = new IDb();

if(db.completeTodo(title)){
    res.status(200).send("Todo completed successfully")
}else{
    res.status(404).send({error:"Task not found for the given title"})
}
}

export const loadEndpoints = (app: Application): void => {
    app.get("/ping", (req: Request, res: Response) => {
        return res.status(200).send(new PingService().getPing())
    });
    app.post('/task/:title',postTask)
    app.patch('/task/:title',patchTask)
};
