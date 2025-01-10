'use client'
import React, { useState, useEffect, useContext } from 'react'
import Link from 'next/link';
import Image from 'next/image';
import { apiLinks, routeLinks } from '@/app/_libs/links';
import { PropagateLoader } from 'react-spinners';

const Login = () => {
  const { useRouter } = require('next/navigation');
  const router = useRouter();
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")  
  const [showPassword, setShowPassword] = useState(false)

  const handleShowPassword = async (e) => {
    e.preventDefault();
    setShowPassword(!showPassword)
  }

  const Loginbutton = async (e) => {
    e.preventDefault();
    try {
      setLoading(true)
      if (email && password) {
        const data = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          })
        };
        const response = await fetch(apiLinks.login, data)
        if (response) {
          const data = await response.json();
          if (data.success) {
            // localStorage.setItem('token', data.token)
            if (data.user.role === 3) {
              console.log(data.success, data.user.role)
              router.push(routeLinks.associe)
            }
            else if (data.user.role === 1) {
            router.push(routeLinks.secretaire)
            }
            else {
              router.push(routeLinks.collaborateur)
            }
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
        setError('Tous les champs doivent être completés')
      }
    } catch (error) {
      setLoading(false)
      console.log('an error occured', error)
    }

  }

  useEffect(() => {
    localStorage.removeItem('token');
  }, [])

  return (
    <section className="bg-slate-700 bg-opacity-25 ">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <div className="w-[6.5rem] h-[6.5rem] flex items-center justify-center mx-auto rounded-sm">
              <Image
                src="/Logo/Logo.png"
                width={500}
                height={500}
                alt="logo login"
                title="notre logo"
                className="w-[6rem] h-[6rem] rounded-sm"
              />
            </div>
            <h1 className="md:text-xl lg:text-3xl font-bold leading-tight tracking-tight text-slate-800 md:text-2xl text-center">
              Se connecter dans BNM
            </h1>
            <form className="space-y-4 md:space-y-[2rem]" action="#">
              <div  className='relative h-[4.5rem] flex items-end'>
              <span className="absolute top-0 lg:-top-2 xl:-top-1 ml-3 text-sm md:text-md lg:text-lg text-red-600">{error}</span>
                <input
                  type="text"
                  name="nom"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  id="nom"
                  className="bg-white border border-slate-700 text-slate-800 rounded-lg block w-full p-2.5 focus:outline-none placeholder:text-slate-800 bottom-0"
                  placeholder="votre email"
                  required=""
                />
              </div>
              <div className='relative h-[4.5rem] flex items-end'>
                <div className='w-full h-[80%] flex border border-slate-700 rounded-lg'>
                <input
                  type={showPassword ? "text": "password"}
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  name="password"
                  id="password"
                  placeholder="Entrer le mot de passe"
                  className="bg-white text-slate-800 rounded-lg block w-[85%] sm:w-[90%] h-full p-2.5 focus:outline-none placeholder:text-slate-800"
                  required=""
                />
                {!showPassword ?
                  <div className='w-[15%] sm:w-[10%] h-full flex items-center'>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" onClick={handleShowPassword} className="sm:w-8 w-6 lg:w-6 sm:h-8 h-6 lg:h-6 absolute right-3 md:right-1 cursor-pointer hover:text-slate-800 text-slate-700" id="show_password" name="eye_show ">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  :
                  <div className='w-[15%] sm:w-[10%] h-full flex items-center'>  
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" onClick={handleShowPassword} className="sm:w-8 w-6 lg:w-6 sm:h-8 h-6 lg:h-6 absolute right-3 md:right-1 cursor-pointer hover:text-slate-800 text-slate-700">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                    </svg>
                  </div>
                }
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-start"></div>
                <Link
                  href={routeLinks.forgotPassword}
                  className="text-sm font-medium text-slate-800 hover:underline "
                >
                  mot de pass oublié ?
                </Link>
              </div>
              <button
                onClick={Loginbutton}
                disabled={loading}
                type="submit"
                className="w-full text-white bg-green-700 hover:bg-green-800 font-medium rounded-lg text-sm md:text-lg md:font-bold px-5 py-2.5 text-center"
              >
                {loading ? (
                  <span>Loading...</span>
                ) : (
                  "LOGIN"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login
