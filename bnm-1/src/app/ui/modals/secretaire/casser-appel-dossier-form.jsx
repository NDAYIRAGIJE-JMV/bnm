import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { useSession } from "next-auth/react";

export default function CasserAppelDossier({ toggleModal, tribunals, item, endpoint="" }){
  const [tribunal, setTribunal] = useState("-1");
  const [autre, setAutre] = useState(false);
  const [alreadyExist, setAlreadyExist] = useState(false);
  const { data: session } = useSession();
  const [error, setError] = useState("");
  const todayDate = new Date().toISOString().split("T")[0];
  const [viewNotificationMessage, setViewNotificationMessage] = useState(false);
  const [formAdvanceData, setFormAdvanceData] = useState({
    numero: "",
    date_audience: "",
    commentaire: "",
    montant: 0,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAdvanceFormChange = (e) => {
    setFormAdvanceData({
      ...formAdvanceData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAdvanceFormSubmit = async (e) => {
    e.preventDefault();

    // Désactivez le bouton de soumission
    setIsSubmitting(true);
    // Tous les champs doivent être completés
    try {
      if (!alreadyExist) {
        const response = await fetch(`/secretaire/api/${endpoint}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id_dossier: item.id,
            tribunal,
            autre,
            id_grand: item.id_grand,
            montant: formAdvanceData.montant,
            user: session.user.id,
            numero: formAdvanceData.numero,
            date_audience: formAdvanceData.date_audience,
            commentaire: formAdvanceData.commentaire,
          }),
        });

        if (!response.ok) {
          throw new Error("Erreur lors de la création de la Advance");
        }
        setViewNotificationMessage(true);

        toggleModal(0);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      // Réactivez le bouton de soumission après la fin de la soumission
      setIsSubmitting(false);
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
    <div className="w-full h-full flex justify-center items-center absolute bg-slate-700 bg-opacity-25 z-25">
      <form
        onSubmit={handleAdvanceFormSubmit}
        className="relative w-[95%] md:w-[90%] lg:w-[90%] xl:w-[65%] h-[70%] md:h-[80%] lg:h-[90%] overflow-y-scroll relative flex flex-col space-y-4 bg-white rounded-md mx-auto"
      >
        {viewNotificationMessage && (
          <div className="max-w absolute animate-fade-down animate-once animate-duration-[3000ms]  rounded-tl-lg  rounded-tr-lg bg-green-500 shadow-md shadow-slate-700 right-[25%] md:right-[30%] xl:right-[35%] mt-2">
            <div className="mx-2 flex flex-col">
              <span className="text-sm text-white mx-auto mb-1 mt-1">
                {endpoint==="casser"&&"Dossier cassé avec succès"}
                {endpoint==="appel"&&"Appel fait avec succès"}
              </span>
            </div>
          </div>
        )}
        <div className="bg-gray-100 shadow p-1">
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
            {endpoint==="casser"&&"Cassation"} {endpoint==="appel"&&"Appel"}  du dossier {item.numero}
          </span>
        </div>
        <div className="relative w-[78%] flex flex-col space-y-3 mx-auto">
          <span className="absolute -mt-3 md:-mt-2 lg:-mt-3 xl:-mt-4 ml-0 sm:ml-[10%] md:ml-[30%] lg:ml-[24%] text-sm md:text-md lg:text-lg text-red-600">
            {error}{" "}
          </span>
          <div className="w-full h-full flex flex-col space-y-3 md:space-y-0 md:flex-row justify-between">
            <div className="flex flex-col space-y-1 md:space-y-2 w-full md:w-[14.5rem] lg:w-[14rem] xl:w-[15rem]">
              <label
                htmlFor="first_name"
                className="text-md font-semibold text-slate-700"
              >
                Numero Du Dossier
              </label>
              <input
                type="text"
                name="numero"
                value={formAdvanceData.numero}
                onChange={handleAdvanceFormChange}
                className="border border-slate-700 text-slate-700 text-lg rounded-lg block w-full  h-7 md:h-8 lg:h-10 xl:h-9  p-1.5 md:p-2.5 xl:p-3 dark:placeholder-slate-700 focus:outline-none placeholder:text-sm"
                required
              />
            </div>
            <div className="flex flex-col space-y-1 md:space-y-2 w-full md:w-[14.5rem] lg:w-[14rem] xl:w-[15rem]">
              <label
                htmlFor="first_name"
                className="text-md font-semibold text-slate-700"
              >
                Date d&apos;audience
              </label>
              <input
                type="date"
                name="date_audience"
                value={formAdvanceData.date_audience}
                onChange={handleAdvanceFormChange}
                className="border border-slate-700 text-slate-700 text-lg rounded-lg block w-full  h-7 md:h-8 lg:h-10 xl:h-9  p-1.5 md:p-2.5 xl:p-3 dark:placeholder-slate-700 focus:outline-none placeholder:text-sm"
                min={todayDate}
              />
            </div>
          </div>
          <div className="flex flex-col space-y-2 w-full">
            <label
              htmlFor="first_name"
              className="text-md font-semibold text-slate-700"
            >
              Tribunal
            </label>
            <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:justify-between rounded-sm ">
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
                  <option value="-1" disabled>
                    {" "}
                    Tribunal{" "}
                  </option>
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
          {item.payement_unique === 0 && item.type === 1 && (
            <div className="flex flex-col space-y-1 md:space-y-2 w-full md:w-[14.5rem] lg:w-[13rem] xl:w-[15rem]">
              <label
                htmlFor="first_name"
                className="text-md md:text-xl font-medium text-slate-700"
              >
                Montant
              </label>
              <input
                type="number"
                name="montant"
                value={formAdvanceData.montant}
                onChange={handleAdvanceFormChange}
                className="border border-slate-700 text-slate-700 text-lg rounded-lg block w-full p-1.5 md:p-2.5 dark:placeholder-slate-700 focus:outline-none placeholder:text-sm"
                required
              />
            </div>
          )}
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
              value={formAdvanceData.commentaire}
              onChange={handleAdvanceFormChange}
              className="block p-1.5 md:p-2.5 w-full h-[8.5rem] md:h-[16rem] xl:h-[13rem] text-lg text-slate-700 rounded-lg border border-slate-700 focus:outline-none placeholder:text-slate-700 placeholder:text-sm"
              placeholder="ecris les commentaires ici..."
            ></textarea>
          </div>
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="w-[8rem] h-10 rounded-md bg-green-700 hover:bg-green-800 text-white font-bold mb-2 md:mb-2"
            // onClick={toggleModal}
            disabled={isSubmitting}
          >
            {isSubmitting ? "En cours..." : "CRÉER"}
          </button>
        </div>
      </form>
    </div>
  );
};
