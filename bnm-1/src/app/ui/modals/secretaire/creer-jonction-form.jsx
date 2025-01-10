'use client'
import React, { useContext } from 'react'
import { useState,useEffect } from 'react';
import { useSession } from 'next-auth/react';
import SelectDropdown from '../../elements/select-dropdown';

export default function CreerJonction ({ toggleModal, item }) {
  const {data : session} = useSession();
  const [errors, setErrors] = useState('');
  const [dossierNew, setDossierNew] = useState('');
  const [dossiers, setDossiers] = useState([]);
  const [dossier, setDossier] = useState([]);
  const [dossierJonction, setDossierJonction] = useState();
  const [formFusionData, setFormFusionData] = useState({
    date_audience : '',
    commentaire : '',
    numero : ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const todayDate = new Date().toISOString().split('T')[0];
  const [viewNotificationMessage, setViewNotificationMessage] = useState(false);
  const handleFusionFormChange = (e) => {
    setFormFusionData({
      ...formFusionData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFusionFormSubmit = async (e) => {
    e.preventDefault();

    // Désactivez le bouton de soumission
    setIsSubmitting(true);

    try {
      const response = await fetch('/secretaire/api/dossiers/jonction', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user : session.user.id,
          dossier: item.id,
          numero : formFusionData.numero,
          date_audience : formFusionData.date_audience,
          commentaire : formFusionData.commentaire,
        }),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la création de la fusion');
      }
      setViewNotificationMessage(true);
      window.location.reload();
      
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  const getSelectedOption = (option) => {
    setFormFusionData({...formFusionData,numero: option.id})
  }
  useEffect(() => {
    const fetchDossier = async () => {
      const res = await fetch('/secretaire/api/fetchnumeros', {
        method: 'GET',
        headers: { 
          'Content-Type': 'application/json',
            id_grand: item.id_grand,
            numero: item.numero,
         },
      });
      setFormFusionData({...formFusionData, date_audience: item.date_audience.split("T")[0]})
      if (res.ok) {
        const data = await res.json();
        setDossiers(data);
      } else {
        console.error('Erreur lors de la récupération des numéros de dossiers');
      }
    };

    fetchDossier();
}, [item]);
  return (
    <div className="w-full h-full flex justify-center items-center absolute bg-slate-700 bg-opacity-25 z-25">
      <div
        className="w-[95%] md:w-[90%] lg:w-[85%] xl:w-[60%] h-[98%] md:h-[90%] lg:h-[88%] overflow-y-scroll relative flex flex-col space-y-4 bg-white rounded-md rounded-tr-2xl"
      >
        {viewNotificationMessage && 
          <div className='max-w absolute animate-fade-down animate-once animate-duration-[3000ms]  rounded-tl-lg  rounded-tr-lg bg-green-500 shadow-md shadow-slate-700 right-[25%] md:right-[30%] xl:right-[35%] mt-2'>
            <div className='mx-2 flex flex-col'>
                <span className='text-sm text-white mx-auto mb-1 mt-1'>fusion crée avec succès</span>
            </div>
          </div>  
        }     
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
            Creer une jonction: {item.numero}
          </span>
        </div>
        {/* <div className="grid md:grid-cols-2 grid-cols-1 gap-4"> */}
        <div className="w-[90%] lg:w-[95%] flex flex-col space-y-4 xl:space-y-1  mx-auto">
        <span className="text-red-600"> {errors ? errors : " "} </span>
        <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
        {/* <div className="flex flex-col space-y-1 md:space-y-2 w-full md:w-[14.5rem] lg:w-[13rem] xl:w-[15rem]">
          <label
            htmlFor="first_name"
            className="text-md font-semibold text-slate-700"
          >
            Numéro Du Dossier
          </label>
          <input
            type="text"
            disabled
            name="numero"
            value={item.numero}
            onChange={handleFusionFormChange}
            placeholder="entrez le numéro du dossier"
            className="border border-slate-700 text-slate-700 text-lg rounded-lg block w-full  h-7 md:h-8 lg:h-10 xl:h-9  p-1.5 md:p-2.5 xl:p-3 dark:placeholder-slate-700 focus:outline-none placeholder:text-sm"
            required
          />
        </div> */}
          <div className="flex flex-col space-y-1 md:space-y-2 w-full md:w-[14.5rem] lg:w-[13rem] xl:w-[15rem]">
            <label
              htmlFor="jonction_dossier"
              className="text-md font-semibold text-slate-700"
            >
              Jonction avec 
            </label>
            <SelectDropdown selectedOption={getSelectedOption} items={dossiers} />
          </div>
          {/* <div>
            <label
              htmlFor="num_dossier"
              className="stext-md font-semibold text-slate-700"
            >
            Dossier de référence
            </label>
            <select
              value={dossierNew}
              onChange={(e) => setDossierNew(e.target.value)}
              id="partie"
              className="border border-slate-700 text-slate-700 text-lg rounded-lg block w-full  h-9 md:h-10 lg:h-12 xl:h-12  p-1.5 md:p-2.5 xl:p-3 dark:placeholder-slate-700 focus:outline-none placeholder:text-sm">
              <option value=''>
                -- Selectionner le numéro du dossier --
              </option>
              <option value={item.id}>
                {item.numero}
              </option>
              <option value={dossier.id}>
                {dossier.item}
              </option>
            </select>
          </div> */}
          <div className="flex flex-col space-y-1 md:space-y-2 w-full md:w-[14.5rem] lg:w-[13rem] xl:w-[15rem]">
            <label
              htmlFor="first_name"
              className="text-md font-semibold text-slate-700"
            >
              Date d&apos;audience
            </label>
            <input
              type="date"
              name="date_audience"
              value={formFusionData.date_audience}
              onChange={handleFusionFormChange}
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
              Commentaire
            </label>
            <textarea
              id="message"
              name="commentaire"
              value={formFusionData.commentaire}
              onChange={handleFusionFormChange}
              className="block p-1.5 md:p-2.5 w-full h-[14rem] md:h-[20rem] lg:h-[16rem] xl:h-[12rem] text-lg text-slate-700 rounded-lg border border-slate-700 focus:outline-none placeholder:text-slate-700 placeholder:text-sm"
              placeholder="ecris les commentaires ici..."
            ></textarea>
          </div>
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            onClick={handleFusionFormSubmit}
            className="w-[8rem] h-10 rounded-md bg-green-700 hover:bg-green-800 text-white font-bold mb-2 md:mb-2"
            disabled={isSubmitting}
          >
            {isSubmitting ? "En cours..." : "CRÉER"}
          </button>
        </div>
      </div>
    </div>
  );
}

