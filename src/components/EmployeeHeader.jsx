export default function EmployeeHeader({ totalEmployees, onOpenCreate, onReloadAPI }) {
  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl bg-slate-950/80 border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        {/* Brand identity */}
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center w-11 h-11 rounded-2xl bg-gradient-to-tr from-cyan-500 via-indigo-500 to-fuchsia-500 p-0.5 shadow-lg shadow-indigo-500/25">
            <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
              <span className="text-lg">👔</span>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-black tracking-tight text-white uppercase font-mono">
                Aether<span className="text-cyan-400">Staff</span>
              </h1>
              <span className="px-2 py-0.5 text-[10px] font-mono font-bold tracking-widest uppercase bg-cyan-950 text-cyan-300 border border-cyan-800/50 rounded-md">
                CRUD Hub
              </span>
            </div>
            <p className="text-xs text-slate-400 font-medium">Enterprise Personnel & Role Architecture</p>
          </div>
        </div>

        {/* Global Action buttons */}
        <div className="flex items-center gap-3 text-xs font-mono">
          <button
            onClick={onReloadAPI}
            title="Refetch default data from mock REST API"
            className="px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition cursor-pointer flex items-center gap-1.5"
          >
            <span>🔄</span> Sync API
          </button>

          <button
            onClick={onOpenCreate}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-400 to-indigo-500 text-slate-950 font-bold hover:brightness-110 shadow-lg shadow-cyan-500/20 transition cursor-pointer flex items-center gap-1.5"
          >
            <span>+</span> Deploy Employee
          </button>
        </div>
      </div>
    </header>
  );
}