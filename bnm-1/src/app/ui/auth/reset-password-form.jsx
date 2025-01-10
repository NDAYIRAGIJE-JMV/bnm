'use client'
import { apiLinks, routeLinks } from '@/app/_libs/links'
import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'


function ResetPassword() {
    const [password, setPassword] = useState('')
    const [cpassword, setCPassword] = useState('')
    const [errpass, setErrPass] = useState("")
    const [res, setRes] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const searchParams = useSearchParams()
    const mail = searchParams.get('mail')

    const changPassWord = async () => {
        if (cpassword !== password) {
            setErrPass("Les deux mot de passe sont incohérents")
        } else {
            setLoading(true)
            const updateData = {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    password,
                    mail
                })
            }
            console.log("usdata", updateData);
            const res = await fetch(apiLinks.resetPassword, updateData)
            const data = await res.json()
            if (data.res == 'updated') {
                setLoading(false)
                setRes(data.message)
            }
            else {
                setError(data.message)
            }
        }

    }
    return (
        <>
            <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
                <div className="relative py-3 sm:max-w-xl sm:mx-auto">
                    <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">

                        <div className="max-w-md mx-auto">
                            <div className="divide-y divide-gray-200">
                                <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                                    <div className="bg-white  rounded px-8 pt-6 pb-8 mb-4" autoComplete="off">
                                        <h2 className="text-2xl text-center font-bold mb-6">Changer le mot de passe</h2>

                                        <div className="mb-4">
                                            <label className="block text-gray-700 font-bold mb-2" htmlFor="password">
                                                Nouveau mot de passe
                                            </label>
                                            <input name="password" className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email"
                                                type="password" placeholder="entrer le nouveau mot de passe" value={password} onChange={e => { setPassword(e.target.value) }} />
                                            <span className="text-red-600"> {errpass} </span>

                                        </div>
                                        <div className="mb-4">
                                            <label className="block text-gray-700 font-bold mb-2" htmlFor="password">
                                                Confirmer le mot de passe
                                            </label>
                                            <input name="cpassword" className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email"
                                                type="password" placeholder="Confirmer votre mot de passe" value={cpassword} onChange={e => { setCPassword(e.target.value) }} />
                                        </div>
                                        <div className="mb-6">
                                            <button name="changemod" onClick={changPassWord} disabled={loading} className="w-full text-white bg-slate-700 hover:bg-slate-800 font-medium rounded-lg text-sm md:text-lg md:font-bold px-5 py-2.5 text-center" type="submit">
                                                {loading ? "Changement..." : "Changer maintenant"}
                                            </button>
                                        </div>
                                        <Link className="inline-block" href={routeLinks.login}>
                                            <button
                                                className="flex select-none items-center gap-2 rounded-lg py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-blue-gray-900 transition-all hover:bg-pink-500/10 active:bg-pink-500/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                                type="button"
                                            >
                                                Retourner sur Login
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth="2"
                                                    stroke="currentColor"
                                                    aria-hidden="true"
                                                    className="h-4 w-4"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                                                    ></path>
                                                </svg>
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ResetPassword