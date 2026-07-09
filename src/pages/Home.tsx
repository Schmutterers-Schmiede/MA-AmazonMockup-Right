const deals = [
  { id: 1, name: 'Sony WH-1000XM5 Headphones', price: '£279.00', was: '£349.00', discount: '20% off', img: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop&auto=format', rating: 4.7, reviews: 12843 },
  { id: 2, name: 'Kindle Paperwhite 16GB', price: '£149.99', was: '£179.99', discount: '17% off', img: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=200&h=200&fit=crop&auto=format', rating: 4.8, reviews: 45321 },
  { id: 3, name: 'Echo Dot (5th Gen)', price: '£29.99', was: '£54.99', discount: '45% off', img: 'https://images.unsplash.com/photo-1543512214-318c7553f230?w=200&h=200&fit=crop&auto=format', rating: 4.6, reviews: 89234 },
  { id: 4, name: 'Apple AirPods Pro 2nd Gen', price: '£189.00', was: '£249.00', discount: '24% off', img: 'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=200&h=200&fit=crop&auto=format', rating: 4.7, reviews: 34210 },
]

const categories = [
  { label: "Today's Deals", color: '#FF9900', icon: '⚡' },
  { label: 'Prime', color: '#00A8E1', icon: '★' },
  { label: 'Electronics', color: '#146EB4', icon: '📱' },
  { label: 'Fashion', color: '#E3006C', icon: '👗' },
  { label: 'Home', color: '#008577', icon: '🏠' },
  { label: 'Books', color: '#C45500', icon: '📚' },
]

function Stars({ rating }: { rating: number }) {
  return (
    <span className="flex items-center gap-0.5">
      {[1,2,3,4,5].map(i => (
        <svg key={i} width="10" height="10" viewBox="0 0 12 12">
          <polygon points="6,1 7.5,4.5 11,4.5 8.5,7 9.5,11 6,8.5 2.5,11 3.5,7 1,4.5 4.5,4.5" fill={i <= Math.round(rating) ? '#FFA41C' : '#DDD'} />
        </svg>
      ))}
    </span>
  )
}

export default function Home() {
  return (
    <div className="bg-[#EAEDED]">
      {/* Hero banner */}
      <div className="relative overflow-hidden" style={{ backgroundColor: '#131921', minHeight: 140 }}>
        <img
          src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800&h=280&fit=crop&auto=format"
          alt="Summer sale banner"
          className="w-full object-cover opacity-60"
          style={{ maxHeight: 160 }}
        />
        <div className="absolute inset-0 flex flex-col justify-center px-5">
          <p className="text-[#FF9900] text-xs font-semibold uppercase tracking-widest mb-1">Summer Sale</p>
          <h2 className="text-white text-2xl font-bold leading-tight">Up to 50% off</h2>
          <p className="text-gray-300 text-sm mt-1">Thousands of deals, one place</p>
          <button className="mt-3 self-start text-xs font-semibold px-4 py-1.5 rounded-full" style={{ backgroundColor: '#FF9900', color: '#131921' }}>
            Shop now
          </button>
        </div>
      </div>

      {/* Category pills */}
      <div className="flex gap-2 px-3 py-3 overflow-x-auto scrollbar-hide">
        {categories.map(c => (
          <button key={c.label} className="flex-shrink-0 flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full bg-white border border-gray-200 whitespace-nowrap">
            <span>{c.icon}</span>
            <span style={{ color: '#131921' }}>{c.label}</span>
          </button>
        ))}
      </div>

      {/* Continue browsing */}
      <div className="mx-3 mb-3 bg-white rounded-lg overflow-hidden shadow-sm">
        <div className="px-3 pt-3 pb-2 flex items-center justify-between">
          <h3 className="font-semibold text-sm text-gray-900">Continue browsing</h3>
          <span className="text-xs" style={{ color: '#007185' }}>See more</span>
        </div>
        <div className="flex gap-2 px-3 pb-3 overflow-x-auto scrollbar-hide">
          {[
            { name: 'LEGO Technic', img: 'https://images.unsplash.com/photo-1548521516-7d7f4e9a3ac7?w=120&h=120&fit=crop&auto=format', price: '£59.99' },
            { name: 'Nike Air Max', img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=120&h=120&fit=crop&auto=format', price: '£89.99' },
            { name: 'Gaming Chair', img: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=120&h=120&fit=crop&auto=format', price: '£199.00' },
            { name: 'Coffee Maker', img: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=120&h=120&fit=crop&auto=format', price: '£45.99' },
          ].map(item => (
            <div key={item.name} className="flex-shrink-0 w-24">
              <div className="w-24 h-24 rounded bg-gray-100 overflow-hidden mb-1">
                <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
              </div>
              <p className="text-[11px] text-gray-700 line-clamp-2 leading-tight">{item.name}</p>
              <p className="text-[11px] font-semibold text-gray-900 mt-0.5">{item.price}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Deals section */}
      <div className="mx-3 mb-3 bg-white rounded-lg overflow-hidden shadow-sm">
        <div className="px-3 pt-3 pb-2 flex items-center justify-between">
          <h3 className="font-semibold text-sm text-gray-900">Deals for you</h3>
          <span className="text-xs" style={{ color: '#007185' }}>See all deals</span>
        </div>
        <div className="grid grid-cols-2 gap-px bg-gray-100">
          {deals.map(d => (
            <div key={d.id} className="bg-white p-3">
              <div className="relative">
                <div className="w-full aspect-square bg-gray-50 rounded overflow-hidden mb-2">
                  <img src={d.img} alt={d.name} className="w-full h-full object-contain p-2" />
                </div>
                <span className="absolute top-1 left-1 text-[10px] font-bold text-white px-1.5 py-0.5 rounded" style={{ backgroundColor: '#CC0C39' }}>
                  {d.discount}
                </span>
              </div>
              <p className="text-[11px] text-gray-700 line-clamp-2 leading-tight mb-1">{d.name}</p>
              <Stars rating={d.rating} />
              <p className="text-[10px] text-gray-400 mt-0.5">{d.reviews.toLocaleString()} reviews</p>
              <div className="mt-1.5 flex items-baseline gap-1">
                <span className="text-sm font-bold text-gray-900">{d.price}</span>
                <span className="text-[10px] text-gray-400 line-through">{d.was}</span>
              </div>
              <button className="mt-2 w-full text-xs py-1 rounded" style={{ backgroundColor: '#FFD814', color: '#131921', fontWeight: 600 }}>
                Add to basket
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Prime banner */}
      <div className="mx-3 mb-4 rounded-lg overflow-hidden shadow-sm flex items-center gap-3 px-4 py-3" style={{ backgroundColor: '#00A8E1' }}>
        <div className="flex-1">
          <p className="text-white font-bold text-sm">Try Prime free</p>
          <p className="text-white/80 text-xs mt-0.5">Fast delivery & exclusive deals</p>
        </div>
        <button className="text-xs font-semibold px-3 py-1.5 rounded-full bg-white" style={{ color: '#00A8E1' }}>
          Start
        </button>
      </div>
    </div>
  )
}
