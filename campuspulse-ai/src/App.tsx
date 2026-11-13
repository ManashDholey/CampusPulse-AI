import { useState } from 'react'
import {
  ArrowUpRight,
  Bell,
  BookOpen,
  Briefcase,
  Building2,
  CalendarDays,
  ChevronDown,
  CircleDashed,
  GraduationCap,
  LayoutDashboard,
  LibraryBig,
  Search,
  Settings,
  ShieldCheck,
  Sparkles,
  UserCircle2,
  Users,
} from 'lucide-react'
import './App.css'

const navItems = [
  { label: 'Dashboard', icon: LayoutDashboard, active: true },
  { label: 'Student', icon: UserCircle2 },
  { label: 'Teacher', icon: GraduationCap },
  { label: 'Department', icon: Building2 },
  { label: 'Class', icon: BookOpen },
  { label: 'Event', icon: CalendarDays },
  { label: 'Time Table', icon: Briefcase },
  { label: 'Library', icon: LibraryBig },
]

const lowerNav = [
  { label: 'Account', icon: Users },
  { label: 'Help', icon: CircleDashed },
  { label: 'Settings', icon: Settings },
]

const stats = [
  { label: 'Students', value: '5,699', tone: 'blue' },
  { label: 'Lecturers', value: '297', tone: 'light' },
  { label: 'Awards', value: '368', tone: 'light' },
  { label: 'Revenue', value: '$87,395', tone: 'light' },
]

const performanceSeries = [38, 42, 44, 47, 54, 59, 63, 67, 70, 76, 81, 82]
const earnings = [95, 110, 78, 120, 100, 86]

const messages = [
  { name: 'Susan Grey', time: '2:00 PM', text: 'Reminder: Department meeting this Wednesday at 3 PM in the main co...' },
  { name: 'Jordan Kim', time: '11:15 AM', text: 'Hello, I\'m having trouble accessing the online library resources. Could...' },
  { name: 'Dean Richard Neal', time: '10:00 AM', text: 'Dear staff, please join me in welcoming our new faculty memb...' },
  { name: 'Dr. Alan Hopper', time: '9:00 AM', text: 'Need assistance with room booking for my extra lectures next...' },
]

const activityFeed = [
  { title: 'Annual Math Olympiad', detail: 'Gold Medalist', time: '2 days ago', type: 'award', tone: 'blue' },
  { title: 'Engineering Project Showcase', detail: 'Best Innovation Award', time: '3 days ago', type: 'award', tone: 'green' },
  { title: 'Volunteer Day', detail: 'Lead Organizer', time: '5 days ago', type: 'event', tone: 'orange' },
]

const buildSmoothPath = (values: number[], width: number, height: number) => {
  const padding = 18
  const max = 100
  const min = 0
  const stepX = (width - padding * 2) / (values.length - 1)

  return values
    .map((value, index) => {
      const x = padding + index * stepX
      const y = height - padding - ((value - min) / (max - min)) * (height - padding * 2)
      return `${index === 0 ? 'M' : 'L'} ${x} ${y}`
    })
    .join(' ')
}

