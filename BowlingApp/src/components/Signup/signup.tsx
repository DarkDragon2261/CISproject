import { FormEvent, useState } from "react";
import { FaBowlingBall } from "react-icons/fa";
import supabase from '../../supabaseClient.ts';
import {Link} from 'react-router-dom';
import './signupStyles.css';


function Signup () {

    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');
    const[fullName, setfullName] = useState('');
    const[error, setError] = useState('');
    const[message,setMessage] = useState('');



    const handleSignup = async(e: FormEvent<HTMLFormElement>) => {
       e.preventDefault();
        
        const {user, error } = await supabase.auth.signUp({
            email, 
            password,
            options: {
                data: {
                    password: {password},
                    fullname: (fullName)
                }
            }
            })
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
                <div className="orangesquare">
                    THE BOWLING PIN
                </div>
                <div>
                    <FaBowlingBall className="bowlingicon"></FaBowlingBall>
                </div>
            </div>
            <div className="signup">
                <h1 className="createaccount">Create an Account</h1>
               <div className="login">
                    Already Registered? <Link to = '/login'> Login Here!</Link>
               </div>
                <form className = "form" onSubmit={handleSignup}>
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

                    <input
                    className="input"
                    type = "fullname "
                    placeholder="Enter Full Name"
                    value = {fullName}
                    onChange = {(e) => setfullName(e.target.value)}>
                    </input>

                    <button type = "submit" style={{backgroundColor: "#f7c59f"}} > Submit!</button>
                </form>
            </div>
            </div>
           
    )
}

export default Signup;