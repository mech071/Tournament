import { useState, useEffect } from "react"
import Options from "./Options"
const GroupCard = ({ group, artists, onNext, onPrev, onSubmit, loading }) => {
    const [selected, setSelected] = useState([])
    const handleSelect = (id) => {
        if (selected.includes(id)) {
            setSelected(selected.filter(x => x !== id))
        }
        else if (selected.length < 2) {
            setSelected([...selected, id])
        }
    }

    const reset = () => {
        setSelected([])
    }

    useEffect(() => {
        setSelected([])
    }, [group])

    return (
        <>
            <div className="flex flex-col justify-center w-full max-w-3xl ease-out animate-[fadeIn_0.6s]">

                <div className="p-6 border rounded-md bg-white shadow-lg shadow-zinc-800/40">

                    <h2 className="text-xl font-bold mb-4 font-[Montserrat-Alternates]">
                        GROUP {group}
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                        {artists.map((artist) => (
                            <Options
                                key={artist}
                                name={artist}
                                selected={selected.includes(artist)}
                                onClick={() => handleSelect(artist)}
                            />
                        ))}
                    </div>

                </div>

                <div className="flex flex-col md:flex-row mt-8 md:mt-10 gap-3 md:gap-40 ease-out animate-[fadeIn_1s]">

                    <button
                        onClick={onPrev}
                        className={`bg-black text-white px-4 py-3 md:py-2 rounded flex-1 cursor-pointer transition duration-500 hover:bg-neutral-900 shadow-md shadow-zinc-800 ${group === "A" ? "hidden md:block md:opacity-0 md:pointer-events-none" : ""}`}
                    >
                        Previous
                    </button>

                    <button
                        disabled={selected.length !== 2}
                        hidden={group === "L"}
                        onClick={() => onNext(group, selected)}
                        className="bg-black text-white px-4 py-3 md:py-2 rounded disabled:opacity-50 flex-1 cursor-pointer transition duration-500 hover:bg-neutral-900 shadow-md shadow-zinc-800"
                    >
                        Next
                    </button>

                    {group === "L" && (
                        <button
                            disabled={selected.length !== 2 || loading}
                            onClick={() => { if (!loading) onSubmit(group, selected) }}
                            className="bg-black text-white px-4 py-3 md:py-2 rounded disabled:opacity-50 flex-1 cursor-pointer transition duration-500 hover:bg-neutral-900 shadow-md shadow-zinc-800"
                        >
                            Submit
                        </button>
                    )}

                    <button
                        disabled={selected.length == 0}
                        onClick={reset}
                        className="bg-black text-white px-4 py-3 md:py-2 rounded disabled:opacity-50 flex-1 cursor-pointer transition duration-500 hover:bg-neutral-900 shadow-md shadow-zinc-800"
                    >
                        Reset
                    </button>

                </div>
            </div>
        </>
    )
}

export default GroupCard