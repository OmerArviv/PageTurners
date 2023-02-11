import React from 'react';
import useCounter from './useCounter';
import './Counter.css';
import { useNavigate } from 'react-router-dom';

function Counter() {
    const [count, increment, decrement] = useCounter();
    const navigate = useNavigate();


    const submitHandler = () => {
        alert('Thank you for donating ' + count + ' books, we will be in touch with you');
        navigate('/');
    }

    return (
        <div>
            <div className='custom-counter'>
                <p className='custom-count'>Books: {count}</p>
                <button className='custom-button' onClick={increment}>+</button>
                <button className='custom-button' onClick={decrement}>-</button>
            </div>
            <button className='submit-button' onClick={submitHandler}>Submit</button>
        </div >
    );
}

export default Counter;
