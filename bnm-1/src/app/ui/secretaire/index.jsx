"use client"
import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import DossiersList from './liste-dossiers';
import axios from 'axios';

const Secretaire = ({ tribunals }) => {
  const searchParams = useSearchParams();
  const {data:session} = useSession();
  const tribunalGet = searchParams.get('tribunal') || 0;
  const searcValue = searchParams.get('numero') || " ";
  const typeValue = searchParams.get('type') || 0;
  const consoleState  = searchParams.get('console') || 0;
  const penalite  = searchParams.get('penalite') || 0;
  const urgence  = searchParams.get('urgence') || 0;
  const prononce  = searchParams.get('prononce') || 0;
  const page  = parseInt(searchParams.get('page')) || 0;
  const [data, setData] = useState([]);

  
 
  useEffect(() => {
    async function fetchData() {
      await axios.get(`/secretaire/api/liste`,{
        headers:{
          tribunal: tribunalGet,
          numero: searcValue,
          type: typeValue,
          consoleState, penalite,
          urgence, start:page*8, limit: 8,
          prononce
        }
      })
      .then(results=>setData(results.data.data[0]))
      .catch(error=>console.error(error))
    };
    fetchData()

  }, [searchParams, session, tribunalGet, prononce,
     searcValue, typeValue, consoleState, penalite, urgence]);

  return (
    <div className="relative w-[100%] h-full rounded-md">
        <DossiersList data={data} tribunals={tribunals} />
    </div>
  );
}

export default Secretaire
