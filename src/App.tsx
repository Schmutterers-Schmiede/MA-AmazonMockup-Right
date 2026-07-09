import { useState } from 'react'
import BottomNav from './components/BottomNav'
import Header from './components/Header'
import Home from './pages/Home'
import You from './pages/You'
import Basket from './pages/Basket'
import Browse from './pages/Browse'
import Rufus from './pages/Rufus'

export type Tab = 'home' | 'you' | 'basket' | 'browse' | 'rufus'

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('home')

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
    <div className="flex flex-col h-dvh bg-[#EAEDED] overflow-hidden" style={{ fontFamily: "'Amazon Ember', Arial, sans-serif" }}>
      {showHeader && <Header activeTab={activeTab} />}
      <main className="flex-1 overflow-y-auto">
        {renderPage()}
      </main>
      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  )
}
