export default function EmployeeCard({ employee, onEdit, onDelete }) {
  return (
    <div className="group relative rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-slate-700 p-5 flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/5">
      <div>
        {/* Top Badges */}
        <div className="flex justify-between items-start gap-2 mb-4">
          <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-md bg-slate-800 text-cyan-300 border border-slate-700">
            {employee.department}
          </span>
          <span className="text-[11px] font-mono px-2 py-0.5 rounded-md font-semibold bg-slate-800/60 text-slate-400 border border-slate-700">
            ID: #{employee.id}
          </span>
        </div>

        {/* Identity & Initials Halo */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-cyan-500/20 to-indigo-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-300 font-mono font-bold text-base">
            {employee.name
              ? employee.name
                  .split(' ')
                  .map((n) => n[0])
                  .slice(0, 2)
                  .join('')
              : 'EP'}
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-100 group-hover:text-cyan-300 transition-colors line-clamp-1">
              {employee.name}
            </h3>
            <p className="text-xs text-indigo-400 font-medium">{employee.role}</p>
          </div>
        </div>

        {/* Contact info list */}
        <div className="mt-4 pt-3 border-t border-slate-800/80 space-y-1.5 text-xs">
          <div className="flex justify-between text-slate-400">
            <span className="text-slate-500">Email:</span>
            <span className="font-mono truncate max-w-[170px]">{employee.email}</span>
          </div>
          <div className="flex justify-between text-slate-400">
            <span className="text-slate-500">Phone:</span>
            <span className="font-mono">{employee.phone || 'N/A'}</span>
          </div>
        </div>

        {/* Salary Metric */}
        <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between">
          <span className="text-[10px] uppercase font-mono tracking-wider text-slate-500">
            Base CTC
          </span>
          <span className="text-sm font-black text-white font-mono">
            ₹{Number(employee.salary || 0).toLocaleString('en-IN')} / mo
          </span>
        </div>
      </div>

      {/* Action Footer (Update & Delete) */}
      <div className="pt-4 mt-5 border-t border-slate-800/80 grid grid-cols-2 gap-2">
        <button
          onClick={() => onEdit(employee)}
          className="cursor-pointer px-3 py-1.5 rounded-xl bg-slate-800 text-cyan-300 hover:bg-cyan-500 hover:text-slate-950 font-mono text-xs font-semibold border border-cyan-500/30 hover:border-transparent transition-all flex items-center justify-center gap-1"
        >
          <span>✎</span> Edit
        </button>
        <button
          onClick={() => onDelete(employee)}
          className="cursor-pointer px-3 py-1.5 rounded-xl bg-rose-500/10 text-rose-400 hover:bg-rose-500 hover:text-white font-mono text-xs font-semibold border border-rose-500/30 hover:border-transparent transition-all flex items-center justify-center gap-1"
        >
          <span>✕</span> Delete
        </button>
      </div>
    </div>
  );
}