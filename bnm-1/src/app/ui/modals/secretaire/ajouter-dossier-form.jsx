'use client'
import { React, useState, useEffect, useContext } from 'react';
import { useSession } from 'next-auth/react';

export default function CreerDossier({ toggleModal, tribunals, formData = [], item=null, dossierType }) {
  const { data : session } = useSession()
  const [clients,setClients] = useState([])
  const [dossier, setDossier] = useState('')
  const [demandeur, setDemandeur] = useState('')
  const [consortDemandeur, setConsortDemandeur] = useState("")
  const [consortDefendeur, setConsortDefendeur] = useState("")
  const [commentaire, setCommentaire] = useState('')
  const [descrPaie, setDescrPaie] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [defendeur, setDefendeur] = useState('0')
  const [tribunal, setTribunal] = useState(0)
  const [autre, setAutre] = useState(false)
  const [alreadyExist, setAlreadyExist] = useState(false)
  const [date, setDate] = useState('')
  const [montant_a_payer, setMontant_a_payer] = useState(0)
  const [payement_unique, setPayement_unique] = useState('non')
  const [loading, setLoading] = useState(false)
  const { useRouter } = require('next/navigation')
  const router = useRouter()

  const todayDate = new Date().toISOString().split('T')[0];

  const handleUpdate = async (e) => {
    e.preventDefault()
    try {
      setError("")
      setLoading(true)
      const grandDossierMontant = payement_unique === 'oui' ? 1 : 0;
      if(!alreadyExist){
          const addData = {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id:item.id,
              id_grand:item.id_grand,
              dossier,
              demandeur,
              defendeur,
              tribunal,
              date,
              commentaire,
              montant_a_payer,
              grandDossierMontant,
              autre,
              user: session.user,
              type:item.type
            })
          };
          const response = await fetch('/secretaire/api/creation', addData)
          const data = await response.json();
          if (data) {
            if (data.success) {
              window.location.reload();
              setLoading(false);
              setDossier('');
              setDefendeur('');
              setDemandeur('')
              setTribunal(0);
              setDate('');
              setMontant_a_payer(0);
              setCommentaire('');
              setPayement_unique('non');
              setSuccess('Modification du dossier réussi');
              toggleModal(0);
            }
            else if (!data.success) {
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
            setError('Modification du dossier échoué, réessayer')
          }
      
      
        
      }else{
        setLoading(false)
        setError('Ce tribunal éxiste déjà dans le système')
      }
      
    } catch (error) {
      setError('Dossier non mis à  jour, erreur survenu lors de la mise  a jour. Réessayer')
    }

  }

  const handleCreate = async (e) => {
    e.preventDefault()
    try {
      setError("")
      setLoading(true)
      const grandDossierMontant = payement_unique === 'oui' ? 1 : 0;
      if(!alreadyExist){
        if ((demandeur && defendeur) || (consortDemandeur && consortDefendeur) ||
         (consortDemandeur && defendeur) || (demandeur && consortDemandeur)) {
          console.log('firstpenal', formData[1])
          const addData = {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              dossier,
              demandeur : consortDemandeur && consortDemandeur || demandeur != '' && demandeur,
              defendeur : consortDefendeur && consortDefendeur || defendeur != '' && defendeur,
              tribunal,
              date,
              commentaire,
              montant_a_payer,
              grandDossierMontant,
              autre,
              descrPaie,
              penal : formData[0] == '2' && 1,
              partie : formData[1],
              consort : formData[2],
              partieConsort : formData[3],
              user: session?.user.id,
              type:dossierType,
            })
          };
      
          const response = await fetch('/secretaire/api/creation', addData)
          const data = await response.json();
          if (data) {
            if (data.success) {
              window.location.reload();
              setLoading(false)
              setDossier('')
              setDefendeur('')
              setDemandeur('')
              setTribunal(0)
              setDate('')
              setMontant_a_payer(0)
              setCommentaire('')
              setPayement_unique('non')
              setSuccess('Enregistrement du dossier réussi')
              toggleModal(0);
            }
            else if (!data.success) {
              setLoading(false)
              setError(data.message)
            }
            else {
              setLoading(false)
              setError(data.message)
            }
          }
          else {
            setLoading(false)
            setError('Enregistrement du dossier échoué réessayer')
          }
        }
        else {
          setLoading(false)
          setError('Tous les champs doivent être completés')
        }
        
      }else{
        setLoading(false)
        setError('Ce tribunal éxiste déjà dans le système')
      }
      
    } catch (error) {
      console.log('error:', error)
      setError('Dossier non crée, erreur survenu lors de la création. Réessayer')
    }

  }

  const handleCheckTribunal = () => {
    if (tribunal) {
      const alreadyExistTrib = tribunals.find(prevTrib => prevTrib.nom.toLowerCase().trim() == tribunal.toLowerCase().trim()) !== undefined
      setAlreadyExist(alreadyExistTrib)
      if (alreadyExistTrib) {
        setError('Ce tribunal éxiste déjà dans le système')
      }
    }
  }

  useEffect(() => {
    console.log('firstki', session )
    console.log('formdata', formData)
    const fetchClients = async () => {
      const res = await fetch('/secretaire/api/fetchClients',{
        method:'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
        }),
      });
      const data = await res.json();
      setClients(data.data)
    };
    if(dossierType===2 || (item && item.type===2)){
    fetchClients();
    }
    if (formData[0] == '2' && formData[1] == '1' && formData[2] == '0') {
      setDemandeur('MINISTERE PUBLIC')
    }
    if (formData[0] == '2' && formData[1] == '2' && formData[2] == '0') {
      setDemandeur('MINISTERE PUBLIC')
    }
    if (formData[0] == '2' && formData[1] == '2' && formData[2] == '1' && formData[3] == '1') {
      setDemandeur('MINISTERE PUBLIC')
    }
    if (formData[0] == '2' && formData[1] == '1' && formData[2] == '1' && formData[3] == '2') {
      setDemandeur('MINISTERE PUBLIC')
    }
  }, [dossierType,item]);

  useEffect(()=>{
    console.log('itemout', item)
    if(item){
      setDossier(item.numero)
      setConsortDemandeur(item.demandeur)
      setDate(item.date_audience ? new Date(item.date_audience).toISOString().split('T')[0] : '')
      setTribunal(item.tribunal)
      setMontant_a_payer(item.montant)
      setPayement_unique(item.payement_unique === 1 ? 'oui':'non')
      if (dossierType === 2 || item.type === 2) {
        if (clients.length > 0) {
          const client = clients.find((c) => c.name === item.defendeur || c.id === item.defendeur);
          if (client) {
            setDefendeur(String(client.id)); 
          }
        }
      } else {
        setConsortDefendeur(item.defendeur);
      }
      setCommentaire(item.comment)
    }
  },[item,dossierType,clients])

  return (
    <div className="w-full h-full flex justify-center items-center absolute bg-slate-700 bg-opacity-25 z-25">
      <div className="w-[95%] md:w-[90%] lg:w-[85%] xl:w-[60%] h-[98%] md:h-[90%] lg:h-[98%] overflow-y-scroll relative flex flex-col space-y-4 bg-white rounded-md rounded-tr-2xl">
        <button
          onClick={toggleModal}
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
        <span className="flex justify-center text-lg font-bold text-black">
          {item ? 'Modifier le dossier':'Creez un nouveau dossier'}
        </span>
        <div className="w-[90%] lg:w-[95%] flex flex-col space-y-4 xl:space-y-1  mx-auto">
          <span className="text-red-600"> {error ? error : " "} </span>
          <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
          <div >
              <label
                htmlFor="first_name"
                className=" text-md md:text-xl font-medium text-slate-700"
              >
                Numero Du Dossier
              </label>
              <input
                type="text"
                value={dossier}
                onChange={(e) => setDossier(e.target.value)}
                className="border border-slate-700 text-slate-700 text-lg rounded-lg block w-full  h-9 md:h-8 lg:h-10 xl:h-9  p-1.5 md:p-2.5 xl:p-3 dark:placeholder-slate-700 focus:outline-none placeholder:text-sm"

              />
            </div>
          { (((dossierType === 1 ) || (item && item.type==1)) && formData[1] == '1') && formData[0] == '1' && formData[2] == '0' && (
           <>
            <div>
                <label
                  htmlFor="first_name"
                  className=" text-md md:text-xl font-medium text-slate-700"
                >
                Entrez le client  
                </label>
                <input
                  type="text"
                  value={demandeur}
                  onChange={(e) => setDemandeur(e.target.value)}
                  className="border border-slate-700 text-slate-700 text-lg rounded-lg block w-full  h-9 md:h-8 lg:h-10 xl:h-9  p-1.5 md:p-2.5 xl:p-3 dark:placeholder-slate-700 focus:outline-none placeholder:text-sm"
                  required
                />
              </div> 
              <div>
              <label
                htmlFor="first_name"
                className=" text-md md:text-xl font-medium text-slate-700"
              >
              Défendeur
              </label>
              <input
                type="text"
                value={defendeur==='0' ? '' : defendeur}
                onChange={(e) => setDefendeur(e.target.value)}
                className="border border-slate-700 text-slate-700 text-lg rounded-lg block w-full  h-9 md:h-8 lg:h-10 xl:h-9  p-1.5 md:p-2.5 xl:p-3 dark:placeholder-slate-700 focus:outline-none placeholder:text-sm"
                required
              />
            </div>
          </>)}

          { (((dossierType === 1 ) || (item && item.type==1)) && formData[1] == '1') && formData[0] == '1' && formData[2] == '1' && formData[3] == '1' && (
           <>
            <div>
                <label
                  htmlFor="first_name"
                  className=" text-md md:text-xl font-medium text-slate-700"
                >
                Entrez le client  
                </label>
                <textarea
                  type="text"
                  value={consortDemandeur}
                  onChange={(e) => setConsortDemandeur(e.target.value)}
                  className="border border-slate-700 text-slate-700 text-lg rounded-lg block w-full  h-9 md:h-8 lg:h-10 xl:h-9  p-1.5 md:p-2.5 xl:p-3 dark:placeholder-slate-700 focus:outline-none placeholder:text-sm"
                  required
                ></textarea>
              </div> 
              <div>
              <label
                htmlFor="first_name"
                className=" text-md md:text-xl font-medium text-slate-700"
              >
              Défendeur
              </label>
              <input
                type="text"
                value={defendeur==='0' ? '' : defendeur}
                onChange={(e) => setDefendeur(e.target.value)}
                className="border border-slate-700 text-slate-700 text-lg rounded-lg block w-full  h-9 md:h-8 lg:h-10 xl:h-9  p-1.5 md:p-2.5 xl:p-3 dark:placeholder-slate-700 focus:outline-none placeholder:text-sm"
                required
              />
            </div>
          </>)}

          { (((dossierType === 1 ) || (item && item.type==1)) && formData[1] == '1') && formData[0] == '1' && formData[2] == '1' && formData[3] == '2' &&(
           <>
            <div>
                <label
                  htmlFor="first_name"
                  className=" text-md md:text-xl font-medium text-slate-700"
                >
                Entrez le client  
                </label>
                <input
                  type="text"
                  value={demandeur}
                  onChange={(e) => setDemandeur(e.target.value)}
                  className="border border-slate-700 text-slate-700 text-lg rounded-lg block w-full  h-9 md:h-8 lg:h-10 xl:h-9  p-1.5 md:p-2.5 xl:p-3 dark:placeholder-slate-700 focus:outline-none placeholder:text-sm"
                  required
                />
              </div> 
              <div>
              <label
                htmlFor="first_name"
                className=" text-md md:text-xl font-medium text-slate-700"
              >
              Défendeur
              </label>
              <textarea
                type="text"
                value={consortDefendeur}
                onChange={(e) => setConsortDefendeur(e.target.value)}
                className="border border-slate-700 text-slate-700 text-lg rounded-lg block w-full  h-9 md:h-8 lg:h-10 xl:h-9  p-1.5 md:p-2.5 xl:p-3 dark:placeholder-slate-700 focus:outline-none placeholder:text-sm"
                required
              ></textarea>
            </div>
          </>)}

          { (((dossierType === 1 ) || (item && item.type==1)) && formData[1] == '1') && formData[0] == '1' && formData[2] == '1' && formData[3] == '3' && (
           <>
            <div>
                <label
                  htmlFor="first_name"
                  className=" text-md md:text-xl font-medium text-slate-700"
                >
                Entrez le client  
                </label>
                <textarea
                  type="text"
                  value={consortDemandeur}
                  onChange={(e) => setConsortDemandeur(e.target.value)}
                  className="border border-slate-700 text-slate-700 text-lg rounded-lg block w-full  h-9 md:h-8 lg:h-10 xl:h-9  p-1.5 md:p-2.5 xl:p-3 dark:placeholder-slate-700 focus:outline-none placeholder:text-sm"
                  required
                ></textarea>
              </div> 
              <div>
              <label
                htmlFor="first_name"
                className=" text-md md:text-xl font-medium text-slate-700"
              >
              Défendeur
              </label>
              <textarea
                type="text"
                value={consortDefendeur}
                onChange={(e) => setConsortDefendeur(e.target.value)}
                className="border border-slate-700 text-slate-700 text-lg rounded-lg block w-full  h-9 md:h-8 lg:h-10 xl:h-9  p-1.5 md:p-2.5 xl:p-3 dark:placeholder-slate-700 focus:outline-none placeholder:text-sm"
                required
              ></textarea>
            </div>
          </>)}

          { (((dossierType === 1 ) || (item && item.type==1)) && formData[1] == '1') && formData[0] == '2' && formData[2] == '0' && (<>
          <div>
                <label
                  htmlFor="first_name"
                  className=" text-md md:text-xl font-medium text-slate-700"
                >
                Le client  
                </label>
                <input
                  type="text"
                  value={demandeur}
                  // onChange={(e) => setDemandeur(e.target.value)}
                  className="border border-slate-700 text-slate-700 text-lg rounded-lg block w-full  h-9 md:h-8 lg:h-10 xl:h-9  p-1.5 md:p-2.5 xl:p-3 dark:placeholder-slate-700 focus:outline-none placeholder:text-sm"
                  required
                  disabled
                />
              </div> 
              <div>
              <label
                htmlFor="first_name"
                className=" text-md md:text-xl font-medium text-slate-700"
              >
              Défendeur
              </label>
              <input
                type="text"
                value={defendeur==='0' ? '' : defendeur}
                onChange={(e) => setDefendeur(e.target.value)}
                className="border border-slate-700 text-slate-700 text-lg rounded-lg block w-full  h-9 md:h-8 lg:h-10 xl:h-9  p-1.5 md:p-2.5 xl:p-3 dark:placeholder-slate-700 focus:outline-none placeholder:text-sm"
                required
              />
            </div>
          </>)
          }

          { (((dossierType === 1 ) || (item && item.type==1)) && formData[1] == '1') && formData[0] == '2' && formData[2] == '1' && formData[3] == '1' && (<>
          <div>
                <label
                  htmlFor="first_name"
                  className=" text-md md:text-xl font-medium text-slate-700"
                >
                Le client  
                </label>
                <textarea
                  type="text"
                  value={consortDemandeur}
                  onChange={(e) => setConsortDemandeur(e.target.value)}
                  className="border border-slate-700 text-slate-700 text-lg rounded-lg block w-full  h-9 md:h-8 lg:h-10 xl:h-9  p-1.5 md:p-2.5 xl:p-3 dark:placeholder-slate-700 focus:outline-none placeholder:text-sm"
                  required
                ></textarea>
              </div> 
              <div>
              <label
                htmlFor="first_name"
                className=" text-md md:text-xl font-medium text-slate-700"
              >
              Défendeur
              </label>
              <input
                type="text"
                value={defendeur==='0' ? '' : defendeur}
                onChange={(e) => setDefendeur(e.target.value)}
                className="border border-slate-700 text-slate-700 text-lg rounded-lg block w-full  h-9 md:h-8 lg:h-10 xl:h-9  p-1.5 md:p-2.5 xl:p-3 dark:placeholder-slate-700 focus:outline-none placeholder:text-sm"
                required
              />
            </div>
          </>)
          }

          { (((dossierType === 1 ) || (item && item.type==1)) && formData[1] == '1') && formData[0] == '2' && formData[2] == '1' && formData[3] == '2' && (<>
          <div>
                <label
                  htmlFor="first_name"
                  className=" text-md md:text-xl font-medium text-slate-700"
                >
                Le client  
                </label>
                <input
                  type="text"
                  value={demandeur}
                  // onChange={(e) => setDemandeur(e.target.value)}
                  className="border border-slate-700 text-slate-700 text-lg rounded-lg block w-full  h-9 md:h-8 lg:h-10 xl:h-9  p-1.5 md:p-2.5 xl:p-3 dark:placeholder-slate-700 focus:outline-none placeholder:text-sm"
                  required
                  disabled
                />
              </div> 
              <div>
              <label
                htmlFor="first_name"
                className=" text-md md:text-xl font-medium text-slate-700"
              >
              Défendeur
              </label>
              <textarea
                type="text"
                value={consortDefendeur}
                onChange={(e) => setConsortDefendeur(e.target.value)}
                className="border border-slate-700 text-slate-700 text-lg rounded-lg block w-full  h-9 md:h-8 lg:h-10 xl:h-9  p-1.5 md:p-2.5 xl:p-3 dark:placeholder-slate-700 focus:outline-none placeholder:text-sm"
                required
              ></textarea>
            </div>
          </>)
          }

          { (((dossierType === 1 ) || (item && item.type==1)) && formData[1] == '1') && formData[0] == '2' && formData[2] == '1' && formData[3] == '3' && (<>
          <div>
                <label
                  htmlFor="first_name"
                  className=" text-md md:text-xl font-medium text-slate-700"
                >
                Le client  
                </label>
                <textarea
                  type="text"
                  value={consortDemandeur}
                  onChange={(e) => setConsortDemandeur(e.target.value)}
                  className="border border-slate-700 text-slate-700 text-lg rounded-lg block w-full  h-9 md:h-8 lg:h-10 xl:h-9  p-1.5 md:p-2.5 xl:p-3 dark:placeholder-slate-700 focus:outline-none placeholder:text-sm"
                  required
                ></textarea>
              </div> 
              <div>
              <label
                htmlFor="first_name"
                className=" text-md md:text-xl font-medium text-slate-700"
              >
              Défendeur
              </label>
              <textarea
                type="text"
                value={consortDefendeur}
                onChange={(e) => setConsortDefendeur(e.target.value)}
                className="border border-slate-700 text-slate-700 text-lg rounded-lg block w-full  h-9 md:h-8 lg:h-10 xl:h-9  p-1.5 md:p-2.5 xl:p-3 dark:placeholder-slate-700 focus:outline-none placeholder:text-sm"
              ></textarea>
            </div>
          </>)
          }

          { (((dossierType === 1 ) || (item && item.type==1)) && formData[1] == '2')  && formData[0] == '1' && formData[2] == '0' &&  (
           <>
            <div>
              <label
                htmlFor="first_name"
                className=" text-md md:text-xl font-medium text-slate-700"
              >
              Demandeur
              </label>
              <input
                type="text"
                value={demandeur}
                onChange={(e) => setDemandeur(e.target.value)}
                className="border border-slate-700 text-slate-700 text-lg rounded-lg block w-full  h-9 md:h-8 lg:h-10 xl:h-9  p-1.5 md:p-2.5 xl:p-3 dark:placeholder-slate-700 focus:outline-none placeholder:text-sm"
                required
              />
              </div> 
              <div>
              <label
                htmlFor="first_name"
                className=" text-md md:text-xl font-medium text-slate-700"
              >
              Entrez le client
              </label>
              <input
                type="text"
                value={defendeur==='0' ? '' : defendeur}
                onChange={(e) => setDefendeur(e.target.value)}
                className="border border-slate-700 text-slate-700 text-lg rounded-lg block w-full  h-9 md:h-8 lg:h-10 xl:h-9  p-1.5 md:p-2.5 xl:p-3 dark:placeholder-slate-700 focus:outline-none placeholder:text-sm"
                required
              />
            </div>
          </>)}

          { (((dossierType === 1 ) || (item && item.type==1)) && formData[1] == '2')  && formData[0] == '1' && formData[2] == '1' && formData[3] == '1' && (
           <>
            <div>
              <label
                htmlFor="first_name"
                className=" text-md md:text-xl font-medium text-slate-700"
              >
              Demandeur
              </label>
              <input
                type="text"
                value={demandeur}
                onChange={(e) => setDemandeur(e.target.value)}
                className="border border-slate-700 text-slate-700 text-lg rounded-lg block w-full  h-9 md:h-8 lg:h-10 xl:h-9  p-1.5 md:p-2.5 xl:p-3 dark:placeholder-slate-700 focus:outline-none placeholder:text-sm"
                required
              />
              </div> 
              <div>
              <label
                htmlFor="first_name"
                className=" text-md md:text-xl font-medium text-slate-700"
              >
              Entrez le client
              </label>
              <textarea
                type="text"
                value={consortDefendeur}
                onChange={(e) => setConsortDefendeur(e.target.value)}
                className="border border-slate-700 text-slate-700 text-lg rounded-lg block w-full  h-9 md:h-8 lg:h-10 xl:h-9  p-1.5 md:p-2.5 xl:p-3 dark:placeholder-slate-700 focus:outline-none placeholder:text-sm"
                required
              ></textarea>
            </div>
          </>)}

          { (((dossierType === 1 ) || (item && item.type==1)) && formData[1] == '2')  && formData[0] == '1' && formData[2] == '1' && formData[3] == '2' && (
           <>
            <div>
              <label
                htmlFor="first_name"
                className=" text-md md:text-xl font-medium text-slate-700"
              >
              Demandeur
              </label>
              <textarea
                type="text"
                value={consortDemandeur}
                onChange={(e) => setConsortDemandeur(e.target.value)}
                className="border border-slate-700 text-slate-700 text-lg rounded-lg block w-full  h-9 md:h-8 lg:h-10 xl:h-9  p-1.5 md:p-2.5 xl:p-3 dark:placeholder-slate-700 focus:outline-none placeholder:text-sm"
                required
              ></textarea>
              </div> 
              <div>
              <label
                htmlFor="first_name"
                className=" text-md md:text-xl font-medium text-slate-700"
              >
              Entrez le client
              </label>
              <input
                type="text"
                value={defendeur === '0' ? '' : defendeur}
                onChange={(e) => setDefendeur(e.target.value)}
                className="border border-slate-700 text-slate-700 text-lg rounded-lg block w-full  h-9 md:h-8 lg:h-10 xl:h-9  p-1.5 md:p-2.5 xl:p-3 dark:placeholder-slate-700 focus:outline-none placeholder:text-sm"
                required
              />
            </div>
          </>)}

          { (((dossierType === 1 ) || (item && item.type==1)) && formData[1] == '2')  && formData[0] == '1' && formData[2] == '1' && formData[3] == '3' && (
           <>
            <div>
              <label
                htmlFor="first_name"
                className=" text-md md:text-xl font-medium text-slate-700"
              >
              Demandeur
              </label>
              <textarea
                type="text"
                value={consortDemandeur}
                onChange={(e) => setConsortDemandeur(e.target.value)}
                className="border border-slate-700 text-slate-700 text-lg rounded-lg block w-full  h-9 md:h-8 lg:h-10 xl:h-9  p-1.5 md:p-2.5 xl:p-3 dark:placeholder-slate-700 focus:outline-none placeholder:text-sm"
                required
              ></textarea>
              </div> 
              <div>
              <label
                htmlFor="first_name"
                className=" text-md md:text-xl font-medium text-slate-700"
              >
              Entrez le client
              </label>
              <textarea
                type="text"
                value={consortDefendeur}
                onChange={(e) => setConsortDefendeur(e.target.value)}
                className="border border-slate-700 text-slate-700 text-lg rounded-lg block w-full  h-9 md:h-8 lg:h-10 xl:h-9  p-1.5 md:p-2.5 xl:p-3 dark:placeholder-slate-700 focus:outline-none placeholder:text-sm"
                required
              ></textarea>
            </div>
          </>)}

          { (((dossierType === 1 ) || (item && item.type==1)) && formData[1] == '2')  && formData[0] == '2' && formData[2] == '0' && (
           <>
            <div>
              <label
                htmlFor="first_name"
                className=" text-md md:text-xl font-medium text-slate-700"
              >
              Demandeur
              </label>
              <input
                type="text"
                value={demandeur}
                // onChange={(e) => setDemandeur(e.target.value)}
                className="border border-slate-700 text-slate-700 text-lg rounded-lg block w-full  h-9 md:h-8 lg:h-10 xl:h-9  p-1.5 md:p-2.5 xl:p-3 dark:placeholder-slate-700 focus:outline-none placeholder:text-sm"
                required
                disabled
              />
              </div> 
              <div>
              <label
                htmlFor="first_name"
                className=" text-md md:text-xl font-medium text-slate-700"
              >
              Le client
              </label>
              <input
                type="text"
                value={defendeur==='0' ? '' : defendeur}
                onChange={(e) => setDefendeur(e.target.value)}
                className="border border-slate-700 text-slate-700 text-lg rounded-lg block w-full  h-9 md:h-8 lg:h-10 xl:h-9  p-1.5 md:p-2.5 xl:p-3 dark:placeholder-slate-700 focus:outline-none placeholder:text-sm"
                required
              />
            </div>
          </>)
          }

         { (((dossierType === 1 ) || (item && item.type==1)) && formData[1] == '2')  && formData[0] == '2' && formData[2] == '1' && formData[3] == '1' && (
           <>
            <div>
              <label
                htmlFor="first_name"
                className=" text-md md:text-xl font-medium text-slate-700"
              >
              Demandeur
              </label>
              <input
                type="text"
                value={demandeur}
                onChange={(e) => setDemandeur(e.target.value)}
                className="border border-slate-700 text-slate-700 text-lg rounded-lg block w-full  h-9 md:h-8 lg:h-10 xl:h-9  p-1.5 md:p-2.5 xl:p-3 dark:placeholder-slate-700 focus:outline-none placeholder:text-sm"
                required
              />
              </div> 
              <div>
              <label
                htmlFor="first_name"
                className=" text-md md:text-xl font-medium text-slate-700"
              >
              Le client
              </label>
              <textarea
                type="text"
                value={consortDefendeur}
                onChange={(e) => setConsortDefendeur(e.target.value)}
                className="border border-slate-700 text-slate-700 text-lg rounded-lg block w-full  h-9 md:h-8 lg:h-10 xl:h-9  p-1.5 md:p-2.5 xl:p-3 dark:placeholder-slate-700 focus:outline-none placeholder:text-sm"
                required
              ></textarea>
            </div>
          </>)
        }

         { (((dossierType === 1 ) || (item && item.type==1)) && formData[1] == '2')  && formData[0] == '2' && formData[2] == '1' && formData[3] == '2' && (
           <>
            <div>
              <label
                htmlFor="first_name"
                className=" text-md md:text-xl font-medium text-slate-700"
              >
              Demandeur
              </label>
              <textarea
                type="text"
                value={consortDemandeur}
                onChange={(e) => setConsortDemandeur(e.target.value)}
                className="border border-slate-700 text-slate-700 text-lg rounded-lg block w-full  h-9 md:h-8 lg:h-10 xl:h-9  p-1.5 md:p-2.5 xl:p-3 dark:placeholder-slate-700 focus:outline-none placeholder:text-sm"
                required
              ></textarea>
              </div> 
              <div>
              <label
                htmlFor="first_name"
                className=" text-md md:text-xl font-medium text-slate-700"
              >
              Entrez le client
              </label>
              <input
                type="text"
                value={defendeur==='0' ? '' : defendeur}
                onChange={(e) => setDefendeur(e.target.value)}
                className="border border-slate-700 text-slate-700 text-lg rounded-lg block w-full  h-9 md:h-8 lg:h-10 xl:h-9  p-1.5 md:p-2.5 xl:p-3 dark:placeholder-slate-700 focus:outline-none placeholder:text-sm"
                required
              />
            </div>
          </>)
        }

         { (((dossierType === 1 ) || (item && item.type==1)) && formData[1] == '2')  && formData[0] == '2' && formData[2] == '1' && formData[3] == '3' && (
           <>
            <div>
              <label
                htmlFor="first_name"
                className=" text-md md:text-xl font-medium text-slate-700"
              >
              Demandeur
              </label>
              <textarea
                type="text"
                value={consortDemandeur}
                onChange={(e) => setConsortDemandeur(e.target.value)}
                className="border border-slate-700 text-slate-700 text-lg rounded-lg block w-full  h-9 md:h-8 lg:h-10 xl:h-9  p-1.5 md:p-2.5 xl:p-3 dark:placeholder-slate-700 focus:outline-none placeholder:text-sm"
                required
              ></textarea>
              </div> 
              <div>
              <label
                htmlFor="first_name"
                className=" text-md md:text-xl font-medium text-slate-700"
              >
              Entrez le client
              </label>
              <textarea
                type="text"
                value={consortDefendeur}
                onChange={(e) => setConsortDefendeur(e.target.value)}
                className="border border-slate-700 text-slate-700 text-lg rounded-lg block w-full  h-9 md:h-8 lg:h-10 xl:h-9  p-1.5 md:p-2.5 xl:p-3 dark:placeholder-slate-700 focus:outline-none placeholder:text-sm"
                required
              />
            </div>
          </>)
          }

        { (((dossierType === 2 )|| (item && item.type==2)) && formData[1] == '2') && formData[0] == '1' && formData[2] == '0' && (
          <>
            <div>
              <label
                htmlFor="first_name"
                className=" text-md md:text-xl font-medium text-slate-700"
              >
              Demandeur
              </label>
              <input
                type="text"
                value={demandeur}
                onChange={(e) => setDemandeur(e.target.value)}
                className="border border-slate-700 text-slate-700 text-lg rounded-lg block w-full  h-9 md:h-8 lg:h-10 xl:h-9  p-1.5 md:p-2.5 xl:p-3 dark:placeholder-slate-700 focus:outline-none placeholder:text-sm"
                required
              />
            </div> 
            <div>
              <label
                htmlFor="first_name"
                className=" text-md md:text-xl font-medium text-slate-700"
              >
              Selectionner le client
              </label>
              <select
                value={defendeur !='0' ? defendeur : ''}
                onChange={(e) => setDefendeur(e.target.value)}
                id="defendeur"
                className="border border-slate-700 text-slate-700 text-lg rounded-lg block w-full  h-9 md:h-10 lg:h-12 xl:h-12  p-1.5 md:p-2.5 xl:p-3 dark:placeholder-slate-700 focus:outline-none placeholder:text-sm"
              >
                <option disabled value='0'>
                  -- Client --
                </option>
                  {clients?.map((value,index)=>{
                    return (
                      <option key={index} value={value.id} 
                      >
                      {value.name}
                    </option>
                    ) 
                    })}
              </select>
            </div>
          </>
        )}

        { (((dossierType === 2 )|| (item && item.type==2)) && formData[1] == '2') && formData[0] == '1' && formData[2] == '1' && formData[3] == '1' && (
          <>
            <div>
              <label
                htmlFor="first_name"
                className=" text-md md:text-xl font-medium text-slate-700"
              >
              Demandeur
              </label>
              <input
                type="text"
                value={demandeur}
                onChange={(e) => setDemandeur(e.target.value)}
                className="border border-slate-700 text-slate-700 text-lg rounded-lg block w-full  h-9 md:h-8 lg:h-10 xl:h-9  p-1.5 md:p-2.5 xl:p-3 dark:placeholder-slate-700 focus:outline-none placeholder:text-sm"
                required
              />
            </div> 
            <div>
              <label
                htmlFor="first_name"
                className=" text-md md:text-xl font-medium text-slate-700"
              >
              Entrer le client
              </label>
              <textarea
                value={consortDefendeur}
                onChange={(e) => setConsortDefendeur(e.target.value)}
                className="border border-slate-700 text-slate-700 text-lg rounded-lg block w-full  h-9 md:h-10 lg:h-12 xl:h-12  p-1.5 md:p-2.5 xl:p-3 dark:placeholder-slate-700 focus:outline-none placeholder:text-sm"
              ></textarea>
            </div>
          </>
        )}

        { (((dossierType === 2 )|| (item && item.type==2)) && formData[1] == '2') && formData[0] == '1' && formData[2] == '1' && formData[3] == '2' && (
          <>
            <div>
              <label
                htmlFor="first_name"
                className=" text-md md:text-xl font-medium text-slate-700"
              >
              Demandeur
              </label>
              <textarea
                type="text"
                value={consortDemandeur}
                onChange={(e) => setConsortDemandeur(e.target.value)}
                className="border border-slate-700 text-slate-700 text-lg rounded-lg block w-full  h-9 md:h-8 lg:h-10 xl:h-9  p-1.5 md:p-2.5 xl:p-3 dark:placeholder-slate-700 focus:outline-none placeholder:text-sm"
                required
              ></textarea>
            </div> 
            <div>
              <label
                htmlFor="first_name"
                className=" text-md md:text-xl font-medium text-slate-700"
              >
              Selectionner le client
              </label>
              <select
                value={defendeur !='0' ? defendeur : ''}
                onChange={(e) => setDefendeur(e.target.value)}
                id="defendeur"
                className="border border-slate-700 text-slate-700 text-lg rounded-lg block w-full  h-9 md:h-10 lg:h-12 xl:h-12  p-1.5 md:p-2.5 xl:p-3 dark:placeholder-slate-700 focus:outline-none placeholder:text-sm"
              >
                <option disabled value='0'>
                  -- Client --
                </option>
                  {clients?.map((value,index)=>{
                    return (
                      <option key={index} value={value.id} 
                      >
                      {value.name}
                    </option>
                    ) 
                    })}
              </select>
            </div>
          </>
        )}

        { (((dossierType === 2 )|| (item && item.type==2)) && formData[1] == '2') && formData[0] == '1' && formData[2] == '1' && formData[3] == '3' && (
          <>
            <div>
              <label
                htmlFor="first_name"
                className=" text-md md:text-xl font-medium text-slate-700"
              >
              Demandeur
              </label>
              <textarea
                type="text"
                value={consortDemandeur}
                onChange={(e) => setConsortDemandeur(e.target.value)}
                className="border border-slate-700 text-slate-700 text-lg rounded-lg block w-full  h-9 md:h-8 lg:h-10 xl:h-9  p-1.5 md:p-2.5 xl:p-3 dark:placeholder-slate-700 focus:outline-none placeholder:text-sm"
                required
              ></textarea>
            </div> 
            <div>
              <label
                htmlFor="first_name"
                className=" text-md md:text-xl font-medium text-slate-700"
              >
              Selectionner le client
              </label>
              <textarea
                value={consortDefendeur}
                onChange={(e) => setConsortDefendeur(e.target.value)}
                className="border border-slate-700 text-slate-700 text-lg rounded-lg block w-full  h-9 md:h-10 lg:h-12 xl:h-12  p-1.5 md:p-2.5 xl:p-3 dark:placeholder-slate-700 focus:outline-none placeholder:text-sm"
              ></textarea>
            </div>
          </>
        )}

        { (((dossierType === 2 )|| (item && item.type==2)) && formData[1] == '2') && formData[0] == '2' && formData[2] == '0' && (
          <>
            <div>
              <label
                htmlFor="first_name"
                className=" text-md md:text-xl font-medium text-slate-700"
              >
              Demandeur
              </label>
              <input
                type="text"
                value={demandeur}
                // onChange={(e) => setDemandeur(e.target.value)}
                className="border border-slate-700 text-slate-700 text-lg rounded-lg block w-full  h-9 md:h-8 lg:h-10 xl:h-9  p-1.5 md:p-2.5 xl:p-3 dark:placeholder-slate-700 focus:outline-none placeholder:text-sm"
                required
              />
            </div> 
            <div>
              <label
                htmlFor="first_name"
                className=" text-md md:text-xl font-medium text-slate-700"
              >
              Selectionner le client
              </label>
              <select
                value={defendeur !='0' ? defendeur : ''}
                onChange={(e) => setDefendeur(e.target.value)}
                id="defendeur"
                className="border border-slate-700 text-slate-700 text-lg rounded-lg block w-full  h-9 md:h-10 lg:h-12 xl:h-12  p-1.5 md:p-2.5 xl:p-3 dark:placeholder-slate-700 focus:outline-none placeholder:text-sm"
              >
                <option disabled value='0'>
                  -- Client --
                </option>
                  {clients?.map((value,index)=>{
                    return (
                      <option key={index} value={value.id} 
                      >
                      {value.name}
                    </option>
                    ) 
                    })}
              </select>
            </div>
          </>
        )}

        { (((dossierType === 2 )|| (item && item.type==2)) && formData[1] == '2') && formData[0] == '2' && formData[2] == '1' && formData[3] == '1' && (
          <>
            <div>
              <label
                htmlFor="first_name"
                className=" text-md md:text-xl font-medium text-slate-700"
              >
              Demandeur
              </label>
              <input
                type="text"
                value={demandeur}
                // onChange={(e) => setDemandeur(e.target.value)}
                className="border border-slate-700 text-slate-700 text-lg rounded-lg block w-full  h-9 md:h-8 lg:h-10 xl:h-9  p-1.5 md:p-2.5 xl:p-3 dark:placeholder-slate-700 focus:outline-none placeholder:text-sm"
                required
              />
            </div> 
            <div>
              <label
                htmlFor="first_name"
                className=" text-md md:text-xl font-medium text-slate-700"
              >
              Entrer le client
              </label>
              <textarea
                value={consortDefendeur}
                onChange={(e) => setConsortDefendeur(e.target.value)}
                className="border border-slate-700 text-slate-700 text-lg rounded-lg block w-full  h-9 md:h-10 lg:h-12 xl:h-12  p-1.5 md:p-2.5 xl:p-3 dark:placeholder-slate-700 focus:outline-none placeholder:text-sm"
              ></textarea>
            </div>
          </>
        )}

        { (((dossierType === 2 )|| (item && item.type==2)) && formData[1] == '2') && formData[0] == '2' && formData[2] == '1' && formData[3] == '2' && (
          <>
            <div>
              <label
                htmlFor="first_name"
                className=" text-md md:text-xl font-medium text-slate-700"
              >
              Demandeur
              </label>
              <textarea
                type="text"
                value={consortDemandeur}
                onChange={(e) => setConsortDemandeur(e.target.value)}
                className="border border-slate-700 text-slate-700 text-lg rounded-lg block w-full  h-9 md:h-8 lg:h-10 xl:h-9  p-1.5 md:p-2.5 xl:p-3 dark:placeholder-slate-700 focus:outline-none placeholder:text-sm"
                required
              ></textarea>
            </div> 
            <div>
              <label
                htmlFor="first_name"
                className=" text-md md:text-xl font-medium text-slate-700"
              >
              Selectionner le client
              </label>
              <select
                value={defendeur !='0' ? defendeur : ''}
                onChange={(e) => setDefendeur(e.target.value)}
                id="defendeur"
                className="border border-slate-700 text-slate-700 text-lg rounded-lg block w-full  h-9 md:h-10 lg:h-12 xl:h-12  p-1.5 md:p-2.5 xl:p-3 dark:placeholder-slate-700 focus:outline-none placeholder:text-sm"
              >
                <option disabled value='0'>
                  -- Client --
                </option>
                  {clients?.map((value,index)=>{
                    return (
                      <option key={index} value={value.id} 
                      >
                      {value.name}
                    </option>
                    ) 
                    })}
              </select>
            </div>
          </>
        )}

        { (((dossierType === 2 )|| (item && item.type==2)) && formData[1] == '2') && formData[0] == '2' && formData[2] == '1' && formData[3] == '3' && (
          <>
           <div>
              <label
                htmlFor="first_name"
                className=" text-md md:text-xl font-medium text-slate-700"
              >
              Demandeur
              </label>
              <textarea
                type="text"
                value={consortDemandeur}
                onChange={(e) => setConsortDemandeur(e.target.value)}
                className="border border-slate-700 text-slate-700 text-lg rounded-lg block w-full  h-9 md:h-8 lg:h-10 xl:h-9  p-1.5 md:p-2.5 xl:p-3 dark:placeholder-slate-700 focus:outline-none placeholder:text-sm"
                required
              ></textarea>
            </div> 
            <div>
              <label
                htmlFor="first_name"
                className=" text-md md:text-xl font-medium text-slate-700"
              >
              Entrer le client
              </label>
              <textarea
                value={consortDefendeur}
                onChange={(e) => setConsortDefendeur(e.target.value)}
                className="border border-slate-700 text-slate-700 text-lg rounded-lg block w-full  h-9 md:h-10 lg:h-12 xl:h-12  p-1.5 md:p-2.5 xl:p-3 dark:placeholder-slate-700 focus:outline-none placeholder:text-sm"
              ></textarea>
            </div>
          </>
        )}

        { (((dossierType === 2 )|| (item && item.type==2)) && formData[1] == '1') && formData[0] == '1' && formData[2] == '0' && (
          <>
            <div>
              <label
                htmlFor="first_name"
                className=" text-md md:text-xl font-medium text-slate-700"
              >
              Selectionner le client
              </label>
              <select
                value={demandeur !='0' ? demandeur : ''}
                onChange={(e) => setDemandeur(e.target.value)}
                id="defendeur"
                className="border border-slate-700 text-slate-700 text-lg rounded-lg block w-full  h-9 md:h-10 lg:h-12 xl:h-12  p-1.5 md:p-2.5 xl:p-3 dark:placeholder-slate-700 focus:outline-none placeholder:text-sm"
              >
                <option disabled value='0'>
                  -- Client --
                </option>
                {clients?.map((value,index)=>{
                  return (
                    <option key={index} value={value.id} 
                    >
                    {value.name}
                  </option>
                  ) 
                  })}
              </select>
            </div>
            <div>
              <label
                htmlFor="first_name"
                className=" text-md md:text-xl font-medium text-slate-700"
              >
              Défendeur
              </label>
              <input
                type="text"
                value={defendeur != '0' ? defendeur : ''}
                onChange={(e) => setDefendeur(e.target.value)}
                className="border border-slate-700 text-slate-700 text-lg rounded-lg block w-full  h-9 md:h-8 lg:h-10 xl:h-9  p-1.5 md:p-2.5 xl:p-3 dark:placeholder-slate-700 focus:outline-none placeholder:text-sm"
                required
              />
            </div> 
          </>
        )} 

        { (((dossierType === 2 )|| (item && item.type==2)) && formData[1] == '1') && formData[0] == '1' && formData[2] == '1' && formData[3] == '1' && (
          <>
            <div>
              <label
                htmlFor="first_name"
                className=" text-md md:text-xl font-medium text-slate-700"
              >
              Enter le client
              </label>
              <textarea
                value={consortDemandeur}
                onChange={(e) => setConsortDemandeur(e.target.value)}
                className="border border-slate-700 text-slate-700 text-lg rounded-lg block w-full  h-9 md:h-10 lg:h-12 xl:h-12  p-1.5 md:p-2.5 xl:p-3 dark:placeholder-slate-700 focus:outline-none placeholder:text-sm"
              ></textarea>
            </div>
            <div>
              <label
                htmlFor="first_name"
                className=" text-md md:text-xl font-medium text-slate-700"
              >
              Défendeur
              </label>
              <input
                type="text"
                value={defendeur != '0' ? defendeur : ''}
                onChange={(e) => setDefendeur(e.target.value)}
                className="border border-slate-700 text-slate-700 text-lg rounded-lg block w-full  h-9 md:h-8 lg:h-10 xl:h-9  p-1.5 md:p-2.5 xl:p-3 dark:placeholder-slate-700 focus:outline-none placeholder:text-sm"
                required
              />
            </div> 
          </>
        )} 

        { (((dossierType === 2 )|| (item && item.type==2)) && formData[1] == '1') && formData[0] == '1' && formData[2] == '1' && formData[3] == '2' && (
          <>
            <div>
              <label
                htmlFor="first_name"
                className=" text-md md:text-xl font-medium text-slate-700"
              >
              Selectionner le client
              </label>
              <select
                value={demandeur !='0' ? demandeur : ''}
                onChange={(e) => setDemandeur(e.target.value)}
                id="defendeur"
                className="border border-slate-700 text-slate-700 text-lg rounded-lg block w-full  h-9 md:h-10 lg:h-12 xl:h-12  p-1.5 md:p-2.5 xl:p-3 dark:placeholder-slate-700 focus:outline-none placeholder:text-sm"
              >
                <option disabled value='0'>
                  -- Client --
                </option>
                {clients?.map((value,index)=>{
                  return (
                    <option key={index} value={value.id} 
                    >
                    {value.name}
                  </option>
                  ) 
                  })}
              </select>
            </div>
            <div>
              <label
                htmlFor="first_name"
                className=" text-md md:text-xl font-medium text-slate-700"
              >
              Défendeur
              </label>
              <textarea
                type="text"
                value={consortDefendeur}
                onChange={(e) => setConsortDefendeur(e.target.value)}
                className="border border-slate-700 text-slate-700 text-lg rounded-lg block w-full  h-9 md:h-8 lg:h-10 xl:h-9  p-1.5 md:p-2.5 xl:p-3 dark:placeholder-slate-700 focus:outline-none placeholder:text-sm"
                required
              ></textarea>
            </div> 
          </>
        )} 

        { (((dossierType === 2 )|| (item && item.type==2)) && formData[1] == '1') && formData[0] == '1' && formData[2] == '1' && formData[3] == '3' && (
          <>
            <div>
              <label
                htmlFor="first_name"
                className=" text-md md:text-xl font-medium text-slate-700"
              >
              Entrer le client
              </label>
              <textarea
                value={consortDemandeur}
                onChange={(e) => setConsortDemandeur(e.target.value)}
                className="border border-slate-700 text-slate-700 text-lg rounded-lg block w-full  h-9 md:h-10 lg:h-12 xl:h-12  p-1.5 md:p-2.5 xl:p-3 dark:placeholder-slate-700 focus:outline-none placeholder:text-sm"
              ></textarea>
            </div>
            <div>
              <label
                htmlFor="first_name"
                className=" text-md md:text-xl font-medium text-slate-700"
              >
              Défendeur
              </label>
              <textarea
                type="text"
                value={consortDefendeur}
                onChange={(e) => setConsortDefendeur(e.target.value)}
                className="border border-slate-700 text-slate-700 text-lg rounded-lg block w-full  h-9 md:h-8 lg:h-10 xl:h-9  p-1.5 md:p-2.5 xl:p-3 dark:placeholder-slate-700 focus:outline-none placeholder:text-sm"
                required
              ></textarea>
            </div> 
          </>
        )} 

        { (((dossierType === 2 )|| (item && item.type==2)) && formData[1] == '1') && formData[0] == '2' && formData[2] == '0' && (
          <>
            <div>
              <label
                htmlFor="first_name"
                className=" text-md md:text-xl font-medium text-slate-700"
              >
              Le client
              </label>
              <input
                type="text"
                value={demandeur}
                // onChange={(e) => setDefendeur(e.target.value)}
                className="border border-slate-700 text-slate-700 text-lg rounded-lg block w-full  h-9 md:h-8 lg:h-10 xl:h-9  p-1.5 md:p-2.5 xl:p-3 dark:placeholder-slate-700 focus:outline-none placeholder:text-sm"
                required
                disabled
              />
            </div>
            <div>
              <label
                htmlFor="first_name"
                className=" text-md md:text-xl font-medium text-slate-700"
              >
              Défendeur
              </label>
              <input
                type="text"
                value={defendeur != '0' ? defendeur : ''}
                onChange={(e) => setDefendeur(e.target.value)}
                className="border border-slate-700 text-slate-700 text-lg rounded-lg block w-full  h-9 md:h-8 lg:h-10 xl:h-9  p-1.5 md:p-2.5 xl:p-3 dark:placeholder-slate-700 focus:outline-none placeholder:text-sm"
                required
              />
            </div> 
          </>
        )}

        { (((dossierType === 2 )|| (item && item.type==2)) && formData[1] == '1') && formData[0] == '2' && formData[2] == '1' && formData[3] == '1' && (
          <>
            <div>
              <label
                htmlFor="first_name"
                className=" text-md md:text-xl font-medium text-slate-700"
              >
              Le client
              </label>
              <textarea
                type="text"
                value={consortDemandeur}
                onChange={(e) => setConsortDemandeur(e.target.value)}
                className="border border-slate-700 text-slate-700 text-lg rounded-lg block w-full  h-9 md:h-8 lg:h-10 xl:h-9  p-1.5 md:p-2.5 xl:p-3 dark:placeholder-slate-700 focus:outline-none placeholder:text-sm"
                required
              ></textarea>
            </div>
            <div>
              <label
                htmlFor="first_name"
                className=" text-md md:text-xl font-medium text-slate-700"
              >
              Défendeur
              </label>
              <input
                type="text"
                value={defendeur != '0' ? defendeur : ''}
                onChange={(e) => setDefendeur(e.target.value)}
                className="border border-slate-700 text-slate-700 text-lg rounded-lg block w-full  h-9 md:h-8 lg:h-10 xl:h-9  p-1.5 md:p-2.5 xl:p-3 dark:placeholder-slate-700 focus:outline-none placeholder:text-sm"
                required
              />
            </div> 
          </>
        )}

        { (((dossierType === 2 )|| (item && item.type==2)) && formData[1] == '1') && formData[0] == '2' && formData[2] == '1' && formData[3] == '2' && (
          <>
            <div>
              <label
                htmlFor="first_name"
                className=" text-md md:text-xl font-medium text-slate-700"
              >
              Le client
              </label>
              <input
                type="text"
                value={demandeur}
                // onChange={(e) => setDefendeur(e.target.value)}
                className="border border-slate-700 text-slate-700 text-lg rounded-lg block w-full  h-9 md:h-8 lg:h-10 xl:h-9  p-1.5 md:p-2.5 xl:p-3 dark:placeholder-slate-700 focus:outline-none placeholder:text-sm"
                required
              />
            </div>
            <div>
              <label
                htmlFor="first_name"
                className=" text-md md:text-xl font-medium text-slate-700"
              >
              Défendeur
              </label>
              <textarea
                type="text"
                value={consortDefendeur}
                onChange={(e) => setConsortDefendeur(e.target.value)}
                className="border border-slate-700 text-slate-700 text-lg rounded-lg block w-full  h-9 md:h-8 lg:h-10 xl:h-9  p-1.5 md:p-2.5 xl:p-3 dark:placeholder-slate-700 focus:outline-none placeholder:text-sm"
                required
              />
            </div> 
          </>
        )}

        { (((dossierType === 2 )|| (item && item.type==2)) && formData[1] == '1') && formData[0] == '2' && formData[2] == '1' && formData[3] == '3' && (
          <>
            <div>
              <label
                htmlFor="first_name"
                className=" text-md md:text-xl font-medium text-slate-700"
              >
              Le client
              </label>
              <textarea
                type="text"
                value={consortDemandeur}
                onChange={(e) => setConsortDemandeur(e.target.value)}
                className="border border-slate-700 text-slate-700 text-lg rounded-lg block w-full  h-9 md:h-8 lg:h-10 xl:h-9  p-1.5 md:p-2.5 xl:p-3 dark:placeholder-slate-700 focus:outline-none placeholder:text-sm"
                required
              ></textarea>
            </div>
            <div>
              <label
                htmlFor="first_name"
                className=" text-md md:text-xl font-medium text-slate-700"
              >
              Défendeur
              </label>
              <textarea
                type="text"
                value={consortDefendeur}
                onChange={(e) => setConsortDefendeur(e.target.value)}
                className="border border-slate-700 text-slate-700 text-lg rounded-lg block w-full  h-9 md:h-8 lg:h-10 xl:h-9  p-1.5 md:p-2.5 xl:p-3 dark:placeholder-slate-700 focus:outline-none placeholder:text-sm"
                required
              ></textarea>
            </div> 
          </>
        )}

            {((dossierType == 1)||(item && (item.type === 1))) && (
              <div>
              <label
                htmlFor="first_name"
                className=" text-md md:text-xl font-medium text-slate-700"
              >
                Montant a payer
              </label>
              <input
                type="number"
                value={montant_a_payer}
                onChange={(e) => setMontant_a_payer(e.target.value)}
                className="border border-slate-700 text-slate-700 text-lg rounded-lg block w-full  h-9 md:h-8 lg:h-10 xl:h-9  p-1.5 md:p-2.5 xl:p-3 dark:placeholder-slate-700 focus:outline-none placeholder:text-sm"
                required
              />
            </div>
            )}
            <div>
              <label
                htmlFor="first_name"
                className=" text-md md:text-xl font-medium text-slate-700"
              >
                Date d&#39;audience
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="border border-slate-700 text-slate-700 text-lg rounded-lg block w-full  h-9 md:h-8 lg:h-10 xl:h-9  p-1.5 md:p-2.5 xl:p-3 dark:placeholder-slate-700 focus:outline-none placeholder:text-sm"
                min={todayDate}
              />
            </div>
            <div className="relative">
              <label
                htmlFor="first_name"
                className=" text-md md:text-xl font-medium text-slate-700"
              >
                Tribunal 
              </label>
              <div className='flex flex-col space-y-2rounded-sm'>
                {autre ? (
                  <input type="text"
                    value={isNaN(parseInt(tribunal)) ? tribunal : ''}
                    onChange={(e) => setTribunal(e.target.value)}
                    onBlur={() => handleCheckTribunal()}
                    className="border border-slate-700 text-slate-700 text-lg rounded-lg block h-9 md:h-12 lg:h-10 w-[90%] p-1.5 md:p-2.5 dark:placeholder-slate-700 focus:outline-none mx-auto" />

                ) : (
                    <select
                      value={tribunal}
                      onChange={(e) => setTribunal(e.target.value)}
                      id="categories"
                      className="border border-slate-700 text-slate-700 text-lg rounded-lg block w-full  h-9 md:h-10 lg:h-12 xl:h-12  p-1.5 md:p-2.5 xl:p-3 dark:placeholder-slate-700 focus:outline-none placeholder:text-sm"
                    >
                      <option disabled value='-1'>
                          Cliquez ici
                        </option>
                      {tribunals?.map((tribunal, index) => (
                        <option key={index} value={tribunal.id}>
                          {tribunal.nom}
                        </option>
                      ))}
                    </select>
                  )}
                <button onClick={() => { setAutre(!autre) }} className='text-white mx-auto mt-1 bg-slate-700 hover:bg-slate-800 p-2 rounded  '>{autre ? 'tribunal éxistant' : 'Nouveau tribunal'} </button>
              </div>
            </div>
            {((dossierType == 1)||(item && (item.type === 1))) && (
            <div className="w-full h-full flex flex-col space-y-2 md:flex-row justify-between">
            <div className="w-[100%] md:w-[45%]  xl:w-[60%] flex flex-col space-y-1">
              <div className="">
                <span className="text-xl font-medium text-slate-700">
                  Suivi
                </span>
              </div>
              <div className="flex justify-between w-full">
                <div className="flex items-center w-[50%]">
                  <label className="relative flex items-center p-3 rounded-full cursor-pointer"
                    htmlFor="Oui">
                    <input
                      type="radio"
                      name="paiement_unique"
                      id="oui" value="oui" checked={payement_unique === 'oui'}
                      onChange={(e) => setPayement_unique(e.target.value)}
                      className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-slate-700 text-gray-900 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-gray-900 checked:before:bg-gray-900 hover:before:opacity-10"
                    />
                    <span className="absolute text-gray-900 transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3.5 w-3.5"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                      >
                        <circle
                          data-name="ellipse"
                          cx="8"
                          cy="8"
                          r="8"
                        ></circle>
                      </svg>
                    </span>
                  </label>
                  <label
                    className="mt-px text-xl font-medium text-slate-700 cursor-pointer select-none"
                    htmlFor="Oui"
                  >
                    Oui
                  </label>
                </div>
                <div className="flex items-center  w-[50%]">
                  <label
                    className="relative flex items-center p-3 rounded-full cursor-pointer"
                    htmlFor="Non"
                  >
                    <input
                      type="radio"
                      name="paiement_unique"
                      id="non" value="non" checked={payement_unique === 'non'}
                      onChange={(e) => setPayement_unique(e.target.value)}
                      className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-slate-700 text-gray-900 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-gray-900 checked:before:bg-gray-900 hover:before:opacity-10"
                    />
                    <span className="absolute text-gray-900 transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3.5 w-3.5"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                      >
                        <circle
                          data-name="ellipse"
                          cx="8"
                          cy="8"
                          r="8"
                        ></circle>
                      </svg>
                    </span>
                  </label>
                  <label
                    className="mt-px text-xl font-medium text-slate-700 cursor-pointer select-none"
                    htmlFor="Non"
                  >
                    Non
                  </label>
                </div>
              </div>
            </div>
          </div>
          )}
          </div>
           <div className="w-full h-full flex flex-col space-y-2 md:space-y-0 md:flex-row justify-between">
            
            
          </div>
          <div className="flex flex-col space-y-2">
            <label
              htmlFor="first_name"
              className=" text-md md:text-xl font-medium text-slate-700"
            >
              Déscription du paiement
            </label>
            <textarea
              id="message"
              value={descrPaie}
              onChange={(e) => setDescrPaie(e.target.value)}
              className="block p-1.5 md:p-2.5 w-full h-[8rem] md:h-[10rem] lg:h-[12rem] xl:h-[6rem] text-lg text-slate-700 rounded-lg border border-slate-700 focus:outline-none placeholder:text-slate-700 placeholder:text-sm"
              placeholder="ecrivez une petite description du paiement ici..."
            ></textarea>
          </div>
          <div className="flex flex-col space-y-2">
            <label
              htmlFor="first_name"
              className=" text-md md:text-xl font-medium text-slate-700"
            >
              Commentaire
            </label>
            <textarea
              id="message"
              value={commentaire}
              onChange={(e) => setCommentaire(e.target.value)}
              className="block p-1.5 md:p-2.5 w-full h-[8rem] md:h-[10rem] lg:h-[12rem] xl:h-[6rem] text-lg text-slate-700 rounded-lg border border-slate-700 focus:outline-none placeholder:text-slate-700 placeholder:text-sm"
              placeholder="ecris les commentaires ici..."
            ></textarea>
          </div>
        </div>
        <span className="text-green-600"> {success ? success : " "} </span>
        <div className="flex justify-center">
          {item ?
          <button
          onClick={handleUpdate} disabled={loading}
          className="w-[8rem] h-8 rounded-md bg-green-700 hover:bg-green-800 text-white font-bold mb-2"
        >
          {loading ? "MODIFICATION..." : "MODIFIER"}
        </button>
          :
          <button
            onClick={handleCreate} disabled={loading}
            className="w-[8rem] h-8 rounded-md bg-green-700 hover:bg-green-800 text-white font-bold mb-2"
          >
            {loading ? "CREATION..." : "CREER"}
          </button>}
        </div>
      </div>
    </div>
  );
}
