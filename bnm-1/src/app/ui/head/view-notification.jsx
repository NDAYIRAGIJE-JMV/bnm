import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const ViewNotification = ({ closeModal }) => {
  const [notif, setNotif] = useState([]);

  useEffect(() => {
    notification();
  }, []);

  const notification = async () => {
    try {
      const response = await fetch(`/associe/api/fetchnotif`);
      const res = await response.json();
      if (res.message === "Success") {
        setNotif(res.results);
      } else {
        console.error('Error fetching notifications:', res.message);
      }
    } catch (err) {
      console.error('Network error:', err);
    }
  };

  const getDaysDifference = (sortie, retour) => {
    const dateSortie = new Date(sortie);
    const dateRetour = new Date(retour);
    const differenceInTime = dateRetour.getTime() - dateSortie.getTime();
    const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));
    return differenceInDays;
  };

  const markAsRead = async (notificationId) => {
    // API pour marquer la notification comme lue
    await fetch(`/associe/api/readnotification/${notificationId}`, { method: 'POST' });
    setNotif((prevNotif) =>
      prevNotif.map((notif) =>
        notif.id === notificationId ? { ...notif, read: true } : notif
      )
    );
  };

  return (
    <div className='ml-3 w-[93%] md:w-[85%] h-[95%] flex flex-col space-y-1 mt-1 absolute animate-fade-down animate-duration-[2000ms] rounded-md bg-blue-100 shadow-md shadow-slate-700 z-25'>
      <div className='w-[98%] h-[9%] mx-auto flex justify-end items-center'>
        <button
          onClick={closeModal}
          className="w-4 h-4 hover:bg-red-600"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-4 text-lg text-black hover:text-white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
      <div className='w-[98%] h-[90%] overflow-y-scroll flex flex-col mx-auto rounded-sm'>
        {notif.length > 0 ? (
          notif.map((notification) => (
            <Link key={notification.id} href='/associe/demande-conge'>
              <div
                className={`notification-item ${notification.status ? '' : 'text-gray-950 font-bold'}`}
                onClick={() => markAsRead(notification.id)}
              >
                <span>
                  {`${notification.name} ${notification.lastname} a demandé un congé de ${notification.jours} jours`}
                </span>
              </div>
          </Link>
          ))
        ) : (
          <p className='text-black'>Loading......</p>
        )}
      </div>
    </div>
  );
};

export default ViewNotification;
