// Component for the task items that are remaining in the list.

import usePrevious from "../usePrevious";
import { useEffect, useRef, useState } from "react";

function Todo(props) {
    const [isEditing, setEditing] = useState(false);    // Setting state to check if task needs editing
    const [newName, setNewName] = useState("");
    const editFieldRef = useRef(null);
    const editButtonRef = useRef(null);
    const wasEditing = usePrevious(isEditing);
    console.log(wasEditing);

    function handleChange(e) {
        setNewName(e.target.value);
    }

    function handleSubmit(e) {  // e is for event
        e.preventDefault();
        props.editTask(props.id, newName);
        setNewName("");
        setEditing(false);
    }

    // Brought up when editing of task is required
    const editingTemplate = (
        <form className="stack-small" onSubmit={handleSubmit}>
            <div className="form-group">
                <label className="todo-label" htmlFor={props.id}>
                    New name for {props.name}
                </label>
                <input
                    id={props.id}
                    className="todo-text"
                    type="text"
                    value={newName}
                    onChange={handleChange}
                    ref={editFieldRef}
                />
            </div>
            <div className="btn-group">
                <button
                    type="button"
                    className="btn todo-cancel"
                    onClick={() => setEditing(false)}   // Switch back to view template
                >
                    Cancel
                    <span className="visually-hidden">
                        renaming {props.name}
                    </span>
                </button>
                <button type="submit" className="btn btn__primary todo-edit">
                    Save
                    <span className="visually-hidden">
                        new name for {props.name}
                    </span>
                </button>
            </div>
        </form>
    );

    // Brought up when viewing of tasks in to do
    const viewTemplate = (
        <div className="stack-small">
            <div className="c-cb">
                <input
                    id={props.id}
                    type="checkbox"
                    defaultChecked={props.completed}
                    onChange={() => props.toggleTaskCompleted(props.id)}
                />
                <label className="todo-label" htmlFor={props.id}>
                    {props.name}
                </label>
            </div>
            <div className="btn-group">
                <button
                    type="button"
                    className="btn"
                    onClick={() => setEditing(true)}    // Switch to edit template
                    ref={editButtonRef}
                >
                    Edit <span className="visually-hidden">{props.name}</span>
                </button>
                <button
                    type="button"
                    className="btn btn__danger"
                    onClick={() => props.deleteTask(props.id)}
                >
                    Delete <span className="visually-hidden">{props.name}</span>
                </button>
            </div>
        </div>
    );

    // Logic for more robust focus management when editing the task 
    useEffect(() => {
        if (!wasEditing && isEditing) {
            editFieldRef.current.focus();
        } else if (wasEditing && !isEditing) {
            editButtonRef.current.focus();
        }
    }, [wasEditing, isEditing]);

    return (
        // Returns the appropriate template dependent on isEditing true or false
        // ? is a ternary operator for conditional check (if statement)
        <li className="todo">{isEditing ? editingTemplate : viewTemplate}</li>
    );
}

export default Todo;
