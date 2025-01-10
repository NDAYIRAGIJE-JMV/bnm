'use client'
import React, { useEffect, useState } from 'react'
import { routeLinks, apiLinks } from '@/app/_libs/links';

const AjouterPersonnel = ({ closeModal }) => {
  const [viewNotificationMessage, setViewNotificationMessage] = useState(false);
  const [viewNotificationError, setViewNotificationError] = useState(false)
  const [nom, setNom] = useState('')
  const [prenom, setPrenom] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [role, setRole] = useState('')
  const [password, setPassword] = useState('')
  const [ConfirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [roles, setRoles] = useState([])
  const [showPassword, setShowPassword] = useState(false)
  const [showCPassword, setShowCPassword] = useState(false)

  const handleShowPassword = async (e) => {
    e.preventDefault();
    setShowPassword(!showPassword)
  }

  const handleShowCPassword = async (e) => {
    e.preventDefault();
    setShowCPassword(!showCPassword)
  }

  function validateEmail(email) {
    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(String(email).toLowerCase());  
  }

  const validatePhone = (phone) =>{
    const regex = /^(?:(?:\+|00)33[\s.-]?)?(?:[1|3|6|7][\s.-]?)?([0-9]{2}[\s.-]?){4}$/;
    return regex.test(phone)
  }
  const errorNotification = () => {
    setLoading(false)
    setViewNotificationError(true)
    setInterval(() => {
      setViewNotificationError(false);
    }, 10000)
  }

  const Signupbutton = async (e) => {
        setError("")
        setLoading(true)
        e.preventDefault();
        try {
            if (nom && prenom && phone && email && password && role) {
              if (validatePhone(phone) && phone.length >= 8){
                if (validateEmail(email) && validatePhone(phone)){
                  if (ConfirmPassword !== password) {
                    setError("Les deux mot de passe sont incohérents")
                    errorNotification()
                }
                else {
                    var role_user
                    if (role == 2) role_user = 2
                    else if (role == 3) role_user = 3
                    else role_user = 1
                    const addData = {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            nom,
                            prenom,
                            phone,
                            email,
                            password,
                            role_user,
                        })
                    };
                    const response = await fetch(apiLinks.register, addData)
                    const data = await response.json();
                    if (data) {
                        if (data.message == 'Success') {
                            setLoading(false)
                            setViewNotificationMessage(true);
                            const timer = setTimeout(() => {
                              setViewNotificationMessage(false);
                              window.location.reload()
                            }, 4000);
                           
                             return () => clearTimeout(timer);
                        }
                        else if (data.data == 'errorMail') {
                            setError(data.message)
                            errorNotification()
                        }
                        else {
                            setError(data.message)
                            errorNotification()
                        }
                    }
                    else {
                        setError('Enregistrement échoué réessayer')
                        errorNotification()
                    }
                }
              }
              else{
                    setError('Email invalide')
                    errorNotification()
                  }
            }
            else{
              setError('numéro de téléphone ne pas valide')
              errorNotification()
            }
            }
            else {
                setError('complétez tous les champs')
                errorNotification()
            }
        } catch (error) {
            setError('une erreur survenu lors de la création réessayer')
            errorNotification()
        } 
    }

    useEffect(() => {
        const get_role = async () => {
            const response = await fetch(apiLinks.associePersonnel)
            const res = await response.json()
            if (res.message == "Success") {
                setRoles(res.roles)
            }
            else {
                setRoles([])
            }
        }
        get_role()
    }, [])

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
        {viewNotificationError && 
            <div className='max-w absolute animate-fade-down animate-once animate-duration-[3000ms]  rounded-tl-lg  rounded-tr-lg bg-red-500 shadow-md shadow-slate-700 right-[25%] md:right-[30%]  mt-2'>
            <div className='mx-2 flex flex-col'>
                <span className='text-sm text-white mx-auto mb-1 mt-1'>{error}</span>
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
              Enregistrement d&apos;un utilisateur
            </h1>
            <form className="relative space-y-3 md:space-y-5 xl:space-y-4 " action="#">
            {/* <span className="absolute ml-[20%] md:ml-[20%] lg:ml-[26%] xl:ml-0 -mt-3 lg:-mt-3 xl:-mt-4 text-sm md:text-md lg:text-lg text-red-600">{error}</span> */}
              <div>
                <input
                  type="text"
                  onChange={(e) => setNom(e.target.value)}
                  value={nom}
                  className="border border-slate-700 text-slate-700 text-lg rounded-lg block w-full  h-7 md:h-8 lg:h-10 xl:h-9  p-1.5 md:p-2.5 xl:p-3 dark:placeholder-slate-700 focus:outline-none placeholder:text-sm"
                  placeholder="votre nom"
                  required
                />
              </div>
              <div>
                <input
                  type="text"
                  onChange={(e) => setPrenom(e.target.value)}
                  value={prenom}
                  className="border border-slate-700 text-slate-700 text-lg rounded-lg block w-full  h-7 md:h-8 lg:h-10 xl:h-9  p-1.5 md:p-2.5 xl:p-3 dark:placeholder-slate-700 focus:outline-none placeholder:text-sm"
                  placeholder="votre Prénom"
                  required
                />
              </div>
              <div>
                <input
                  type="tel"
                  onChange={(e) => setPhone(e.target.value)}
                  value={phone}        
                  className="border border-slate-700 text-slate-700 text-lg rounded-lg block w-full  h-7 md:h-8 lg:h-10 xl:h-9  p-1.5 md:p-2.5 xl:p-3 dark:placeholder-slate-700 focus:outline-none placeholder:text-sm"
                  placeholder="Numéro de téléphone"
                  required
                />
              </div>
              <div>
                <input
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}     
                  className="border border-slate-700 text-slate-700 text-lg rounded-lg block w-full  h-7 md:h-8 lg:h-10 xl:h-9  p-1.5 md:p-2.5 xl:p-3 dark:placeholder-slate-700 focus:outline-none placeholder:text-sm"
                  placeholder="votre email"
                  required
                />
              </div>
              <div>
                <label
                  for="role"
                  className="text-md font-semibold text-slate-700 block my-3 text-md"
                >
                  Rôle d&apos;utilisateur
                </label>
                <select
                 onChange={(e) => setRole(e.target.value)}
                 value={role}   
                  className="border border-slate-700 w-full  p-1 lg:p-2 xl:p-1.5 rounded-lg focus:outline-none"
                >
                 <option className=''>Cliquer pour la sélection</option>
                  {roles.map((role) => (
                    <option key={role.id} value={role.id}>
                      {role.name}
                    </option>
                  ))}
                </select>
              </div>
              <span className="text-red-600"></span>
              <div className='w-full flex border border-slate-700 rounded-lg'>
                <div className='w-[90%] md:w-[85%]'>
                  <input
                    type={showPassword? "text" : "password"}
                    name="password"
                    id="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password} 
                    placeholder="Entrer le mot de passe"
                    className="text-slate-700 text-lg block w-full rounded-lg h-7 md:h-8 lg:h-10 xl:h-9  p-1.5 md:p-2.5 xl:p-3 dark:placeholder-slate-700 focus:outline-none placeholder:text-sm"
                    required
                  />
                </div>
                {!showPassword ?
                  <div className='w-[15%] flex items-center'>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" onClick={handleShowPassword} className="sm:w-8 w-6 lg:w-6 sm:h-8 h-6 lg:h-6 absolute right-2 md:right-1 cursor-pointer hover:text-slate-800 text-slate-700" id="show_password" name="eye_show ">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  :
                  <div className='w-[15%] flex items-center'>  
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" onClick={handleShowPassword} className="sm:w-8 w-6 lg:w-6 sm:h-8 h-6 lg:h-6 absolute right-2 md:right-1 cursor-pointer hover:text-slate-800 text-slate-700">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                    </svg>
                  </div>
                }
              </div>
              <div className='w-full flex border border-slate-700 rounded-lg'>
                <div className='w-[90%] md:w-[85%]'>
                <input
                    type={showCPassword? "text" : "password"}
                    name="password"
                    id="password"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    value={ConfirmPassword}
                    placeholder="Confirme le mot de passe"
                    className="text-slate-700 text-lg block w-full rounded-lg h-7 md:h-8 lg:h-10 xl:h-9  p-1.5 md:p-2.5 xl:p-3 dark:placeholder-slate-700 focus:outline-none placeholder:text-sm"
                    required
                  />
                </div>
                {!showCPassword ?
                  <div className='w-[15%] flex items-center'>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" onClick={handleShowCPassword} className="sm:w-8 w-6 lg:w-6 sm:h-8 h-6 lg:h-6 absolute right-2 md:right-1 cursor-pointer hover:text-slate-800 text-slate-700" id="show_password" name="eye_show ">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  :
                  <div className='w-[15%] flex items-center'>  
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" onClick={handleShowCPassword} className="sm:w-8 w-6 lg:w-6 sm:h-8 h-6 lg:h-6 absolute right-2 md:right-1 cursor-pointer hover:text-slate-800 text-slate-700">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                    </svg>
                  </div>
                }
               </div>
                <button
                  type="submit"
                  onClick={Signupbutton}
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

export default AjouterPersonnel
