
import React, { useEffect, useState } from 'react'
import { apiLinks } from '@/app/_libs/links';
import { PropagateLoader } from 'react-spinners';
const AjouterCongeAssocies = ({closeModalAjouterCongeAssocie,userId,id}) => {
  const [viewNotificationMessage, setViewNotificationMessage] = useState(false);
  const [notificationerror, setNotificationError]=useState("")
  const [notificationsuccess, setNotificationSuccess]=useState("")
  const [notificationdepassejours, setNotificationDepasseJours]=useState(false)
  const [datesortie, setDateSortie]=useState("");
  const [dateretour, setDateRetour]=useState("");
  const [days, setDays] = useState("");
  const [activebutton,setDesactiveButton]= useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading]=useState(false)
  const [JoursRestant,setJoursRestant]=useState()
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
      FetchConge(userId)
    }, [datesortie, dateretour]); // Le tableau de dépendances inclut les dates


    const FetchConge = async (user) => {
      setViewNotificationMessage(true)
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
  const ajouteconge=async(e)=>{
    setLoading(true)
    setViewNotificationMessage(true)
      e.preventDefault();
      if(userId && datesortie && dateretour && days){
        if(days<=JoursRestant){
        const formdata={
          user:userId,
          datesortie:datesortie,
          dateretour:dateretour,
          jours:days,
          id:id
        
        }
   
      try{
           
          const requestOptions = {
        
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(formdata)
            };  
        const res = await fetch(apiLinks.ajouteconge,requestOptions);
           const datas=await res.json()
           if (datas.message=="success") {
            setViewNotificationMessage(false)
            setNotificationSuccess("envoye avec succès")
            setDesactiveButton(true)
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
          console.log('error');
         }

      }
      else{
    
          setLoading(false)
          setNotificationDepasseJours(true)
          setNotificationSuccess("")
          setViewNotificationMessage(false)
          setMessage("")
        
      }
    }
      else{
        setViewNotificationMessage(false)
        setLoading(false)
        setMessage("Complete d'abord tous les champs")
      }
    
  }


  return (
    <div className="w-full h-full flex justify-center items-center absolute bg-slate-700 bg-opacity-25 z-25">
      <div className="relative w-[95%] md:w-[90%] xl:w-[70%]  h-[70%] md:h-[40%] lg:h-[40%] xl:h-[45%] flex flex-col bg-white rounded-md border border-slate-700 mx-auto">
      {viewNotificationMessage && JoursRestant &&
        <div className='w-[17rem] absolute animate-fade-down animate-once animate-duration-[3000ms]  rounded-tl-lg rounded-br-lg rounded-tr-lg bg-green-500 shadow-md shadow-slate-700 right-[10%] md:right-[30%] mt-0 md:mt-2'>
       
       <div className='mx-2 flex flex-col'>
                 <span className='text-sm text-white mx-auto'>votre conge ass ne devrait pas depasser</span>
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
        <div className="w-[95%] flex justify-end items-center mx-auto">
          <div className='w-[90%] md:w-[70%]  flex flex-row justify-between items-center mt-1'>
            <span className='text-lg font-bold leading-tight tracking-tight text-slate-700'>
              Modifiez l'utilisateur
            </span>
            <button
              onClick={closeModalAjouterCongeAssocie}
              className="w-6 h-6 hover:bg-red-600 mt-1"
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
        </div>
        <div className="relative w-[78%] h-full flex flex-col space-y-4 mx-auto mt-3 mb-2">
          <div className="w-full flex flex-col space-y-3 md:space-y-0 md:flex-row justify-between">
          {message && <span className="absolute ml-[20%] md:ml-[35%] lg:ml-[26%] xl:ml-[30%] -mt-2 md:-mt-3 lg:-mt-5 xl:-mt-6 text-sm md:text-md lg:text-lg text-red-600">{message}</span> }
            <div className="flex flex-col space-y-1 md:space-y-2 w-full md:w-[14.5rem] lg:w-[14rem] xl:w-[15rem]">
              <label
                htmlFor="first_name"
                className="text-md font-semibold text-slate-700"
              >
                Sortie
              </label>
              <input
                type="date"
                onChange={(e) => {
                  setDateSortie(e.target.value);
                }}
                value={datesortie}
                className="border border-slate-700 text-slate-700 text-lg rounded-lg block w-full  h-7 md:h-8 lg:h-10 xl:h-9  p-1.5 md:p-2.5 xl:p-3 dark:placeholder-slate-700 focus:outline-none placeholder:text-sm"
                required
              />
            </div>
            <div className="flex flex-col space-y-1 md:space-y-2 w-full md:w-[14.5rem] lg:w-[14rem] xl:w-[15rem]">
              <label
                htmlFor="first_name"
                className="text-md font-semibold text-slate-700"
              >
                Retour
              </label>
              <input
                type="date"
                onChange={(e) => {
                  setDateRetour(e.target.value);
                }}
                value={dateretour}        
                className="border border-slate-700 text-slate-700 text-lg rounded-lg block w-full  h-7 md:h-8 lg:h-10 xl:h-9  p-1.5 md:p-2.5 xl:p-3 dark:placeholder-slate-700 focus:outline-none placeholder:text-sm"
                required
              />
            </div>
          </div>
          <div className="flex flex-col space-y-0 w-full">
            <label
              htmlFor="first_name"
              className="text-md font-semibold text-slate-700"
            >
              Jours
            </label>
            <input
              type="number"
              onChange={handleDaysChange}
              value={days}      
              readOnly
              className="border border-slate-700 text-slate-700 text-lg rounded-lg block w-full  h-7 md:h-8 lg:h-10 xl:h-9  p-1.5 md:p-2.5 xl:p-3 dark:placeholder-slate-700 focus:outline-none placeholder:text-sm"
              required
            />
          </div>
          <div className="flex justify-center">
            <button
              onClick={ajouteconge}
              disabled={activebutton}
              className="w-[8rem] h-8 rounded-md bg-green-700 mb-3 hover:bg-green-800 text-white font-medium"
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

export default AjouterCongeAssocies
