export default function ActionsPopup ({
  toggleModal,
  item
}) {
  const { multiple, penalite, urgence, type, payement_unique:unique } = item
  return (
    <div className="bg-slate-800 w-[8.5rem]  rounded-sm">
      <div className="flex flex-col w-full p-1 h-full my-1 space-y-1">
        <button
        onClick={() =>  toggleModal(9, item)} 
        className="w-full text-white hover:bg-slate-600"
      >
          detail
        </button>
        <button
          onClick={() => toggleModal(1, item)}
          className="w-full text-white hover:bg-slate-600"
        >
          editer
        </button>
        {(penalite!=1) && (urgence!=1) && (
          <button
          onClick={() =>toggleModal(11,item)}
          className="w-full text-white hover:bg-slate-600"
        >
          Dossier penal
        </button>
        )}
        {(urgence!=1) && (
          <button
          onClick={() => toggleModal(4,item)}
          className="w-full text-white hover:bg-slate-600"
        >
          creer une urgence
        </button>
        )}
        
        
        <button
          onClick={ ()=>toggleModal(multiple===2?3:2,item) }
          className="w-full text-white hover:bg-slate-600"
        >
           {multiple === 2 ? 'Voir multiples' : 'Multiplier'}
        </button>
        
        <button
          onClick={() => toggleModal(5,item)}
          className="w-full text-white hover:bg-slate-600"
        >
          Creer une jonction
        </button>
        {(type==1 && unique === 0) && (
          <button
            onClick={() => toggleModal(6,item)}
            className="w-full text-white hover:bg-slate-600"
          >
            balance
          </button>
        )}
        
        <button
          onClick={() => toggleModal(7,item)}
          className="w-full text-white hover:bg-slate-600"
        >
          Appel
        </button>
        <button
          onClick={() => toggleModal(8,item)}
          className="w-full text-white hover:bg-slate-600"
        >
          Mettre en delibere
        </button>
        
        <button
          onClick={() => toggleModal(12,item)}
          className="w-full text-white hover:bg-slate-600"
        >
          Casser
        </button>
        {(type==1)&& (unique===0) && (
          <button
          onClick={() => toggleModal(10,item)}
          className="w-full text-white hover:bg-slate-600"
        >
          paiement
        </button>
        )}
      </div>
    </div>
  );
};

