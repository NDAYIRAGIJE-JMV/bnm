'use client'
import { apiLinks, routeLinks } from '@/app/_libs/links';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';

const ForgotPassword = () => {
    const router = useRouter()
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [viewNotificationMessage, setViewNotificationMessage] = useState(false);

    // useEffect(() => {
    //     setViewNotificationMessage(true);
    
    //     const timer = setTimeout(() => {
    //       setViewNotificationMessage(false);
    //     }, 6000);
    
    //     return () => clearTimeout(timer);
    //   }, []);

    const Forgetbutton = async (e) => {
        e.preventDefault();
        setLoading(false)
        try {
            setError(false)
            setLoading(true)
            if (email) {
                const dataSend = {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email,
                    })
                };
                const response = await fetch(apiLinks.forgotPassword, dataSend)

                console.log('forgetpass', response)
                if (response) {
                    const data = await response.json();
                    if (data.message === "Success") {
                        setViewNotificationMessage(true);
                        setLoading(false)
                        const timer = setTimeout(() => {
                            setViewNotificationMessage(false);
                            router.push(routeLinks.waitingPassword)
                          }, 4000);
                         
                        return () => clearTimeout(timer);
                        
                    }
                    else {
                        setLoading(false)
                        setError(data.message)
                    }
                }
                else {
                    setLoading(false)
                    setError('Identification échoué réessayer:',)
                }
            }
            else {
                setLoading(false)
                setError('l\'email est obligatoire')
            }
        } catch (error) {
            setLoading(false)
            setError('Erreur réseau veuillez réessayer')
        }

    }

    return (
        <div>
            <div className="h-screen bg-indigo-100 flex justify-center items-center">
                <div className="lg:w-2/5 md:w-1/2 w-2/3">
                    <form className="relative bg-white p-10 rounded-lg shadow-lg min-w-full" >
                        {viewNotificationMessage && 
                        <div className='max-w absolute animate-fade-down animate-once animate-duration-[3000ms]  rounded-tl-lg  rounded-tr-lg bg-green-500 shadow-md shadow-slate-700 right-[5%]  md:right-[20%] xl:right-[25%] -mt-7'>
                            <div className='mx-2 flex flex-col'>
                                <span className='text-sm text-white mx-auto mb-1 mt-1'>message envoyé avec succès</span>
                            </div>
                        </div>
                        }                       
                        <h1 className="text-center text-lg md:text-xl lg:text-2xl font-bold mb-6 text-slate-700">Changer le mot de Passe</h1>
                        <div className='relative'>
                            <label className="text-slate-700 font-semibold  block my-1 text-md " for="email">Entrer votre Adresse email</label>
                            <span className="absolute -mt-1 lg:-mt-2 xl:-mt-3 ml-3 text-sm md:text-md lg:text-lg text-red-600">{error}</span>
                            <input className="w-full bg-gray-100 px-4 py-4bg-white border border-slate-700 text-slate-800 rounded-lg block w-full p-2.5 focus:outline-none placeholder:text-slate-800 rounded-lg my-6 focus:outline-none"
                                type="text" name="email" onChange={(e) => setEmail(e.target.value)} value={email} id="email" placeholder="exemple@gmail.com" />
                        </div>
                        {
                            loading ?
                                <button type="submit" onClick={Forgetbutton} className="w-full text-white bg-green-700 hover:bg-green-800 font-medium rounded-lg text-sm md:text-lg md:font-bold px-5 py-2.5 text-center">Envoie...</button>
                                :
                                <button type="submit" onClick={Forgetbutton} className="w-full text-white bg-green-700 hover:bg-green-800 font-medium rounded-lg text-sm md:text-lg md:font-bold px-5 py-2.5 text-center">Envoyer</button>
                        }
                        <div className="pt-6 text-base leading-6  sm:text-sm sm:leading-7">
                            <p>Retourner sur   <Link href={routeLinks.login} className="text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline transition ease-in-out duration-150">Log in !</Link></p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword