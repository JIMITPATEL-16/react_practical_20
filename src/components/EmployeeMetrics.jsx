export default function EmployeeMetrics({ employees }) {
  const totalPayroll = employees.reduce((acc, emp) => acc + (Number(emp.salary) || 0), 0);
  const avgSalary = employees.length ? Math.round(totalPayroll / employees.length) : 0;
  const uniqueDepartments = new Set(employees.map((emp) => emp.department)).size;

  const cards = [
    {
      label: 'Monthly Payroll Run',
      val: `₹${totalPayroll.toLocaleString('en-IN')}`,
      sub: 'Cumulative organizational spend',
      accent: 'from-cyan-500/20 to-blue-500/0 border-cyan-500/30 text-cyan-400',
    },
    {
      label: 'Mean Compensation',
      val: `₹${avgSalary.toLocaleString('en-IN')}`,
      sub: 'Standard employee rate',
      accent: 'from-indigo-500/20 to-purple-500/0 border-indigo-500/30 text-indigo-400',
    },
    {
      label: 'Operational Teams',
      val: uniqueDepartments,
      sub: 'Distinct division clusters',
      accent: 'from-fuchsia-500/20 to-pink-500/0 border-fuchsia-500/30 text-fuchsia-400',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      {cards.map((c, i) => (
        <div
          key={i}
          className={`relative overflow-hidden rounded-2xl bg-gradient-to-b bg-slate-900/60 p-5 border backdrop-blur-md transition-all hover:translate-y-[-2px] ${c.accent}`}
        >
          <p className="text-[11px] font-mono uppercase tracking-wider text-slate-400">{c.label}</p>
          <p className="text-3xl font-extrabold text-white mt-2 tracking-tight font-mono">{c.val}</p>
          <p className="text-xs text-slate-500 mt-1">{c.sub}</p>
        </div>
      ))}
    </div>
  );
}