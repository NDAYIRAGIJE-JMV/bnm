"use client"
import { useState, useEffect, useContext, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import RapportCollaborateur from '../modals/collaborateur/creer-rapport-form';
import DetailDossier from '../modals/collaborateur/detail-dossier';
import TableDossier from '../modals/collaborateur/table-dossier-collaborateur';
import FiltreDossier from '../secretaire/filtre-dossier';
import { apiLinks } from '@/app/_libs/links';
import { SessionContext } from '../context/auth';

const Collaborateur = ({tribunals}) => {
  const searchParams = useSearchParams()
  const user = useContext(SessionContext)
  const userId = user?.session?.user
  
  const [showGenererRapport, setShowGenererRapport] = useState(false)

  const [showDetailToutLeDossier, setShowDetailToutLeDossier] = useState(false)
  const [data, setData] = useState([])
  const [dossiersdetail, SetDetailData] = useState([])
 const [dossierid,setDossierId]=useState("")
  const [displayMoDetail, setDisplayMoDetail] = useState(false);
  const detailsRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const AfficherModalDossier = (action) => {
    setDisplayMoDetail(true);
  };

  const handleClickOutside = (event) => {
    if (detailsRef.current && !detailsRef.current.contains(event.target)) {
      setDisplayMoDetail(false);
    }
  };
  useEffect(() => {
    if (displayMoDetail) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [displayMoDetail]);

  const handleGenererRapport = async (id) => {
    setDossierId(id)
     setShowGenererRapport(true)
     }

  const handleDetailToutLeDossier = async (uuid) => {
    setShowDetailToutLeDossier(true)
    if (uuid) {
      try {

        const requestOptions = {

          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ uuid: uuid })
        
        };
   
        const res = await fetch('/secretaire/api/liste', requestOptions);
        const datas = await res.json()
        
        if (!datas.error) {
          SetDetailData(datas.results[0]);
          console.log(dossiersdetail)

        }

      }
      catch (error) {
        console.log('error');
      }

    }
  }

  const closeModalDetail = () => {
    setShowDetailToutLeDossier(false)
  }
  const closeModal = () => {
    setShowGenererRapport(false)
  }
const fetchData = async () => {
    const tribunalGet = searchParams.get('tribunal') || 0
    const searcValue = searchParams.get('numero') || " "
    const typeValue = searchParams.get('type') || 0
    const consoleState  = searchParams.get('console') || 0
    const penalite  = searchParams.get('penalite') || 0
    const urgence  = searchParams.get('urgence') || 0
      const addData = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          userId:userId,
          tribunal: tribunalGet,
          numero: searcValue,
          type: typeValue,
          consoleState: consoleState,
          penalite: penalite,
          urgence: urgence
        }
      };
      const res = await fetch(apiLinks.listedossierscollab, addData);
      const data = await res.json()
      console.log(data)
      if (data && data.length > 0) {
        setData(data);
      }
      else {
        setData([])
      }

    };

  useEffect(() => {
    // console.log("first_collab", user, userId)
    // console.log('tribunals_collab', tribunals)

    fetchData()

  }, [user, tribunals]);
  // Calculate starting and ending index for current page
  const startIndex = (currentPage) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, data.length);

  const paginatedData = data.slice(startIndex, endIndex);
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="relative w-[100%] h-full rounded-md">
      {showGenererRapport && (
        <div className="w-[100%] h-[100%]">
          <RapportCollaborateur closeModal={closeModal} id={dossierid}/>
        </div>
      )}

      {showDetailToutLeDossier && (
        <div className="w-[100%] h-[100%]">
          <DetailDossier
            closeModalDetail={closeModalDetail}
            data={dossiersdetail}
          />
        </div>
      )}
      <div className="w-[100%] h-[100%]">
        <div className="w-full">
        <FiltreDossier tribunals={tribunals}/>
          <div className="container flex flex-col space-y-1 mx-auto">
            <div className="h-[26rem] md:h-[36rem]  xl:h-[31rem] overflow-y-scroll lg:overflow-y-scroll">
              <table id="example" className="table-auto w-full">
                <thead>
                  <tr>
                    <th className="text-start py-2 bg-slate-100"></th>
                    <th className="py-2 text-start border bg-slate-100">No</th>
                    <th className="text-start py-2 border bg-slate-100">
                      Numero du dossier
                    </th>
                    <th className="text-start py-2 border bg-slate-100">
                      Demandeur
                    </th>
                    <th className="text-start py-2 border bg-slate-100">
                      Defendeur
                    </th>
                    <th className="text-start py-2 border bg-slate-100">
                      Tribunal
                    </th>
                    <th className="text-start py-2 border bg-slate-100">
                      Date d&#39;audience
                    </th>
                  </tr>
                </thead>
                <tbody>
                {paginatedData &&
                  paginatedData.map((item, index) => (
                    <tr key={index}>
                      <TableDossier
                        id={item.id}
                        uuid={item.uuid}
                        id_grand={item.id_grand}
                        index={index + currentPage * 8}
                        numero={item.numero}
                        demandeur={item.demandeur}
                        defendeur={item.defendeur}
                        tribunalNom={item.tribunalName}
                        date_audience={item.date_audience}
                        handleGenererRapport={handleGenererRapport}
                        handleDetailToutLeDossier={handleDetailToutLeDossier}
                      />
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="h-auto md:h-[2.5rem] pagination flex justify-between">
              <button
                className="disabled:opacity-50 cursor-pointer px-2 py-1 bg-gray-200 rounded-md hover:bg-gray-300"
                disabled={currentPage === 0}
                onClick={() => handlePageChange(currentPage - 1)}
              >
                Précédent
              </button>
              <div>
                {Array.from(
                  { length: Math.ceil(data.length / itemsPerPage) },
                  (_, i) => i 
                ).map((number) => (
                  <button
                    key={number}
                    className={`px-2 py-1 mx-1 rounded-md ${
                      number === currentPage
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 hover:bg-gray-300"
                    }`}
                    onClick={() => handlePageChange(number)}
                  >
                    {number + 1}
                  </button>
                ))}
              </div>
              <button
                className="disabled:opacity-50 cursor-pointer px-2 py-1 bg-gray-200 rounded-md hover:bg-gray-300"
                disabled={currentPage === Math.ceil(data.length / itemsPerPage)-1}
                onClick={() => handlePageChange(currentPage + 1)}
              >
                Suivant
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Collaborateur
