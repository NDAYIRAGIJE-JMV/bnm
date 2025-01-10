'use client'
import React from 'react'
import { useState, useEffect, useContext } from 'react';
import { FaFolderPlus } from 'react-icons/fa';
import { Tooltip } from '@nextui-org/react';
import { SessionContext } from '../../context/auth';
import NotificationAndProfile from '../../head/NotificationAndProfile';
import { apiLinks } from '@/app/_libs/links';
import ViewNotificationCollaborateur from './view-notification-collabo';


const HeaderCollabo = () => {
  const user = useContext(SessionContext)
  const [showNotificationCollaborateur, setShowNotificationCollaborateur] = useState(false)
  const [standard, setStandard] = useState(0)
  const [report, setReport] = useState(0)
  const [dossier, setDossier] = useState(0)
  const [client, setClient] = useState(0)
  const [tribunals, setTribunals] = useState([])
  const [search, setSearch] = useState(0)
  const [error, setError] = useState('')


  const closeModal = () => {
    setShowNotificationCollaborateur(false);
  }

  const showNotificationInfosCollaborateur = ()=> {
    setShowNotificationCollaborateur(true);
  }

  const get_number_user = async () => {
    const response = await fetch(`/api/header/clients`)
    const res = await response.json();
    if (res.message == "Success") {
      setClient(res.data.clientsCount)
      setDossier(res.data.dossiersCount)
      setStandard(res.data.standardsCount)
      setReport(res.data.reportsCount)
    }
    else {
      setError('no data')
    }
  }

  const handleseach = async () => {
    const data = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        search
      })
    };
    // req = await fetch('api/search/select', data)
  }
  useEffect(() => {
    get_number_user()
 
  }, [])


  return (
    <div className="h-full md:h-[30%] lg:h-[40%]  w-[100%] flex flex-col space-y-[0.5rem] md:space-y-[0.2rem] lg:space-y-[0.5rem] bg-blue-800 rounded-md">
      {
        showNotificationCollaborateur && (
          <ViewNotificationCollaborateur closeModal={closeModal}/>
        )
      }
      <NotificationAndProfile showNotificationInfos = {showNotificationInfosCollaborateur} />
    </div>
  );
}
export default HeaderCollabo


