import { useState } from 'react'

export default function Sidebar({ activeTab, onNavigate }) {
    const [isCollapsed, setIsCollapsed] = useState(false)

    const menuItems = [
        { icon: '📊', id: 'dashboard', label: 'Dashboard' },
        { icon: '💰', id: 'expenses', label: 'Expenses' },
        { icon: '📈', id: 'reports', label: 'Reports' }, // Placeholder
        { icon: '⚙️', id: 'settings', label: 'Settings' }, // Placeholder
    ]

    return (
        <aside style={{
            width: isCollapsed ? '80px' : '280px',
            backgroundColor: 'var(--md-sys-color-surface-container)',
            padding: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
            borderRight: '1px solid var(--md-sys-color-outline)',
            height: '100vh',
            position: 'sticky',
            top: 0,
            transition: 'width 0.3s ease',
            overflow: 'hidden',
            whiteSpace: 'nowrap'
        }}>
            <div style={{
                fontSize: '1.5rem',
                fontWeight: '700',
                color: 'var(--md-sys-color-primary)',
                marginBottom: '2rem',
                paddingLeft: isCollapsed ? '0' : '1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: isCollapsed ? 'center' : 'flex-start',
                gap: '0.5rem',
                height: '40px'
            }}>
                <span>💸</span>
                {!isCollapsed && <span style={{ animation: 'fadeIn 0.3s' }}>ExpenseApp</span>}
            </div>

            <nav style={{ flex: 1 }}>
                {menuItems.map((item) => (
                    <div key={item.id} style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: isCollapsed ? 'center' : 'flex-start',
                        gap: '1rem',
                        padding: '0.75rem 1.5rem',
                        borderRadius: 'var(--md-sys-shape-corner-full)',
                        cursor: 'pointer',
                        backgroundColor: activeTab === item.id ? 'var(--md-sys-color-secondary-container)' : 'transparent',
                        color: activeTab === item.id ? 'var(--md-sys-color-on-secondary-container)' : 'var(--md-sys-color-on-surface-variant)',
                        fontWeight: activeTab === item.id ? '600' : '500',
                        marginBottom: '0.25rem',
                        transition: 'all 0.2s',
                    }}
                        onClick={() => onNavigate && onNavigate(item.id)}
                        onMouseEnter={(e) => {
                            if (activeTab !== item.id) e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.04)'
                        }}
                        onMouseLeave={(e) => {
                            if (activeTab !== item.id) e.currentTarget.style.backgroundColor = 'transparent'
                        }}
                        title={isCollapsed ? item.label : ''}
                    >
                        <span style={{ fontSize: '1.2rem' }}>{item.icon}</span>
                        {!isCollapsed && <span style={{ opacity: isCollapsed ? 0 : 1, transition: 'opacity 0.2s' }}>{item.label}</span>}
                    </div>
                ))}
            </nav>

            <div style={{
                marginTop: 'auto',
                display: 'flex',
                justifyContent: isCollapsed ? 'center' : 'flex-end',
                paddingTop: '1rem',
                borderTop: '1px solid var(--md-sys-color-outline)'
            }}>
                <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    style={{
                        background: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        fontSize: '1.2rem',
                        color: 'var(--md-sys-color-on-surface-variant)',
                        padding: '0.5rem',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'background-color 0.2s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.05)'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                    title={isCollapsed ? "Expand" : "Collapse"}
                >
                    {isCollapsed ? '➡️' : '⬅️'}
                </button>
            </div>

            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
            `}</style>
        </aside>
    )
}
