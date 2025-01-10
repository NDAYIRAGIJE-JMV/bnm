import React from "react";
const PopUpConge = ({ id, user_id, handleAjouteConge,status}) => {
  const Refuse= async()=>{
    try {
      const datarefuse = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            status:2,
            id:id
        })
    };
      const res = await fetch('/associe/api/conges/refuse',datarefuse);
      const datas = await res.json()
      if (datas.message=="success") {
         window.location.reload()
      }
  }
  catch (error) {
      console.log('error');
  }

  }
  return (
    <div className="bg-slate-800 w-[5rem] h-[2.7rem] rounded-sm">
      <div className="w-full h-full flex flex-col space-y-1 my-1">
        <button
          className="w-full text-white hover:bg-slate-600"
          onClick={() => handleAjouteConge(id, user_id)}
        >
          Accepter
        </button>
        {status !== 2 && (
          <button
            className="w-full text-white hover:bg-slate-600"
            onClick={Refuse}
          >
            Refuser
          </button>
        )}
      </div>
    </div>
  );
};

export default PopUpConge