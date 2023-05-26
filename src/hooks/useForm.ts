import { useState } from "react"

const useForm = (initialState: any) => {
    const [state, setState] = useState(initialState);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setState(state => ({ ...state, [e.target.name] : e.target.value }));
    }

    // console.log('State fo menu : ',state)
    return [
        state,
        handleChange, 
        setState,
    ];
}

export default useForm;