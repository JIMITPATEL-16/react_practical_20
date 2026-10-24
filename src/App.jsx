import { useState, useEffect, useMemo } from 'react';
import EmployeeHeader from './components/EmployeeHeader';
import EmployeeMetrics from './components/EmployeeMetrics';
import EmployeeCard from './components/EmployeeCard';
import EmployeeModal from './components/EmployeeModal';
import DeleteConfirmModal from './components/DeleteConfirmModal';

export default function App() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState(null);

  // Modal controls
  const [modalOpen, setModalOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [employeeToDelete, setEmployeeToDelete] = useState(null);

  // Search & Filter controls
  const [search, setSearch] = useState('');
  const [activeDept, setActiveDept] = useState('All');
  const [toastMessage, setToastMessage] = useState('');

  // 1. READ: Fetch records from mock REST API using useEffect
  const fetchEmployeesFromAPI = async () => {
    setLoading(true);
    setApiError(null);
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      if (!response.ok) {
        throw new Error(`API fetch failed with status: ${response.status}`);
      }
      const data = await response.json();

      // Transform mock user data into enriched employee schema
      const mappedEmployees = data.slice(0, 6).map((user, idx) => {
        const departments = ['Engineering', 'Design', 'Product', 'Security'];
        const roles = [
          'Full Stack Developer',
          'UI/UX Architect',
          'Lead Product Manager',
          'Infra Engineer',
        ];
        return {
          id: user.id,
          name: user.name,
          email: user.email.toLowerCase(),
          phone: user.phone.split(' ')[0],
          department: departments[idx % departments.length],
          role: roles[idx % roles.length],
          salary: 55000 + idx * 12500,
        };
      });

      setEmployees(mappedEmployees);
    } catch (err) {
      setApiError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployeesFromAPI();
  }, []);

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3500);
  };

  // 2. CREATE or UPDATE handler
  const handleSaveEmployee = async (formData) => {
    if (editingEmployee) {
      // UPDATE Operation
      try {
        // Optional API call demo:
        // await fetch(`https://jsonplaceholder.typicode.com/users/${editingEmployee.id}`, { method: 'PUT', body: JSON.stringify(formData) });
        setEmployees((prev) =>
          prev.map((emp) => (emp.id === editingEmployee.id ? { ...emp, ...formData } : emp))
        );
        triggerToast(`Updated profile for ${formData.name}`);
      } catch (err) {
        console.error(err);
      }
    } else {
      // CREATE Operation
      const newEmployee = {
        ...formData,
        id: Date.now(), // Unique ID generation
      };
      setEmployees((prev) => [newEmployee, ...prev]);
      triggerToast(`Successfully registered ${newEmployee.name}`);
    }

    setModalOpen(false);
    setEditingEmployee(null);
  };

  // 3. DELETE handler
  const handleDeleteEmployee = (id) => {
    const target = employees.find((e) => e.id === id);
    setEmployees((prev) => prev.filter((e) => e.id !== id));
    setEmployeeToDelete(null);
    if (target) {
      triggerToast(`Removed record for ${target.name}`);
    }
  };

  // Departments list for filter buttons
  const departments = ['All', ...new Set(employees.map((e) => e.department))];

  // Filtered employees memo
  const filteredEmployees = useMemo(() => {
    return employees.filter((emp) => {
      const query = search.toLowerCase();
      const matchesSearch =
        emp.name.toLowerCase().includes(query) ||
        emp.email.toLowerCase().includes(query) ||
        emp.role.toLowerCase().includes(query);
      const matchesDept = activeDept === 'All' || emp.department === activeDept;
      return matchesSearch && matchesDept;
    });
  }, [employees, search, activeDept]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-cyan-500 selection:text-slate-950 pb-16">
      <EmployeeHeader
        totalEmployees={employees.length}
        onOpenCreate={() => {
          setEditingEmployee(null);
          setModalOpen(true);
        }}
        onReloadAPI={fetchEmployeesFromAPI}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-8">
        <EmployeeMetrics employees={employees} />

        {/* Filter & Search Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 mb-6">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 sm:pb-0">
            {departments.map((dept) => (
              <button
                key={dept}
                onClick={() => setActiveDept(dept)}
                className={`px-3 py-1.5 rounded-xl font-mono text-xs transition-all cursor-pointer whitespace-nowrap ${
                  activeDept === dept
                    ? 'bg-cyan-400 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                    : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {dept}
              </button>
            ))}
          </div>

          <div className="relative">
            <input
              type="text"
              placeholder="Search by name, role, email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full sm:w-72 bg-slate-900 border border-slate-800 focus:border-cyan-400 rounded-xl px-3.5 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none transition-colors"
            />
          </div>
        </div>

        {/* Conditional Rendering: Loading & Error States */}
        {loading ? (
          <div className="text-center py-20 border border-dashed border-slate-800 rounded-2xl">
            <div className="inline-block w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin mb-3"></div>
            <p className="text-slate-400 font-mono text-xs">Fetching personnel from REST endpoint...</p>
          </div>
        ) : apiError ? (
          <div className="text-center py-16 bg-rose-500/10 border border-rose-500/30 rounded-2xl p-6">
            <p className="text-rose-400 font-mono text-sm">Failed to connect to API: {apiError}</p>
            <button
              onClick={fetchEmployeesFromAPI}
              className="mt-3 px-4 py-2 bg-rose-500 text-white font-mono text-xs rounded-xl hover:bg-rose-600 transition cursor-pointer"
            >
              Retry Connection
            </button>
          </div>
        ) : filteredEmployees.length === 0 ? (
          <div className="text-center py-20 border border-dashed border-slate-800 rounded-2xl">
            <p className="text-slate-400 font-mono text-sm">No employee records match the active criteria.</p>
          </div>
        ) : (
          /* List Rendering: Grid of Employees */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredEmployees.map((emp) => (
              <EmployeeCard
                key={emp.id}
                employee={emp}
                onEdit={(emp) => {
                  setEditingEmployee(emp);
                  setModalOpen(true);
                }}
                onDelete={setEmployeeToDelete}
              />
            ))}
          </div>
        )}
      </main>

      {/* CRUD Create/Edit Modal */}
      <EmployeeModal
        isOpen={modalOpen}
        initialData={editingEmployee}
        onClose={() => {
          setModalOpen(false);
          setEditingEmployee(null);
        }}
        onSave={handleSaveEmployee}
      />

      {/* Delete Confirmation Modal */}
      {employeeToDelete && (
        <DeleteConfirmModal
          employee={employeeToDelete}
          onCancel={() => setEmployeeToDelete(null)}
          onConfirm={handleDeleteEmployee}
        />
      )}

      {/* Real-time Notification Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-2.5 rounded-xl bg-slate-900 border border-cyan-400/40 text-cyan-300 shadow-2xl text-xs font-mono flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2">
          <span>✓</span>
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}