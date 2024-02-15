import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// Each task prop needs unique id attribute as good practice or else label elements breaks.
const DATA = [
  { id: "todo-0", name: "Eat", completed: true },
  { id: "todo-1", name: "Sleep", completed: false },
  { id: "todo-2", name: "Repeat", completed: false },
];

// Call the ReactDOM.createRoot() function to define the root node.
// Takes argument of DOM element inside which we want our React app to be rendered, with id root.
// Chain render() method onto the createRoot() call, passing JSX expression that we want to render inside our root.
// By writing <App /> as this JSX expression, we're telling React to call the App() function which renders the App component inside the root node.
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App tasks={DATA} />
    {/* The <App /> component is being used as the parent component and is the entry point for the app. */}
    {/* Props named 'tasks' are defined by DATA const variable above. */}
  </React.StrictMode>,
)
