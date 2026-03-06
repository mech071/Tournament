import { useState, useEffect } from 'react'
import Navbar from './components/navbar'
import { Routes, Route, Link } from "react-router-dom"
import GroupCard from "./components/GroupCard"
import Footer from './components/Footer'
import Results from './components/Results'

function App() {
  const groups = [
    {
      group: "A",
      artists: ["The Weeknd", "Shawn Mendes", "Arijit Singh", "Harry Styles"]
    },
    {
      group: "B",
      artists: ["Taylor Swift", "Billie Eilish", "Sabrina Carpenter", "Olivia Rodrigo"]
    },
    {
      group: "C",
      artists: ["Lady Gaga", "Dua Lipa", "Camilla Cabello", "Adele"]
    },
    {
      group: "D",
      artists: ["Kanye West", "Kendrick Lamar", "Drake", "Eminem"]
    },
    {
      group: "E",
      artists: ["Coldplay", "Maroon 5", "Arctic Monkeys", "One Direction"]
    },
    {
      group: "F",
      artists: ["Imagine Dragons", "Linkin Park", "BTS", "BLACKPINK"]
    },
    {
      group: "G",
      artists: ["Charlie Puth", "Travis Scott", "Ed Sheeran", "Lana Del Rey"]
    },
    {
      group: "H",
      artists: ["Ariana Grande", "Selena Gomez", "Justin Bieber", "Bruno Mars"]
    },
    {
      group: "I",
      artists: ["JVKE", "The 1975", "Conan Gray", "Joji"]
    },
    {
      group: "J",
      artists: ["Metro Boomin", "J.Cole", "21 Savage", "Future"]
    },
    {
      group: "K",
      artists: ["Daft Punk", "Tame Impala", "Fred Again", "Kygo"]
    },
    {
      group: "L",
      artists: ["SZA", "Shakira", "Bad Bunny", "Rihanna"]
    }
  ]
  const [currentGroup, setCurrentGroup] = useState(0)

  const nextGroup = (group, selected) => {
    setPicks(prev => ({
      ...prev,
      [group]: selected
    }))
    setCurrentGroup(prev => prev + 1)
  }

  useEffect(() => {
    const voted = localStorage.getItem("voted")
    if (voted) {
      setSubmitted(true)
    }
  }, [])

  const prevGroup = () => {
    setCurrentGroup(prev => prev - 1)
  }

  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const submitPicks = async (group, selected) => {
    if (loading) return
    setLoading(true)

    const finalPicks = {
      ...picks,
      [group]: selected
    }

    console.log(finalPicks)
    try {
      const res = await fetch("https://exciting-grace-production.up.railway.app/vote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(finalPicks)
      })

      const data = await res.json()
      console.log(data)

      setSubmitted(true)
      localStorage.setItem("voted", "true")

    } catch (err) {
      console.error(err)
      setLoading(false)
    }
  }

  const [picks, setPicks] = useState({})

  return (
    <>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <div className="min-h-[calc(100vh-64px)] flex items-center justify-center px-4 md:px-0 bg-[linear-gradient(180deg,#fafafa_0%,#f4f4f5_50%,#fafafa_100%)]">
              <div className="bg-white shadow-lg rounded-lg p-8 md:p-10 text-center space-y-6 w-full max-w-md">

                <h1 className="text-2xl md:text-3xl font-semibold">
                  MiliGrammys
                </h1>

                <p className="text-zinc-500 text-sm md:text-base">
                  Vote for your favourite artists
                </p>

                <Link
                  to="/dashboard"
                  className="inline-block bg-black text-white px-6 py-3 rounded hover:bg-neutral-900 transition w-full md:w-auto"
                >
                  Vote Now
                </Link>

              </div>
            </div>
          }
        />
        <Route
          path="/dashboard"
          element={
            <div className="min-h-[calc(100vh-64px)] flex items-center justify-center px-4 md:px-0 overflow-x-hidden bg-[linear-gradient(180deg,#fafafa_0%,#f4f4f5_50%,#fafafa_100%)]">
              {submitted ? (
                <div className="bg-white p-6 md:p-10 rounded-lg shadow-xl text-center w-full max-w-md ease-out animate-[fadeIn_0.6s]">
                  <h2 className="text-xl font-semibold text-zinc-800">
                    Vote submitted successfully
                  </h2>
                  <p className="text-zinc-500 mt-2">
                    May the bestestest artist win.
                  </p>
                </div>
              ) : (
                <div className="flex flex-col w-full max-w-3xl">
                  <div className="w-full mb-6">
                    <div className="flex justify-between text-xs text-zinc-500 mb-2">
                      <span>Group {currentGroup + 1}</span>
                      <span>{groups.length} total</span>
                    </div>
                    <div className="h-2 bg-zinc-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-zinc-900 transition-all duration-300"
                        style={{ width: `${((currentGroup + 1) / groups.length) * 100}%` }}
                      />
                    </div>
                  </div>

                  <GroupCard
                    group={groups[currentGroup].group}
                    artists={groups[currentGroup].artists}
                    onNext={nextGroup}
                    onPrev={prevGroup}
                    onSubmit={submitPicks}
                    loading={loading}
                  />

                </div>
              )}
            </div>
          }
        />

        <Route path="/results" element={<Results />} />

      </Routes>
      <Footer />
    </>
  )
}
export default App
