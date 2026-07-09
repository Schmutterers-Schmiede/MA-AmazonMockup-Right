import type { Tab } from '../App'

interface Props {
  activeTab: Tab
}

export default function Header({ activeTab }: Props) {
  const showLocationBar = activeTab === 'home' || activeTab === 'browse'

  return (
    <header className="flex-shrink-0" style={{ backgroundColor: '#131921' }}>
      {/* Search bar row */}
      <div className="flex items-center gap-2 px-3 pt-3 pb-2">
        {/* Amazon logo */}
        <div className="flex-shrink-0 mr-1">
          <svg width="70" height="22" viewBox="0 0 70 22" fill="none">
            <text x="0" y="17" fontFamily="Arial" fontWeight="bold" fontSize="18" fill="white">amazon</text>
            <path d="M52 17 Q58 21 65 18" stroke="#FF9900" strokeWidth="2" strokeLinecap="round" fill="none"/>
            <path d="M63 18 L65 18 L64 20" stroke="#FF9900" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
          </svg>
        </div>

        {/* Search */}
        <div className="flex-1 flex items-center rounded-md overflow-hidden" style={{ backgroundColor: '#fff' }}>
          <div className="flex-1 flex items-center px-3 py-2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2" strokeLinecap="round" className="mr-2 flex-shrink-0">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <span className="text-sm text-gray-400">Search Amazon</span>
          </div>
          <div className="px-3 py-2 flex-shrink-0" style={{ backgroundColor: '#FF9900' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#131921" strokeWidth="2.5" strokeLinecap="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </div>
        </div>

        {/* Mic */}
        <button className="p-1 flex-shrink-0">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round">
            <rect x="9" y="2" width="6" height="11" rx="3" />
            <path d="M5 10a7 7 0 0014 0" />
            <line x1="12" y1="17" x2="12" y2="21" />
            <line x1="8" y1="21" x2="16" y2="21" />
          </svg>
        </button>
      </div>

      {/* Location / delivery row */}
      {showLocationBar && (
        <div className="flex items-center px-3 pb-2 gap-1">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
            <circle cx="12" cy="9" r="2.5" />
          </svg>
          <span className="text-xs text-white">Deliver to <span className="font-semibold">London</span></span>
        </div>
      )}
    </header>
  )
}
