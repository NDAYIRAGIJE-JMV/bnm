"use client"
import React from 'react'
const ActionClient = ({id, handleToutLesDossiers, handleGenereRapport }) => {
  
  return (
    <div className="w-[10rem] h-[3.8rem] bg-slate-800 rounded-sm">
        <div className="w-full h-full flex flex-col space-y-1 my-1">
          <button
            className="w-full text-white hover:bg-slate-600 p-1"
            onClick={() => handleToutLesDossiers(id)}
          >
            tous les dossiers
          </button>
          <button
            className="w-full text-white hover:bg-slate-600 p-1"
            onClick={() => handleGenereRapport(id)}
          >
            un rapport généré
          </button>
        </div>
    </div>
  );
};

export default ActionClient 
