'use client'
import React from 'react'
import { useState, useEffect } from 'react'
import { FaPlusCircle } from 'react-icons/fa'
import AjouterPersonnel from './AjouterPersonnel'
import TableModalAssocies from './TableUtilisateur/TableModalAssocies'
import EditUtilisateurAssocies from './EditUtilisateur/EditUtilisateurAssocies'
import VisualiserRapportAssocies from './VisualiserRapport/VisualiserrapportAssocies'
import CongeUtilisateurAssocies from './CongeAssocies/CongeUtilisateurAssocies'
import { apiLinks } from '@/app/_libs/links'

const PersonnelListe = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [showAjouterPersonnel, setShowAjouterPersonnel] = useState(false);
  const [showEditUtilisateurAssocie, setShowEditUtilisateurAssocie] =
    useState(false);
  const [showRapportUtilisateurAssocie, setShowRapportUtilisateurAssocie] =
    useState(false);
  const [showCongeUtilisateurAssocie, setShowCongeUtilisateurAssocie] =
    useState(false);
  const [data, setData] = useState([]);
  const [visualiserapport, setRapport] = useState([]);
  const [conge, setConge] = useState([]);
  const [userid, setuser] = useState("");
  const [users, setUsers] = useState([]);
  const [roles, setRole] = useState([]);
  const [name,setName]=useState('')
  const [lastname,setLastName]=useState('')
  const handleEdit = async (userId) => {
    setShowEditUtilisateurAssocie(true);
    if (userId) {
      try {
        const requestOptions = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: userId }),
        };
        const res = await fetch(apiLinks.associePersonnel, requestOptions);
        const datas = await res.json();
 
        if (!datas.error) {
          setUsers(datas.results[0]);
          setRole(datas.roles);
          setuser(userId);
        }
      } catch (error) {
        console.error("error");
      }
    }
  };

  const handleViewReport = async (userId) => {
    setShowRapportUtilisateurAssocie(true);
    if (userId) {
      try {
        const requestOptions = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: userId }),
        };
        const res = await fetch(apiLinks.visualiserapport, requestOptions);
        const datas = await res.json();
        console.log(datas);
        if (!datas.error) {
          setRapport(datas.results);
        }
      } catch (error) {
        console.log("error");
      }
    }
  };

  const handlePause = async (userId,name,lastname) => {
    setShowCongeUtilisateurAssocie(true);

    if (userId) {
      setuser(userId);
      setName(name)
      setLastName(lastname)
      try {
        const requestOptions = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: userId }),
        };
        const res = await fetch(apiLinks.conge, requestOptions);
        const datas = await res.json();
        if (!datas.error) {
          setConge(datas.results);

        }
      } catch (error) {
        console.log("error");
      }
    }
  };

  const handleAjouterPersonnel = () => {
    setShowAjouterPersonnel(true);
  };

  const closeModal = () => {
    setShowAjouterPersonnel(false);
    setShowEditUtilisateurAssocie(false);
    setShowRapportUtilisateurAssocie(false);
    setShowCongeUtilisateurAssocie(false);
    setUsers([]);
    setRole([]);
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(apiLinks.associePersonnel);
      const data = await res.json();
      if (data.message == "Success") {
        const processedData = data.data.map((item) => {
          const roleName =
            data.roles.find((role) => role.id === item.role)?.name ||
            "role non trouvé";
          return {
            ...item,
            roleNom: roleName,
          };
        });
        setData(processedData);
     
      } else {
        setData([]);
      }
    };

    fetchData();
  }, []);

  // Calculate starting and ending index for current page
  const startIndex = (currentPage) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, data.length);

  const paginatedData = data.slice(startIndex, endIndex);
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="relative w-[100%] h-full rounded-md">
      {showEditUtilisateurAssocie ? (
        <div className="w-[100%] h-[100%]">
          <EditUtilisateurAssocies
            closeModal={closeModal}
            users={users}
            roles={roles}
          />
        </div>
      ) : (
        ""
      )}

      {showAjouterPersonnel ? (
        <div className="w-[100%] h-[100%]">
          <AjouterPersonnel closeModal={closeModal} />
        </div>
      ) : (
        ""
      )}

      {showRapportUtilisateurAssocie ? (
        <div className="w-[100%] h-[100%]">
          <VisualiserRapportAssocies
            closeModal={closeModal}
            data={visualiserapport}        
          />
        </div>
      ) : (
        ""
      )}

      {showCongeUtilisateurAssocie ? (
        <div className="w-[100%] h-[100%]">
          <CongeUtilisateurAssocies
            closeModal={closeModal}
            data={conge}
            userId={userid}
            name={name}
            lastname={lastname}
          />
        </div>
      ) : (
        ""
      )}
      <div className="w-[100%] h-[100%]">
        <div className="w-full">
          <div className="container flex flex-col space-y-1 mx-auto">
            <div className="w-[98%] h-auto flex items-center justify-end mx-auto mt-2 mb-1">
              <button onClick={handleAjouterPersonnel} className="">
                <FaPlusCircle className="font-bold text-xl md:text-2xl text-slate-700 hover:text-slate-800" />
              </button>
            </div>
            <div className="h-[26rem] md:h-[36rem]  xl:h-[31rem] overflow-y-scroll lg:overflow-y-scroll">
              <table id="example" className="table-auto w-full">
                <thead className="relative">
                  <tr>
                    <th className="text-center py-2 bg-slate-100">#</th>
                    <th className="text-start py-2 bg-slate-100 p-2">Nom & Prénom</th>
                    <th className="text-start py-2 bg-slate-100 p-2">Nom d'utilisateur</th>
                    <th className="py-2 text-start border bg-slate-100 p-2">
                      email
                    </th>
                    <th className="text-start py-2 border bg-slate-100 p-2">
                      Téléphone
                    </th>
                    <th className="text-start py-2 border bg-slate-100 p-2">
                      rôle
                    </th>
                  </tr>
                </thead>
                <tbody>
                {data &&
                    paginatedData.map((item) => (
                      <tr key={item.id}>
                        <TableModalAssocies
                          userid={item.id}
                          name={item.name}
                          lastname={item.lastname}
                          username={item.username}
                          email={item.email}
                          phone={item.phone}
                          roleNom={item.roleNom}
                          handleEdit={handleEdit}
                          handleViewReport={handleViewReport}
                          handlePause={handlePause}
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

export default PersonnelListe
