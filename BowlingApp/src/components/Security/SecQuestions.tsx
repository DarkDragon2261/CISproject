import { SecurityResponse } from "./SecurityCommandChain";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import './SecurityStyles.css';

function SecurityQuestions () {
    const [email, setEmail] = useState('');
    const [rep1, setrep1] = useState('');
    const [rep2, setrep2] = useState('');
    const [rep3, setrep3] = useState('');
    const [message, setMessage] = useState('');

    const nav = useNavigate();

   
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); 

        
        const isValid = await SecurityResponse( email, rep1, rep2, rep3);
    
       
        if (isValid) {
          setMessage('Success! You answered a valid security question.');
          nav('/profile' , { state: {email} });

        } else {
          setMessage('Error: Invalid answers or no match found.');
        }
      };
    return (
        <div className="SecurityBackground">
            <div className="h1">Forgot your password? No problem! Answer at least one of these security questions!</div>
            <form onSubmit={handleSubmit} className="SecurityForm">
            <input
                        className="inputSec"
                        type="security1"
                        placeholder="What is your mother's maiden name?"
                        value={rep1}
                        onChange={(e) => setrep1(e.target.value)}>
                    </input>

                    <input
                        className="inputSec"
                        type="security2"
                        placeholder="What is your favorite color?"
                        value={rep2}
                        onChange={(e) => setrep2(e.target.value)}>
                    </input>

                    <input
                        className="inputSec"
                        type="security3"
                        placeholder="What is your favorite food?"
                        value={rep3}
                        onChange={(e) => setrep3(e.target.value)}>
                    </input>
                    <input
                        className="inputSec"
                        type="email"
                        placeholder="What is your email?"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}>
                    </input>
                    <button type = "submit" className="buttonSec">Submit</button>
            </form>
            <div>{message}</div>
        </div>
    );
}

export default SecurityQuestions;