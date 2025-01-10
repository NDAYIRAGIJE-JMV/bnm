"use client"
import React, { useEffect, useState } from 'react'
import { routeLinks } from '@/app/_libs/links';
import { PropagateLoader } from 'react-spinners';
const EditUtilisateurAssocies = ({ closeModal,users,roles  }) => {
const [viewNotificationMessage, setViewNotificationMessage] = useState(false);
const [notificationerror, setNotificationError]=useState("")
const [notificationsuccess, setNotificationSuccess]=useState("")
const [disablebutton,showDisavleButton]=useState(false)
const [loading, setLoading]=useState(false)
const [message, setMessage]=useState('')
const { useRouter } = require('next/navigation');
const router = useRouter()
const [name,setName]=useState('')
const [lastName,setLastName]=useState('')
const [username,setUserName]=useState('')
const [email,setEmail]=useState('')
const [Phone,setPhone]=useState('')
const [role,setRole]=useState('')
const [Idrole,setIdRole]=useState('')
const [userId, setUserId] = useState(null);

const handleInputNameChange=(e)=>{
    setName(e.target.value)
 }
 const handleInputLastNameChange=(e)=>{
  setLastName(e.target.value)
}
 const handleInputUserNameChange=(e)=>{
    setUserName(e.target.value)
 }
 const handleInputEmailChange=(e)=>{
    setEmail(e.target.value)
 }
  
 const handleInputRoleChange=(e)=>{
  setRole(e.target.value)
}
const handleInputPhoneChange=(e)=>{
  setPhone(e.target.value)
}
  useEffect(() => {
    fetchData()
    
  }, [users]);
  const fetchData=()=>{
    setName(users.name)
    setLastName(users.lastname)
    setEmail(users.email)
    setUserName(users.username)
    setPhone(users.phone)
    setIdRole(users.role)
   setUserId(users.id)
   setRole(users.role)
  }

  const  UpdateUsers=async(e)=>{
    setLoading(true)
    if(name && lastName && username && email && Phone && role && userId){
    e.preventDefault();
     const data={
        name:name,
        lastname:lastName,
        username:username,
        email:email,
        phone:Phone,
        role:role,
        id:userId
     }
  
     try{
       const requestOptions = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          };
    
         const res = await fetch('/api/personnel/modifier',requestOptions);
         const response=await res.json()
          if(response.message==="success"){
            setViewNotificationMessage(true);
            setNotificationSuccess("modifié avec succès<")
            showDisavleButton(true)
            setLoading(false)
            setMessage("")
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
  setMessage("complétez tous les champs")
}
    
}


  return (
    <div className="w-full h-full flex justify-center items-center absolute bg-slate-700 bg-opacity-25 z-25">
      <div className="relative w-[85%] md:w-[60%] xl:w-[30%] h-[95%] md:h-[85%] lg:h-[95%] flex flex-col space-y-0 md:space-y-1 bg-white rounded-md">

              {viewNotificationMessage && notificationsuccess &&
                      <div className='max-w absolute animate-fade-down animate-once animate-duration-[3000ms]  rounded-tl-lg  rounded-tr-lg bg-green-500 shadow-md shadow-slate-700 right-[25%] md:right-[30%]  mt-2'>
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
        <div className="w-[95%] flex justify-end items-center mx-auto">
          <div className='w-[90%] md:w-[70%]  flex flex-row justify-between items-center'>
            <span className='text-lg font-bold leading-tight tracking-tight text-slate-700'>
              Modifiez l'utilisateur
            </span>
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
        </div>
        <div className="relative w-[85%] md:w-[70%] lg:w-[88%] xl:w-[78%] flex flex-col space-y-3 md:space-y-3 xl:space-y-2 mx-auto">
        {message &&<span className="absolute ml-[20%] md:ml-[20%] lg:ml-[26%] xl:ml-0 -mt-1 lg:-mt-2 xl:-mt-4 text-sm md:text-md lg:text-lg text-red-600">{message} </span> }
          <div className="w-full h-full flex flex-col space-y-1 md:space-y-2 lg:space-y-3 xl:space-y-2">
            <div className="flex flex-col space-y-1 md:space-y-2 w-full">
              <label
                htmlFor="first_name"
                className="text-md font-semibold text-slate-700"
              >
                Nom
              </label>
              <input
                type="text"
                value={name}
                onChange={handleInputNameChange}
                className="border border-slate-700 text-slate-700 text-lg rounded-lg block w-full  h-7 md:h-8 lg:h-10 xl:h-9  p-1.5 md:p-2.5 xl:p-3 dark:placeholder-slate-700 focus:outline-none placeholder:text-sm"
                required
              />
            </div>
            <div className="flex flex-col space-y-1 md:space-y-2 w-full">
              <label
                htmlFor="first_name"
                className="text-md font-semibold text-slate-700"
              >
                Prenom
              </label>
              <input
                type="text"
                value={lastName}
                onChange={handleInputLastNameChange}  
                className="border border-slate-700 text-slate-700 text-lg rounded-lg block w-full  h-7 md:h-8 lg:h-10 xl:h-9  p-1.5 md:p-2.5 xl:p-3 dark:placeholder-slate-700 focus:outline-none placeholder:text-sm"
                required
              />
            </div>
          </div>
          <div className="w-full h-full flex flex-col space-y-1 md:space-y-2 lg:space-y-3 xl:space-y-2">
            <div className="flex flex-col space-y-1 md:space-y-2 w-full">
              <label
                htmlFor="first_name"
                className="text-md font-semibold text-slate-700"
              >
                Téléphone
              </label>
              <input
                type="text"
                value={Phone}
                onChange={handleInputPhoneChange} 
                className="border border-slate-700 text-slate-700 text-lg rounded-lg block w-full  h-7 md:h-8 lg:h-10 xl:h-9  p-1.5 md:p-2.5 xl:p-3 dark:placeholder-slate-700 focus:outline-none placeholder:text-sm"
                required
              />
            </div>
            <div className="flex flex-col space-y-1 md:space-y-2 w-full">
              <label
                htmlFor="first_name"
                className="text-md font-semibold text-slate-700"
              >
                Email
              </label>
              <input
                type="text"
                value={email}
                onChange={handleInputEmailChange}                
                className="border border-slate-700 text-slate-700 text-lg rounded-lg block w-full  h-7 md:h-8 lg:h-10 xl:h-9  p-1.5 md:p-2.5 xl:p-3 dark:placeholder-slate-700 focus:outline-none placeholder:text-sm"
                required
              />
            </div>
          </div>
          <div className="w-full h-full flex flex-col space-y-1 md:space-y-2 lg:space-y-3 xl:space-y-2">
            <div className="flex flex-col space-y-1 md:space-y-2 w-full">
              <label
                htmlFor="first_name"
                className="text-md font-semibold text-slate-700"
              >
                UserName
              </label>
              <input
                type="text"
                value={username}
                onChange={handleInputUserNameChange}
                className="border border-slate-700 text-slate-700 text-lg rounded-lg block w-full  h-7 md:h-8 lg:h-10 xl:h-9  p-1.5 md:p-2.5 xl:p-3 dark:placeholder-slate-700 focus:outline-none placeholder:text-sm"
                required
              />
            </div>
            <div className="flex flex-col space-y-1 md:space-y-2 w-full">
              <label
                htmlFor="first_name"
                className="text-md font-semibold text-slate-700"
              >
                Rôle
              </label>
              <form className="border border-slate-700 text-slate-700 text-lg rounded-lg block w-full h-7 md:h-8 lg:h-10 xl:h-9 p-1 dark:placeholder-slate-700 focus:outline-none">
                <select
                  id="categories"
                  onChange={handleInputRoleChange}
                  value={role}
                  className="rounded-md block w-full h-full bg-white text-slate-800"
                >
                {roles &&
                    roles.map((role) => {
                      if (role.id === Idrole) {
                        return <option value={Idrole}>{role.name}</option>;
                      }
                      return null; // Ne retourne rien pour l'instant
                    })}

                  {roles &&
                    roles.map((role) => {
                      if (role.id !== Idrole) {
                        return (
                          <option key={role.id} value={role.id}>
                            {role.name}
                          </option>
                        );
                      }
                      return null; // Ne retourne rien pour l'instant
                    })}
                </select>
              </form>
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <button
            onClick={UpdateUsers}   disabled={disablebutton}
            className="w-[8rem] h-8 rounded-md bg-green-700 hover:bg-green-800 text-white font-bold mt-2 mb-1 md:mb-2"
          >
                  {loading ? (
                  <PropagateLoader color="#ffffff" className="mb-3" />
                ) : (
                  "MODIFIER"
                )}
            </button>
        </div>
      </div>
    </div>
  );
};

export default EditUtilisateurAssocies
