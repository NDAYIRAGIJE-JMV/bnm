"use client";
import React from "react";
import { useState } from "react";
import { useSession } from "next-auth/react";

export default function CreerUrgence({ toggleModal, tribunals, item }) {
  const [tribunal, setTribunal] = useState(0);
  const [error, setError] = useState("");
  const [autre, setAutre] = useState(false);
  const [alreadyExist, setAlreadyExist] = useState(false);

  const { data: session } = useSession();
  const [viewNotificationMessage, setViewNotificationMessage] = useState(false);

  const [formUrgenceData, setFormUrgenceData] = useState({
    numero: "",
    date_audience: "",
    montant: 0,
    tribunal: "",
    commentaire: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const todayDate = new Date().toISOString().split("T")[0];

  const handleUrgenceFormChange = (e) => {
    setFormUrgenceData({
      ...formUrgenceData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUrgenceFormSubmit = async (e) => {
    e.preventDefault();
    if (
      formUrgenceData.numero &&
      formUrgenceData.date_audience &&
      formUrgenceData.demandeur &&
      tribunal
    ) {
      // Désactivez le bouton de soumission
      setIsSubmitting(true);

      try {
        if (!alreadyExist) {
          const response = await fetch("/secretaire/api/urgence", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id_dossier: item.id,
              numero: formUrgenceData.numero,
              date_audience: formUrgenceData.date_audience,
              montant: formUrgenceData.montant,
              tribunal,
              autre,
              user: session.user,
              commentaire: formUrgenceData.commentaire,
            }),
          });

          if (!response.ok) {
            throw new Error("Erreur lors de la création durgence");
          }
          setViewNotificationMessage(true);
          const timer = setTimeout(() => {
            setViewNotificationMessage(false);
            window.location.reload();
          }, 3000); // toggleModal();

          return () => clearTimeout(timer);
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        // Réactivez le bouton de soumission après la fin de la soumission
        setIsSubmitting(false);
      }
    } else {
      setError("Tous les champs doivent être completés ");
    }
  };

  const handleCheckTribunal = () => {
    if (tribunal) {
      const alreadyExistTrib =
        tribunals.find(
          (prevTrib) =>
            prevTrib.nom.toLowerCase().trim() == tribunal.toLowerCase().trim()
        ) !== undefined;
      setAlreadyExist(alreadyExistTrib);
      if (alreadyExistTrib) {
        setError("Ce tribunal éxiste déjà dans le système");
      }
    }
  };

  return (
    <div className="absolute flex items-center justify-center w-full h-full bg-opacity-25 bg-slate-700 z-25">
      <div className="w-[95%] md:w-[90%] lg:w-[85%] xl:w-[65%] h-[95%] md:h-[80%] lg:h-[92%] xl:h-[95%] overflow-y-scroll md:overflow-hidden relative flex flex-col space-y-4 bg-white rounded-md mx-auto">
      <div className="bg-gray-100 p-2 shadow">
            <button
              onClick={() => toggleModal(0)}
              className="absolute w-6 h-6 mt-2 hover:bg-red-600 right-3"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="text-lg text-black size-6 hover:text-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </button>
            <span className="flex justify-center mt-5 text-lg font-bold md:text-xl lg:text-2xl text-slate-700">
              Creer une urgence
            </span>
          </div>
        <form className="relative" onSubmit={handleUrgenceFormSubmit}>
          {viewNotificationMessage && (
            <div className="max-w absolute animate-fade-down animate-once animate-duration-[3000ms]  rounded-tl-lg  rounded-tr-lg bg-green-500 shadow-md shadow-slate-700 right-[25%] md:right-[30%] xl:right-[35%] mt-2">
              <div className="flex flex-col mx-2">
                <span className="mx-auto mt-1 mb-1 text-sm text-white">
                  urgence crée avec succès
                </span>
              </div>
            </div>
          )}
          
          <div className="relative w-[78%] flex flex-col space-y-3 mx-auto">
            <span className="absolute -mt-1 md:-mt-2 lg:-mt-2 xl:-mt-2 ml-0 sm:ml-[10%] md:ml-[30%] lg:ml-[24%] text-sm md:text-md lg:text-lg text-red-600">
              {error}
            </span>
            <div className="flex flex-col justify-between w-full h-full space-y-2 md:space-y-0 md:flex-row">
              <div className="flex flex-col space-y-1 md:space-y-2 w-full md:w-[14.5rem] lg:w-[13rem] xl:w-[15rem]">
                <label
                  htmlFor="first_name"
                  className="font-semibold text-md text-slate-700"
                >
                  Numero Du Dossier
                </label>
                <input
                  type="text"
                  name="numero"
                  value={formUrgenceData.numero}
                  onChange={handleUrgenceFormChange}
                  className="border border-slate-700 text-slate-700 text-lg rounded-lg block w-full  h-7 md:h-8 lg:h-10 xl:h-9  p-1.5 md:p-2.5 xl:p-3 dark:placeholder-slate-700 focus:outline-none placeholder:text-sm"
                  required
                />
              </div>
              <div className="flex flex-col space-y-1 md:space-y-2 w-full md:w-[14.5rem] lg:w-[13rem] xl:w-[15rem]">
                <label
                  htmlFor="first_name"
                  className="font-semibold text-md text-slate-700"
                >
                  Date d&apos;audience
                </label>
                <input
                  type="date"
                  name="date_audience"
                  value={formUrgenceData.date_audience}
                  onChange={handleUrgenceFormChange}
                  className="border border-slate-700 text-slate-700 text-lg rounded-lg block w-full  h-7 md:h-8 lg:h-10 xl:h-9  p-1.5 md:p-2.5 xl:p-3 dark:placeholder-slate-700 focus:outline-none placeholder:text-sm"
                  min={todayDate}
                />
              </div>
            </div>
            <div className="flex flex-col justify-between w-full h-full space-y-2 md:space-y-0 md:flex-row">
              {item.payement_unique === 0 && item.type === 1 && (
                <div className="flex flex-col space-y-1 md:space-y-2 w-full md:w-[14.5rem] lg:w-[13rem] xl:w-[15rem]">
                  <label
                    htmlFor="first_name"
                    className="font-medium text-md md:text-xl text-slate-700"
                  >
                    Montant
                  </label>
                  <input
                    type="number"
                    name="montant"
                    value={formUrgenceData.montant}
                    onChange={handleUrgenceFormChange}
                    className="border border-slate-700 text-slate-700 text-lg rounded-lg block w-full p-1.5 md:p-2.5 dark:placeholder-slate-700 focus:outline-none placeholder:text-sm"
                    required
                  />
                </div>
              )}
            </div>
            <div className="flex flex-col w-full space-y-2">
              <label
                htmlFor="first_name"
                className="font-semibold  text-md text-slate-700"
              >
                Tribunal
              </label>
              <div className="flex flex-col space-y-2 rounded-sm md:flex-row md:space-y-0 md:justify-between ">
                {autre ? (
                  <input
                    type="text"
                    value={isNaN(parseInt(tribunal)) ? tribunal : ""}
                    onChange={(e) => setTribunal(e.target.value)}
                    onBlur={() => handleCheckTribunal()}
                    className="border border-slate-700 text-slate-700 text-lg rounded-lg block  w-[60%] p-0.5 lg:p-1.5 dark:placeholder-slate-700 focus:outline-none mx-auto"
                    required
                  />
                ) : (
                  <select
                    value={tribunal}
                    onChange={(e) => setTribunal(e.target.value)}
                    id="categories"
                    className="border border-slate-700 text-slate-700 text-lg rounded-lg block w-full md:w-[60%] p-0.5  lg:p-1.5  dark:placeholder-slate-700 focus:outline-none placeholder:text-sm"
                  >
                    {tribunals?.map((tribunal, index) => (
                      <option key={index} value={tribunal.id}>
                        {tribunal.nom}
                      </option>
                    ))}
                  </select>
                )}
                <button
                  onClick={() => {
                    setAutre(!autre);
                  }}
                  className="text-white mx-auto md:mx-0 mt-1 bg-slate-600 hover:bg-slate-700 p-0.5 w-[70%] md:w-[30%] rounded  "
                >
                  {autre ? "tribunal éxistant" : "Nouveau tribunal"}{" "}
                </button>
              </div>
            </div>
            <div className="flex flex-col w-full space-y-2">
              <label
                htmlFor="first_name"
                className="font-semibold text-md text-slate-700"
              >
                Commentaire
              </label>
              <textarea
                id="message"
                name="commentaire"
                value={formUrgenceData.commentaire}
                onChange={handleUrgenceFormChange}
                className="block p-1.5 md:p-2.5 w-full h-[10rem] md:h-[13rem] lg:h-[13rem] xl:h-[10rem]  text-lg text-slate-700 rounded-lg border border-slate-700 focus:outline-none placeholder:text-slate-700 placeholder:text-sm"
                placeholder="ecris les commentaires ici..."
              ></textarea>
            </div>
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="w-[8rem] h-10 rounded-md bg-green-700 hover:bg-green-800 text-white font-bold mb-2 md:mb-2 mt-3"
              // onClick={toggleModal}
              disabled={isSubmitting}
            >
              {isSubmitting ? "En cours..." : "CRÉER"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
