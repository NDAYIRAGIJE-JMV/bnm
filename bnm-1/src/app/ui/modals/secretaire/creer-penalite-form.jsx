"use client";
import React from "react";
import { useState } from "react";
import { useSession } from "next-auth/react";

const CreerPenalite = ({ toggleModal, tribunals, item }) => {
  const [tribunal, setTribunal] = useState("-1");
  const [autre, setAutre] = useState(false);
  const [alreadyExist, setAlreadyExist] = useState(false);

  const { data: session } = useSession();
  const [error, setError] = useState("");

  const [formPenaliteData, setFormPenaliteData] = useState({
    numero: "",
    montant: 0,
    date_audience: "",
    commentaire: "",
    client: "1",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const todayDate = new Date().toISOString().split("T")[0];

  const handlePenaliteFormChange = (e) => {
    setFormPenaliteData({
      ...formPenaliteData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePenaliteFormSubmit = async (e) => {
    e.preventDefault();

    // Désactivez le bouton de soumission
    setIsSubmitting(true);

    try {
      if (!alreadyExist) {
        const response = await fetch("/secretaire/api/penalite", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id_dossier: item.id,
            numero: formPenaliteData.numero,
            date_audience: formPenaliteData.date_audience,
            tribunal,
            autre,
            montant: formPenaliteData.montant,
            user: session.user,
            commentaire: formPenaliteData.commentaire,
          }),
        });
        if (!response.ok) {
          throw new Error("Erreur lors de la création de la pénalité");
        }

        window.location.reload();
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
        onSubmit={handlePenaliteFormSubmit}
        className="w-[95%] md:w-[90%] lg:w-[85%] xl:w-[60%] h-[98%]  overflow-y-scroll relative flex flex-col space-y-4 bg-white rounded-md rounded-tr-2xl"
      >
        <div className="bg-gray-100 p-1 shadow">
          <button
            onClick={() => toggleModal(0)}
            className="absolute w-6 h-6 hover:bg-red-600 right-1 top-4 "
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
          <span className="flex justify-center text-lg font-bold md:text-2xl lg:text-3xl md:font-bold text-slate-700 mt-5">
            Creez une dossier pénal {item.numero}
          </span>
        </div>
        <div className="w-[78%] flex flex-col space-y-3 mx-auto">
          <span className="absolute -mt-3 md:-mt-2 lg:-mt-3 xl:-mt-4 ml-0 sm:ml-[10%] md:ml-[30%] lg:ml-[24%] text-sm md:text-md lg:text-lg text-red-600">
            {error}
          </span>
          <div className="w-full h-full flex flex-col space-y-2 md:space-y-0 md:flex-row justify-between">
            <div className="flex flex-col space-y-1 md:space-y-2 w-full md:w-[14.5rem] lg:w-[13rem] xl:w-[15rem]">
              <label
                htmlFor="first_name"
                className="text-md md:text-xl font-medium text-slate-700"
              >
                Numero Du Dossier
              </label>
              <input
                type="text"
                name="numero"
                value={formPenaliteData.numero}
                onChange={handlePenaliteFormChange}
                className="border border-slate-700 text-slate-700 text-lg rounded-lg block w-full p-1.5 md:p-2.5 dark:placeholder-slate-700 focus:outline-none placeholder:text-sm"
                required
              />
            </div>
            <div className="w-[100%] md:w-[45%]  xl:w-[40%] flex flex-col space-y-1 ">
              <label
                htmlFor="first_name"
                className=" text-md md:text-xl font-medium text-slate-700"
              >
                Tribunal
              </label>
              <div className="flex flex-col space-y-2rounded-sm">
                {autre ? (
                  <input
                    type="text"
                    value={
                      isNaN(parseInt(tribunal)) && tribunal === "-1"
                        ? tribunal
                        : ""
                    }
                    onChange={(e) => setTribunal(e.target.value)}
                    onBlur={() => handleCheckTribunal()}
                    className="border border-slate-700 text-slate-700 text-lg rounded-lg block h-8 md:h-12 lg:h-10 w-[90%] p-1.5 md:p-2.5 dark:placeholder-slate-700 focus:outline-none mx-auto"
                    required
                  />
                ) : (
                  <select
                    value={tribunal}
                    onChange={(e) => setTribunal(e.target.value)}
                    id="categories"
                    className="border border-slate-700 text-slate-700 text-lg rounded-lg block w-full  h-9 md:h-10 lg:h-12 xl:h-12  p-1.5 md:p-2.5 xl:p-3 dark:placeholder-slate-700 focus:outline-none placeholder:text-sm"
                  >
                    <option value="-1" disabled>
                      Tribunal
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
                  className="text-white mx-auto mt-1 bg-slate-700 hover:bg-slate-800 p-2 rounded  "
                >
                  {autre ? "tribunal éxistant" : "Nouveau tribunal"}{" "}
                </button>
              </div>
            </div>
          </div>
          <div className="w-full h-full flex flex-col space-y-2 md:space-y-0 md:flex-row justify-between">
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
                  value={formPenaliteData.montant}
                  onChange={handlePenaliteFormChange}
                  className="border border-slate-700 text-slate-700 text-lg rounded-lg block w-full p-1.5 md:p-2.5 dark:placeholder-slate-700 focus:outline-none placeholder:text-sm"
                  required
                />
              </div>
            )}
            <div className="w-[100%] md:w-[45%]  xl:w-[40%] flex flex-col space-y-1 ">
              <label
                htmlFor="first_name"
                className=" text-md md:text-xl font-medium text-slate-700"
              >
                Côté du client
              </label>
              <div className="flex flex-col space-y-2rounded-sm">
                <select
                  value={formPenaliteData.client}
                  onChange={(e) => setFormPenaliteData({ ...formPenaliteData, client: e.target.value })}
                  id="categories"
                  className="border border-slate-700 text-slate-700 text-lg rounded-lg block w-full  h-9 md:h-10 lg:h-12 xl:h-12  p-1.5 md:p-2.5 xl:p-3 dark:placeholder-slate-700 focus:outline-none placeholder:text-sm"
                >
                  <option value="1">Defendeur</option>
                  <option value="2">Demandeur</option>
                </select>
              </div>
            </div>
          </div>
          <div className="flex flex-col space-y-2 w-full">
            <label
              htmlFor="first_name"
              className="text-md md:text-xl font-medium text-slate-700"
            >
              Commentaire
            </label>
            <textarea
              id="message"
              name="commentaire"
              value={formPenaliteData.commentaire}
              onChange={handlePenaliteFormChange}
              className="block p-1.5 md:p-2.5 w-full h-[10rem] md:h-[20rem] lg:h-[10rem] xl:h-[8rem] text-lg text-slate-700 rounded-lg border border-slate-700 focus:outline-none placeholder:text-slate-700 placeholder:text-sm"
              placeholder="ecris les commentaires ici..."
            ></textarea>
          </div>
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="w-[8rem] h-10 rounded-md bg-green-700 hover:bg-green-800 text-white font-bold mb-2 md:mb-2"
            disabled={isSubmitting}
          >
            {isSubmitting ? "En cours..." : "CRÉER"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreerPenalite;
