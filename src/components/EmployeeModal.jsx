import { useState, useEffect } from 'react';

const DEPARTMENTS = ['Engineering', 'Design', 'Product', 'Human Resources', 'Security'];

export default function EmployeeModal({ isOpen, onClose, onSave, initialData }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    department: 'Engineering',
    salary: '',
    phone: '',
  });

  // Populate form if editing existing data, or clear for creation
  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        email: initialData.email || '',
        role: initialData.role || '',
        department: initialData.department || 'Engineering',
        salary: initialData.salary || '',
        phone: initialData.phone || '',
      });
    } else {
      setFormData({
        name: '',
        email: '',
        role: '',
        department: 'Engineering',
        salary: '',
        phone: '',
      });
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'salary' ? (value === '' ? '' : Number(value)) : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4">
      <div className="w-full max-w-lg bg-slate-950 border border-slate-800 rounded-2xl p-6 shadow-2xl animate-in zoom-in-95 duration-150">
        <div className="flex justify-between items-center pb-4 border-b border-slate-800">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400">
              {initialData ? 'Update Record' : 'Create Record'}
            </span>
            <h2 className="text-lg font-black text-white mt-0.5">
              {initialData ? `Edit: ${initialData.name}` : 'Deploy New Employee'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="cursor-pointer text-slate-400 hover:text-white p-2 rounded-lg bg-slate-900 border border-slate-800 text-sm"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 mt-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono uppercase text-slate-400 mb-1.5">Full Name</label>
              <input
                type="text"
                name="name"
                required
                placeholder="e.g. Elena Rostova"
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-slate-900 border border-slate-800 focus:border-cyan-400 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-mono uppercase text-slate-400 mb-1.5">Email Address</label>
              <input
                type="email"
                name="email"
                required
                placeholder="elena@aether.io"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-slate-900 border border-slate-800 focus:border-cyan-400 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none transition-colors"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono uppercase text-slate-400 mb-1.5">Designation / Role</label>
              <input
                type="text"
                name="role"
                required
                placeholder="e.g. AI System Engineer"
                value={formData.role}
                onChange={handleChange}
                className="w-full bg-slate-900 border border-slate-800 focus:border-cyan-400 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-mono uppercase text-slate-400 mb-1.5">Department</label>
              <select
                name="department"
                value={formData.department}
                onChange={handleChange}
                className="w-full bg-slate-900 border border-slate-800 focus:border-cyan-400 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none transition-colors cursor-pointer"
              >
                {DEPARTMENTS.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono uppercase text-slate-400 mb-1.5">Monthly CTC (₹)</label>
              <input
                type="number"
                name="salary"
                min="0"
                required
                placeholder="e.g. 75000"
                value={formData.salary}
                onChange={handleChange}
                className="w-full bg-slate-900 border border-slate-800 focus:border-cyan-400 rounded-xl px-3.5 py-2 text-sm text-white font-mono focus:outline-none transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-mono uppercase text-slate-400 mb-1.5">Contact Number</label>
              <input
                type="text"
                name="phone"
                placeholder="+91 98765 43210"
                value={formData.phone}
                onChange={handleChange}
                className="w-full bg-slate-900 border border-slate-800 focus:border-cyan-400 rounded-xl px-3.5 py-2 text-sm text-white font-mono focus:outline-none transition-colors"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800 flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-mono uppercase rounded-xl text-slate-400 hover:text-white hover:bg-slate-900 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-mono uppercase font-bold rounded-xl bg-gradient-to-r from-cyan-400 to-indigo-500 text-slate-950 hover:brightness-110 shadow-lg shadow-cyan-500/20 transition-all cursor-pointer"
            >
              {initialData ? 'Update Profile' : 'Confirm Registration'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}