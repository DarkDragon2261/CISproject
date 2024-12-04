import { FormEvent, useState } from "react";
import supabase from '../../supabaseClient.ts';
import { useNavigate, Link, useLocation } from "react-router-dom";
import { GiBowlingPin } from "react-icons/gi";
import './loginStyles.css';


function Login () {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const Navigate = useNavigate();

    const LoginHandler = async(e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const {error, data} = await supabase
        .from('Users')
        .select('Password')
        .eq('Email', email)
        
        if (error) {
            setMessage('Didnt work');
        }

        else if (data) {
            const retreivedata = data[0].Password;
            if (password === retreivedata) {
                setMessage('Success!');
                Navigate('/profile' , { state: {email} });
            }
            
        }
    }

 

    return (
        <div className="backgroundlogin">
           <div className="header"> Welcome Back! Login Here</div>
           <div className="Forgot">
            Forgot Password? <Link to ='/SecQuestions' className="Link">Click Here!</Link>
           </div>
             <div className="formcontainer">
                <form onSubmit = {LoginHandler} className="loginform">
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
                    <button type = "submit" className="loginbutton" >Submit</button>    
                </form>
                <div>{message}</div>
            </div>
            <div className="bowlingpincontainer">
                <GiBowlingPin size={"20em"}></GiBowlingPin>
             </div>
        </div>
       
    )
}

export default Login;