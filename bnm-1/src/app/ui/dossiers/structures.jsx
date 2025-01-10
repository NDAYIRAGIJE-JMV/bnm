"use client"
import { useState, useEffect, useRef } from 'react';
import CreerConsole from '../modals/secretaire/creer-console-form';
import CreerFusion from '../modals/secretaire/creer-fusion-form';
import Payement from '../modals/secretaire/payement-tranche-form';
import CreerUrgence from '../modals/secretaire/creer-urgence-form';
import CreerPenalite from '../modals/secretaire/creer-penalite-form';
import AvancerDossier from '../modals/secretaire/avancer-dossier-form';
import RetourEnArriere from '../modals/secretaire/retour-arriere-form';
import Balance from '../modals/secretaire/balance';
import DetailDossier from '../modals/secretaire/detail-dossier';
import TableDossier from '../elements/table-dossier-secretaire';
import { apiLinks, routeLinks } from '@/app/_libs/links';
import CreerDossier from '../modals/secretaire/ajouter-dossier-form';


const DossiersStructures = () => {

    const [showEditSecreatire, setShowEditSecreatire] = useState(false)
    const [showCreateConsole, setShowCreateConsole] = useState(false)
    const [showCreateMerge, setShowCreateMerge] = useState(false)
    const [showCreatePayement, setShowCreatePayement] = useState(false)
    const [showCreateEmergence, setShowCreateEmergence] = useState(false)
    const [showCreatePenality, setShowCreatePenality] = useState(false)
    const [showCreateAdvanced, setShowCreateAdvanced] = useState(false)
    const [showCreateReturnBack, setShowCreateReturnBack] = useState(false)
    const [showBalance, setShowBalance] = useState(false)
    const [showDetailToutLeDossier, setShowDetailToutLeDossier] = useState(false)
    const [data, setData] = useState([])
    const [dossiersdetail, SetDetailData] = useState([])
    const [balances, SetBalances] = useState([])

    const [displayMoDetail, setDisplayMoDetail] = useState(false);
    const detailsRef = useRef(null);

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
    const handleEditClick = () => {
        setShowEditSecreatire(true)
    }

    const handleCreateConsole = () => {
        setShowCreateConsole(true)
    }

    const handleCreateMerge = () => {
        setShowCreateMerge(true)
    }

    const handleCreatePayement = () => {
        setShowCreatePayement(true)
    }

    const handleCreateEmergence = () => {
        setShowCreateEmergence(true)
    }

    const handleCreatePenality = () => {
        setShowCreatePenality(true)
    }

    const handleCreateAdvanced = () => {
        setShowCreateAdvanced(true)
    }

    const handleCreateReturnBack = () => {
        setShowCreateReturnBack(true)
    }

    const handleShowBalance = async (id) => {
        setShowBalance(true)
        if (id) {
            try {

                const requestOptions = {

                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ id: id })
                };
                const res = await fetch('/secretaire/api/balance', requestOptions);
                const datas = await res.json()
                if (!datas.error) {
                    SetBalances(datas.results[0]);

                }

            }
            catch (error) {
                console.log('error');
            }

        }
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

                }
            }
            catch (error) {
                console.log('error');
            }
        }
    }


    const closeModal = () => {
        setShowEditSecreatire(false)
        setShowCreateConsole(false)
        setShowCreateMerge(false)
        setShowCreatePayement(false)
        setShowCreateEmergence(false)
        setShowCreatePenality(false)
        setShowCreateAdvanced(false)
        setShowCreateReturnBack(false)
        setShowBalance(false)
    }

    const closeModalDetail = () => {
        setShowDetailToutLeDossier(false)
    }
    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(apiLinks.dossiersStructures);
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

    }, []);
    // Calculate starting and ending index for current page
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, data.length);

    const paginatedData = data.slice(startIndex, endIndex);
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    return (
        <div className="w-full h-auto rounded-md">
            {showEditSecreatire &&
                <div className="absolute h-[44.5%] sm:h-[50.5%] md:h-[100%] lg:h-[100%] w-[95%] md:w-[98%] lg:w-[74%] xl:w-[80%] xl:h-full top-0">
                    <CreerDossier closeModal={closeModal} />
                </div>
            }
            {showCreateConsole &&
                <div className="absolute h-[44.5%] sm:h-[50.5%] md:h-[100%] lg:h-[100%] w-[95%] md:w-[98%] lg:w-[74%] xl:w-[80%] xl:h-full top-0">
                    <CreerConsole closeModal={closeModal} />
                </div>

            }
            {showCreateMerge &&
                <div className="absolute h-[44.5%] sm:h-[50.5%] md:h-[100%] lg:h-[100%] w-[95%] md:w-[98%] lg:w-[74%] xl:w-[80%] xl:h-full top-0">
                    <CreerFusion closeModal={closeModal} />
                </div>
            }
            {showCreatePayement &&
                <div className="absolute h-[44.5%] sm:h-[50.5%] md:h-[100%] lg:h-[100%] w-[95%] md:w-[98%] lg:w-[74%] xl:w-[80%] xl:h-full top-0">
                    <Payement closeModal={closeModal} />
                </div>
            }
            {showCreateEmergence &&
                <div className="absolute h-[44.5%] sm:h-[50.5%] md:h-[100%] lg:h-[100%] w-[95%] md:w-[98%] lg:w-[74%] xl:w-[80%] xl:h-full top-0">
                    <CreerUrgence closeModal={closeModal} />
                </div>
            }
            {showCreatePenality &&
                <div className="absolute h-[44.5%] sm:h-[50.5%] md:h-[100%] lg:h-[100%] w-[95%] md:w-[98%] lg:w-[74%] xl:w-[80%] xl:h-full top-0">
                    <CreerPenalite closeModal={closeModal} />
                </div>
            }
            {showCreateAdvanced &&
                <div className="absolute h-[44.5%] sm:h-[50.5%] md:h-[100%] lg:h-[100%] w-[95%] md:w-[98%] lg:w-[74%] xl:w-[80%] xl:h-full top-0">
                    <AvancerDossier closeModal={closeModal} />
                </div>
            }
            {showCreateReturnBack &&
                <div className="absolute h-[44.5%] sm:h-[50.5%] md:h-[100%] lg:h-[100%] w-[95%] md:w-[98%] lg:w-[74%] xl:w-[80%] xl:h-full top-0">
                    <RetourEnArriere closeModal={closeModal} />
                </div>
            }
            {showBalance &&
                <div className="absolute h-[44.5%] sm:h-[50.5%] md:h-[100%] lg:h-[100%] w-[95%] md:w-[98%] lg:w-[74%] xl:w-[80%] xl:h-full top-0">
                    <Balance closeModal={closeModal} data={balances} />
                </div>
            }
            {showDetailToutLeDossier &&
                <div className="absolute h-[44.5%] sm:h-[50.5%] md:h-[100%] lg:h-[100%] w-[95%] md:w-[98%] lg:w-[74%] xl:w-[80%] xl:h-full md:top-0">
                    <DetailDossier closeModalDetail={closeModalDetail} data={dossiersdetail} />
                </div>
            }
            <div className="w-[100%]">
                <div className="w-full">
                    <div className="container mx-auto py-2">
                        <table id="example" className="table-auto w-full">
                            <thead>
                                <tr>
                                    <th className="text-start py-2 bg-slate-100"></th>
                                    <th className="py-2 text-start border bg-slate-100">No</th>
                                    <th className="text-start py-2 border bg-slate-100">
                                        Numero du dossier
                                    </th>
                                    <th className="text-start py-2 border bg-slate-100">Demandeur</th>
                                    <th className="text-start py-2 border bg-slate-100">Defendeur</th>
                                    <th className="text-start py-2 border bg-slate-100">Tribunal</th>
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
                                                handleEditClick={handleEditClick}
                                                handleCreateConsole={handleCreateConsole}
                                                handleCreateMerge={handleCreateMerge}
                                                handleCreatePayement={handleCreatePayement}
                                                handleCreateEmergence={handleCreateEmergence}
                                                handleCreatePenality={handleCreatePenality}
                                                handleCreateAdvanced={handleCreateAdvanced}
                                                handleCreateReturnBack={handleCreateReturnBack}
                                                handleShowBalance={handleShowBalance}
                                                handleDetailToutLeDossier={handleDetailToutLeDossier}

                                            />
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                        <div className="pagination mt-4 flex justify-between">
                            {/* Button for previous page (disabled on first page) */}
                            <button
                                className="disabled:opacity-50 cursor-pointer px-2 py-1 bg-gray-200 rounded-md hover:bg-gray-300"
                                disabled={currentPage === 1}
                                onClick={() => handlePageChange(currentPage - 1)}
                            >
                                Précédent
                            </button>
                            <div>
                                {Array.from({ length: Math.ceil(data.length / itemsPerPage) }, (_, i) => i + 1).map((number) => (
                                    <button
                                        key={number}
                                        className={`px-2 py-1 mx-1 rounded-md ${number === currentPage ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
                                        onClick={() => handlePageChange(number)}
                                    >
                                        {number}
                                    </button>
                                ))}
                            </div>
                            <button
                                className="disabled:opacity-50 cursor-pointer px-2 py-1 bg-gray-200 rounded-md hover:bg-gray-300"
                                disabled={currentPage === Math.ceil(data.length / itemsPerPage)}
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

export default DossiersStructures
