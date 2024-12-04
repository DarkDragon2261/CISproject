import { useState, useEffect, } from "react";
import supabase from '../../supabaseClient';
import { useLocation,useNavigate } from 'react-router-dom';
import { FaUser } from "react-icons/fa";
import './profilestyles.css';
function Profile() {

    const Location = useLocation();
    const Navigate = useNavigate();

    const useremail = Location.state?.email;
    const timeLimit = 20000;

    const [password, setPassword] = useState('');
    const [proxypass, setProxyPass] = useState('');
    const [showpass, togglepass] = useState(false);


    const [fullName, setfullName] = useState('');
    const [proxyname, toggleProxyName] = useState('');
    const [showname, togglename] = useState(false);

    const [security1, setSecurity1] = useState('');
    const [proxysec1, toggleProxySec1] = useState('');
    const [showsec1, toggleSec1] = useState(false);

    const [security2, setSecurity2] = useState('');
    const [proxysec2, toggleProxySec2] = useState('');
    const [showsec2, toggleSec2] = useState(false);

    const [security3, setSecurity3] = useState('');
    const [proxysec3, toggleProxySec3] = useState('');
    const [showsec3, toggleSec3] = useState(false);

    const [message, setMessage] = useState('');


    const togglePasswordVisibility = () => togglepass(prev => !prev);
    const toggleFullNameVisibility = () => togglename(prev => !prev);
    const toggleSecurity1Visibility = () => toggleSec1(prev => !prev);
    const toggleSecurity2Visibility = () => toggleSec2(prev => !prev);
    const toggleSecurity3Visibility = () => toggleSec3(prev => !prev);


    const proxyMask = (real: string) => {
        let proxylength: number = real.length;
        let proxystring: string = '';
        for (let i:number = 0; i < proxylength; i++) {
            proxystring += '%';
        }
        return proxystring;
    }

    useEffect(() => {

        const dataRetrieval = async () => {
            const { data, error } = await supabase
                .from('Users')
                .select('*')
                .eq('Email', useremail)

            if (error) {
                setMessage('Error Loading Data');
            } else if (data) {

                const retreivepass = data[0].Password;
                const passprox = proxyMask(retreivepass);
                setPassword(retreivepass);
                setProxyPass(passprox);

                const retreivename = data[0].FullName;
                const nameprox = proxyMask(retreivename);
                setfullName(retreivename);
                toggleProxyName(nameprox);

                const retreivesec1 = data[0].Security1;
                const sec1prox = proxyMask(retreivesec1);
                setSecurity1(retreivesec1);
                toggleProxySec1(sec1prox);

                const retreivesec2 = data[0].Security2;
                setSecurity2(retreivesec2);
                const proxsec2 = proxyMask(retreivesec2);
                toggleProxySec2(proxsec2);

                const retreivesec3 = data[0].Security3;
                const proxsec3 = proxyMask(retreivesec3);
                setSecurity3(retreivesec3);
                toggleProxySec3(proxsec3);
            }
        };

        dataRetrieval();

        const timer = setTimeout(()=> {
            Navigate('/signup');
        }, timeLimit);

        return () => {
            clearTimeout(timer);
        }
    }, [Navigate, timeLimit]);

    return (
        <div className="ProfileBackground">
            <div className="IconContainer">
                <FaUser size={"10em"} color="white"></FaUser>
            </div>
            <div className="InfoContainer">
                <div className="DataField">
                    Password: {showpass ? password : proxypass}
                    <button onClick={togglePasswordVisibility} style={{backgroundColor:"#f7c59f"}}>Show</button>
                </div>
                <div className="DataField">
                    Full Name: {showname ? fullName : proxyname}
                    <button onClick={toggleFullNameVisibility} style={{backgroundColor:"#f7c59f"}}>Show</button>
                </div>
            </div>
            <div className="InfoContainer">
                <div className="DataField">
                    Security1: {showsec1 ? security1 : proxysec1}
                    <button onClick={toggleSecurity1Visibility} style={{backgroundColor:"#f7c59f"}}>Show</button>
                </div>
                <div className="DataField">
                    Security2: {showsec2 ? security2 : proxysec2}
                    <button onClick={toggleSecurity2Visibility} style={{backgroundColor:"#f7c59f"}}>Show</button>
                </div>
                <div className="DataField">
                    Security3: {showsec3 ? security3 : proxysec3}
                    <button onClick={toggleSecurity3Visibility} style={{backgroundColor:"#f7c59f"}}>Show</button>
                </div>
            </div>
        </div>
    );
}

export default Profile;
