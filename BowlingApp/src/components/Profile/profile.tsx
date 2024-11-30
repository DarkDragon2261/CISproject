import { useState, useEffect } from "react";
import supabase from '../../supabaseClient';

function Profile () {
    
    const [user, setUser] = useState<any>(null);
    const [data, setData] = useState<any>(null);

    useEffect(() => {

        const dataRetrieval = async () => {
            const { data: { session }, error } = await supabase.auth.getSession();

            if (session) {
                setUser(session.user);
                setData(session.user.user_metadata);
            } else if (error) {
                console.error('Error retrieving session:', error);
            }
        };

        dataRetrieval(); 

    }, []); 
    
    return (
        <div>
            <h1>Profile</h1>
            <div>
                {data ? (
                    <pre>{JSON.stringify(data, null, 2)}</pre> 
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </div>
    );
}

export default Profile;
