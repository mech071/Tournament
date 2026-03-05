import React from 'react'
import { IoMusicalNotes } from "react-icons/io5";
import { Link } from "react-router-dom"

const Navbar = () => {
  return (
    <div className='bg-stone-100 border-b border-zinc-800 h-16 flex items-center justify-between px-4 md:px-3 text-black'>

      <div className="flex items-center gap-2">
        <div className="image text-2xl md:text-3xl cursor-pointer">
          <IoMusicalNotes />
        </div>

        <div className="header font-[Poiret-One] text-2xl md:text-3xl tracking-wider cursor-pointer">
          MiliGrammys
        </div>
      </div>

      <div className="filler flex items-center text-sm md:text-md font-medium cursor-pointer">
        <Link to="/results" className='pr-4 md:pr-3 hover:text-zinc-600 transition'>
          Results
        </Link>

        <Link to="/dashboard" className="hover:text-zinc-600 transition">
          Dashboard
        </Link>
      </div>

    </div>
  )
}

export default Navbar