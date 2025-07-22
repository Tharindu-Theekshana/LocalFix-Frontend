import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router'
import Navbar from './Navbar';
import { getProfilesByStatus } from '../services/profileService';

export default function HandleProfiles() {

    const location = useLocation();

    const status = location.state?.status;

    const [profiles, setProfiles] = useState([]);

    useEffect(()=> {
        const fetchProfilesByStatus = async () => {
            try{

                const response = await getProfilesByStatus(status);
                setProfiles(response);

            }catch(e){
                console.error("error fetching profiles by status : ",e);
            }
        }

        fetchProfilesByStatus();
    },[status]);

  return (
    <>
    <Navbar/>
    {console.log(profiles)}
    <div>

    </div>
    </>
  )
}
