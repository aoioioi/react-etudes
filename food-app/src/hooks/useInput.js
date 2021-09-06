import { useState } from 'react';

function useInput(valToValidate) {
    const [enteredValue, setEnteredValue] = useState('');
    const [isTouched, setIsTouched] = useState(false);

    function handleValueChange(e) {
        setEnteredValue(e.target.value);
    }

    function handleInputBlur(e) {
        setIsTouched(true);
    }

    function reset() {
        setEnteredValue('');
        setIsTouched(false);
    }

    const valueIsValid = valToValidate(enteredValue);
    // const valueIsValid = enteredValue.trim() !== '';
    const hasError = !valueIsValid && isTouched;  

    return {
        value: enteredValue,
        isValid: valueIsValid, 
        hasError: hasError, 
        handleValueChange: handleValueChange, 
        handleInputBlur: handleInputBlur,
        reset: reset
    };
}

export default useInput;