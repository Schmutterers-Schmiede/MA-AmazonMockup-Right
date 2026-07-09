import type { Tab } from '../App'

interface Props {
  activeTab: Tab
  setActiveTab: (tab: Tab) => void
}

const navItems: { id: Tab; label: string; icon: (active: boolean) => JSX.Element }[] = [
  {
    id: 'home',
    label: 'Home',
    icon: (active) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill={active ? '#FF9900' : 'none'} stroke={active ? '#FF9900' : '#555'} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z" />
        <path d="M9 21V12h6v9" />
      </svg>
    ),
  },
  {
    id: 'you',
    label: 'You',
    icon: (active) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? '#FF9900' : '#555'} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="4" />
        <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
      </svg>
    ),
  },
  {
    id: 'basket',
    label: 'Basket',
    icon: (active) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? '#FF9900' : '#555'} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <path d="M16 10a4 4 0 01-8 0" />
      </svg>
    ),
  },
  {
    id: 'browse',
    label: 'Browse',
    icon: (active) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? '#FF9900' : '#555'} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <line x1="3" y1="6" x2="21" y2="6" />
        <line x1="3" y1="12" x2="21" y2="12" />
        <line x1="3" y1="18" x2="21" y2="18" />
      </svg>
    ),
  },
  {
    id: 'rufus',
    label: 'Rufus',
    icon: (active) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? '#FF9900' : '#555'} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
        <circle cx="9" cy="10" r="1" fill={active ? '#FF9900' : '#555'} />
        <circle cx="12" cy="10" r="1" fill={active ? '#FF9900' : '#555'} />
        <circle cx="15" cy="10" r="1" fill={active ? '#FF9900' : '#555'} />
      </svg>
    ),
  },
]

export default function BottomNav({ activeTab, setActiveTab }: Props) {
  return (
    <nav className="bg-white border-t border-gray-200 flex-shrink-0" style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
      <div className="flex">
        {navItems.map((item) => {
          const active = activeTab === item.id
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className="flex-1 flex flex-col items-center justify-center py-2 gap-0.5 transition-colors"
              aria-label={item.label}
            >
              {item.icon(active)}
              <span className="text-[10px] font-medium" style={{ color: active ? '#FF9900' : '#555' }}>
                {item.label}
              </span>
              {active && (
                <span className="block h-0.5 w-6 rounded-full mt-0.5" style={{ backgroundColor: '#FF9900' }} />
              )}
            </button>
          )
        })}
      </div>
    </nav>
  )
}
