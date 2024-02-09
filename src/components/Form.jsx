import { useState } from "react";

function Form(props) {

    const [name, setName] = useState("");   // Array destructuring used

    function handleChange(event) {
        console.log("Typing!");
        console.log("Event Value: " + event.target.value);
        console.log("Event Name: " + event.target.name);
        setName(event.target.value);
    }

    function handleSubmit(event) {
        // TODO Empty tasks submitted by pressing Add button
        // Need some check here to not allow blank value
        event.preventDefault();
        props.addTask(name);
        setName("")
    }

    return (
        <form onSubmit={handleSubmit}>
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
          value={name}
          onChange={handleChange}
        />
        <button type="submit" className="btn btn__primary btn__lg">
          Add
        </button>
      </form>
    );
}

export default Form;
