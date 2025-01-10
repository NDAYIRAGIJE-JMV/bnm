'use client'
import React, { useState, useEffect } from 'react'
import { routeLinks, apiLinks } from '@/app/_libs/links';

const Register = () => {
    const { useRouter } = require('next/navigation');
    const router = useRouter()
    const [nom, setNom] = useState('')
    const [prenom, setPrenom] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [role, setRole] = useState('')
    const [password, setPassword] = useState('')
    const [ConfirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState("")
    const [epassword, setEpassword] = useState('')
    const [errorMail, setErrorEmail] = useState('')
    const [loading, setLoading] = useState(false)
    const [roles, setRoles] = useState([])


    const Signupbutton = async (e) => {
        e.preventDefault();
        try {
            setEpassword("")
            setError("")
            setLoading(true)
            if (nom && prenom && phone && email && password && role) {
                if (ConfirmPassword !== password) {
                    setLoading(false)
                    setEpassword("Les deux mot de passe sont incohérents")
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
                            router.push(routeLinks.login);
                        }
                        else if (data.data == 'errorMail') {
                            setLoading(false)
                            setErrorEmail(data.message)
                        }
                        else {
                            setLoading(false)
                            setError(data.message)
                        }
                    }
                    else {
                        setLoading(false)
                        setError('Enregistrement échoué réessayer')
                    }
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

    useEffect(() => {
        const get_role = async () => {
            const response = await fetch('/api/personnel/liste')
            const res = await response.json()
            if (res.message == "Success") {
                console.log('object', res.roles)
                setRoles(res.roles)
            }
            else {
                setRoles([])
            }
        }
        get_role()
    }, [])

    return (
        <section className="bg-slate-700 bg-opacity-25 ">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-slate-700 text-center">
                            Enregistrement d&apos;utilisateur dans BNM
                        </h1>
                        <form className="space-y-4 md:space-y-4 " action="#">
                            <span className="text-red-600"> {error} </span>
                            <div>
                                <input type="text" onChange={(e) => setNom(e.target.value)} value={nom} name="nom" id="nom" className="border border-slate-700 text-slate-700 text-lg rounded-lg block w-full  h-7 md:h-8 lg:h-10 xl:h-9  p-1.5 md:p-2.5 xl:p-3 dark:placeholder-slate-700 focus:outline-none placeholder:text-sm" placeholder="votre nom" required="" />
                            </div>
                            <div>
                                <input type="text" onChange={(e) => setPrenom(e.target.value)} value={prenom} name="prenom" id="prenom" className="border border-slate-700 text-slate-700 text-lg rounded-lg block w-full  h-7 md:h-8 lg:h-10 xl:h-9  p-1.5 md:p-2.5 xl:p-3 dark:placeholder-slate-700 focus:outline-none placeholder:text-sm" placeholder="votre Prénom" required="" />
                            </div>
                            <div>
                                <input type="tel" onChange={(e) => setPhone(e.target.value)} value={phone} name="phone" id="phone" className="border border-slate-700 text-slate-700 text-lg rounded-lg block w-full  h-7 md:h-8 lg:h-10 xl:h-9  p-1.5 md:p-2.5 xl:p-3 dark:placeholder-slate-700 focus:outline-none placeholder:text-sm" placeholder="Numéro de téléphone" required="" />
                            </div>
                            <div>
                                <input type="email" onChange={(e) => setEmail(e.target.value)} value={email} name="email" id="email" className="border border-slate-700 text-slate-700 text-lg rounded-lg block w-full  h-7 md:h-8 lg:h-10 xl:h-9  p-1.5 md:p-2.5 xl:p-3 dark:placeholder-slate-700 focus:outline-none placeholder:text-sm" placeholder="votre email" required="" />
                            </div>
                            <div>
                                <label for="role" className="text-gray-800 font-semibold block my-3 text-md">Rôle d&apos;utilisateur</label>
                                <select onChange={(e) => setRole(e.target.value)} value={role} className="border border-slate-700 w-full bg-gray-100 px-4 py-2 rounded-lg focus:outline-none">
                                   <option>__Cliquer pour la sélection__</option>
                                    {roles.map((role) => (
                                        <option key={role.id} value={role.id}>
                                            {role.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <span className="text-red-600"> {epassword} </span>
                            <div>
                                <input type="password" name="password" onChange={(e) => setPassword(e.target.value)} value={password} id="password" placeholder="Entrer le mot de passe" className="border border-slate-700 text-slate-700 text-lg rounded-lg block w-full  h-7 md:h-8 lg:h-10 xl:h-9  p-1.5 md:p-2.5 xl:p-3 dark:placeholder-slate-700 focus:outline-none placeholder:text-sm" required="" />
                            </div>
                            <div>
                                <input type="password" name="password" onChange={(e) => setConfirmPassword(e.target.value)} value={ConfirmPassword} id="password" placeholder="Confirme le mot de passe" className="border border-slate-700 text-slate-700 text-lg rounded-lg block w-full  h-7 md:h-8 lg:h-10 xl:h-9  p-1.5 md:p-2.5 xl:p-3 dark:placeholder-slate-700 focus:outline-none placeholder:text-sm" required="" />
                            </div>
                                    <button type="submit" onClick={Signupbutton} className="w-full text-white bg-slate-700 hover:bg-slate-800 font-medium rounded-lg text-sm md:text-lg md:font-bold px-5 py-2.5 text-center">
                                        { loading ? "Enregistrement..." : "Enregistrer" } 
                                    </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default Register
