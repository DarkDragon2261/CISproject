import { FormEvent, useState } from "react";
import { FaBowlingBall } from "react-icons/fa";
import supabase from '../../supabaseClient.ts';
import { Link } from 'react-router-dom';
import './signupStyles.css';
import { passBuilder } from "./passwordBuilder";
import { useNavigate } from "react-router-dom";


function Signup() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setfullName] = useState('');
    const [security1, setSecurity1] = useState('');
    const [security2, setSecurity2] = useState('');
    const [security3, setSecurity3] = useState('');
    const navigate = useNavigate();

    const [error, setError] = useState('');
    const [message, setMessage] = useState('');


    

    const handleSignup = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();


        const { data, error } = await supabase
        .from('Users')
        .upsert({
           Email: email,
           FullName: fullName,
           Password: password,
           Security1: security1,
           Security2: security2,
           Security3: security3,
        })
        if (error) {
            console.error('Supabase Error:', error);
            console.log('Error Code:', error.code);
            console.log('Error Details:', error.details);
            console.log('Error Message:', error.message);
    
            //Singleton Pattern
            if (error.code === '23505' && error.details.includes('Email')) {
                setMessage('This email is already registered!');
            } else {
                setMessage('An error occurred. Please try again.');
            }
    
            return;
        }

        else {
            setMessage('Successfully Created an Account!');
            setTimeout(() => {
                navigate('/Login');
            }, 1000); 
        }
    };

    const handlePassGenerate = () => {
        const pass = passBuilder();
        setPassword(pass);
    }

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
                    Already Registered? <Link to='/login'> Login Here!</Link>
                </div>
                <form className="signupform" onSubmit={handleSignup}>
                    <input
                        className="input"
                        type="email"
                        placeholder="Enter Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    >
                    </input>

                    <input
                        className="input"
                        type="password "
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}>
                    </input>

                    <input
                        className="input"
                        type="fullname "
                        placeholder="Enter Full Name"
                        value={fullName}
                        onChange={(e) => setfullName(e.target.value)}>
                    </input>

                    <input
                        className="input"
                        type="security1"
                        placeholder="What is your mother's maiden name?"
                        value={security1}
                        onChange={(e) => setSecurity1(e.target.value)}>
                    </input>

                    <input
                        className="input"
                        type="security2"
                        placeholder="What is your favorite color?"
                        value={security2}
                        onChange={(e) => setSecurity2(e.target.value)}>
                    </input>

                    <input
                        className="input"
                        type="security3"
                        placeholder="What is your favorite food?"
                        value={security3}
                        onChange={(e) => setSecurity3(e.target.value)}>
                    </input>

                    <button onClick={handlePassGenerate} className="passbutton">Generate Strong Password?</button>
                    <button type="submit" style={{ backgroundColor: "#f7c59f" }} > Submit!</button>
                </form>
            </div>
            <div>{message}</div>
        </div>

    )
}

export default Signup;