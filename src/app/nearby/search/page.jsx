'use client';

import { useState, useEffect, useRef } from 'react';
import { Search, MapPin, Navigation, Star, Phone, Globe, Clock, Filter, Loader } from 'lucide-react';

export default function NearbySearchPage() {
  const [map, setMap] = useState(null);
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [radius, setRadius] = useState(5000); // 5km default
  const mapRef = useRef(null);
  const markersRef = useRef([]);

  const categories = [
    { id: 'all', name: 'All Places', icon: '🌍', type: '' },
    { id: 'restaurant', name: 'Restaurants', icon: '🍽️', type: 'restaurant' },
    { id: 'hotel', name: 'Hotels', icon: '🏨', type: 'lodging' },
    { id: 'attraction', name: 'Attractions', icon: '🎭', type: 'tourist_attraction' },
    { id: 'cafe', name: 'Cafes', icon: '☕', type: 'cafe' },
    { id: 'shopping', name: 'Shopping', icon: '🛍️', type: 'shopping_mall' },
    { id: 'hospital', name: 'Hospitals', icon: '🏥', type: 'hospital' },
    { id: 'pharmacy', name: 'Pharmacy', icon: '💊', type: 'pharmacy' },
    { id: 'atm', name: 'ATMs', icon: '💰', type: 'atm' },
    { id: 'gas', name: 'Gas Stations', icon: '⛽', type: 'gas_station' }
  ];

  // Initialize Google Maps
  useEffect(() => {
    if (!window.google) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = initializeMap;
      document.head.appendChild(script);
    } else {
      initializeMap();
    }
  }, []);

  const initializeMap = () => {
    // Get user's current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setUserLocation(location);
          createMap(location);
        },
        () => {
          // Default to New Delhi if location access denied
          const defaultLocation = { lat: 28.6139, lng: 77.2090 };
          setUserLocation(defaultLocation);
          createMap(defaultLocation);
        }
      );
    } else {
      const defaultLocation = { lat: 28.6139, lng: 77.2090 };
      setUserLocation(defaultLocation);
      createMap(defaultLocation);
    }
  };

  const createMap = (location) => {
    if (!mapRef.current || !window.google) return;

    const mapInstance = new window.google.maps.Map(mapRef.current, {
      center: location,
      zoom: 14,
      styles: [
        {
          featureType: 'poi',
          elementType: 'labels',
          stylers: [{ visibility: 'on' }]
        }
      ]
    });

    // Add user location marker
    new window.google.maps.Marker({
      position: location,
      map: mapInstance,
      icon: {
        path: window.google.maps.SymbolPath.CIRCLE,
        scale: 10,
        fillColor: '#4F46E5',
        fillOpacity: 1,
        strokeColor: '#ffffff',
        strokeWeight: 2
      },
      title: 'Your Location'
    });

    setMap(mapInstance);
  };

  const searchNearbyPlaces = () => {
    if (!map || !userLocation || !window.google) return;

    setLoading(true);
    clearMarkers();

    const service = new window.google.maps.places.PlacesService(map);
    
    const request = {
      location: userLocation,
      radius: radius,
      type: selectedCategory !== 'all' ? categories.find(c => c.id === selectedCategory)?.type : undefined,
      keyword: searchQuery || undefined
    };

    service.nearbySearch(request, (results, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        setPlaces(results);
        displayMarkers(results);
      } else {
        console.error('Places search failed:', status);
        setPlaces([]);
      }
      setLoading(false);
    });
  };

  const displayMarkers = (places) => {
    if (!map || !window.google) return;

    places.forEach((place, index) => {
      const marker = new window.google.maps.Marker({
        position: place.geometry.location,
        map: map,
        title: place.name,
        animation: window.google.maps.Animation.DROP,
        icon: {
          url: place.icon,
          scaledSize: new window.google.maps.Size(30, 30)
        }
      });

      const infoWindow = new window.google.maps.InfoWindow({
        content: `
          <div style="padding: 10px; max-width: 200px;">
            <h3 style="font-weight: bold; margin-bottom: 5px;">${place.name}</h3>
            <p style="font-size: 12px; color: #666;">${place.vicinity}</p>
            ${place.rating ? `<p style="font-size: 12px; margin-top: 5px;">⭐ ${place.rating}</p>` : ''}
          </div>
        `
      });

      marker.addListener('click', () => {
        infoWindow.open(map, marker);
      });

      markersRef.current.push(marker);
    });
  };

  const clearMarkers = () => {
    markersRef.current.forEach(marker => marker.setMap(null));
    markersRef.current = [];
  };

  const getDirections = (place) => {
    const destination = `${place.geometry.location.lat()},${place.geometry.location.lng()}`;
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${destination}`, '_blank');
  };

  useEffect(() => {
    if (userLocation && map) {
      searchNearbyPlaces();
    }
  }, [selectedCategory, radius]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <MapPin className="w-10 h-10" />
            <div>
              <h1 className="text-4xl font-bold">Nearby Places</h1>
              <p className="text-white/90 mt-1">Discover places around you with Google Maps</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Filters & Search */}
          <div className="lg:col-span-1 space-y-6">
            {/* Search Box */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Search className="w-5 h-5" />
                Search
              </h2>
              <div className="space-y-4">
                <div>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search for places..."
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                    onKeyPress={(e) => e.key === 'Enter' && searchNearbyPlaces()}
                  />
                </div>
                <button
                  onClick={searchNearbyPlaces}
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold hover:shadow-xl hover:scale-105 transition-all disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <Loader className="w-5 h-5 animate-spin" />
                      Searching...
                    </>
                  ) : (
                    <>
                      <Search className="w-5 h-5" />
                      Search Nearby
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Categories */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Filter className="w-5 h-5" />
                Categories
              </h2>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                      selectedCategory === category.id
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    <span className="text-2xl">{category.icon}</span>
                    <span className="font-semibold">{category.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Radius Filter */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Search Radius
              </h2>
              <div className="space-y-3">
                <input
                  type="range"
                  min="1000"
                  max="20000"
                  step="1000"
                  value={radius}
                  onChange={(e) => setRadius(parseInt(e.target.value))}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                  <span>1 km</span>
                  <span className="font-bold text-blue-600">{(radius / 1000).toFixed(1)} km</span>
                  <span>20 km</span>
                </div>
              </div>
            </div>

            {/* Location Info */}
            {userLocation && (
              <div className="bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-2xl p-6 shadow-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Navigation className="w-5 h-5" />
                  <h3 className="font-bold">Your Location</h3>
                </div>
                <p className="text-sm text-white/90">
                  Lat: {userLocation.lat.toFixed(4)}, Lng: {userLocation.lng.toFixed(4)}
                </p>
                <p className="text-xs text-white/80 mt-2">
                  {places.length} places found nearby
                </p>
              </div>
            )}
          </div>

          {/* Map & Results */}
          <div className="lg:col-span-2 space-y-6">
            {/* Map */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
              <div
                ref={mapRef}
                className="w-full h-96 lg:h-[500px]"
              />
            </div>

            {/* Results List */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Search Results ({places.length})
              </h2>
              
              {loading ? (
                <div className="flex items-center justify-center py-12">
                  <Loader className="w-8 h-8 animate-spin text-blue-600" />
                </div>
              ) : places.length === 0 ? (
                <div className="text-center py-12">
                  <MapPin className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-600 dark:text-gray-400">
                    No places found. Try adjusting your search or filters.
                  </p>
                </div>
              ) : (
                <div className="space-y-4 max-h-[600px] overflow-y-auto">
                  {places.map((place, index) => (
                    <div
                      key={index}
                      className="border border-gray-200 dark:border-gray-700 rounded-xl p-4 hover:shadow-lg transition-all"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                            {place.name}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                            {place.vicinity}
                          </p>
                          
                          <div className="flex flex-wrap gap-3 text-sm">
                            {place.rating && (
                              <div className="flex items-center gap-1 text-yellow-600">
                                <Star className="w-4 h-4 fill-current" />
                                <span className="font-semibold">{place.rating}</span>
                                {place.user_ratings_total && (
                                  <span className="text-gray-500">({place.user_ratings_total})</span>
                                )}
                              </div>
                            )}
                            
                            {place.opening_hours && (
                              <div className="flex items-center gap-1">
                                <Clock className="w-4 h-4 text-gray-500" />
                                <span className={place.opening_hours.open_now ? 'text-green-600' : 'text-red-600'}>
                                  {place.opening_hours.open_now ? 'Open Now' : 'Closed'}
                                </span>
                              </div>
                            )}
                          </div>

                          {place.types && (
                            <div className="flex flex-wrap gap-2 mt-3">
                              {place.types.slice(0, 3).map((type, i) => (
                                <span
                                  key={i}
                                  className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 text-xs rounded-lg"
                                >
                                  {type.replace(/_/g, ' ')}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>

                        <button
                          onClick={() => getDirections(place)}
                          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors whitespace-nowrap"
                        >
                          <Navigation className="w-4 h-4" />
                          Directions
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
