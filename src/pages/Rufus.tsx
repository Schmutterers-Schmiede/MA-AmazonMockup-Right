import { useState, useRef, useEffect } from 'react'

interface Message {
  id: number
  role: 'assistant' | 'user'
  text: string
  time: string
}

const suggestions = [
  "What's a good laptop under £800?",
  "Find me wireless earbuds with good bass",
  "What's the difference between air fryers?",
  "Recommend a gift for a 10-year-old",
]

const autoReplies: Record<string, string> = {
  default: "I can help you find the perfect product! Could you tell me a bit more about what you're looking for — your budget, main use case, or any specific features?",
  laptop: "For laptops under £800, I'd recommend the **Apple MacBook Air M2** (£949 — sometimes on deal), **Lenovo IdeaPad 5 Pro** (£749), or **ASUS Vivobook 15** (£599). The Lenovo offers the best balance of performance and build quality for that budget. Want me to compare them in more detail?",
  earbuds: "For strong bass, the **Sony WF-1000XM5** (£199) leads the pack with impressive ANC too. Budget pick: **JBL Tune 230NC** (£49). For pure bass: **Skullcandy Indy ANC** (£79). Shall I add any of these to your basket?",
  airfryer: "The key differences are capacity and functions. **Ninja Dual Zone** (£199) is ideal for families — two independent baskets. **Philips Essential XL** (£159) is best for consistent results. **COSORI Pro** (£89) is the best value. How many people are you cooking for?",
  gift: "Great choice! For a 10-year-old, popular picks right now are **LEGO Technic** sets (£30–80), **Osmo Genius Starter Kit** (£70) for creative learning, or **Nintendo Switch Lite** (£199) for gaming. What are their interests?",
}

function getReply(text: string): string {
  const lower = text.toLowerCase()
  if (lower.includes('laptop') || lower.includes('computer')) return autoReplies.laptop
  if (lower.includes('earbuds') || lower.includes('headphones') || lower.includes('earphones')) return autoReplies.earbuds
  if (lower.includes('air fryer') || lower.includes('airfryer')) return autoReplies.airfryer
  if (lower.includes('gift') || lower.includes('kid') || lower.includes('child') || lower.includes('year-old')) return autoReplies.gift
  return autoReplies.default
}

function now() {
  return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

export default function Rufus() {
  const [messages, setMessages] = useState<Message[]>([
    { id: 0, role: 'assistant', text: "Hi! I'm Rufus, Amazon's AI shopping assistant. Ask me anything — I can help you find products, compare options, or answer questions about what to buy.", time: now() }
  ])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, typing])

  const sendMessage = (text: string) => {
    if (!text.trim()) return
    const userMsg: Message = { id: Date.now(), role: 'user', text: text.trim(), time: now() }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setTyping(true)
    setTimeout(() => {
      setTyping(false)
      const reply: Message = { id: Date.now() + 1, role: 'assistant', text: getReply(text), time: now() }
      setMessages(prev => [...prev, reply])
    }, 1200)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage(input)
    }
  }

  return (
    <div className="flex flex-col h-full" style={{ backgroundColor: '#F7F7F7' }}>
      {/* Rufus header */}
      <div className="flex items-center gap-3 px-4 py-3 flex-shrink-0" style={{ backgroundColor: '#131921' }}>
        <div className="w-9 h-9 rounded-full flex items-center justify-center text-xl flex-shrink-0" style={{ backgroundColor: '#FF9900' }}>
          🐕
        </div>
        <div>
          <p className="font-bold text-white text-sm">Rufus</p>
          <p className="text-[11px] text-gray-400">Amazon's AI shopping assistant</p>
        </div>
        <div className="ml-auto flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-green-400 inline-block" />
          <span className="text-[10px] text-gray-400">Online</span>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-3">
        {/* Suggestions (only at start) */}
        {messages.length === 1 && (
          <div className="mb-4">
            <p className="text-[11px] text-gray-400 mb-2 text-center">Try asking:</p>
            <div className="flex flex-col gap-2">
              {suggestions.map(s => (
                <button
                  key={s}
                  onClick={() => sendMessage(s)}
                  className="text-left text-xs px-3 py-2 rounded-xl border bg-white shadow-sm hover:shadow-md transition-shadow"
                  style={{ borderColor: '#FF9900', color: '#131921' }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map(msg => (
          <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} items-end gap-2`}>
            {msg.role === 'assistant' && (
              <div className="w-7 h-7 rounded-full flex items-center justify-center text-sm flex-shrink-0" style={{ backgroundColor: '#FF9900' }}>
                🐕
              </div>
            )}
            <div className={`max-w-[78%] ${msg.role === 'user' ? 'items-end' : 'items-start'} flex flex-col`}>
              <div
                className="px-3 py-2 rounded-2xl text-sm leading-relaxed"
                style={msg.role === 'user'
                  ? { backgroundColor: '#131921', color: 'white', borderBottomRightRadius: 4 }
                  : { backgroundColor: 'white', color: '#1a1a1a', borderBottomLeftRadius: 4, boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }
                }
              >
                {msg.text.split('**').map((part, i) =>
                  i % 2 === 1 ? <strong key={i}>{part}</strong> : <span key={i}>{part}</span>
                )}
              </div>
              <span className="text-[10px] text-gray-400 mt-1 px-1">{msg.time}</span>
            </div>
          </div>
        ))}

        {typing && (
          <div className="flex items-end gap-2">
            <div className="w-7 h-7 rounded-full flex items-center justify-center text-sm flex-shrink-0" style={{ backgroundColor: '#FF9900' }}>
              🐕
            </div>
            <div className="bg-white rounded-2xl px-3 py-3 shadow-sm" style={{ borderBottomLeftRadius: 4 }}>
              <div className="flex gap-1">
                {[0, 1, 2].map(i => (
                  <span
                    key={i}
                    className="w-2 h-2 rounded-full bg-gray-400 inline-block"
                    style={{ animation: `bounce 1.2s ease-in-out ${i * 0.2}s infinite` }}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input bar */}
      <div className="flex-shrink-0 bg-white border-t border-gray-200 px-3 py-2 flex items-end gap-2">
        <textarea
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask Rufus anything..."
          rows={1}
          className="flex-1 resize-none rounded-2xl border border-gray-200 px-3 py-2 text-sm outline-none focus:border-[#FF9900] transition-colors"
          style={{ maxHeight: 100, overflowY: 'auto' }}
        />
        <button
          onClick={() => sendMessage(input)}
          disabled={!input.trim()}
          className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 transition-colors"
          style={{ backgroundColor: input.trim() ? '#FF9900' : '#E5E5E5' }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={input.trim() ? '#131921' : '#999'} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="22" y1="2" x2="11" y2="13" />
            <polygon points="22,2 15,22 11,13 2,9" />
          </svg>
        </button>
      </div>

      <style>{`
        @keyframes bounce {
          0%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-5px); }
        }
      `}</style>
    </div>
  )
}
