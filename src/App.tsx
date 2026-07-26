import { useRef, useState } from 'react'
import BottomNav from './components/BottomNav'
import Header from './components/Header'
import Home from './pages/Home'
import You from './pages/You'
import Basket from './pages/Basket'
import Browse from './pages/Browse'
import Rufus from './pages/Rufus'
import { getContext, nextUrl } from './tallyFlow'
import { InstructionsOverlay } from './instructionsOverlay'
import { GRIP_IMAGES } from './gripImages';

export type Tab = 'home' | 'you' | 'basket' | 'browse' | 'rufus'

declare global {
  interface Window {
    Tally: any
  }
}

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('home')
  const [showInstructions, setShowInstructions] = useState(true)
  const [visitedTabs, setVisitedTabs] = useState<Record<Tab, boolean>>({
    home: true, you: false, basket: false, browse: false, rufus: false,
  }) // 'home' starts true since it's shown by default, no tap needed
  const [hasVisitedAll, setHasVisitedAll] = useState(false)

  const startTimeRef = useRef<number>(Date.now())
  const timeToAllVisitedRef = useRef<number | null>(null)
  const ctx = getContext();

  function handleStart() {
    startTimeRef.current = Date.now() // timer starts here, not on page load
    timeToAllVisitedRef.current = null
    setVisitedTabs({ home: true, you: false, basket: false, browse: false, rufus: false })
    setHasVisitedAll(false)
    setShowInstructions(false)
  }

  function handleTabChange(tab: Tab) {
    setActiveTab(tab)
    if (!showInstructions && !visitedTabs[tab]) {
      const updated = { ...visitedTabs, [tab]: true }
      setVisitedTabs(updated)
      const allVisited = Object.values(updated).every(Boolean)
      if (allVisited && timeToAllVisitedRef.current === null) {
        timeToAllVisitedRef.current = Date.now() - startTimeRef.current
        setHasVisitedAll(true)
      }
    }
  }

  function handleRateClick() {
    const ctx = getContext()
    // Falls back to time-since-start if they never completed the task,
    // so we still capture something rather than sending null.
    const elapsed = timeToAllVisitedRef.current ?? (Date.now() - startTimeRef.current)

    window.Tally.openPopup('gD17jO', {
      layout: 'modal',
      hiddenFields: {
        pid: ctx.pid,
        pair: ctx.pair,
        variant: ctx.variant,
        step: ctx.step,
        elapsed_ms: elapsed,
        grip_type: ctx.grip,
        preference_step: ctx.preferenceStep, // 'skip' | 'two_way' | 'three_way'
      },
      onSubmit: () => {
        window.location.href = nextUrl(ctx)
      },
    })
  }

  const renderPage = () => {
    switch (activeTab) {
      case 'home': return <Home />
      case 'you': return <You />
      case 'basket': return <Basket />
      case 'browse': return <Browse />
      case 'rufus': return <Rufus />
    }
  }

  const showHeader = activeTab !== 'rufus'

  return (
    <div className="relative flex flex-col h-dvh bg-[#EAEDED] overflow-hidden" style={{ fontFamily: "'Amazon Ember', Arial, sans-serif" }}>
      {showHeader && <Header activeTab={activeTab} />}
      <main className="flex-1 overflow-y-auto">
        {renderPage()}
      </main>

      {/* Info button (reopens instructions) + Rate button, floating just above the bottom nav */}
      <div className="absolute left-1/2 -translate-x-1/2 z-40 flex items-center gap-2" style={{ bottom: 'calc(88px + env(safe-area-inset-bottom))' }}>
        <button
          onClick={() => setShowInstructions(true)}
          aria-label="Show instructions again"
          className="w-11 h-11 rounded-full bg-white/90 text-gray-700 flex items-center justify-center shadow-md active:scale-95 transition-transform"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="16" x2="12" y2="12" />
            <line x1="12" y1="8" x2="12.01" y2="8" />
          </svg>
        </button>
        <button
          onClick={handleRateClick}
          disabled={!hasVisitedAll}
          className={`text-sm font-bold px-7 py-3 rounded-full transition-all ${
            hasVisitedAll
              ? 'bg-blue-500 text-white shadow-[0_4px_20px_rgba(59,130,246,0.6)] active:scale-95'
              : 'bg-gray-300 text-gray-400 cursor-not-allowed'
          }`}
        >
          Rate Now
        </button>
      </div>

      <BottomNav activeTab={activeTab} setActiveTab={handleTabChange} />

      {/* Instructions overlay, shown until participant taps Start */}
      {showInstructions && (
        <InstructionsOverlay
          variant={ctx.variant}
          onStart={handleStart}
          gripImage={GRIP_IMAGES[ctx.grip]}
        />
      )}
    </div>
  )
}