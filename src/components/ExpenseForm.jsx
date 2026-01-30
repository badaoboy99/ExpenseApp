import { useState, useEffect } from 'react'

export default function ExpenseForm({ onSubmit, categories = [] }) {
    const [formData, setFormData] = useState({
        amount: '',
        category: '', // Will default to first category in useEffect
        note: '',
        date: new Date().toISOString().split('T')[0]
    })

    // Set default category when categories load
    useEffect(() => {
        if (categories.length > 0 && !formData.category) {
            setFormData(prev => ({ ...prev, category: categories[0].name }))
        }
    }, [categories])

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!formData.amount) return

        onSubmit({
            ...formData,
            category: formData.category || (categories[0] ? categories[0].name : 'Other'),
            amount: Number(formData.amount),
            id: Date.now().toString()
        })

        setFormData({
            amount: '',
            category: categories.length > 0 ? categories[0].name : '',
            note: '',
            date: new Date().toISOString().split('T')[0]
        })
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label className="label" htmlFor="date">Date</label>
                <input
                    type="date"
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="form-group">
                <label className="label" htmlFor="amount">Amount (VND)</label>
                <input
                    type="number"
                    id="amount"
                    name="amount"
                    value={formData.amount}
                    onChange={handleChange}
                    placeholder="e.g. 50000"
                    required
                    min="0"
                />
            </div>

            <div className="form-group">
                <label className="label" htmlFor="category">Category</label>
                <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                >
                    {categories.map(cat => (
                        <option key={cat.id} value={cat.name}>{cat.name}</option>
                    ))}
                    {categories.length === 0 && <option value="Other">Other</option>}
                </select>
            </div>

            <div className="form-group">
                <label className="label" htmlFor="note">Note (Optional)</label>
                <textarea
                    id="note"
                    name="note"
                    value={formData.note}
                    onChange={handleChange}
                    placeholder="What was this for?"
                    rows="3"
                />
            </div>

            <button type="submit" className="btn">
                Add Expense
            </button>
        </form>
    )
}
