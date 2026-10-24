export default function DeleteConfirmModal({ employee, onCancel, onConfirm }) {
  if (!employee) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4">
      <div className="w-full max-w-md bg-slate-950 border border-slate-800 rounded-2xl p-6 shadow-2xl animate-in zoom-in-95 duration-150">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-rose-500/20 border border-rose-500/30 flex items-center justify-center text-rose-400 text-lg">
            ⚠️
          </div>
          <div>
            <h3 className="text-base font-bold text-white">Revoke Employee Access</h3>
            <p className="text-xs text-slate-400">Confirmation required</p>
          </div>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed bg-slate-900 border border-slate-800 p-3 rounded-xl mb-6">
          Are you sure you want to delete <strong className="text-white font-mono">{employee.name}</strong> ({employee.role})? This removes credentials and de-allocates department seating.
        </p>

        <div className="flex items-center justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-xs font-mono uppercase rounded-xl text-slate-400 hover:text-white hover:bg-slate-900 transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={() => onConfirm(employee.id)}
            className="px-4 py-2 text-xs font-mono uppercase font-bold rounded-xl bg-rose-500 hover:bg-rose-600 text-white shadow-lg shadow-rose-500/20 transition-all cursor-pointer"
          >
            Delete Employee
          </button>
        </div>
      </div>
    </div>
  );
}