function App() {
  const [activeSection, setActiveSection] = useState('Dashboard')
  const linePath = buildSmoothPath(performanceSeries, 560, 190)
  const areaPath = `${linePath} L 540 160 L 18 160 Z`

  const sectionDetails: Record<string, string> = {
    Dashboard: 'June 28, Wednesday',
    Student: 'Student overview',
    Teacher: 'Faculty access',
    Department: 'Department insights',
    Class: 'Classroom management',
    Event: 'Campus events',
    'Time Table': 'Schedule overview',
    Library: 'Resource center',
    Account: 'Profile settings',
    Help: 'Support desk',
    Settings: 'System preferences',
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand-row">
          <div className="brand-mark">
            <span className="brand-mark-inner" />
          </div>
          <div className="brand-name">CampusPulse</div>
        </div>

        <div className="profile-card">
          <div className="avatar avatar-lg">M</div>
          <div className="profile-meta">
            <div className="profile-name">Mark Averbus</div>
            <div className="profile-role">Admin</div>
          </div>
          <ChevronDown size={14} className="profile-chevron" />
        </div>

        <nav className="nav-panel" aria-label="Main navigation">
          {navItems.map(({ label, icon: Icon }) => (
            <button
              key={label}
              type="button"
              className={`nav-item ${activeSection === label ? 'active' : ''}`}
              onClick={() => setActiveSection(label)}
            >
              <Icon size={16} />
              <span>{label}</span>
            </button>
          ))}
        </nav>

        <div className="nav-separator" />

        <nav className="nav-panel lower" aria-label="Additional navigation">
          {lowerNav.map(({ label, icon: Icon }) => (
            <button
              key={label}
              type="button"
              className={`nav-item secondary ${activeSection === label ? 'active' : ''}`}
              onClick={() => setActiveSection(label)}
            >
              <Icon size={16} />
              <span>{label}</span>
            </button>
          ))}
        </nav>
      </aside>

      <main className="main-panel">
        <header className="topbar">
          <div>
            <h1>{activeSection}</h1>
            <p>{sectionDetails[activeSection] ?? 'Overview'}</p>
          </div>
          <div className="topbar-actions">
            <button type="button" className="search-button" aria-label="Search">
              <Search size={17} />
            </button>
          </div>
        </header>

        <section className="stats-grid">
          {stats.map(({ label, value, tone }) => (
            <div key={label} className={`stat-card ${tone}`}>
              <div className="stat-label">{label}</div>
              <div className="stat-value">{value}</div>
              <div className="stat-arrow">
                <ArrowUpRight size={16} />
              </div>
            </div>
          ))}
        </section>

        <section className="analytics-row">
          <div className="panel chart-panel">
            <div className="panel-header">
              <h2>Academic Performance</h2>
              <button type="button" className="pill-button">
                Last 4 Year <ChevronDown size={13} />
              </button>
            </div>

            <div className="chart-wrap">
              <svg viewBox="0 0 560 190" className="line-chart" role="img" aria-label="Academic performance chart">
                {[0, 1, 2, 3].map((row) => (
                  <line key={row} x1="18" y1={45 + row * 34} x2="540" y2={45 + row * 34} className="grid-line" />
                ))}
                <path d={areaPath} className="area-fill" />
                <path d={linePath} className="line-path" />
                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((tick) => {
                  const x = 18 + tick * 45.4
                  const labelIndex = tick % 2 === 0 ? tick / 2 : null
                  return (
                    <g key={tick}>
                      <line x1={x} y1="18" x2={x} y2="160" className="tick-line" />
                      {labelIndex !== null && (
                        <text x={x} y="176" className="x-axis-text">
                          {['Even', 'Odd', 'Even', 'Odd', 'Even', 'Odd'][labelIndex % 6]}
                        </text>
                      )}
                    </g>
                  )
                })}
                <text x="273" y="176" className="x-axis-small">2024</text>
                <text x="315" y="176" className="x-axis-small">2025</text>
                <text x="357" y="176" className="x-axis-small">2026</text>
                <text x="399" y="176" className="x-axis-small">2027</text>
                <circle cx="280" cy="90" r="8" className="highlight-dot" />
                <line x1="280" y1="18" x2="280" y2="160" className="focus-line" />
              </svg>
            </div>
          </div>

          <div className="panel metric-panel">
            <div className="panel-header">
              <h2>Earnings</h2>
              <button type="button" className="pill-button">
                Last Semester <ChevronDown size={13} />
              </button>
            </div>

            <div className="legend-inline">
              <span><i className="legend-dot blue" />Earnings</span>
              <span><i className="legend-dot green" />Expenses</span>
            </div>

            <div className="bar-chart" aria-label="Earnings chart">
              {earnings.map((value, index) => (
                <div key={index} className="bar-group">
                  <div className="bars">
                    <span className="bar blue" style={{ height: `${value}%` }} />
                    <span className="bar green" style={{ height: `${Math.max(42, value - 18)}%` }} />
                  </div>
                  <div className="bar-label">{['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'][index]}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bottom-grid">
          <div className="panel messages-panel">
            <div className="panel-header compact">
              <h2>Messages</h2>
              <button type="button" className="text-button">View All</button>
            </div>

            <div className="message-list">
              {messages.map((message) => (
                <div key={message.name} className="message-item">
                  <div className="avatar avatar-sm">{message.name.split(' ').map((part) => part[0]).slice(0, 2).join('')}</div>
                  <div className="message-body">
                    <div className="message-topline">
                      <span>{message.name}</span>
                      <span>{message.time}</span>
                    </div>
                    <p>{message.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="panel donut-panel">
            <div className="panel-header compact">
              <h2>Students</h2>
              <button type="button" className="icon-button" aria-label="More options">
                <Sparkles size={14} />
              </button>
            </div>

            <div className="donut-wrap">
              <div className="donut-chart">
                <div className="donut-inner">
                  <div className="donut-value">5,100</div>
                  <div className="donut-label">Total Students</div>
                </div>
              </div>
            </div>

            <div className="donut-legend">
              <div className="legend-row"><span className="legend-swatch blue" /> 2020 (23.5%) <strong>1,200 students</strong></div>
              <div className="legend-row"><span className="legend-swatch green" /> 2021 (24.5%) <strong>1,250 students</strong></div>
            </div>
          </div>

          <div className="panel activity-panel">
            <div className="panel-header compact">
              <h2>Student Activity</h2>
              <button type="button" className="text-button">View All</button>
            </div>

            <div className="activity-list">
              {activityFeed.map((item) => (
                <div key={item.title} className="activity-item">
                  <div className={`activity-icon ${item.tone}`}>
                    {item.type === 'award' ? <ShieldCheck size={14} /> : <Bell size={14} />}
                  </div>
                  <div className="activity-copy">
                    <div className="activity-header">
                      <strong>{item.title}</strong>
                      <span>{item.time}</span>
                    </div>
                    <p>{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
