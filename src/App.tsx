import { useRef, useState } from 'react'
import BottomNav from './components/BottomNav'
import Header from './components/Header'
import Home from './pages/Home'
import You from './pages/You'
import Basket from './pages/Basket'
import Browse from './pages/Browse'
import Rufus from './pages/Rufus'
import { getContext, nextUrl, INSTRUCTIONS } from './tallyFlow'
import { InstructionsOverlay } from './InstructionsOverlay'
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
  const [hasVisitedRufus, setHasVisitedRufus] = useState(false)

  const startTimeRef = useRef<number>(Date.now())
  const timeToRufusRef = useRef<number | null>(null)
  const ctx = getContext();

  function handleStart() {
    startTimeRef.current = Date.now() // timer starts here, not on page load
    timeToRufusRef.current = null
    setHasVisitedRufus(false)
    setShowInstructions(false)
  }

  function handleTabChange(tab: Tab) {
    setActiveTab(tab)
    if (tab === 'rufus' && !showInstructions && timeToRufusRef.current === null) {
      timeToRufusRef.current = Date.now() - startTimeRef.current
      setHasVisitedRufus(true)
    }
  }

  function handleRateClick() {
    const ctx = getContext()
    // Falls back to time-since-start if they never completed the task,
    // so we still capture something rather than sending null.
    const elapsed = timeToRufusRef.current ?? (Date.now() - startTimeRef.current)

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

      {/* Rate this prototype, floats just above the bottom nav */}
      <div className="absolute left-1/2 -translate-x-1/2 z-40" style={{ bottom: 'calc(64px + env(safe-area-inset-bottom))' }}>
        <button
          onClick={handleRateClick}
          disabled={!hasVisitedRufus}
          className={`text-sm font-bold px-7 py-3 rounded-full transition-all ${
            hasVisitedRufus
              ? 'bg-blue-500 text-white shadow-[0_4px_20px_rgba(59,130,246,0.6)] active:scale-95'
              : 'bg-gray-300 text-gray-400 cursor-not-allowed'
          }`}
        >
          Done testing — Rate this
        </button>
      </div>

      <BottomNav activeTab={activeTab} setActiveTab={handleTabChange} />

      {/* Instructions overlay, shown until participant taps Start */}
      {showInstructions && (
        <InstructionsOverlay
          title={INSTRUCTIONS.control_center.title}
          instructions={INSTRUCTIONS.control_center.text}
          onStart={handleStart}
          gripImage={GRIP_IMAGES[ctx.grip]}
        />
      )}
    </div>
  )
}