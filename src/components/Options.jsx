import React from 'react'

const Options = ({ name, selected, onClick }) => {
    return (
        <div
            onClick={onClick}
            className={`p-4 rounded-md border cursor-pointer hover:bg-zinc-200 font-[Poiret-One] text-xl transition-all duration-400 ease-out
      ${selected ? "border-purple-600 bg-purple-100" : "border-gray-300"}`}
        >
            {name}
        </div>
    )
}
export default Options
