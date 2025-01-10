"use client";
import React, { useEffect, useContext, useState } from "react";
import { SessionContext } from "../../context/auth";
import TableauPayement from "./tableau-payement";
import { PropagateLoader } from "react-spinners";
import { useSession } from "next-auth/react";
import FacturePayement from "./facture-payement";
import axios from "axios";

const Payement = ({ toggleModal, datacaisse }) => {
  const [montantpaye, setMontantPaye] = useState("");
  const [balance, setBalance] = useState("not data");
  const [isButtonDisabled, setButtonDisabled] = useState(false);
  const [user, setUser] = useState("");
  const [message, setMessage] = useState("");
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [showTableauPayement, setShowTableauPayement] = useState(false);
  const [viewNotificationMessage, setViewNotificationMessage] = useState(false);
  const [notificationError, setNotificationError] = useState("");
  const [notificationSuccess, setNotificationSuccess] = useState("");
  const [montantReste, setMontantReste] = useState("");
  const [openFacture, setOpenFacture] = useState(false);
  const [paymentId, setPaymentId] = useState("");
  const [factureGenerated, setFactureGenerated] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  useEffect(() => {
    if (session && session.user) {
      setUser(session.user.id);
      console.log(session.user);
    }
  }, [session]);

  useEffect(() => {
    fetchBalance();
  }, [datacaisse.id]);

  const fetchBalance = async () => {
    if (datacaisse.id) {
      await axios.get(`/secretaire/api/balance/restant`, {
        headers: { caisse: datacaisse.caisse },
      })
      .then(results=>{
        setMontantReste(results.data.montant_restant)
      })
      .catch(error=>console.error(error))
      /* const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(),
      };
      const res = await fetch(
        "/secretaire/api/balance/restant",
        requestOptions
      );
      const datas = await res.json();
      console.log("balance datas", datas);
      if (datas.message === "success") {
        setBalance(datas.results[0]);
        setMontantReste(datas.results[0].montant_restant);
      } else {
        if (datacaisse.montant) {
          setMontantReste(datacaisse.montant);
          setBalance("not data");
        } else {
          setErrorMessage("Vous ne restez a aucune montant a payé");
        }
      } */
    } else {
      setErrorMessage("Vous ne restez a aucune montant a payé");
    }
  };

  const Payer = async () => {
    if (factureGenerated) {
      setNotificationError("La facture a déjà été générée.");
      return; // Empêche la génération multiple
    }

    let montantRestant;
    setLoading(true);
    console.log(balance);
    if (balance != "not data") {
      montantRestant =
        (balance?.montant_restant || 0) - (parseFloat(montantpaye) || 0);
      //setMontantReste(montantRestant);
      if (montantRestant >= 0) {
        const formdata = {
          uuid: datacaisse.uuid,
          dossier: datacaisse.id,
          caisse: datacaisse.caisse,
          montantpaye: montantpaye,
          montantrestant: montantRestant,
          user: user,
          name: session.user.name + "" + session.user.lastname,
        };

        await envoyerDonnees(formdata);
      } else {
        setNotificationError(
          "Vous restez avec " + balance.montant_restant + " à payer"
        );
        setLoading(false);
      }
    } else {
      montantRestant =
        (datacaisse?.montant || 0) - (parseFloat(montantpaye) || 0);
      //setMontantReste(montantRestant);
      if (montantRestant >= 0) {
        const formdata = {
          uuid: datacaisse.uuid,
          dossier: datacaisse.id,
          caisse: datacaisse.caisse,
          montantpaye: montantpaye,
          montantrestant: montantRestant,
          user: 8,
        };

        await envoyerDonnees(formdata);
      } else {
        if (datacaisse) {
          setNotificationError(
            "Vous restez avec " + (datacaisse.montant || 0) + " à payer"
          );
          setLoading(false);
        } else {
          setNotificationError("Vous n avez pas de montant à payer");
          setLoading(false);
        }
      }
    }
  };

  const envoyerDonnees = async (formdata) => {
    setLoading(true);
    if (montantpaye) {
      if (!isNaN(montantpaye) && !isNaN(parseFloat(montantpaye))) {
        try {
          const requestOptions = {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formdata),
          };

          const res = await fetch(
            "/secretaire/api/balanceajoute",
            requestOptions
          );
          const datas = await res.json();

          if (datas.message === "success") {
            setPaymentId(datas.response[0].id);
            setButtonDisabled(true);
            setMontantPaye("");
            setNotificationSuccess("Payé avec succès");
            setOpenFacture(true);
            setFactureGenerated(true); // Indique que la facture a été générée

            const timer = setTimeout(() => {
              setFactureGenerated(false);
              setViewNotificationMessage(false);
              window.location.reload();
            }, 6000);

            return () => clearTimeout(timer);
          } else if (datas.error) {
            setNotificationError(datas.error);
          }
        } catch (error) {
          console.log("Error:", error);
        }
      } else {
        setMessage("Saisissez un nombre");
      }
    } else {
      setMessage("Complétez d'abord le champ");
    }
  };

  const handleMontantPaye = (event) => {
    setMontantPaye(event.target.value);
  };

  const afficherTableauPayement = () => {
    setShowTableauPayement(true);
  };

  const closeModalTableauPayement = () => {
    setShowTableauPayement(false);
  };

  return (
    <>
      <div className="w-full h-full flex justify-center items-center absolute bg-slate-700 bg-opacity-25 z-25">
        {showTableauPayement && (
          <div className="absolute w-[100%] h-[100%] z-10">
            <TableauPayement
              closeModalTableauPayement={closeModalTableauPayement}
            />
          </div>
        )}
        <div className="md:w-[85%] w-[20%] relative flex flex-col space-y-4 bg-white rounded-md mx-auto">
          {viewNotificationMessage && notificationError && (
            <div className="max-w absolute animate-fade-down animate-once animate-duration-[3000ms] rounded-tl-lg rounded-tr-lg bg-red-600 shadow-md shadow-slate-700 right-[25%] md:right-[30%] xl:right-[35%] mt-2">
              <div className="mx-2 flex flex-col">
                <span className="text-sm text-white mx-auto mb-1 mt-1">
                  {notificationError}
                </span>
              </div>
            </div>
          )}
          {viewNotificationMessage && notificationSuccess && (
            <div className="max-w absolute animate-fade-down animate-once animate-duration-[3000ms] rounded-tl-lg rounded-tr-lg bg-green-500 shadow-md shadow-slate-700 right-[25%] md:right-[30%] xl:right-[35%] mt-2">
              <div className="mx-2 flex flex-col">
                <span className="text-sm text-white mx-auto mb-1 mt-1">
                  {notificationSuccess}
                </span>
              </div>
            </div>
          )}
          <div className=" flex justify-end mt-1">
            <div className="w-full relative flex justify-center items-center bg-gray-100 py-2 shadow">
              <span className="text-lg md:text-xl lg:text-2xl font-bold underline">
                Paiement: {datacaisse.numero}
              </span>
              <button
                onClick={() => toggleModal(0)}
                className="w-6 h-6 hover:bg-red-600 absolute right-2"
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
          <div className="flex flex-col space-y-4 mt-3 p-2">
            <div className="w-full flex justify-center">
              {errorMessage && <span>{errorMessage} </span>}
              {montantReste && (
                <span>Vous restez à payer: {montantReste?montantReste:datacaisse.montant} Fbu</span>
              )}
            </div>
            <div className="relative w-full h-full flex flex-col md:flex-row justify-between">
              {message && (
                <span className="absolute -mt-5 md:-mt-4 lg:-mt-4 xl:-mt-5 ml-[25%] md:ml-[32%] lg:ml-[15%] xl:ml-[30%] text-sm md:text-md lg:text-lg text-red-600">
                  {message}
                </span>
              )}
              <div className="flex flex-col space-y-1 w-full">
                <label
                  htmlFor="montant"
                  className="text-md font-semibold text-slate-800 mx-auto"
                >
                  Montant
                </label>
                <input
                  type="number"
                  onChange={handleMontantPaye}
                  value={montantpaye}
                  className="h-9 border border-slate-700 text-slate-800 text-lg rounded-lg block w-[70%] p-2.5 dark:placeholder-slate-700 focus:outline-none placeholder:text-sm mx-auto"
                  required
                />
              </div>
            </div>
            <div className="flex justify-center">
              <button
                disabled={isButtonDisabled || factureGenerated} // Désactive si la facture est déjà générée
                onClick={Payer}
                className="w-[8rem] h-8 rounded-md bg-green-700 hover:bg-green-800 text-white font-medium mb-3"
              >
                {loading ? (
                  <PropagateLoader color="#ffffff" className="mb-3" />
                ) : (
                  "ENVOYER"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
      {openFacture && factureGenerated && (
        <FacturePayement paymentId={paymentId} caisse={datacaisse.caisse} />
      )}
    </>
  );
};

export default Payement;
