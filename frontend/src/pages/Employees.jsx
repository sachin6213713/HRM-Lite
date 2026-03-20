import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import EmployeeTable from '../components/EmployeeTable';
import EmployeeForm from '../components/EmployeeForm';
import { employeeService } from '../services/api';
import { UserPlus, RotateCcw } from 'lucide-react';

const Employees = () => {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchEmployees();
    }, []);

    const fetchEmployees = async () => {
        setLoading(true);
        try {
            const response = await employeeService.getAll();
            setEmployees(response.data);
            setError('');
        } catch (err) {
            setError('Failed to fetch employees. Please check your backend connection.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleAddEmployee = async (formData) => {
        try {
            await employeeService.add(formData);
            fetchEmployees();
            setShowForm(false);
            setError('');
        } catch (err) {
            setError(err.response?.data?.message || 'Error adding employee. Check for duplicate ID/Email.');
        }
    };

    const handleDeleteEmployee = async (id) => {
        if (window.confirm('Are you sure you want to delete this employee?')) {
            try {
                await employeeService.delete(id);
                fetchEmployees();
            } catch (err) {
                setError('Error deleting employee.');
            }
        }
    };

    return (
        <Layout>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 mb-1">Employees</h1>
                    <p className="text-slate-400 font-medium tracking-tight">Manage your workforce directory.</p>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={fetchEmployees}
                        className="p-3 bg-white text-slate-400 border border-slate-100 rounded-xl hover:bg-slate-50 transition-all hover:text-slate-600 shadow-sm"
                    >
                        <RotateCcw size={20} className={loading ? 'animate-spin' : ''} />
                    </button>
                    <button
                        onClick={() => setShowForm(true)}
                        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl transition-all shadow-lg shadow-blue-100"
                    >
                        <UserPlus size={18} />
                        <span>Add Employee</span>
                    </button>
                </div>
            </div>

            {error && (
                <div className="mb-6 p-4 bg-rose-50 border border-rose-100 text-rose-600 rounded-2xl flex items-center gap-3">
                    <div className="w-2 h-2 bg-rose-500 rounded-full"></div>
                    <p className="text-sm font-semibold">{error}</p>
                </div>
            )}

            {showForm && (
                <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
                    <div className="w-full max-w-lg animate-in fade-in zoom-in duration-300">
                        <EmployeeForm
                            onAdd={handleAddEmployee}
                            onCancel={() => {
                                setShowForm(false);
                                setError('');
                            }}
                        />
                    </div>
                </div>
            )}
            <EmployeeTable
                employees={employees}
                onDelete={handleDeleteEmployee}
                loading={loading}
            />
        </Layout>
    );
};

export default Employees;
