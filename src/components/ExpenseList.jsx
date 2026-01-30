import { useState, useMemo } from 'react'
import * as XLSX from 'xlsx'

export default function ExpenseList({ expenses, onDelete, categories = [] }) {
    const [isFilterVisible, setIsFilterVisible] = useState(false)
    const [filters, setFilters] = useState({
        startDate: '',
        endDate: '',
        category: 'All',
        minAmount: '',
        maxAmount: ''
    })

    const formatDate = (dateStr, id) => {
        const d = dateStr ? new Date(dateStr) : new Date(id)
        return d.toLocaleDateString('vi-VN')
    }

    const filteredExpenses = useMemo(() => {
        return expenses.filter(expense => {
            const expenseDate = expense.date ? new Date(expense.date).setHours(0, 0, 0, 0) : new Date(expense.id).setHours(0, 0, 0, 0)

            if (filters.startDate) {
                const start = new Date(filters.startDate).setHours(0, 0, 0, 0)
                if (expenseDate < start) return false
            }
            if (filters.endDate) {
                const end = new Date(filters.endDate).setHours(0, 0, 0, 0)
                if (expenseDate > end) return false
            }
            if (filters.category !== 'All' && expense.category !== filters.category) return false
            if (filters.minAmount && expense.amount < Number(filters.minAmount)) return false
            if (filters.maxAmount && expense.amount > Number(filters.maxAmount)) return false

            return true
        })
    }, [expenses, filters])

    const totalAmount = filteredExpenses.reduce((sum, item) => sum + item.amount, 0)

    const handleCreateFilterChange = (key) => (e) => {
        setFilters(prev => ({ ...prev, [key]: e.target.value }))
    }

    const handleExport = () => {
        const dataToExport = filteredExpenses.map(expense => ({
            Category: expense.category,
            Amount: expense.amount,
            Date: formatDate(expense.date, expense.id),
            Note: expense.note || ''
        }))

        const ws = XLSX.utils.json_to_sheet(dataToExport)
        const wb = XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(wb, ws, "Expenses")
        XLSX.writeFile(wb, "MyExpenses.xlsx")
    }

    return (
        <div style={{ marginTop: '2rem' }}>
            <div className="card" style={{ marginBottom: '2rem' }}>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: isFilterVisible ? '1rem' : 0,
                        cursor: 'pointer'
                    }}
                    onClick={() => setIsFilterVisible(!isFilterVisible)}
                >
                    <h3 style={{ margin: 0 }}>Filters</h3>
                    <button className="btn" style={{ width: 'auto', padding: '0.4rem 0.8rem', fontSize: '0.9rem' }}>
                        {isFilterVisible ? 'Hide' : 'Show'}
                    </button>
                </div>

                {isFilterVisible && (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', animation: 'fadeIn 0.3s' }}>
                        <div className="form-group" style={{ marginBottom: 0 }}>
                            <label className="label">Start Date</label>
                            <input
                                type="date"
                                value={filters.startDate}
                                onChange={handleCreateFilterChange('startDate')}
                            />
                        </div>
                        <div className="form-group" style={{ marginBottom: 0 }}>
                            <label className="label">End Date</label>
                            <input
                                type="date"
                                value={filters.endDate}
                                onChange={handleCreateFilterChange('endDate')}
                            />
                        </div>

                        <div className="form-group" style={{ marginBottom: 0 }}>
                            <label className="label">Category</label>
                            <select
                                value={filters.category}
                                onChange={handleCreateFilterChange('category')}
                            >
                                <option value="All">All Categories</option>
                                {categories.map(cat => (
                                    <option key={cat.id} value={cat.name}>{cat.name}</option>
                                ))}
                            </select>
                        </div>

                        <div className="form-group" style={{ marginBottom: 0 }}>
                            <label className="label">Min Amount</label>
                            <input
                                type="number"
                                placeholder="0"
                                value={filters.minAmount}
                                onChange={handleCreateFilterChange('minAmount')}
                            />
                        </div>
                        <div className="form-group" style={{ marginBottom: 0 }}>
                            <label className="label">Max Amount</label>
                            <input
                                type="number"
                                placeholder="Max"
                                value={filters.maxAmount}
                                onChange={handleCreateFilterChange('maxAmount')}
                            />
                        </div>
                        <style>{`
                            @keyframes fadeIn {
                                from { opacity: 0; transform: translateY(-10px); }
                                to { opacity: 1; transform: translateY(0); }
                            }
                        `}</style>
                    </div>
                )}
            </div>

            <div className="card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <h3 style={{ margin: 0 }}>Expenses ({filteredExpenses.length})</h3>
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                        <div style={{ fontSize: '1.1rem', fontWeight: '700', color: 'var(--primary)' }}>
                            Total: {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalAmount)}
                        </div>
                        <button
                            onClick={handleExport}
                            className="btn"
                            style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}
                            disabled={filteredExpenses.length === 0}
                        >
                            Export Excel
                        </button>
                    </div>
                </div>

                {filteredExpenses.length === 0 ? (
                    <p style={{ color: 'var(--text-muted)', textAlign: 'center', fontStyle: 'italic', padding: '2rem' }}>
                        No expenses found matching filters.
                    </p>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        {filteredExpenses.map(expense => (
                            <div key={expense.id} style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                padding: '1rem',
                                backgroundColor: 'var(--md-sys-color-surface)',
                                borderRadius: 'var(--md-sys-shape-corner-medium)',
                                marginBottom: '0.75rem',
                                boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
                            }}>
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontWeight: '600', color: 'var(--md-sys-color-on-surface)' }}>{expense.category}</div>
                                    <div style={{ fontSize: '0.85rem', color: 'var(--md-sys-color-on-surface-variant)', marginTop: '0.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <span style={{
                                            backgroundColor: 'var(--md-sys-color-secondary-container)',
                                            color: 'var(--md-sys-color-on-secondary-container)',
                                            padding: '2px 8px',
                                            borderRadius: '8px',
                                            fontSize: '0.75rem',
                                            fontWeight: '500'
                                        }}>
                                            {formatDate(expense.date, expense.id)}
                                        </span>
                                        {expense.note && <span>• {expense.note}</span>}
                                    </div>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                    <div style={{ fontWeight: '700', color: 'var(--md-sys-color-primary)', fontSize: '1.1rem' }}>
                                        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(expense.amount)}
                                    </div>
                                    <button
                                        onClick={() => onDelete(expense.id)}
                                        style={{
                                            background: 'var(--md-sys-color-error)',
                                            border: 'none',
                                            color: 'var(--md-sys-color-on-error)',
                                            cursor: 'pointer',
                                            width: '32px',
                                            height: '32px',
                                            borderRadius: '50%',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontSize: '1.25rem',
                                            transition: 'transform 0.2s',
                                            opacity: 1
                                        }}
                                        title="Delete Expense"
                                        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                                        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                                    >
                                        &times;
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
