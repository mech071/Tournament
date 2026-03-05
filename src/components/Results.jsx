import { useEffect, useState } from "react"

const Results = () => {
    const [results, setResults] = useState(null)

    useEffect(() => {
        const fetchResults = async () => {
            try {
                const res = await fetch("ttps://exciting-grace-production.up.railway.app/results")
                const data = await res.json()
                setResults(data)
            } catch (err) {
                console.error(err)
            }
        }

        fetchResults()
    }, [])

    if (!results) {
        return (
            <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-[linear-gradient(180deg,#fafafa_0%,#f4f4f5_50%,#fafafa_100%)]">
                Loading results...
            </div>
        )
    }

    return (
        <div className="min-h-[calc(100vh-64px)] bg-[linear-gradient(180deg,#fafafa_0%,#f4f4f5_50%,#fafafa_100%)] py-12 flex justify-center">
            <div className="max-w-4xl w-full space-y-8">

                {Object.entries(results).map(([group, artists]) => (
                    <div key={group} className="bg-white rounded-lg shadow-lg p-6">

                        <div className="grp flex justify-between">
                            <h2 className="text-lg font-semibold mb-4">
                                Group {group}
                            </h2>
                            <h2 className="text-lg font-semibold mb-4">
                                Votes
                            </h2>
                        </div>

                        <div className="space-y-2">

                            {Object.entries(artists)
                                .sort((a, b) => b[1] - a[1])
                                .map(([artist, votes], index) => (
                                    <div
                                        key={artist}
                                        className={`flex justify-between border-b pb-1 text-zinc-700 ${index < 2 ? "bg-purple-200 font-semibold rounded-sm" : ""}`}
                                    >
                                        <span>{artist}</span>
                                        <span>{votes}</span>
                                    </div>
                                ))}

                        </div>

                    </div>
                ))}

            </div>
        </div>
    )
}

export default Results