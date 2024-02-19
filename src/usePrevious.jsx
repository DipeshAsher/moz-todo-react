// usePrevious function in its own module as being used twice in codebase in App and Todo.

import { useRef, useEffect } from "react";

// usePrevious() custom hook to track values across renders.
// Used to keep track of focus management of whether task is being edited or not.
function usePrevious(value) {
    const ref = useRef();   // Uses useRef() hook to create empty ref
    useEffect(() => {
        ref.current = value;    // Calls useEffect() and updates value after each render
    });
    return ref.current; // Returns ref's current value
}

export default usePrevious;
