"use client"
import React,{useState} from 'react'
const ActionClient = ({
  id,
  name='',
  handleGenereRapportAssocie,
  handleToutLesDossiersAssocie,
}) => {
  return (
    <div className="w-[10rem] h-[3.8rem] bg-slate-800 rounded-sm">
      <div className="w-full h-full flex flex-col space-y-1 my-1">
        <button
          className="w-full text-white hover:bg-slate-600 p-1"
          onClick={() => handleToutLesDossiersAssocie(id,name)}
        >
          tous les dossiers
        </button>
        <button
          className="w-full text-white hover:bg-slate-600 p-1"
          onClick={() =>handleGenereRapportAssocie(id,name)}
        >
          un rapport généré
        </button>
      </div>
    </div>
  );
};

export default ActionClient 
