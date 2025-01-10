'use client'
import React from 'react'
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import axios from 'axios';

const MettreEnDelibere = ({ toggleModal, item }) => {
  const {data:session} = useSession();
  /* const [numeros, setNumeros] = useState([]); */
  const [numero, setNumero] = useState();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [viewNotificationMessage, setViewNotificationMessage] = useState(false);
  const [formData, setFormData] = useState({
    delibere: '',
    prononce: '',
    commentaire: '',
  });
  const todayDate = new Date().toISOString().split('T')[0];
  
  const handleReturnFormChange = (e) => {
    console.log(e.target.value)
    const date = new Date(e.target.value);
    date.setMonth(date.getMonth() + 1);
    const prononce= date.toISOString().split('T')[0]
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
      prononce: prononce
    });
  };

  const handleSubmit = async (e) =>{
    e.preventDefault();
    await axios.post('/secretaire/api/delibere',{
      ...formData,
      dossier: item.id,
      avocat:item.avocat
    })
    .then(results=>{
        setViewNotificationMessage(true);
        toggleModal(0); 
        const timer = setTimeout(() => {
          setViewNotificationMessage(false);
          window.location.reload();
        }, 2000); 

      setIsSubmitting(false);
        return () => clearTimeout(timer);
    })
    .catch(error=>{
      console.error(error)
      setIsSubmitting(false);
    })
  }
  const handleReturnFormSubmit = async (e) => {
    e.preventDefault();

    setIsSubmitting(true);

    try {
      const response = await fetch('/secretaire/api/return', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user:session.id,
          numero: numero.item,
          id_return: numero.id,
          montant: formData.montant,
          delibere: formData.delibere,
          commentaire: formData.commentaire,
          dossier_id: item.id,
        }),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la création de la Return');
      }

     if(response.ok){
      toggleModal(0); 
     }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  const getSelectedOption = (option) => {
    setNumero(option)
  }
  return (
    <div className="absolute flex items-center justify-center w-full h-full bg-opacity-25 bg-slate-700 z-25">
      <form onSubmit={handleSubmit} className="w-[95%] md:w-[85%] lg:w-[98%] xl:w-[65%] md:h-[85%] lg:h-[98%] xl:h-[98%] overflow-y-scroll relative flex flex-col space-y-4 bg-white rounded-md rounded-tr-2xl mx-auto">
        <div className="p-3 shadow">
        <button onClick={()=>toggleModal(0)}
          className="absolute w-6 h-6 right-3 hover:bg-red-600"
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
          <span className="flex justify-center mt-5 text-xl font-bold text-slate-700">
          Mettre en delibéré dossier numero : <span className='font-semibold'>{item.numero}</span>
          </span>
        </div>
        <div className="w-[78%] flex flex-col space-y-3 mx-auto">
          <div className="flex flex-col justify-between w-full h-full md:flex-row">
          {/* <div>
          <label
                htmlFor="first_name"
                className="mb-4 text-xl font-medium text-slate-700"
              >
                Numero de dossier
              </label>
            <SelectDropdown selectedOption={getSelectedOption} items={numeros} />
          </div> */}

          <div className="flex flex-col space-y-1 md:space-y-2 w-full md:w-[14.5rem] lg:w-[16.5rem] xl:w-[15rem]">
              <label
                htmlFor="first_name"
                className="text-xl font-medium text-slate-700"
              >
                Mise en delibere
              </label>
              <input
                type="date"
                name='delibere'
                value={formData.delibere}
                onChange={handleReturnFormChange}
                className="border border-slate-700 text-slate-700 text-lg rounded-lg block w-full p-2.5 dark:placeholder-slate-700 focus:outline-none"
                min={todayDate}
              />
            </div>
            <div className="flex flex-col space-y-1 md:space-y-2 w-full md:w-[14.5rem] lg:w-[16.5rem] xl:w-[15rem]">
              <label
                htmlFor="first_name"
                className="text-xl font-medium text-slate-700"
              >
                Prononce
              </label>
              <input
                disabled
                type="date"
                name='prononce'
                value={formData.prononce}
                onChange={handleReturnFormChange}
                className="border border-slate-700 text-slate-700 text-lg rounded-lg block w-full p-2.5 dark:placeholder-slate-700 focus:outline-none"
                min={todayDate}
              />
            </div>
          </div>
          <div className="flex flex-col w-full space-y-2">
            <label
              htmlFor="first_name"
              className="text-xl font-medium text-slate-700"
            >
              Commentaire
            </label>
            <textarea
              id="message"
              name='commentaire'
              value={formData.commentaire}
              onChange={(e)=>setFormData({...formData,commentaire: e.target.value})}
              className="block p-2.5 w-full h-[10rem] md:h-[20rem] lg:h-[10rem] xl:h-[10rem] text-lg text-slate-700 rounded-lg border border-slate-700 focus:outline-none placeholder:text-slate-700 placeholder:text-sm"
              placeholder="ecris les commentaires ici..."
            ></textarea>
          </div>
        </div>
        <div className="flex justify-center mb-2">
          <button
            type='submit'
            className="w-[8rem] h-10 rounded-md bg-green-700 hover:bg-green-800 text-white font-bold"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'En cours...' : 'CRÉER'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default MettreEnDelibere
