import { useState } from "react"

const useSales = (initialState: Array<any>) => {
    const [state, setState] = useState(initialState);
    const addObjects = (objects: Array<any>) => {
        const objectos = state
        objects.forEach((object) => {
            objectos.push(object) 
        });
        setState(objects)
    }
    return [
        state,
        addObjects,
    ];
}

export default useSales;