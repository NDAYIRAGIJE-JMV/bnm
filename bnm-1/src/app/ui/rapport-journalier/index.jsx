'use client'
import React, { useEffect, useState, useContext } from 'react'
import { SessionContext } from '../context/auth';
import { apiLinks } from '@/app/_libs/links';
import { PropagateLoader } from 'react-spinners';

const RapportJour = () => {
  const [messagerapport,setMessageRapport]=useState("");
  const [disablebutton,showDisavleButton]=useState(false)
  const [user,setUser]=useState("");
  const [loading, setLoading]=useState(false)
  const [viewNotificationMessage, setViewNotificationMessage] = useState(false);
  const [notificationerror, setNotificationError]=useState("")
  const [notificationsuccess, setNotificationSuccess]=useState("")
  const [message, setMessage]=useState('')
  const handleInputRapportchange=(e)=>{
    setMessageRapport(e.target.value);
   }

   const users=useContext(SessionContext);
   const session=users.session

   useEffect(()=>{
     if(session){
     
      if ( session.user !== session) {
       setUser(session.user);
         } 
       }
       
   },[session]);

    const EnvoyerRapport=async()=>{
     setLoading(true)
       if(user && messagerapport){
          
         const formdata={
           user:user,
           body:messagerapport
         }
         try{
          
             const requestOptions = {
           
                 method: 'POST',
                 headers: {
                   'Content-Type': 'application/json'
                 },
                 body: JSON.stringify(formdata)
               };  
           const res = await fetch(apiLinks.rapport,requestOptions);
              const datas=await res.json()
              if (datas.message=="success") {
               setViewNotificationMessage(true);
               setNotificationSuccess("envoyé avec succès")
               showDisavleButton(true)
               setLoading(false)
               setMessage("")
               const timer = setTimeout(() => {
                setViewNotificationMessage(false);
                window.location.reload()
              }, 6000);
             
               return () => clearTimeout(timer);
             
              }
              else{
                setNotificationError("erreur d'envoie");
                setLoading(false)
              }
              
            }
            catch(error){
            setNotificationError('error');
            }
     
     
     }
     else{
       setLoading(false)
       setMessage("ce champ doit être completé")
     }
    }



  return (
    <div className="mx-auto w-[100%] h-[27rem] md:h-[36rem] flex items-center bg-blue-100 justify-center rounded-md">
      <div className="relative w-[95%] lg:w-[65%] xl:w-[60%] h-[92%] md:h-[80%] lg:h-[70%] xl:h-[80%] mb-2 mt-2 flex flex-col space-y-4 bg-white rounded-md">
      {viewNotificationMessage && notificationsuccess &&
                    <div className='max-w absolute animate-fade-down animate-once animate-duration-[3000ms]  rounded-tl-lg  rounded-tr-lg bg-green-500 shadow-md shadow-slate-700 right-[25%] md:right-[40%] xl:right-[35%] mt-2'>
                    <div className='mx-2 flex flex-col'>
                        <span className='text-sm text-white mx-auto mb-1 mt-1'>{notificationsuccess} </span>
                    </div>
                  </div>  
              }
                {viewNotificationMessage && notificationerror &&
                    <div className='max-w absolute animate-fade-down animate-once animate-duration-[3000ms]  rounded-tl-lg  rounded-tr-lg bg-red-600 shadow-md shadow-slate-700 right-[25%] md:right-[40%] xl:right-[35%] mt-2'>
                    <div className='mx-2 flex flex-col'>
                        <span className='text-sm text-white mx-auto mb-1 mt-1'>{notificationerror} </span>
                    </div>
                  </div>  
              }
        <div className="w-[78%] h-full flex flex-col space-y-3 mx-auto mt-2 mb-2 ">
          <div className="flex flex-col space-y-2 w-full">
            <label
              htmlFor="first_name"
              className="text-md font-semibold text-slate-800"
            >
              Generez le rapport
            </label>
            <div className='relative w-full h-[18rem] md:h-[22rem] lg:h-[18rem] xl:h-[22rem] flex items-end'>
            {message &&( <span className="absolute top-0 text-sm md:text-md lg:text-lg text-red-600">{message}</span>) }
              <textarea
                id="message"
                onChange={handleInputRapportchange}
                value={messagerapport}
                className="block p-2.5 w-full h-[16rem] md:h-[20rem] lg:h-[16rem] xl:h-[20rem] text-lg  text-slate-800 rounded-lg border border-slate-700 focus:outline-none placeholder: text-slate-800 placeholder:text-sm"
                placeholder="ecris les commentaires ici..."
              ></textarea>
            </div>
          </div>
          <div className="flex justify-center">
            <button
              onClick={EnvoyerRapport}
              disabled={disablebutton}
              className="w-[8rem] h-10 rounded-md bg-green-700 hover:bg-green-800 text-white font-medium"
            >
              {loading ? (
                  <PropagateLoader color="#ffffff" className="mb-3" />
                ) : (
                  "ENVOYER"
                )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RapportJour
