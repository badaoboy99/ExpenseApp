import { useState, useEffect } from 'react'
import Sidebar from './components/Sidebar'
import ExpenseForm from './components/ExpenseForm'
import ExpenseList from './components/ExpenseList'
import Dashboard from './components/Dashboard'
import Settings from './components/Settings'
import Modal from './components/Modal'
import { api } from './services/api'
import './App.css'

function App() {
  const [expenses, setExpenses] = useState([])
  const [categories, setCategories] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [currentView, setCurrentView] = useState('expenses')

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const [expensesData, categoriesData] = await Promise.all([
        api.fetchExpenses(),
        api.fetchCategories()
      ])
      setExpenses(expensesData.reverse())
      setCategories(categoriesData)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const addExpense = async (expenseData) => {
    try {
      const newExpense = await api.createExpense(expenseData)
      setExpenses([newExpense, ...expenses])
      setIsModalOpen(false)
    } catch (err) {
      alert('Failed to save expense')
    }
  }

  const handleDeleteExpense = async (id) => {
    if (!window.confirm('Are you sure you want to delete this expense?')) return

    try {
      await api.deleteExpense(id)
      setExpenses(expenses.filter(expense => expense.id !== id))
    } catch (err) {
      alert(`Error: ${err.message}`)
    }
  }

  // Category Handlers
  const handleAddCategory = async (name) => {
    try {
      const newCat = await api.createCategory(name)
      setCategories([...categories, newCat])
    } catch (err) {
      alert('Failed to add category')
    }
  }

  const handleDeleteCategory = async (id) => {
    if (!window.confirm('Delete this category?')) return
    try {
      await api.deleteCategory(id)
      setCategories(categories.filter(c => c.id !== id))
    } catch (err) {
      alert('Failed to delete category')
    }
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--md-sys-color-background)' }}>
      <Sidebar activeTab={currentView} onNavigate={setCurrentView} />
      <main style={{ flex: 1, padding: '2rem', maxWidth: '1200px', margin: '0 0' }}>
        <header style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '2rem',
          paddingTop: '2rem'
        }}>
          <div>
            <h1 style={{ marginBottom: '0.25rem' }}>
              {currentView === 'dashboard' ? 'Dashboard' :
                currentView === 'settings' ? 'Settings' : 'Expense Manager'}
            </h1>
            <p>Track your daily spending</p>
          </div>
          {currentView === 'expenses' && (
            <button className="btn" onClick={() => setIsModalOpen(true)}>
              <span style={{ fontSize: '1.2rem', lineHeight: 1 }}>+</span> Add Expense
            </button>
          )}
        </header>

        {currentView === 'dashboard' && <Dashboard expenses={expenses} />}
        {currentView === 'settings' && (
          <Settings
            categories={categories}
            onAddCategory={handleAddCategory}
            onDeleteCategory={handleDeleteCategory}
          />
        )}
        {currentView === 'expenses' && (
          <ExpenseList expenses={expenses} onDelete={handleDeleteExpense} categories={categories} />
        )}
      </main>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add New Expense"
      >
        <ExpenseForm onSubmit={addExpense} categories={categories} />
      </Modal>
    </div>
  )
}

export default App
