'use client'
import React, { useEffect, useState } from 'react'
import { routeLinks, apiLinks } from '@/app/_libs/links';

const AjouterClient = ({ closeModal }) => {
  const [viewNotificationMessage, setViewNotificationMessage] = useState(false);
  const [nom, setNom] = useState('')
  const [montant, setMontant] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [disablebutton,showDisavleButton]=useState(false)

const Signupbutton = async (e) => {
        e.preventDefault();
        try {
            setError("")
            setLoading(true)
            if (nom && montant && phone && email ) {
                    const addData = {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            nom,
                            montant,
                            phone,
                            email
                        })
                    };
                    const response = await fetch("/api/ajouteclient", addData)
                    const data = await response.json();
                    if (data) {
                        if (data.message == 'Success') {
                            setLoading(false)
                            setViewNotificationMessage(true);
                            showDisavleButton(true)
                            const timer = setTimeout(() => {
                              setViewNotificationMessage(false);
                              window.location.reload()
                            }, 3000);
                           
                             return () => clearTimeout(timer);
                           
                        
                        }
                        else {
                            setLoading(false)
                            setError('Enregistrement échoué réessayer')
                        }
                    }
                    else {
                        setLoading(false)
                        setError('Enregistrement échoué réessayer')
                    }
                
            }
            else {
                setLoading(false)
                setError('Tous les champs doivent être completés')
            }
        } catch (error) {
            setLoading(false)
            console.log('an error occured', error)
            setError('an error occured')
        }

    }



    return (
      <section className="w-full h-full flex justify-center items-center absolute bg-slate-700 bg-opacity-25 z-25">
        <div className="relative w-[90%] md:w-[50%] lg:w-[55%] xl:w-[30%] h-[95%] md:h-[85%] lg:h-[92%] flex flex-col space-y-2 md:space-y-1 bg-white rounded-md">
        {viewNotificationMessage && 
            <div className='max-w absolute animate-fade-down animate-once animate-duration-[3000ms]  rounded-tl-lg  rounded-tr-lg bg-green-500 shadow-md shadow-slate-700 right-[25%] md:right-[30%]  mt-2'>
            <div className='mx-2 flex flex-col'>
                <span className='text-sm text-white mx-auto mb-1 mt-1'>enregistré avec succès</span>
            </div>
          </div>   
            } 
          <div className="w-[95%] flex justify-end items-center mx-auto">
            <button
              onClick={closeModal}
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
          <div className="w-[85%] h-[95%] flex flex-col space-y-2 md:space-y-4 mx-auto">
            <h1 className="text-lg font-bold leading-tight tracking-tight text-slate-700">
              Enregistrement d&apos;un Client
            </h1>
            <form className="relative space-y-3 md:space-y-5 xl:space-y-4 " action="#">
            {error && <span className="absolute ml-[20%] md:ml-[20%] lg:ml-[26%] xl:ml-0 -mt-3 lg:-mt-3 xl:-mt-4 text-sm md:text-md lg:text-lg text-red-600">complétez tous les champs</span>  }
              <div>
              <label
                  for="name"
                  className="text-md font-semibold text-slate-700 block my-3 text-md"
                >
                  Nom du client
                </label>
                <input
                  type="text"
                  onChange={(e) => setNom(e.target.value)}
                  value={nom}
                  className="border border-slate-700 text-slate-700 text-lg rounded-lg block w-full  h-7 md:h-8 lg:h-10 xl:h-9  p-1.5 md:p-2.5 xl:p-3 dark:placeholder-slate-700 focus:outline-none placeholder:text-sm"
                  placeholder=" nom du client"
                  required=""
                />
              </div>

              <div>
              <label
                  for="email"
                  className="text-md font-semibold text-slate-700 block my-3 text-md"
                >
                  Email du client
                </label>
                <input
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}     
                  className="border border-slate-700 text-slate-700 text-lg rounded-lg block w-full  h-7 md:h-8 lg:h-10 xl:h-9  p-1.5 md:p-2.5 xl:p-3 dark:placeholder-slate-700 focus:outline-none placeholder:text-sm"
                  placeholder="votre email"
                  required=""
                />
              </div>
              <div>
              <label
                  for="tel"
                  className="text-md font-semibold text-slate-700 block my-3 text-md"
                >
                  Numero De Téléphone du client
                </label>
                <input
                  type="tel"
                  onChange={(e) => setPhone(e.target.value)}
                  value={phone}        
                  className="border border-slate-700 text-slate-700 text-lg rounded-lg block w-full  h-7 md:h-8 lg:h-10 xl:h-9  p-1.5 md:p-2.5 xl:p-3 dark:placeholder-slate-700 focus:outline-none placeholder:text-sm"
                  placeholder="Numéro de téléphone"
                  required=""
                />
              </div>
              <div>
              <label
                  for="mont"
                  className="text-md font-semibold text-slate-700 block my-3 text-md"
                >
                  Montant
                </label>
                <input
                  type="text"
                  onChange={(e) => setMontant(e.target.value)}
                  value={montant}  
                  className="border border-slate-700 text-slate-700 text-lg rounded-lg block w-full  h-7 md:h-8 lg:h-10 xl:h-9  p-1.5 md:p-2.5 xl:p-3 dark:placeholder-slate-700 focus:outline-none placeholder:text-sm"
                  placeholder="Montant"
                  required=""
                />
              </div>

              <span className="text-red-600"></span>
                <button
                  type="submit"
                  onClick={Signupbutton}
                  disabled={disablebutton}
                  className="w-full text-white bg-green-700 hover:bg-green-800 font-medium rounded-lg text-sm md:text-lg md:font-bold h-8 text-center"
                >
                  { loading ? "Enregistrement..." : "Enregistrer" }
                </button>
            
            </form>
          </div>
        </div>
      </section>
    );
}

export default AjouterClient
