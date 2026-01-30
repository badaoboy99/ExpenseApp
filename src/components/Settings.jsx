import { useState } from 'react'

export default function Settings({ categories, onAddCategory, onDeleteCategory }) {
    const [newCategory, setNewCategory] = useState('')

    const handleAdd = (e) => {
        e.preventDefault()
        if (newCategory.trim()) {
            onAddCategory(newCategory.trim())
            setNewCategory('')
        }
    }

    return (
        <div>
            <div className="card">
                <h3 style={{ marginTop: 0, marginBottom: '1.5rem', color: 'var(--md-sys-color-primary)' }}>Manage Categories</h3>

                <form onSubmit={handleAdd} style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem' }}>
                    <div style={{ flex: 1 }}>
                        <input
                            type="text"
                            value={newCategory}
                            onChange={(e) => setNewCategory(e.target.value)}
                            placeholder="New Category Name"
                            style={{ height: '100%' }} // Match button height
                        />
                    </div>
                    <button type="submit" className="btn">
                        Add
                    </button>
                </form>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {categories.map(cat => (
                        <div key={cat.id} className="list-item">
                            <span style={{ fontWeight: '500' }}>{cat.name}</span>

                            <button
                                onClick={() => onDeleteCategory(cat.id)}
                                style={{
                                    background: 'none',
                                    border: 'none',
                                    color: 'var(--md-sys-color-error)',
                                    cursor: 'pointer',
                                    padding: '0.5rem',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: '32px',
                                    height: '32px',
                                    transition: 'background-color 0.2s'
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(179, 38, 30, 0.1)'}
                                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                                title="Delete Category"
                            >
                                &times;
                            </button>
                        </div>
                    ))}
                    {categories.length === 0 && (
                        <p style={{ textAlign: 'center', fontStyle: 'italic' }}>No categories found.</p>
                    )}
                </div>
            </div>
        </div>
    )
}
