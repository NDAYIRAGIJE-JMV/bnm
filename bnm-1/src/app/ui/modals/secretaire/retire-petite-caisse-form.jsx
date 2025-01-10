"use client";
import React, { useEffect, useState } from "react";
import { apiLinks, routeLinks } from "@/app/_libs/links";
import { PropagateLoader } from "react-spinners";

const RetirerCaisse = ({ closeModal }) => {
  const [viewNotificationMessage, setViewNotificationMessage] = useState(false);
  const { useRouter } = require("next/navigation");
  const [motif, setMotif] = useState("");
  const [montant, setMontant] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [disablebutton, showDisavleButton] = useState(false);
  const [action, setAction] = useState("");
  const [notificationerror, setNotificationError] = useState("");
  const [notificationsuccess, setNotificationSuccess] = useState("");
  const handleMotifChange = (e) => {
    setMotif(e.target.value);
  };
  const handleMontantChange = (e) => {
    setMontant(e.target.value);
  };
  const ajoutedanslecaisse = async () => {
    setLoading(true);

    if (motif && montant && action) {
      const formdata = {
        motif: motif,
        montant: parseInt(montant),
        action: parseInt(action),
      };

      try {
        const requestOptions = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formdata),
        };

        const res = await fetch(apiLinks.petiteCaisse, requestOptions);
        const datas = await res.json();
        if (!datas.error) {
          setViewNotificationMessage(true);
          setNotificationSuccess("envoyé avec succès");
          showDisavleButton(true);
          setError(false);
          setAction("");
          setMontant("");
          setMotif("");
          setLoading(false);
          setMessage("");
          const timer = setTimeout(() => {
            setViewNotificationMessage(false);
            window.location.reload();
          }, 3000);

          return () => clearTimeout(timer);
        }
        if (datas.error) {
          setError(true);
          setNotificationError(datas.message);
        }
      } catch (error) {
        setNotificationError("error");
      }
    } else {
      setMessage("Tous les champs doivent être completés");
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-full flex justify-center items-center absolute bg-slate-700 bg-opacity-25 z-25">
      <div className="relative w-[95%] md:w-[90%] lg:w-[90%] xl:w-[65%] h-[95%] md:h-[95%] xl:h-[90%]  flex flex-col space-y-2 md:space-y-4 bg-white rounded-md mx-auto">
        {viewNotificationMessage && notificationsuccess && (
          <div className="max-w absolute animate-fade-down animate-once animate-duration-[3000ms]  rounded-tl-lg  rounded-tr-lg bg-green-500 shadow-md shadow-slate-700 right-[25%] md:right-[40%] xl:right-[35%] mt-2">
            <div className="mx-2 flex flex-col">
              <span className="text-sm text-white mx-auto mb-1 mt-1">
                {notificationsuccess}{" "}
              </span>
            </div>
          </div>
        )}
        {viewNotificationMessage && notificationerror && (
          <div className="max-w absolute animate-fade-down animate-once animate-duration-[3000ms]  rounded-tl-lg  rounded-tr-lg bg-red-600 shadow-md shadow-slate-700 right-[25%] md:right-[40%] xl:right-[35%] mt-2">
            <div className="mx-2 flex flex-col">
              <span className="text-sm text-white mx-auto mb-1 mt-1">
                {notificationerror}{" "}
              </span>
            </div>
          </div>
        )}
        <div className="w-[98%] flex justify-end items-end mx-auto mt-1 mt:mt-2">
          <div className="w-[90%] md:w-[60%] flex justify-between">
            <span className="text-lg md:text-xl lg:text-2xl font-bold underline">
              enregistrez la caisse
            </span>
            <button onClick={closeModal} className=" w-6 h-6 hover:bg-red-600 ">
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
        <div className="relatif w-full h-[90%] flex flex-col overflow-scroll md:overflow-hidden">
          {message && (
            <span className="absolute mt-0 lg:-mt-1 xl:-mt-1 ml-0 md:ml-[25%] lg:ml-[15%] xl:ml-[20%] text-sm md:text-md lg:text-lg text-red-600">
              {message}{" "}
            </span>
          )}
          <div className="w-[78%] flex flex-col md:flex-row space-y-2 md:space-y-0 md:justify-between mx-auto mt-2">
            <div className="flex flex-col space-y-1 md:space-y-2 w-full md:w-[14.5rem] lg:w-[14rem] xl:w-[13rem]">
              <label
                htmlFor="first_name"
                className="text-md font-semibold text-slate-700"
              >
                Selectionner l'action
              </label>
              <select
                value={action}
                onChange={(e) => setAction(e.target.value)}
                id="action"
                className="border border-slate-700 text-slate-700 text-lg rounded-lg block w-full p-0.5  lg:p-1.5  dark:placeholder-slate-700 focus:outline-none placeholder:text-sm"
              >
                <option value="" selected>
                  Select action---
                </option>
                <option value={1}>Decaisser</option>
                <option value={0}>Encaisser</option>
              </select>
            </div>
            <div className="flex flex-col space-y-1 md:space-y-2 w-full md:w-[14.5rem] lg:w-[14rem] xl:w-[13rem]">
              <label
                htmlFor="first_name"
                className="text-md font-semibold text-slate-700"
              >
                Montant
              </label>
              <input
                type="text"
                onChange={handleMontantChange}
                value={montant}
                className="border border-slate-700 text-slate-700 text-lg rounded-lg block w-full  h-7 md:h-8 lg:h-10 xl:h-9  p-1.5 md:p-2.5 xl:p-3 dark:placeholder-slate-700 focus:outline-none placeholder:text-sm"
                required
              />
            </div>
          </div>
          <div className="flex flex-col space-y-2 w-[78%] mx-auto">
            <label
              htmlFor="first_name"
              className="text-md font-semibold text-slate-700"
            >
              Motif
            </label>
            <textarea
              id="message"
              className="block p-2.5 w-full h-[12rem] md:h-[20rem] lg:h-[19rem] xl:h-[17rem] text-lg text-slate-700 rounded-lg border border-slate-700 focus:outline-none placeholder:text-slate-700 placeholder:text-sm"
              placeholder="ecris les commentaires ici..."
              onChange={handleMotifChange}
              value={motif}
            ></textarea>
          </div>
          <div className="flex justify-center">
            <div className="flex flex-col">
              <button
                className="w-[8rem] h-10 rounded-md bg-green-700 hover:bg-green-800 text-white mt-2 font-bolSd"
                onClick={ajoutedanslecaisse}
                disabled={disablebutton}
              >
                {loading ? (
                  <PropagateLoader color="#ffffff" className="mb-3" />
                ) : (
                  "AJOUTER"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RetirerCaisse;
