import { ADD_TODO, DELETE_TODO, COMPLETE_TODO } from '../constrains'

const intialstate = {
    todoData: []
}
export const todoReducer = (state = intialstate, action) => {
    let todos
    switch(action.type){
        case ADD_TODO: return {
            ...state,
            todoData: [...state.todoData, action.payload]
        }
        case DELETE_TODO:
            todos = [...state.todoData]
            todos = todos.filter(todo=> todo.id !== action.payload)
            return{
                ...state,
                todoData: todos
            }
        case COMPLETE_TODO: 
            todos = [...state.todoData]
            for(let i=0; i<todos.length; i++){
                if(todos[i].id === action.payload){
                    todos[i].completed = true
                }
            }
            return{
                ...state,
                todoData: todos
            }
        default: return state;
    }
}