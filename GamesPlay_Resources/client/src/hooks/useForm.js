import { useState } from 'react';

export function useForm(initialValues, submitCallback) {

    const [values, setValues] = useState(initialValues);


    const changeHandler(e) => {
        setValues(state => ({
            ...state,
            [e.target.name]: e.target.value
        }))
    }


    const submitHandler = () => {
        e.preventDefault();

        submitCallback(values);
    }

    return {
        changeHandler,
        values,
        submitHandler
    };

};