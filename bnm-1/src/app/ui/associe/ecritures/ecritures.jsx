import React, { useEffect, useState,useContext } from 'react'
 import { PropagateLoader } from "react-spinners";
 import { SessionContext } from '../../context/auth';
 import { useSession } from 'next-auth/react';
 import { apiLinks } from '@/app/_libs/links';
const AjouterEcriture = ({closeModal}) => {
  const [viewNotificationMessage, setViewNotificationMessage] = useState(false);
  const [destinataire, setDestinataire] = useState("");
  const [objet, setObjet] = useState("");
  const [reference, setReference] = useState("");
  const [expect, setExpect] = useState("");
  const [message, setMessage] = useState("");
  const [disablebutton,showDisavleButton]=useState(false)
  const [loading, setLoading] = useState(false)
  const [notificationerror, setNotificationError]=useState("")
  const [notificationsuccess, setNotificationSuccess]=useState("")
  const [formdata,setFormData]=useState({})
  //const user = useContext(SessionContext)
  const {data:session}=useSession()
  const handleDestinataireChange = (event) => {
      setDestinataire(event.target.value);
  };
  const handleObjetChange = (event) => {
      setObjet(event.target.value);
  }
  const handleExpectChange = (event) => {
    const refe= event.target.value
      if(refe=="autre"){
        const premiereLettresname = session?.user?.name?.charAt(0);
        const premiereLettreslastname= session?.user?.lastname?.charAt(0);
        setExpect(premiereLettresname+premiereLettreslastname)
       
      }
      else{
        setExpect(refe);
      }
       
      
    
  };


  const EnvoyerEcriture = async (e) => {
    e.preventDefault();

    if (destinataire && expect && objet) {
        setLoading(true);
        showDisavleButton(true);

        try {
            const res = await fetch(apiLinks.ecrituresAssocie, {
                headers: {
                    nom: '',
                },
            });

            const results = await res.json();

            if (results.message === 'Success') {
                const year = new Date(results.data[0].create_at);
                const anneeExtraite = year.getFullYear();
                const anneeActuelle = new Date().getFullYear();
                console.log("année extraite : " + anneeExtraite, "année actuelle : " + anneeActuelle);

                let formdata;
                if (anneeExtraite === anneeActuelle) {
                    formdata = {
                        user: session?.user?.id,
                        destinataire: destinataire,
                        expect: expect,
                        objet: objet,
                        ref: results.data[0].ref + 1,
                        reference: "BNM/" + expect + "/" + (results.data[0].ref + 1) + "/" + anneeActuelle,
                    };
                } else {
                    formdata = {
                        user: session?.user?.id,
                        destinataire: destinataire,
                        expect: expect,
                        objet: objet,
                        ref: 1,
                        reference: "BNM/" + expect + "/" + 1 + "/" + anneeActuelle,
                    };
                }

                console.log(formdata);

                // Envoi de la requête avec formdata
                const requestOptions = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formdata),
                };

                const response = await fetch('/associe/api/ecriture', requestOptions);
                const datas = await response.json();

                if (datas.message === "success") {
                    setViewNotificationMessage(true);
                    setNotificationSuccess("envoyé avec succès");
                    showDisavleButton(true);
                    setDestinataire('');
                    setMessage('');
                    setObjet('');
                    setExpect('');
                    setLoading(false);

                    const timer = setTimeout(() => {
                        setViewNotificationMessage(false);
                        window.location.reload();
                    }, 6000);

                    return () => clearTimeout(timer);
                }

                if (datas.error) {
                    setNotificationError(datas.error);
                }
            } else {
                setLoading(false);
                showDisavleButton(false);
                setMessage("La référence n'est pas correctement chargée");
            }
        } catch (error) {
            setLoading(false);
            showDisavleButton(false);
            setNotificationError('Une erreur est survenue : ' + error.message);
        }
    } else {
        setLoading(false);
        showDisavleButton(false);
        setMessage("Tous les champs doivent être complétés");
    }
};

  return (
      <div className="w-full h-full flex justify-center items-center absolute bg-slate-700 bg-opacity-25 z-25">
        <div className="w-[95%] lg:w-[85%] xl:w-[65%] h-[95%] md:h-[85%] xl:h-[95%] mb-2 bg-white rounded-md">
          <div className='relative w-[98%] flex justify-end mt-1 mb-2'>
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
            <div className=' w-[60%] flex justify-between items-center'>
                <div className=''>
                <span className='text-lg md:text-xl lg:text-2xl font-bold underline'>ecrivez</span>
                </div>
                <button
                onClick={closeModal}
                className="w-6 h-6 hover:bg-red-600"
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
          <div className="relative w-[78%] h-full flex flex-col space-y-4 md:space-y-4  mx-auto ">
         {message &&( <span className="absolute mt-0 lg:-mt-1 xl:-mt-1 ml-0 md:ml-[25%] lg:ml-[15%] xl:ml-[20%] text-sm md:text-md lg:text-lg text-red-600">{message} </span>)}
            <div className="w-full  flex flex-col space-y-4 md:space-y-0 md:flex-row justify-between">
              <div className="flex flex-col space-y-1 md:space-y-2 w-full md:w-[14.5rem] lg:w-[14rem] xl:w-[15rem]">
                <label
                  htmlFor="first_name"
                  className="text-md font-semibold text-slate-700"
                >
                  Destinataire
                </label>
                <input
                  type="text"
                  onChange={handleDestinataireChange}
                  value={destinataire}
                  className="h-9 border border-slate-700  text-slate-700 text-lg rounded-lg block w-full p-2.5 dark:placeholder-slate-700 focus:outline-none placeholder:text-sm"
                  required
                />
              </div>
              <div className="flex flex-col space-y-1 md:space-y-2 w-full md:w-[14.5rem] lg:w-[14rem] xl:w-[15rem]">
                <label
                  htmlFor="first_name"
                  className="text-md font-semibold text-slate-700"
                >
                 référence
                </label>
                <select
                  type="text"
                  onChange={handleExpectChange}
                  value={expect}
                  className="h-9 border border-slate-700  text-slate-700 text-lg rounded-lg block w-full p-2.5 dark:placeholder-slate-700 focus:outline-none placeholder:text-sm"
                  required
                >
                 <option value="">selectionner........</option>
                 <option value="ME">ME</option>
                 <option value="RE">RE</option>
                 <option value="autre">Autre</option>
               </select>
              </div>
            </div>
            <div className="flex flex-col space-y-1 w-full">
              <label
                htmlFor="first_name"
                className="text-md font-semibold text-slate-700"
              >
                Objet
              </label>
              <textarea
                id="message"
                onChange={handleObjetChange}
                value={objet}
                className="block p-2.5 w-full h-[10rem] md:h-[20rem] xl:h-[20rem] text-lg  text-slate-700 rounded-lg border border-slate-700 focus:outline-none placeholder: text-slate-700 placeholder:text-sm"
                placeholder="ecris les commentaires ici..."
              ></textarea>
            </div>
            <div className="flex justify-center">
              <button
                onClick={EnvoyerEcriture}
                disabled={disablebutton}
                className="w-[8rem] h-8 rounded-md bg-green-700 hover:bg-green-800 text-white font-medium mb-3 md:mb-2"
              >
                {loading ? "ENVOIE..." : "ENVOYER" }
              </button>
            </div>
          </div>
        </div>
      </div>
  )
}

export default AjouterEcriture
