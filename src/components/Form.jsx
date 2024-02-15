// Component for adding tasks towards the top of the page.

import { useState, useRef } from "react";

function Form(props) {

    const [name, setName] = useState("");   // Hook using array destructuring used to capture name variable and setName function.
    const inputRef = useRef(null);  // Hook used to manipulate DOM to focus on input.

    function handleChange(event) {
        console.log("Typing!");
        console.log("Event Value: " + event.target.value);
        console.log("Event Name: " + event.target.name);
        setName(event.target.value);  // Is the value that's entered in the input task box and uses setName in useState to update name.
    }

    function handleSubmit(event) {
        event.preventDefault();
        // Ternary operator to check if name is blank or not
        // Sends task back to App component
        name ? props.addTask(name) : alert("Nothing entered! Please enter a task.");
        inputRef.current.focus(); // Brings back focus to input box
        setName("") // Good practice to clear input after form submitted
    }

    return (
        <form onSubmit={handleSubmit}>
        <h2 className="label-wrapper">
          <label htmlFor="new-todo-input" className="label__lg">
            What needs to be done?
          </label>
        </h2>
        <input
          ref={inputRef}  // Need to pass inputRef here to create a reference
          type="text"
          id="new-todo-input"
          className="input input__lg"
          name="text"
          autoComplete="off"
          value={name}
          onChange={handleChange} // If something changes this will listen for it and trigger handleChange function.
        />
        <button type="submit" className="btn btn__primary btn__lg">
          Add
        </button>
      </form>
    );
}

export default Form;
