
import React, { useState, useEffect, useContext } from 'react'
import { SessionContext } from '../../context/auth';
import { apiLinks } from '@/app/_libs/links';
import { PropagateLoader } from 'react-spinners';
import { useSession } from 'next-auth/react';
const RapportJour = ({ closeModal }) => {
  const [messagerapport, setMessageRapport] = useState("");
    const [user, setUser] = useState("");
    const [loading, setLoading]=useState(false)
    const [viewNotificationMessage, setViewNotificationMessage] = useState(false);
    const [notificationerror, setNotificationError]=useState("")
    const [notificationsuccess, setNotificationSuccess]=useState("")
    const [disablebutton,showDisavleButton]=useState(false)
    const [message, setMessage]=useState('')
    const handleInputRapportchange = (e) => {
        setMessageRapport(e.target.value);
    }

    const {data:session} = useSession();
    useEffect(() => {
        if (session) {
                setUser(session?.user?.id);
                console.log(session.user)
            
        }

    }, [session]);

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
               }, 3000);
              
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
      <div className="w-full h-full flex justify-center items-center absolute bg-slate-700 bg-opacity-25 z-25">
        <div className="w-[95%] md:w-[90%] lg:w-[90%] xl:w-[65%] h-[95%] md:h-[90%] lg:h-[90%]  relative flex flex-col space-y-2 md:space-y-4 bg-white rounded-md mx-auto">
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
          <div className="w-[98%] flex justify-end items-center mx-auto mt-1 mt:mt-2">
            <button onClick={closeModal} className=" w-6 h-6 hover:bg-red-600 ">
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
          <div className="w-[78%] h-full flex flex-col space-y-3 mx-auto mt-2 mb-2 ">
            <div className="flex flex-col space-y-2 w-full">
              <label
                htmlFor="first_name"
                className="text-md font-semibold text-slate-800"
              >
                Generez le rapport
              </label>
              {message &&( <span className="absolute top-0 text-sm md:text-md lg:text-lg text-red-600">{message}</span>) }
              <textarea
                id="message"
                onChange={handleInputRapportchange}
                className="block p-2.5 w-full h-[20rem] md:h-[26rem] lg:h-[28rem] xl:h-[23rem] text-lg  text-slate-800 rounded-lg border border-slate-700 focus:outline-none placeholder: text-slate-800 placeholder:text-sm"
                placeholder="ecris le rapport ici..."
              ></textarea>
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
