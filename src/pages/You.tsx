const orderHistory = [
  { id: '#205-3847562', date: '2 Jul 2025', item: 'Sony WH-1000XM5 Wireless Headphones', status: 'Delivered', img: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=80&h=80&fit=crop&auto=format', price: '£279.00' },
  { id: '#203-1928473', date: '28 Jun 2025', item: 'LEGO Technic 42151 Bugatti Bolide', status: 'Delivered', img: 'https://images.unsplash.com/photo-1548521516-7d7f4e9a3ac7?w=80&h=80&fit=crop&auto=format', price: '£59.99' },
  { id: '#201-5647382', date: '15 Jun 2025', item: 'Kindle Paperwhite 16GB Signature Edition', status: 'Delivered', img: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=80&h=80&fit=crop&auto=format', price: '£149.99' },
]

const menuItems = [
  { icon: '📦', label: 'Your Orders', sub: '3 orders this month' },
  { icon: '🔔', label: 'Your Lists', sub: 'Wish list · Baby registry' },
  { icon: '⭐', label: 'Your Prime', sub: 'Member since 2019' },
  { icon: '📍', label: 'Your Addresses', sub: '2 saved addresses' },
  { icon: '💳', label: 'Payment Methods', sub: 'Visa •••• 4291' },
  { icon: '🎁', label: 'Gift cards & vouchers', sub: '£0.00 balance' },
  { icon: '⚙️', label: 'Account Settings', sub: null },
]

export default function You() {
  return (
    <div className="bg-[#EAEDED]">
      {/* Profile header */}
      <div className="bg-white px-4 py-5 mb-3 flex items-center gap-4" style={{ borderBottom: '4px solid #FF9900' }}>
        <div className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold text-white flex-shrink-0" style={{ backgroundColor: '#131921' }}>
          JD
        </div>
        <div>
          <p className="font-bold text-gray-900 text-base">James Davidson</p>
          <p className="text-xs text-gray-500 mt-0.5">james.davidson@email.co.uk</p>
          <span className="inline-flex items-center gap-1 mt-1.5 text-[10px] font-semibold px-2 py-0.5 rounded-full" style={{ backgroundColor: '#00A8E1', color: 'white' }}>
            ★ Prime Member
          </span>
        </div>
      </div>

      {/* Recent orders */}
      <div className="mx-3 mb-3 bg-white rounded-lg overflow-hidden shadow-sm">
        <div className="px-3 pt-3 pb-2 flex items-center justify-between">
          <h3 className="font-semibold text-sm text-gray-900">Recent orders</h3>
          <span className="text-xs" style={{ color: '#007185' }}>View all orders</span>
        </div>
        <div className="divide-y divide-gray-100">
          {orderHistory.map(order => (
            <div key={order.id} className="flex gap-3 px-3 py-3">
              <div className="w-14 h-14 rounded bg-gray-50 overflow-hidden flex-shrink-0">
                <img src={order.img} alt={order.item} className="w-full h-full object-contain p-1" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[11px] text-gray-400">{order.id} · {order.date}</p>
                <p className="text-xs text-gray-800 font-medium mt-0.5 line-clamp-2 leading-snug">{order.item}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[10px] font-semibold" style={{ color: '#007600' }}>✓ {order.status}</span>
                  <span className="text-[10px] text-gray-500">{order.price}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Account menu */}
      <div className="mx-3 mb-4 bg-white rounded-lg overflow-hidden shadow-sm">
        <div className="px-3 pt-3 pb-1">
          <h3 className="font-semibold text-sm text-gray-900">Account</h3>
        </div>
        <div className="divide-y divide-gray-100">
          {menuItems.map(item => (
            <button key={item.label} className="w-full flex items-center gap-3 px-3 py-3 text-left hover:bg-gray-50 transition-colors">
              <span className="text-xl w-8 text-center flex-shrink-0">{item.icon}</span>
              <div className="flex-1">
                <p className="text-sm text-gray-900 font-medium">{item.label}</p>
                {item.sub && <p className="text-[11px] text-gray-400 mt-0.5">{item.sub}</p>}
              </div>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#CCC" strokeWidth="2" strokeLinecap="round">
                <polyline points="9,18 15,12 9,6" />
              </svg>
            </button>
          ))}
        </div>
      </div>

      <div className="mx-3 mb-4">
        <button className="w-full py-2.5 rounded-lg border border-gray-300 text-sm text-gray-700 font-medium bg-white hover:bg-gray-50 transition-colors">
          Sign out
        </button>
      </div>
    </div>
  )
}
