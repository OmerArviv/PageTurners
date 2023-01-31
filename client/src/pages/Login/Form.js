import './Form.css';
import { useRef } from 'react';

function Form({ option, onClickResult }) {
    const emailInputRef = useRef();
    const passwordInputRef = useRef();

    return (
        <form className='account-form' onSubmit={(evt) => onClickResult(evt, emailInputRef, passwordInputRef)}>
            <div className={'account-form-fields ' + (option === 1 ? 'sign-in' : 'sign-up')}>
                <input id='email' name='email' type='email' placeholder='E-mail' required ref={emailInputRef} />
                <input id='password' name='password' type='password' placeholder='Password' ref={passwordInputRef} required={option === 1 || option === 2 ? true : false} />
                <input id='repeat-password' name='repeat-password' type='password' placeholder='Repeat password' required={option === 2 ? true : false} disabled={option === 1 ? true : false} />
            </div>
            <button className='btn-submit-form' type='submit'>
                {option === 1 ? 'Sign in' : 'Sign up'}
            </button>
        </form>
    )
}

export default Form;