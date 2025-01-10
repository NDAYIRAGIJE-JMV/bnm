'use client'
import { React } from 'react'
import Link from 'next/link'
import { routeLinks } from '@/app/_libs/links'

function WaitingPassword() {

    return (
        <>
            <div className="flex min-h-screen items-center justify-center">
                <div className="relative flex w-full max-w-[48rem] flex-row items-center justify-center rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
                    {/* <div className="relative m-0 w-2/5 shrink-0 overflow-hidden rounded-xl rounded-r-none bg-white bg-clip-border text-gray-700">
                        <img
                            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1471&amp;q=80"
                            alt="image"
                            className="h-full w-full object-cover"
                        />
                    </div> */}
                    <div className="p-6 ">
                        <h2 className="mb-4 block font-sans text-base text-center font-semibold uppercase leading-relaxed tracking-normal text-blue-gray-900 antialiased">
                            BNM
                        </h2>
                        <h4 className="mb-2 block font-sans text-xl text-center font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
                            Confirmation du changement de mot de passe
                        </h4>
                        <p className="mb-8 block font-sans text-base font-normal leading-relaxed text-gray-700 antialiased">
                            Un lien pour le Changement de mot de passe a été envoyé dans ton Email, Vérifier dans votre boîte Email
                        </p>
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
        </>
    )
}

export default WaitingPassword