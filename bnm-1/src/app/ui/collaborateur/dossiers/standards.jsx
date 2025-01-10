"use client"
import { useState, useRef, useEffect, useContext } from 'react';
import RapportCollaborateur from '../../modals/collaborateur/creer-rapport-form';
import DetailDossier from '../../modals/collaborateur/detail-dossier';
import TableDossier from '../../modals/collaborateur/table-dossier-collaborateur';
import { apiLinks } from '@/app/_libs/links';
import { SessionContext } from '../../context/auth';


const DossiersStandards = () => {
    const user = useContext(SessionContext)
    const userId = user?.session?.user
    const [showDetailToutLeDossier, setShowDetailToutLeDossier] = useState(false)
    const [data, setData] = useState([])
    const [dossiersdetail, SetDetailData] = useState([])
    const [showGenererRapport, setShowGenererRapport] = useState(false)


    const [displayMoDetail, setDisplayMoDetail] = useState(false);
    const detailsRef = useRef(null);
    const [dossierid,setDossierId]=useState("")
    const [currentPage, setCurrentPage] = useState(1);
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

                }

            }
            catch (error) {
                console.log('error');
            }

        }
    }
    const closeModal = () => {
        setShowGenererRapport(false)
    
    
      }
    const handleGenererRapport = async (id) => {
        setDossierId(id)
         setShowGenererRapport(true)
         }

    const closeModalDetail = () => {
        setShowDetailToutLeDossier(false)
    }

    useEffect(() => {
        const fetchData = async () => {
          const addData = {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(
              {userId:userId }
            )
          };
    
          const res = await fetch(apiLinks.apistandardscollab, addData);
          const data = await res.json()
          console.log(data)
          if (data.message == 'Success') {
            const processedData = data.data.map((item) => {
              const tribunalName = data.tribunals.find((tribunal) => tribunal.id === item.tribunal)?.nom || 'Tribunal non trouvé';
              return {
                ...item,
                tribunalNom: tribunalName,
              };
            });
            setData(processedData);
          }
          else {
            setData([])
          }
    
        };
    
        fetchData()
    
      }, [user]);
    // Calculate starting and ending index for current page
    const startIndex = (currentPage - 1) * itemsPerPage;
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
            <div className="container flex flex-col space-y-1 mx-auto">
              <div className="h-auto md:h-[36rem]  xl:h-[31rem] overflow-y-scroll lg:overflow-y-scroll">
                <table id="example" className="table-auto w-full">
                  <thead>
                    <tr>
                      <th className="text-start py-2 bg-slate-100"></th>
                      <th className="py-2 text-start border bg-slate-100">
                        No
                      </th>
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
                                index={index + (currentPage * 8)}
                                numero={item.numero}
                                demandeur={item.demandeur}
                                defendeur={item.defendeur}
                                tribunalNom={item.tribunalNom}
                                date_audience={item.date_audience}
                                handleDetailToutLeDossier={handleDetailToutLeDossier}
                                handleGenererRapport={handleGenererRapport}
                            />
                        </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="h-auto md:h-[2.5rem] pagination flex justify-between">
                <button
                  className="disabled:opacity-50 cursor-pointer px-2 py-1 bg-gray-200 rounded-md hover:bg-gray-300"
                  disabled={currentPage === 1}
                  onClick={() => handlePageChange(currentPage - 1)}
                >
                  Précédent
                </button>
                <div>
                  {Array.from(
                    { length: Math.ceil(data.length / itemsPerPage) },
                    (_, i) => i + 1
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
                      {number}
                    </button>
                  ))}
                </div>
                <button
                  className="disabled:opacity-50 cursor-pointer px-2 py-1 bg-gray-200 rounded-md hover:bg-gray-300"
                  disabled={
                    currentPage === Math.ceil(data.length / itemsPerPage)
                  }
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

export default DossiersStandards
