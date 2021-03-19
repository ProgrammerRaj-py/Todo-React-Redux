import React, { useRef, useEffect } from 'react'
import '../scss/Todo.scss'
import { addTodo, deleteTodo, completeTodo } from '../redux/actions'
import { connect } from 'react-redux'
import nextId from 'react-id-generator'

const mapStateToProps = state =>{
    console.log(state.Todo.todoData)
    return {
        data: state.Todo.todoData
    }
}
const mapDispatchToProps = dispatch =>{
    return {
        addTodo: todo => dispatch(addTodo(todo)),
        deleteTodo: id => dispatch(deleteTodo(id)),
        completeTodo: id => dispatch(completeTodo(id))
    }
}

const Todo = (props) => {
    useEffect(() => {
        localStorage.setItem("rajmazumdertodo", JSON.stringify(props.data))
    }, [props.data])

    const titleRef = useRef()
    const onSubmit = e => {
        e.preventDefault()
        titleRef.current.value.length > 2 ? 
        props.addTodo({
            id: nextId(),
            title: titleRef.current.value,
            completed: false
        }) :
        alert("Todo Title length must be greater than 2")
        titleRef.current.value = '' 
    }

    return (
        <div className="todoContainer">
            <form onSubmit={onSubmit}>
                <input type="text" placeholder="Add New Todo" ref={titleRef}/>
                <button type="submit"><i className="fas fa-plus"></i></button>
            </form>
            <div className="contents">
                {
                    props.data.length > 0 ? 
                    props.data.map((value, i) =>
                    <div className="content" key={i}>
                        <h1 className={value.completed ? "title line_through" : "title"}><span>{i+1}.</span>{value.title}</h1>
                        <div className="controls">
                            {
                                value.completed ? <i></i> :
                                <i className="fas fa-check-circle"
                                onClick={()=>props.completeTodo(value.id)}
                                ></i>
                            }
                            <i className="fas fa-trash"
                            onClick={()=>props.deleteTodo(value.id)}
                            ></i>
                        </div>
                    </div>
                    ) :
                    <div className="noTodo">
                        <h1 className="appName">Todo App</h1>
                        <h1 className="noTodoHere">Life is all about <span>Goals</span><br/>Set a <span>Goal</span></h1>
                        <i className="fas fa-clipboard-list"></i>
                        <p className="developer">-Raj Mazumder</p>
                    </div>
                }
            </div>
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(Todo)
