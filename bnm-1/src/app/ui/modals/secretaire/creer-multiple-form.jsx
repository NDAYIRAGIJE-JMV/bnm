"use client";
import React from "react";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

const CreerMultiple = ({ toggleModal, item }) => {
  const { data: session } = useSession();
  const [consoles, setConsoles] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const todayDate = new Date().toISOString().split("T")[0];
  const [viewNotificationMessage, setViewNotificationMessage] = useState(false);
  const [error, setError] = useState("");

  const [formConsoleData, setFormConsoleData] = useState({
    numero: "",
    date_audience: "",
    demandeur: "",
    commentaire: "",
  });

  /* useEffect(() => {
    const fetchConsole = async () => {
      const res = await fetch("/secretaire/api/fetchconsole", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id_dossier: item.id,
        }),
      });
      const data = await res.json();
      setConsoles(data);
    };
    fetchConsole();
  }, []); */

  const handleConsoleFormChange = (e) => {
    setFormConsoleData({
      ...formConsoleData,
      [e.target.name]: e.target.value,
    });
  };

  const handleConsoleFormSubmit = async (e) => {
    e.preventDefault();
    if (
      formConsoleData.numero &&
      formConsoleData.demandeur
    ) {
      // Désactivez le bouton de soumission
      setIsSubmitting(true);

      try {
        const response = await fetch("/secretaire/api/dossiers/multiple", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id_dossier: item.id,
            user: session.user.id,
            numero: formConsoleData.numero,
            demandeur: formConsoleData.demandeur,
            date_audience: item.date_audience,
            commentaire: formConsoleData.commentaire,
          }),
        });

        if (!response.ok) {
          throw new Error("Erreur lors de la création du console");
        }
        setViewNotificationMessage(true);
        const timer = setTimeout(() => {
          setViewNotificationMessage(false);
          window.location.reload();
        }, 3000); // closeModal();
        return () => clearTimeout(timer);
      } catch (error) {
        console.error("Error:", error);
      }
    } else {
      setError("Tous les champs doivent être completés ");
    }
  };


  console.log(item)

  return (
    <div className="w-full h-full flex justify-center items-center absolute bg-slate-700 bg-opacity-25 z-25">
      <form
        onSubmit={handleConsoleFormSubmit}
        className="relative w-[95%] md:w-[90%] lg:w-[85%] xl:w-[65%] h-[90%] md:h-[88%] lg:h-[95%] overflow-y-scroll md:overflow-hidden relative flex flex-col space-y-4 bg-white rounded-md mx-auto"
      >
        {viewNotificationMessage && (
          <div className="max-w absolute animate-fade-down animate-once animate-duration-[3000ms]  rounded-tl-lg  rounded-tr-lg bg-green-500 shadow-md shadow-slate-700 right-[25%] md:right-[30%] xl:right-[35%] mt-2">
            <div className="mx-2 flex flex-col">
              <span className="text-sm text-white mx-auto mb-1 mt-1">
                console crée avec succès
              </span>
            </div>
          </div>
        )}
        <div className="bg-gray-100 p-1 shadow">
          <button
            onClick={() => toggleModal(0)}
            className="absolute w-6 h-6 hover:bg-red-600 right-3 mt-2"
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
          <span className="flex justify-center text-lg md:text-xl lg:text-2xl font-bold text-slate-700 mt-5">
            Dossier multiple {item.numero}
          </span>
        </div>
        <div className="relative w-[85%] flex flex-col space-y-3 mx-auto ">
          <span className="absolute -mt-3 md:-mt-2 lg:-mt-3 xl:-mt-4 ml-0 sm:ml-[10%] md:ml-[30%] lg:ml-[24%] text-sm md:text-md lg:text-lg text-red-600">
            {error}
          </span>
          <div className="w-full h-full flex flex-col space-y-2 md:space-y-0 md:space-y-0 md:flex-row justify-between">
            <div className="flex flex-col space-y-1 md:space-y-2 w-full md:w-[14.5rem] lg:w-[13rem] xl:w-[15rem]">
              <label
                htmlFor="first_name"
                className="text-md font-semibold text-slate-700"
              >
                Numero du dossier
              </label>
              <input
                type="text"
                value={formConsoleData.numero}
                onChange={handleConsoleFormChange}
                name="numero"
                className="border border-slate-700 text-slate-700 text-lg rounded-lg block w-full  h-7 md:h-8 lg:h-10 xl:h-9  p-1.5 md:p-2.5 xl:p-3 dark:placeholder-slate-700 focus:outline-none placeholder:text-sm"
                required
              />
            </div>
            <div className="flex flex-col space-y-1 md:space-y-2 w-full md:w-[14.5rem] lg:w-[13rem] xl:w-[15rem]">
              <label
                htmlFor="first_name"
                className="text-md font-semibold text-slate-700"
              >
                Demandeur
              </label>
              <input
                type="text"
                name="demandeur"
                value={formConsoleData.demandeur}
                onChange={handleConsoleFormChange}
                className="border border-slate-700 text-slate-700 text-lg rounded-lg block w-full  h-7 md:h-8 lg:h-10 xl:h-9  p-1.5 md:p-2.5 xl:p-3 dark:placeholder-slate-700 focus:outline-none placeholder:text-sm"
                required
              />
            </div>
          </div>
          <div className="flex flex-col space-y-2 w-full">
            <label
              htmlFor="first_name"
              className="text-md font-semibold text-slate-700"
            >
              Commentaire
            </label>
            <textarea
              id="message"
              name="commentaire"
              value={formConsoleData.commentaire}
              onChange={handleConsoleFormChange}
              className="block p-1.5 md:p-2.5 w-full h-[20rem] md:h-[20rem] lg:h-[18rem] xl:h-[14.5rem] text-lg text-slate-700 rounded-lg border border-slate-700 focus:outline-none placeholder:text-slate-700 placeholder:text-sm"
              placeholder="ecris les commentaires ici..."
            ></textarea>
          </div>
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="w-[8rem] h-10 rounded-md bg-green-700 hover:bg-green-800 text-white font-bold mb-2 md:mb-2"
            // onClick={closeModal}
            disabled={isSubmitting}
          >
            {isSubmitting ? "En cours..." : "CRÉER"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreerMultiple;
