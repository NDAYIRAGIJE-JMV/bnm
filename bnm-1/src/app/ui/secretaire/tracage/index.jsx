"use client";
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import DossiersList from '../liste-dossiers';
import axios from 'axios';

export default function Tracage({ tribunals, numero }){
  const searchParams = useSearchParams();
  const page  = parseInt(searchParams.get('page')) || 0;
  const [data, setData] = useState([]);
  useEffect(() => {
    async function fetchData() {
      await axios.get('/secretaire/api/tracabilite',{
        headers:{numero}
      })
      .then(results=>{
        console.log(results.data)
        setData(results.data)
      })
      .catch(error=>console.error(error))
    };
    fetchData()

  }, [numero]);
    return (
        <div className="relative w-[100%] h-full rounded-md">
            <DossiersList data={data} tribunals={tribunals} numero={numero} />
        </div>
    )
}