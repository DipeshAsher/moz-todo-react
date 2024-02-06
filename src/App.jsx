import Todo from "./components/Todo";

function App(props) {
    const taskList = props.tasks?.map((task) => (
        <Todo
            id={task.id}
            name={task.name}
            completed={task.completed}
            key={task.id}
        />
    ));

    return (
        <div className="todoapp stack-large">
            <h1>TodoMatic</h1>
            <form>
                <h2 className="label-wrapper">
                    <label htmlFor="new-todo-input" className="label__lg">
                        What needs to be done?
                    </label>
                </h2>
                <input
                    type="text"
                    id="new-todo-input"
                    className="input input__lg"
                    name="text"
                    autoComplete="off"
                />
                <button type="submit" className="btn btn__primary btn__lg">
                    Add
                </button>
            </form>
            <div className="filters btn-group stack-exception">
                <button
                    type="button"
                    className="btn toggle-btn"
                    aria-pressed="true" // Tells assistive tech button is pressed
                >
                    <span className="visually-hidden">Show </span>
                    <span>all</span>
                    <span className="visually-hidden"> tasks</span>
                    {/* visually-hidden providing assistive tech with additional info */}
                </button>
                <button
                    type="button"
                    className="btn toggle-btn"
                    aria-pressed="false"
                >
                    <span className="visually-hidden">Show </span>
                    <span>Active</span>
                    <span className="visually-hidden"> tasks</span>
                </button>
                <button
                    type="button"
                    className="btn toggle-btn"
                    aria-pressed="false"
                >
                    <span className="visually-hidden">Show </span>
                    <span>Completed</span>
                    <span className="visually-hidden"> tasks</span>
                </button>
            </div>
            <h2 id="list-heading">3 tasks remaining</h2>
            <ul
                role="list" // Helps assistive tech explain what kind of element
                className="todo-list stack-large stack-exception"
                aria-labelledby="list-heading" // That top row is column headings
            >
                {taskList}
            </ul>
        </div>
    );
}

export default App;
