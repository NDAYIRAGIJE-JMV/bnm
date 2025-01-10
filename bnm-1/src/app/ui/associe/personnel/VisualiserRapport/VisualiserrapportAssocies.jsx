import React from 'react'

const VisualiserRapportAssocies = ({ closeModal, data }) => {
  return (
    <div className="w-full h-full flex justify-center items-center absolute bg-slate-700 bg-opacity-25 z-25">
      <div className="w-[95%] h-[90%] md:w-[90%] lg:w-[85%] xl:w-[60%] h-[100%] relative flex flex-col bg-white rounded-md">
        <div className="w-[98%] flex items-center justify-end mt-1 mx-auto">
          <button
            onClick={closeModal}
            className="w-6 h-6 hover:bg-red-600"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6 text-lg text-black hover:text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="container h-full overflow-scroll mx-auto py-2">
          <table id="example" className="table-auto w-full">
            <thead>
              <tr>
                <th className="text-start py-2 border bg-slate-100 px-2">
                  Nom
                </th>
                <th className="text-start py-2 border bg-slate-100 px-2">
                  Activité
                </th>
                <th className="text-start py-2 border bg-slate-100 px-2">
                  Date
                </th>
              </tr>
            </thead>
            <tbody>
            {data &&
                data.map((rapport) => (
                  <>
                    <tr>
                      <td className="border text-start py-2 px-2">
                        {rapport.name} {rapport.lastname}{" "}
                      </td>
                      <td className="border text-start py-2 px-2">
                        {rapport.body}
                      </td>
                      <td className="border text-start py-2 px-2">
                        {new Date(rapport.create_at).toLocaleDateString()}
                      </td>
                    </tr>
                  </>
                ))} 
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default VisualiserRapportAssocies
