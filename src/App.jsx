import Form from "./components/Form";
import FilterButton from "./components/FilterButton";
import Todo from "./components/Todo";
import { nanoid } from "nanoid";
import { useState, useRef, useEffect } from "react";

function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
        ref.current = value;
    });
    return ref.current;
}

const FILTER_MAP = {
    All: () => true,
    Active: (task) => !task.completed,
    Completed: (task) => task.completed,
};
const FILTER_NAMES = Object.keys(FILTER_MAP);

function App(props) {
    function addTask(name) {
        const newTask = { id: `todo-${nanoid()}`, name, completed: false };
        setTasks([...tasks, newTask]);
    }

    function toggleTaskCompleted(id) {
        const updatedTasks = tasks.map((task) => {
            // if this task has the same ID as the edited task
            if (id === task.id) {
                // use object spread to make a new object
                // whose `completed` prop has been inverted
                return { ...task, completed: !task.completed };
            }
            return task;
        });
        setTasks(updatedTasks);
        console.log(updatedTasks);
    }

    function deleteTask(id) {
        const remainingTasks = tasks.filter((task) => id !== task.id);
        setTasks(remainingTasks);
        console.log(remainingTasks);
    }

    function editTask(id, newName) {
        const editedTaskList = tasks.map((task) => {
            // if this task has the same ID as the edited task
            if (id === task.id) {
                // Copy the task and update its name
                return { ...task, name: newName };
            }
            // Return the original task if it's not the edited task
            return task;
        });
        setTasks(editedTaskList);
        console.log(editedTaskList);
    }

    const [filter, setFilter] = useState("All");
    const [tasks, setTasks] = useState(props.tasks);
    const taskList = tasks
        .filter(FILTER_MAP[filter])
        .map((task) => (
            <Todo
                id={task.id}
                name={task.name}
                completed={task.completed}
                key={task.id}
                toggleTaskCompleted={toggleTaskCompleted}
                deleteTask={deleteTask}
                editTask={editTask}
            />
        ));

    const filterList = FILTER_NAMES.map((name) => (
        <FilterButton
            key={name}
            name={name}
            isPressed={name === filter}
            setFilter={setFilter}
        />
    ));

    const tasksNoun = taskList.length !== 1 ? "tasks" : "task";
    const headingText = `${taskList.length} ${tasksNoun} remaining`;

    const listHeadingRef = useRef(null);
    const prevTaskLength = usePrevious(tasks.length);
    // TODO using usePrevious() in two files
    // Refactor so move it to its own file and export it from there
    // Import it where it's needed

    useEffect(() => {
        if (tasks.length < prevTaskLength) {
            listHeadingRef.current.focus();
        }
    }, [tasks.length, prevTaskLength]);

    return (
        <div className="todoapp stack-large">
            <h1>TodoMatic</h1>
            <Form addTask={addTask} />
            <div className="filters btn-group stack-exception">
                {filterList}
            </div>
            <h2 id="list-heading" tabIndex="-1" ref={listHeadingRef}>
                {headingText}
            </h2>
            <ul
                role="list"
                className="todo-list stack-large stack-exception"
                aria-labelledby="list-heading"
            >
                {taskList}
            </ul>
        </div>
    );
}

export default App;
