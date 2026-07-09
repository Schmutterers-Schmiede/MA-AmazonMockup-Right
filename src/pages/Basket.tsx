import { useState } from 'react'

interface BasketItem {
  id: number
  name: string
  price: number
  qty: number
  img: string
  prime: boolean
  seller: string
}

const initialItems: BasketItem[] = [
  { id: 1, name: 'Sony WH-1000XM5 Wireless Noise Cancelling Headphones', price: 279.00, qty: 1, img: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=120&h=120&fit=crop&auto=format', prime: true, seller: 'Sold by Amazon' },
  { id: 2, name: 'Echo Dot (5th Gen) Smart Speaker with Alexa', price: 29.99, qty: 2, img: 'https://images.unsplash.com/photo-1543512214-318c7553f230?w=120&h=120&fit=crop&auto=format', prime: true, seller: 'Sold by Amazon' },
  { id: 3, name: 'Anker 65W USB-C Charger GaNPrime', price: 22.99, qty: 1, img: 'https://images.unsplash.com/photo-1583394293214-ce4c42cb6cf4?w=120&h=120&fit=crop&auto=format', prime: false, seller: 'Sold by Anker Direct' },
]

export default function Basket() {
  const [items, setItems] = useState<BasketItem[]>(initialItems)

  const updateQty = (id: number, delta: number) => {
    setItems(prev =>
      prev.map(i => i.id === id ? { ...i, qty: Math.max(0, i.qty + delta) } : i)
        .filter(i => i.qty > 0)
    )
  }

  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0)
  const totalItems = items.reduce((s, i) => s + i.qty, 0)

  return (
    <div className="bg-[#EAEDED]">
      {/* Header */}
      <div className="bg-white px-4 py-3 mb-2 flex items-center justify-between" style={{ borderBottom: '3px solid #FF9900' }}>
        <div>
          <h2 className="font-bold text-lg text-gray-900">Basket</h2>
          {items.length > 0 && (
            <p className="text-xs text-gray-500">{totalItems} item{totalItems !== 1 ? 's' : ''}</p>
          )}
        </div>
        {items.length > 0 && (
          <button className="text-xs" style={{ color: '#007185' }}>Subtotal: <span className="font-bold text-gray-900">£{subtotal.toFixed(2)}</span></button>
        )}
      </div>

      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 px-8 text-center">
          <div className="text-6xl mb-4">🛒</div>
          <h3 className="font-semibold text-gray-800 text-base mb-1">Your basket is empty</h3>
          <p className="text-sm text-gray-500">Add items to your basket to see them here</p>
        </div>
      ) : (
        <>
          {/* Items */}
          <div className="mx-3 mb-3 bg-white rounded-lg overflow-hidden shadow-sm divide-y divide-gray-100">
            {items.map(item => (
              <div key={item.id} className="p-3">
                <div className="flex gap-3">
                  <div className="w-20 h-20 rounded bg-gray-50 overflow-hidden flex-shrink-0">
                    <img src={item.img} alt={item.name} className="w-full h-full object-contain p-1" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-800 font-medium leading-snug line-clamp-3">{item.name}</p>
                    <p className="text-[10px] text-gray-400 mt-0.5">{item.seller}</p>
                    {item.prime && (
                      <span className="inline-flex items-center gap-0.5 mt-1 text-[10px] font-bold" style={{ color: '#00A8E1' }}>
                        ★ Prime
                      </span>
                    )}
                    <p className="text-sm font-bold text-gray-900 mt-1">£{(item.price * item.qty).toFixed(2)}</p>
                    {item.qty > 1 && (
                      <p className="text-[10px] text-gray-400">£{item.price.toFixed(2)} each</p>
                    )}
                  </div>
                </div>
                {/* Qty controls */}
                <div className="flex items-center gap-3 mt-2">
                  <div className="flex items-center border border-gray-300 rounded overflow-hidden">
                    <button onClick={() => updateQty(item.id, -1)} className="w-8 h-7 flex items-center justify-center text-gray-600 hover:bg-gray-50 text-sm font-medium">
                      −
                    </button>
                    <span className="w-8 h-7 flex items-center justify-center text-sm font-semibold border-x border-gray-300">
                      {item.qty}
                    </span>
                    <button onClick={() => updateQty(item.id, 1)} className="w-8 h-7 flex items-center justify-center text-gray-600 hover:bg-gray-50 text-sm font-medium">
                      +
                    </button>
                  </div>
                  <button onClick={() => updateQty(item.id, -item.qty)} className="text-xs" style={{ color: '#CC0C39' }}>
                    Delete
                  </button>
                  <button className="text-xs" style={{ color: '#007185' }}>Save for later</button>
                </div>
              </div>
            ))}
          </div>

          {/* Order summary */}
          <div className="mx-3 mb-3 bg-white rounded-lg p-4 shadow-sm">
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm text-gray-700">Subtotal ({totalItems} item{totalItems !== 1 ? 's' : ''})</span>
              <span className="text-sm font-bold text-gray-900">£{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm" style={{ color: '#007600' }}>★ Prime delivery</span>
              <span className="text-sm font-semibold" style={{ color: '#007600' }}>FREE</span>
            </div>
            <div className="flex justify-between items-center py-2 border-t border-gray-200 mb-4">
              <span className="font-bold text-gray-900">Order total</span>
              <span className="font-bold text-xl text-gray-900">£{subtotal.toFixed(2)}</span>
            </div>
            <button className="w-full py-3 rounded-lg font-bold text-sm" style={{ backgroundColor: '#FFD814', color: '#131921' }}>
              Proceed to checkout
            </button>
          </div>

          {/* Saved for later placeholder */}
          <div className="mx-3 mb-4 bg-white rounded-lg p-3 shadow-sm">
            <p className="text-xs text-gray-500 text-center">Saved for later (0 items)</p>
          </div>
        </>
      )}
    </div>
  )
}
