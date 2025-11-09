import { PLACES } from '@/lib/trips';

export default function NearbyPage() {
  // Aggregate nearby essentials across places
  const items = {};
  PLACES.forEach(p => p.nearby.forEach(n => items[n] = (items[n] || 0) + 1));
  const list = Object.keys(items).map(k => ({ name: k, count: items[k] }));

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-extrabold mb-6">Nearby Essentials</h1>
      <p className="text-sm text-gray-500 mb-6">Common nearby essentials across our featured places — useful for trip planning.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {list.map(item => (
          <div key={item.name} className="p-4 bg-white dark:bg-gray-800 rounded-2xl shadow">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-sm text-gray-500">Available near {item.count} places</p>
              </div>
              <div className="text-blue-600 font-bold">{item.count}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
