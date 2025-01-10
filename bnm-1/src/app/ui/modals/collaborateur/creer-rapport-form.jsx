"use client"
import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react';
import { apiLinks } from '@/app/_libs/links';
import { PropagateLoader } from 'react-spinners';
import { notFound } from 'next/navigation';

const RapportCollaborateur = ({closeModal,id}) => {
  const {data : session} = useSession();
  // const user = session?.user.id
  const [viewNotificationMessage, setViewNotificationMessage] = useState(false);
  const [decision,setDecision]=useState("");
  const [commentaire,setCommentaire]=useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading]=useState(false);
  const [user,setUser]=useState("");
  const [isButtonDisabled, setButtonDisabled] = useState(false);
  const [notificationerror, setNotificationError]=useState("");
  const [notificationsuccess, setNotificationSuccess]=useState("");

  const todayDate = new Date().toISOString().split('T')[0];
  const handleInputDecision=(e)=>{
    setDecision(e.target.value);
  }
  const handleInputCommentaire=(e)=>{
    setCommentaire(e.target.value);
  }
     
  const EnvoyerRapport=async()=>{
    console.log('data sended: ', user, id, decision, commentaire)
    setViewNotificationMessage(false)
    setLoading(true)
      if(user && id && decision && commentaire){
        const formdata={
          user:session?.user.id,
          dossier:id,
          decision:decision,
          commentaire:commentaire

        }
      
      try{
        const requestOptions = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(formdata)
          };  
        const res = await fetch(apiLinks.rapportaudiance,requestOptions);
        const datas=await res.json()
        if (datas.message=="success") {
          setNotificationSuccess("crée avec succès")
          setButtonDisabled(true)
          setViewNotificationMessage(true);
          setMessage("")
          setLoading(false)
          const timer = setTimeout(() => {
            setViewNotificationMessage(false);
            window.location.reload()
          }, 2000);
  
          return () => clearTimeout(timer);    
        }
          }
          catch(error){
          setNotificationError('error');
          }
    
          }
          else{
            setLoading(false)
            setViewNotificationMessage(true)
            setMessage("complétez tous les champs")
            const timer = setTimeout(() => {
              setViewNotificationMessage(false);
            }, 3000);
    
            return () => clearTimeout(timer);  
          }          
  }

  useEffect(() => {
    setViewNotificationMessage(true);

    const timer = setTimeout(() => {
      setViewNotificationMessage(false);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(()=>{
    if(session){
    
     if ( session.user !== session) {
      setUser(session.user);
 
        } 
      }
      
  },[session]);
  return (
    <div className="w-full h-full flex justify-center items-center absolute bg-slate-700 bg-opacity-25 z-25">
      <div  className="relative w-[90%] md:w-[80%] lg:w-[85%] xl:w-[65%] h-[85%] lg:h-[93%] lg:h-[97%] relative flex flex-col space-y-0 bg-white rounded-md ">
      { viewNotificationMessage && notificationsuccess &&
        <div className='max-w absolute animate-fade-down animate-once animate-duration-[3000ms]  rounded-tl-lg  rounded-tr-lg bg-green-500 shadow-md shadow-slate-700 right-[25%] md:right-[37%] lg:right-[35%] xl:right-[42%] mt-2'>
        <div className='mx-2 flex flex-col'>
            <span className='text-sm text-white mx-auto mb-1 mt-1'>{notificationsuccess} </span>
        </div>
      </div>   
      }
      { viewNotificationMessage && notificationerror &&
        <div className='max-w absolute animate-fade-down animate-once animate-duration-[3000ms]  rounded-tl-lg  rounded-tr-lg bg-red-500 shadow-md shadow-slate-700 right-[25%] md:right-[37%] lg:right-[35%] xl:right-[42%] mt-2'>
        <div className='mx-2 flex flex-col'>
            <span className='text-sm text-white mx-auto mb-1 mt-1'>{notificationerror} </span>
        </div>
       </div>   
      }
    { viewNotificationMessage && message &&
      <div className='max-w absolute animate-fade-down animate-once animate-duration-[3000ms]  rounded-tl-lg  rounded-tr-lg bg-red-500 shadow-md shadow-slate-700 right-[25%] md:right-[37%] lg:right-[35%] xl:right-[42%] mt-2'>
      <div className='mx-2 flex flex-col'>
          <span className='text-sm text-white mx-auto mb-1 mt-1'>{message} </span>
      </div>
      </div>   
    }
          <div className='w-full flex flex-col'>
            <div className='w-[95%] flex items-center justify-end mx-auto mt-2'>
              <button
                onClick={closeModal}
                className=" w-6 h-6 hover:bg-red-600 "
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-6 text-lg text-black hover:text-white"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18 18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className='w-[85%] flex items-center justify-end mx-auto mt-2'>
              <span className='mx-auto text-lg font-bold leading-tight tracking-tight text-slate-700 underline'>creez un rapport</span>
            </div>
          </div>
          <div className="flex flex-col space-y-3 ">
            <div className="relative w-full h-full flex flex-col md:flex-row justify-between">
              <div className="flex flex-col space-y-3 xl:space-y-3 w-full mt-3 lg:mt-5">
                  <label
                      htmlFor="first_name"
                      className="text-md font-semibold text-slate-800 mx-auto"
                  >
                    Décision
                  </label>
                  <input
                      type="date"
                      className="h-9 border border-slate-700  text-slate-800 text-lg rounded-lg block w-[70%] p-2.5 dark:placeholder-slate-700 focus:outline-none placeholder:text-sm mx-auto"
                      required
                      onChange={handleInputDecision} 
                      value={decision}   
                      min={todayDate}
                        
                  />
                  <label
                    htmlFor="first_name"
                    className="text-md font-semibold text-slate-800 mx-auto"
                  >
                    Commentaire
                  </label>
                  <textarea
                    
                      className="h-[16rem] md:h-[23rem] xl:h-[18rem] border  border-slate-700  text-slate-800 text-lg rounded-lg block w-[70%] p-2.5 dark:placeholder-slate-700 focus:outline-none placeholder:text-sm mx-auto"
                      required
                      onChange={ handleInputCommentaire} value={commentaire}
                  />
            
              </div>
            </div>              
            <div className="flex justify-center">
                <button   onClick={EnvoyerRapport} disabled={isButtonDisabled}
                className="w-[8rem] h-8 rounded-md bg-green-700 hover:bg-green-800 text-white font-medium mb-3">
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

export default RapportCollaborateur
