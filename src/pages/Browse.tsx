const departments = [
  { label: "Today's Deals", icon: '⚡', color: '#FF9900', bg: '#FFF8E7' },
  { label: 'Electronics', icon: '💻', color: '#146EB4', bg: '#EEF5FB' },
  { label: 'Fashion', icon: '👗', color: '#E3006C', bg: '#FDE7F4' },
  { label: 'Home & Garden', icon: '🏡', color: '#008577', bg: '#E6F4F1' },
  { label: 'Books', icon: '📚', color: '#C45500', bg: '#FDF0E6' },
  { label: 'Sports & Outdoors', icon: '⚽', color: '#2D7D46', bg: '#E8F5EC' },
  { label: 'Toys & Games', icon: '🎮', color: '#7B4FD8', bg: '#F0EBF9' },
  { label: 'Beauty', icon: '💄', color: '#C4255C', bg: '#FDEAF0' },
  { label: 'Grocery', icon: '🛒', color: '#007185', bg: '#E5F3F5' },
  { label: 'Pet Supplies', icon: '🐾', color: '#A37019', bg: '#FAF4E6' },
  { label: 'Automotive', icon: '🚗', color: '#555', bg: '#F5F5F5' },
  { label: 'Health', icon: '💊', color: '#1A6B3A', bg: '#E8F5EE' },
  { label: 'Baby', icon: '🍼', color: '#D15C00', bg: '#FDF0E5' },
  { label: 'Music', icon: '🎵', color: '#7F4AB5', bg: '#F3ECFA' },
  { label: 'Movies & TV', icon: '🎬', color: '#CC0C39', bg: '#FDEAEE' },
  { label: 'DIY & Tools', icon: '🔧', color: '#3D3D3D', bg: '#F0F0F0' },
]

const trending = [
  { label: 'Air Fryers', img: 'https://images.unsplash.com/photo-1644176960219-5ea5e1c68e13?w=100&h=100&fit=crop&auto=format' },
  { label: 'Stanley Cups', img: 'https://images.unsplash.com/photo-1610631066894-62452ccb927c?w=100&h=100&fit=crop&auto=format' },
  { label: 'Running Shoes', img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100&h=100&fit=crop&auto=format' },
  { label: 'Robot Vacuums', img: 'https://images.unsplash.com/photo-1558317374-067fb5f30001?w=100&h=100&fit=crop&auto=format' },
]

export default function Browse() {
  return (
    <div className="bg-[#EAEDED]">
      {/* Trending searches */}
      <div className="bg-white px-3 pt-3 pb-3 mb-2">
        <h3 className="font-bold text-sm text-gray-900 mb-2">Trending right now</h3>
        <div className="flex gap-3 overflow-x-auto scrollbar-hide">
          {trending.map(t => (
            <button key={t.label} className="flex-shrink-0 flex flex-col items-center gap-1.5 w-20">
              <div className="w-16 h-16 rounded-full bg-gray-100 overflow-hidden">
                <img src={t.img} alt={t.label} className="w-full h-full object-cover" />
              </div>
              <span className="text-[11px] text-center text-gray-700 leading-tight">{t.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* All departments */}
      <div className="mx-3 mb-4 bg-white rounded-lg overflow-hidden shadow-sm">
        <div className="px-3 pt-3 pb-2">
          <h3 className="font-bold text-sm text-gray-900">All departments</h3>
        </div>
        <div className="grid grid-cols-2 divide-x divide-y divide-gray-100">
          {departments.map(dept => (
            <button
              key={dept.label}
              className="flex items-center gap-3 px-3 py-3 text-left hover:bg-gray-50 transition-colors"
            >
              <div className="w-9 h-9 rounded-lg flex items-center justify-center text-lg flex-shrink-0" style={{ backgroundColor: dept.bg }}>
                {dept.icon}
              </div>
              <span className="text-xs font-medium text-gray-800 leading-tight">{dept.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Programs */}
      <div className="mx-3 mb-4 bg-white rounded-lg overflow-hidden shadow-sm">
        <div className="px-3 pt-3 pb-1">
          <h3 className="font-bold text-sm text-gray-900">Programs & features</h3>
        </div>
        {[
          { icon: '★', label: 'Amazon Prime', sub: 'Fast free delivery', color: '#00A8E1' },
          { icon: '🎧', label: 'Amazon Music', sub: '100M songs, ad-free', color: '#1A4FC6' },
          { icon: '📺', label: 'Prime Video', sub: 'Movies & originals', color: '#00A8E1' },
          { icon: '📖', label: 'Kindle Unlimited', sub: 'Millions of books', color: '#FF9900' },
        ].map(p => (
          <button key={p.label} className="w-full flex items-center gap-3 px-3 py-2.5 text-left hover:bg-gray-50 border-t border-gray-100 transition-colors">
            <span className="text-xl w-8 text-center flex-shrink-0">{p.icon}</span>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">{p.label}</p>
              <p className="text-[11px] text-gray-400">{p.sub}</p>
            </div>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#CCC" strokeWidth="2" strokeLinecap="round">
              <polyline points="9,18 15,12 9,6" />
            </svg>
          </button>
        ))}
      </div>
    </div>
  )
}
