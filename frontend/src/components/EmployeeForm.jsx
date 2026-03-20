import { Plus, X, User, Mail, Building, CreditCard } from 'lucide-react';

const EmployeeForm = ({ onAdd, onCancel }) => {
    const [formData, setFormData] = useState({
        employeeId: '',
        fullName: '',
        email: '',
        department: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        onAdd(formData);
    };

    const inputClasses = "w-full px-4 py-3 rounded-xl bg-slate-50/50 border border-slate-100 focus:outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 transition-all text-[13px] font-medium placeholder:text-slate-300";
    const labelClasses = "flex items-center gap-2 text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2";

    return (
        <div className="bg-white rounded-[32px] overflow-hidden shadow-2xl shadow-slate-200/50 border border-slate-100">
            <div className="flex justify-between items-center p-8 pb-4">
                <h2 className="text-xl font-black text-slate-800">Add New Employee</h2>
                <button onClick={onCancel} className="p-2 text-slate-300 hover:text-slate-600 transition-colors hover:bg-slate-50 rounded-xl">
                    <X size={18} />
                </button>
            </div>

            <form onSubmit={handleSubmit} className="p-8 pt-0 space-y-6">
                <div>
                    <label className={labelClasses}>
                        <CreditCard size={14} className="text-slate-400" />
                        Employee ID
                    </label>
                    <input
                        type="text"
                        required
                        className={inputClasses}
                        placeholder="e.g. EMP-001"
                        value={formData.employeeId}
                        onChange={(e) => setFormData({ ...formData, employeeId: e.target.value })}
                    />
                </div>

                <div>
                    <label className={labelClasses}>
                        <User size={14} className="text-slate-400" />
                        Full Name
                    </label>
                    <input
                        type="text"
                        required
                        className={inputClasses}
                        placeholder="John Doe"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    />
                </div>

                <div>
                    <label className={labelClasses}>
                        <Mail size={14} className="text-slate-400" />
                        Email Address
                    </label>
                    <input
                        type="email"
                        required
                        className={inputClasses}
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                </div>

                <div>
                    <label className={labelClasses}>
                        <Building size={14} className="text-slate-400" />
                        Department
                    </label>
                    <input
                        type="text"
                        list="departments"
                        required
                        className={inputClasses}
                        placeholder="Engineering"
                        value={formData.department}
                        onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    />
                    <datalist id="departments">
                        <option value="Engineering" />
                        <option value="Product" />
                        <option value="Design" />
                        <option value="Marketing" />
                        <option value="Human Resources" />
                    </datalist>
                </div>

                <div className="pt-4 flex items-center justify-end gap-6">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="text-sm font-bold text-slate-400 hover:text-slate-600 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-black py-4 px-8 rounded-2xl transition-all shadow-xl shadow-blue-100 group"
                    >
                        <Plus size={18} className="transition-transform group-hover:rotate-90" />
                        <span>Save Employee</span>
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EmployeeForm;
