"use client"
import { useState, useEffect, useRef} from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import CreerUrgence from '../modals/secretaire/creer-urgence-form';
import Payement from '../modals/secretaire/payement-tranche-form';
import CreerPenalite from '../modals/secretaire/creer-penalite-form';
import Balance from '../modals/secretaire/balance';
import DetailDossier from '../modals/secretaire/detail-dossier';
import TableDossier from '../elements/table-dossier-secretaire';
import FiltreDossier from './filtre-dossier';
import MettreEnDelibere from '../modals/secretaire/deliberer-form';
import CreerMultiple from '../modals/secretaire/creer-multiple-form';
import CreerJonction from '../modals/secretaire/creer-jonction-form';
import EditDossier from '../modals/secretaire/edit-dossier-form';
import CasserAppelDossier from '../modals/secretaire/casser-appel-dossier-form';
import ViewMultiple from '../modals/secretaire/view-multiple';

export default function DossiersList({ data=[], tribunals, numero='' }){
  const { push } =useRouter()
  const [showModal, setShowModal] = useState(0);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const page  = parseInt(searchParams.get('page')) || 0;
  const [displayMoDetail, setDisplayMoDetail] = useState(false);
  const detailsRef = useRef(null);

  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(8);
   const [currentItem, setCurrentItem] = useState({});
  const toggleModal = (indice,item={})=>{
    setShowModal(indice);
    setCurrentItem(item);
  }

  const handleClickOutside = (event) => {
    if (detailsRef.current && !detailsRef.current.contains(event.target)) {
      setDisplayMoDetail(false);
    }
  };
  const handleNextPage = () => {
    const currentPage = parseInt(searchParams.get("page") || "0", 10);
    const params = new URLSearchParams(searchParams);
    console.log("currentPage",currentPage)
    params.set("page", currentPage + 1);

    push(`${pathname}?${params.toString()}`);
};
const handleBackPage = () => {
  const currentPage = parseInt(searchParams.get("page") || "0", 10);
  const params = new URLSearchParams(searchParams);
  console.log("currentPage",currentPage)
  params.set("page", currentPage - 1);

  push(`${pathname}?${params.toString()}`);
};
  
  // Calculate starting and ending index for current page
  const startIndex = (currentPage) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, data.length);

  const paginatedData = data?.slice(startIndex, endIndex);
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
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
  return (
    <div className="relative w-[100%] h-full rounded-md">
    {
      showModal === 1 && (
        <div className="w-[100%] h-[100%]">
          <EditDossier
           tribunals={tribunals}
           toggleModal={toggleModal}
           item={currentItem}
          />
        </div>
      )
    }
    {
      showModal === 2 && (
        <div className="w-[100%] h-[100%]">
          <CreerMultiple
           toggleModal={toggleModal}
            item={currentItem} />
        </div>
      )
    }
    {
      showModal === 3 && (
        <div className="w-[100%] h-[100%]">
          <ViewMultiple
           toggleModal={toggleModal}
            item={currentItem}
          />
        </div>
      )
    } 
    {
      showModal === 4 && (
        <div className="w-[100%] h-[100%]">
          <CreerUrgence
            tribunals={tribunals}
            item={currentItem}
            toggleModal={toggleModal}
          />
        </div>
      )
    }
    {
      showModal === 5 && (
        <div className="w-[100%] h-[100%]">
          <CreerJonction toggleModal={toggleModal} item={currentItem} />
        </div>
      )
    }
    {
      showModal === 6 && (
        <div className="w-[100%] h-[100%]">
          <Balance toggleModal={toggleModal} item={currentItem} 
           />
        </div>
      )
    }
    {
      showModal === 7 && (
        <div className="w-[100%] h-[100%]">
          <CasserAppelDossier
            item={currentItem}
            tribunals={tribunals}
            toggleModal={toggleModal}
            endpoint='appel'
          />
        </div>
      )
    }
    {
      showModal === 8 && (
        <div className="w-[100%] h-[100%]">
          <MettreEnDelibere toggleModal={toggleModal} item={currentItem} />
        </div>
      )
    }
    {
      showModal === 9 && (
        <div className="w-[100%] h-[100%]">
          <DetailDossier
             toggleModal={toggleModal}
            data={currentItem}
          />
        </div>
      )
    }
    {
      showModal === 10 && (
        <div className="w-[100%] h-[100%]">
          <Payement 
            toggleModal={toggleModal}
            datacaisse={currentItem} />
        </div>
      )
    }
    {
      showModal === 11 && (
        <div className="w-[100%] h-[100%]">
          <CreerPenalite
            toggleModal={toggleModal}
            tribunals={tribunals}
            item={currentItem}
          />
        </div>
      )
    }
    {
      showModal === 12 && (
        <div className="w-[100%] h-[100%]">
          <CasserAppelDossier
            item={currentItem}
            tribunals={tribunals}
            toggleModal={toggleModal}
            endpoint='casser'
          />
        </div>
      )
    }
      <div className="w-[100%] h-[100%]">
        
          {pathname.includes('tracage') ? (
            <div className="flex justify-center w-full h-auto p-2 mb-2">
              <h1>Tous les dossiers lies au dossier numero: <span className='font-semibold'>{numero}</span> </h1>
            </div>
          ):(
            <div className="w-full h-auto mb-2">
              <FiltreDossier tribunals={tribunals} />
            </div>
          )}
        <div className="w-full">
          <div className="container flex flex-col mx-auto space-y-1">
            <div className="h-[26rem] md:h-[36rem]  xl:h-[31rem] overflow-y-scroll lg:overflow-y-scroll">
              <table id="example" className="w-full table-auto">
                <thead>
                  <tr>
                    <th className="py-2 text-start bg-slate-100"></th>
                    <th className="py-2 border text-start bg-slate-100">
                      Numero du dossier
                    </th>
                    <th className="py-2 border text-start bg-slate-100">
                      Demandeur
                    </th>
                    <th className="py-2 border text-start bg-slate-100">
                      Defendeur
                    </th>
                    <th className="py-2 border text-start bg-slate-100">
                      Juridiction
                    </th>
                    <th className="py-2 border text-start bg-slate-100">
                      Date d&#39;audience
                    </th>
                  </tr>
                </thead>
                <tbody>
                {paginatedData &&
                    paginatedData.map((item, index) => (
                      <tr className={`hover:bg-gray-400`} key={index}>
                        <TableDossier
                          item={item} 
                          index={index}
                          showModal={showModal}
                          toggleModal={toggleModal}
                        />
                      </tr>
                    ))} 
                </tbody>
              </table>
            </div>
            <div className="relative h-auto md:h-[2.5rem] w-[95%] pagination flex justify-between items-center mx-auto">
              {/* Button for previous page (disabled on first page) */}
              {page>0&&(
                <button
                className="absolute left-0 px-2 py-1  text-white rounded-md cursor-pointer disabled:opacity-75 bg-slate-500 hover:bg-slate-700"
                /* disabled={currentPage === 0} */
                onClick={handleBackPage}
              >
                Précédent
              </button>
              )}
              {data.length==8&&(
                <button
                className="absolute right-0 px-2 py-1 text-white rounded-md cursor-pointer disabled:opacity-75 bg-slate-500 hover:bg-slate-700"
                /* disabled={currentPage === Math.ceil(data.length / itemsPerPage)-1} */
                onClick={handleNextPage}
              >
                Suivant
              </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
