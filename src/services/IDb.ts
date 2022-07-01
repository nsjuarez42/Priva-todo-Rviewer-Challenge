import {Todo} from '../domain/Todo'

interface IDb{
 createTodo(todo:Todo) : Todo | undefined
 completeTodo(name:string) :boolean
}

export {IDb}