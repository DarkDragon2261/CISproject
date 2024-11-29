import { FormEvent, useState } from "react";
import supabase from '../../supabaseClient.ts';
import { useNavigate } from "react-router-dom";


function Login () {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const Navigate = useNavigate();

    const LoginHandler = async(e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const {error, data} = await supabase.auth.signInWithPassword({email, password});

        if (error) {
            setMessage('Didnt work');
        }

        else if (data.user) {
            setMessage('Success!');
            Navigate('/profile');
        }
    }

    return (
        <div>
            <form onSubmit = {LoginHandler}>
            <input
                    className="input"
                    type = "email"
                    placeholder="Enter Email"
                    value = {email}
                    onChange = {(e) => setEmail(e.target.value)}
                    >
                    </input>

                    <input
                    className="input"
                    type = "password "
                    placeholder="Enter password"
                    value = {password}
                    onChange = {(e) => setPassword(e.target.value)}>
                    </input>
                <button type = "submit">Submit</button>    
            </form>
            <div>{message}</div>
        </div>
    )
}

export default Login;