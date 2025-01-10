import React from 'react'
import { routeLinks } from '@/app/_libs/links';

const DetailsUtilisateurAssocies = ({
  handleEdit,
  handleViewReport,
  handlePause,
  userid,
  name,
  lastname
}) => {
  const { useRouter } = require('next/navigation');
  const router = useRouter()
  const DeleteUsers=async()=>{
    try{
      const requestOptions = {
           method: 'POST',
           headers: {
             'Content-Type': 'application/json'
           },
           body: JSON.stringify({id:userid})
         };
   
        const res = await fetch('/api/personnel/supprimer',requestOptions);
        const response=await res.json()
         if(response.message==="success"){
           router.push(routeLinks.associe);
   }  
 }
 catch(error){
   console.log(error)
 }
  }
  return (
    <div className="bg-slate-800 w-[8.5rem] h-auto rounded-sm">
      <div className="w-full h-full flex flex-col space-y-1 my-1">
        <button 
         onClick={DeleteUsers}
        className="w-full text-white hover:bg-slate-600">
          supprimer
        </button>
        <button
          onClick={()=>handleEdit(userid)}
          className="w-full text-white hover:bg-slate-600"
        >
          modifier 
        </button>
        <button
          onClick={()=>handleViewReport(userid)}
          className="w-full text-white hover:bg-slate-600"
        >
          visualiser le rapport
        </button>
        <button
          onClick={()=>handlePause(userid,name,lastname)}
          className="w-full text-white hover:bg-slate-600"
        >
          congé
        </button>
      </div>
    </div>
  );
};

export default DetailsUtilisateurAssocies
