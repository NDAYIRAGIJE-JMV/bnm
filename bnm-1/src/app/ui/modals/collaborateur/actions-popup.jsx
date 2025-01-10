
import React from 'react'
const ActionsPopup = ({
  handleGenererRapport,
  handleDetailToutLeDossier,
  id,
  uuid
}) => {

  return (
    <div className="bg-slate-800 w-[8.5rem] h-[2.7rem] rounded-sm">
      <div className="w-full h-full flex flex-col space-y-1 my-1">
        <button
        onClick={() =>  handleDetailToutLeDossier(uuid)} 
        className="w-full text-white hover:bg-slate-600"
      >
          detail
        </button>
        <button
        onClick={() =>  handleGenererRapport(id)} 
        className="w-full text-white hover:bg-slate-600"
      >
          generer un rapport
        </button>
        </div>
    </div>
  );
};

export default ActionsPopup
