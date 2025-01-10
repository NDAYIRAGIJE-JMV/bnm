
'use client'
import React, { useState,useEffect } from 'react'
import { useSession } from 'next-auth/react';
import { apiLinks } from '@/app/_libs/links';
import { PropagateLoader } from 'react-spinners';
const DemandeCongeForm = () => {
  const {data : session} = useSession();
  const [viewNotificationMessage, setViewNotificationMessage] = useState(true);
  const [notificationerror, setNotificationError]=useState("")
  const [notificationsuccess, setNotificationSuccess]=useState("")
  const [notificationdepassejours, setNotificationDepasseJours]=useState(false)

      const [datesortie, setDateSortie]=useState("");
      const [dateretour, setDateRetour]=useState("");
      const [message, setMessage] = useState("");
      const [objet, setObjet]=useState("");
      const [days, setDays] = useState("");
      const [user,setUser]= useState("");
      const [disablebutton,showDisavleButton]=useState(false)
      const [loading, setLoading]=useState(false)
      const [JoursRestant,setJoursRestant]=useState()
      const handleInputObjet=(e)=>{
          setObjet(e.target.value);
          
         }
         const handleDaysChange = (event) => {
          setDays(parseInt(event.target.value, 10));
        };
        const calculerDifferenceEnJours = (date1, date2) => {
          const d1 = new Date(date1);
          const d2 = new Date(date2);
          const differenceEnMillis = d2 - d1;
          const differenceEnJours = differenceEnMillis / (1000 * 60 * 60 * 24);
          return differenceEnJours;
        };
      
        useEffect(() => {
          if (datesortie && dateretour) {
            const jours = calculerDifferenceEnJours(datesortie, dateretour);
            if(jours<0){
              setDays(0);
            }
            else{
              setDays(jours);
            }
          }
        }, [datesortie, dateretour]); // Le tableau de dépendances inclut les dates
      
        useEffect(()=>{
          if(session){
            setUser(session.user.id);
             FetchConge(session.user.id)
            }
            
        },[session]);
  
        const FetchConge = async (user) => {
    
          if (user) {
           
            try {
              const requestOptions = {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ userId: user }),
              };
              const res = await fetch("/api/joursconsomme", requestOptions);
              const datas = await res.json()
              if (datas.message=="success") {
                if(datas.NombreJourConsomme){
                  let joursrestant=20-datas.NombreJourConsomme;
                  setJoursRestant(joursrestant);
                }
          
              }
              else{
                let joursrestant=20
                setJoursRestant(joursrestant);
              }
            } catch (error) {
             setNotificationError("error");
            }
          }
        };


      const demandeconge=async(e)=>{
          e.preventDefault();
          setViewNotificationMessage(false)
          setLoading(true)
          if(user && datesortie && dateretour && days && objet){
               if(days<=JoursRestant){
            const formdata={
              user:user,
              datesortie:datesortie,
              dateretour:dateretour,
              jours:days,
              objet:objet
            }
  
            try{
               
              const requestOptions = {
            
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify(formdata)
                };  
            const res = await fetch(apiLinks.demandeconge,requestOptions);
               const datas=await res.json()
               if (datas.message=="success") {
                setNotificationSuccess("envoye avec succès")
                setViewNotificationMessage(false)
                setNotificationError(false)
                 showDisavleButton(true)
                 setLoading(false)
                 setMessage('')
                 const timer = setTimeout(() => {
                  setNotificationSuccess("")
                   window.location.reload()
                 }, 6000);
                
                  return () => clearTimeout(timer);
                
             
               }
               
             }
             catch(error){
              setNotificationError('error');
             }
  
          }
          else{
            setLoading(false)
            setNotificationDepasseJours(true)
          }
        }
    
          else{
            setLoading(false)
            setMessage("Tous les champs doivent être completés")
          }
  
  
  
      }



  return (
    <div className="mx-auto w-[100%] h-[27rem] md:h-[36rem] flex items-center bg-blue-100 justify-center rounded-md">
      <div className="relative w-[95%] lg:w-[85%] xl:w-[60%] h-[98%] md:h-[95%] lg:h-[95%] xl:h-[98%] flex flex-col space-y-0 md:space-y-1 mb-2 mt-2 bg-white rounded-md">
      {viewNotificationMessage &&  JoursRestant &&
        <div className='w-[17rem] absolute animate-fade-down animate-once animate-duration-[3000ms]  rounded-tl-lg rounded-br-lg rounded-tr-lg bg-green-500 shadow-md shadow-slate-700 right-[10%] md:right-[30%] mt-0 md:mt-2'>
       
       <div className='mx-2 flex flex-col'>
                 <span className='text-sm text-white mx-auto'>votre conge ne devrait pas depasser</span>
                 <span className='text-sm text-white mx-auto'>{JoursRestant} jours</span>
            </div>
        </div>   }

        {JoursRestant && notificationdepassejours &&
        <div className='w-[17rem] absolute animate-fade-down animate-once animate-duration-[3000ms]  rounded-tl-lg rounded-br-lg rounded-tr-lg bg-red-600 shadow-md shadow-slate-700 right-[10%] md:right-[30%] mt-0 md:mt-2'>
       
       <div className='mx-2 flex flex-col'>
                 <span className='text-sm text-white mx-auto'>votre conge ne devrait pas depasser</span>
                 <span className='text-sm text-white mx-auto'>{JoursRestant} jours</span>
            </div>
        </div>   }
        {notificationsuccess &&
                    <div className='max-w absolute animate-fade-down animate-once animate-duration-[3000ms]  rounded-tl-lg  rounded-tr-lg bg-green-500 shadow-md shadow-slate-700 right-[25%] md:right-[40%] xl:right-[35%] mt-2'>
                    <div className='mx-2 flex flex-col'>
                        <span className='text-sm text-white mx-auto mb-1 mt-1'>{notificationsuccess} </span>
                    </div>
                  </div>  
              }
                {notificationerror &&
                    <div className='max-w absolute animate-fade-down animate-once animate-duration-[3000ms]  rounded-tl-lg  rounded-tr-lg bg-red-600 shadow-md shadow-slate-700 right-[25%] md:right-[40%] xl:right-[35%] mt-2'>
                    <div className='mx-2 flex flex-col'>
                        <span className='text-sm text-white mx-auto mb-1 mt-1'>{notificationerror} </span>
                    </div>
                  </div>  
              }
        <div className='w-full h-[3rem]'>
        </div>
        <div className='mx-auto'>
                <span className='text-md font-bold underline'>Demande d'un conge</span>
        </div>
        <div className='w-full h-[87%] overflow-scroll md:overflow-hidden'>
        {message &&( <span className="absolute mt-0lg:-mt-3 xl:-mt-1 ml-[10%] md:ml-[35%] lg:ml-[26%] text-sm md:text-md lg:text-lg text-red-600"> {message} </span>)}
          <div className="w-[78%] h-full flex flex-col space-y-2 md:space-y-2 mx-auto mt-2">
            <div className="w-full flex flex-col md:flex-row space-y-1 md:space-y-0 md:justify-between mx-auto mt-2">
              <div className="flex flex-col space-y-1 md:space-y-2 w-full md:w-[14.5rem] lg:w-[14rem] xl:w-[13rem]">
                <label
                  htmlFor="first_name"
                  className="text-md md:text-xl font-medium text-slate-700"
                >
                  Sortie
                </label>
                <input
                  type="date"
                  className="h-9 border border-slate-700  text-slate-800 text-lg rounded-lg block w-full p-2.5 dark:placeholder-slate-700 focus:outline-none placeholder:text-sm"
                  required
                  onChange={(e) => {
                    setDateSortie(e.target.value);
                  }}
                  value={datesortie}
                />
              </div>
              <div className="flex flex-col space-y-1 md:space-y-2 w-full md:w-[14.5rem] lg:w-[14rem] xl:w-[13rem]">
                <label
                  htmlFor="first_name"
                  className="text-md md:text-xl font-medium text-slate-700"
                >
                  Retour
                </label>
                <input
                  type="date"
                  className="h-9 border border-slate-700  text-slate-800 text-lg rounded-lg block w-full p-2.5 dark:placeholder-slate-700 focus:outline-none placeholder:text-sm"
                  required
                  onChange={(e) => {
                    setDateRetour(e.target.value);
                  }}
                  value={dateretour}
                />
              </div>
            </div>
            <div className="flex flex-col space-y-3 w-full">
              <div className="flex flex-col space-y-2 w-full">
                <label
                  htmlFor="first_name"
                  className="text-md md:text-xl font-medium text-slate-700"
                >
                  Jours
                </label>
                <input
                  type="number"
                  readOnly
                  className="h-9 border border-slate-700  text-slate-800 text-lg rounded-lg block w-full p-2.5 dark:placeholder-slate-700 focus:outline-none placeholder:text-sm"
                  required
                  onChange={handleDaysChange}
                  value={days}
                />
              </div>
              <div className="flex flex-col space-y-2 w-full">
                <label
                  htmlFor="first_name"
                  className="text-md md:text-xl font-medium text-slate-700"
                >
                  Objet
                </label>
                <textarea
                  id="message"
                  className="block p-2.5 w-full h-[12rem] md:h-[12rem] lg:h-[12rem] xl:h-[13rem] text-lg  text-slate-800 rounded-lg border border-slate-700 focus:outline-none placeholder: text-slate-800 placeholder:text-sm"
                  placeholder="ecris les commentaires ici..."
                  onChange={handleInputObjet}
                  value={objet}
                ></textarea>
              </div>
            </div>
            <div className="flex justify-center">
              <button
                onClick={demandeconge}
                disabled={disablebutton}
                className="w-[8rem] h-8 rounded-md bg-green-700 hover:bg-green-800 text-white font-medium mb-2"
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
     </div>
  )
}

export default DemandeCongeForm
