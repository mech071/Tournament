const Footer = () => {
  return (
    <footer className="w-full bg-stone-900 text-zinc-400 py-4">
      <div className="max-w-5xl mx-auto px-6 flex justify-between items-center text-sm">

        <span>© {new Date().getFullYear()} MiliGrammys</span>

        <span className="text-zinc-500">
          <a href="https://github.com/mech071" target="_blank">Github</a>

        </span>

      </div>
    </footer>
  )
}

export default Footer