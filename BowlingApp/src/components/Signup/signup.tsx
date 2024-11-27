import { FormEvent, useState } from "react";
import supabase from '../../supabaseClient.ts';
import './signupStyles.css';


function Signup () {

    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');
    const[creditcard, setCreditCard] = useState('');
    const[socialSecurity, setSocialSecurity] = useState('');

    const[error, setError] = useState('');
    const[message,setMessage] = useState('');



    const handleSignup = async(e: FormEvent<HTMLFormElement>) => {
       e.preventDefault();
        
        const {user, error } = await supabase.auth.signUp({
            email, 
            password})
        if (error) {
            setMessage('error');
        }

        if (user) {
            setMessage('Success!');
        }
    };
    
    return (
        <div className="background">
            <div className="bowlingdisplay">
                HFHEJFBEJBFJEBFJEBFJEBFJE
            </div>
            <div className="signup">
                <form onSubmit={handleSignup}>
                    <input
                    type = "email"
                    placeholder="Enter Email"
                    value = {email}
                    onChange = {(e) => setEmail(e.target.value)}
                    >
                    </input>

                    <input
                    type = "password "
                    placeholder="Enter password"
                    value = {password}
                    onChange = {(e) => setPassword(e.target.value)}>
                    </input>

                    <button type = "submit" > Submit!</button>
                </form>
            </div>
            </div>
           
    )
}

export default Signup;