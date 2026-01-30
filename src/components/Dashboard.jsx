import { useMemo } from 'react'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
} from 'chart.js'
import { Bar, Pie } from 'react-chartjs-2'

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
)

export default function Dashboard({ expenses }) {
    // Bar Chart Data (Daily)
    const barChartData = useMemo(() => {
        const grouped = expenses.reduce((acc, curr) => {
            const date = curr.date || new Date(Number(curr.id)).toISOString().split('T')[0]
            if (!acc[date]) acc[date] = 0
            acc[date] += curr.amount
            return acc
        }, {})

        const sortedDates = Object.keys(grouped).sort()
        const dataPoints = sortedDates.map(date => grouped[date])
        const labels = sortedDates.map(date => {
            const [y, m, d] = date.split('-')
            return `${d}/${m}`
        })

        return {
            labels,
            datasets: [
                {
                    label: 'Daily Spending',
                    data: dataPoints,
                    backgroundColor: 'rgba(79, 55, 139, 0.8)',
                    borderRadius: 4,
                },
            ],
        }
    }, [expenses])

    // Pie Chart Data (Category)
    const pieChartData = useMemo(() => {
        const grouped = expenses.reduce((acc, curr) => {
            if (!acc[curr.category]) acc[curr.category] = 0
            acc[curr.category] += curr.amount
            return acc
        }, {})

        const labels = Object.keys(grouped)
        const dataPoints = Object.values(grouped)

        const backgroundColors = [
            '#6750A4', // Purple
            '#B58392', // Pinkish
            '#7D5260', // Brownish
            '#625B71', // Greyish
            '#E8DEF8', // Light Purple
            '#FFD8E4', // Light Pink
            '#31111D', // Dark
        ]

        return {
            labels,
            datasets: [
                {
                    data: dataPoints,
                    backgroundColor: backgroundColors.slice(0, labels.length),
                    borderColor: '#ffffff',
                    borderWidth: 2,
                },
            ],
        }
    }, [expenses])

    const barOptions = {
        responsive: true,
        plugins: {
            legend: { position: 'top' },
            title: { display: true, text: 'Daily Expenses' },
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    callback: (value) => new Intl.NumberFormat('vi-VN', { notation: "compact" }).format(value)
                }
            }
        }
    }

    const pieOptions = {
        responsive: true,
        plugins: {
            legend: { position: 'right' },
            title: { display: true, text: 'Expenses by Category' },
        },
    }

    const totalExpenses = expenses.reduce((sum, item) => sum + item.amount, 0)

    return (
        <div>
            <div className="card" style={{ marginBottom: '2rem', textAlign: 'center' }}>
                <h4 style={{ margin: 0, color: 'var(--md-sys-color-on-surface-variant)' }}>Total Spending</h4>
                <div style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--md-sys-color-primary)', marginTop: '0.5rem' }}>
                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalExpenses)}
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                <div className="card" style={{ minHeight: '300px' }}>
                    <Bar options={barOptions} data={barChartData} />
                </div>
                <div className="card" style={{ minHeight: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ width: '100%', maxWidth: '300px' }}>
                        <Pie options={pieOptions} data={pieChartData} />
                    </div>
                </div>
            </div>
        </div>
    )
}
