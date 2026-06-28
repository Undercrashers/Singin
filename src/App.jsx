import { useState, useEffect } from 'react'
import {
  X,
  Anchor,
  Coffee,
  Utensils,
  Fish,
  ArrowDown,
  Star,
  Clock,
  Map as MapIcon,
  Bookmark,
  CheckCircle,
} from 'lucide-react'

const RESTAURANT_DATA = [
  {
    id: 'r1',
    name: 'Harbourfront Seafood Restaurant',
    x: 65,
    y: 45,
    type: 'Seafood',
    icon: <Anchor size={18} />,
    image:
      'https://images.squarespace-cdn.com/content/v1/5f83d40d5fcfbb2127f78c84/09171a06-1dae-4a8c-ab0c-03441be51875/HF-064_post.png?format=2500w',
    location: '2 Endeavour Dr, Wollongong NSW 2500, Australia',
    specialty: 'Fresh local seafood with harbour views',
    popular_dishes: [
      'Seafood Platter',
      'Sydney Rock Oysters',
      'Grilled Barramundi',
      'Garlic King Prawns',
    ],
    price: '$$$',
    rating: 4.5,
    opening_hours: '11:30 AM',
    closing_hours: '10:00 PM',
  },
  {
    id: 'r2',
    name: 'Bombora Seafood Cafe/Restaurant',
    x: 68,
    y: 48,
    type: 'Casual Dining',
    icon: <Fish size={18} />,
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRh0j5rmz3yTH4-WSX_VCxaBlEwMKxTl0b1V-9WhlQieg&s=10',
    location: '2 Endeavour Dr, Wollongong NSW 2500, Australia',
    specialty: 'Casual waterfront seafood dining',
    popular_dishes: [
      'Bombora Basket',
      'Beer Battered Fish & Chips',
      'Salt & Pepper Squid',
      'Fresh Prawns',
    ],
    price: '$$',
    rating: 4.3,
    opening_hours: '8:00 AM',
    closing_hours: '8:00 PM',
  },
  {
    id: 'r3',
    name: 'Steamers Bar and Grill',
    x: 55,
    y: 65,
    type: 'Bar & Grill',
    icon: <Utensils size={18} />,
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4OYDfai8wy_neDe9Vx03ZtR60-6f_ah2Mk68oiG3ZZJWCerh_a4fcpvOC&s=10',
    location: '1 Marine Dr, Wollongong NSW 2500, Australia',
    specialty: 'Premium seafood and steak',
    popular_dishes: ['Lobster', 'Oysters', 'Grilled Snapper', 'Seafood Linguine'],
    price: '$$$',
    rating: 4.2,
    opening_hours: '11:30 AM',
    closing_hours: '9:30 PM',
  },
  {
    id: 'r4',
    name: "Nick's on Bourke",
    x: 75,
    y: 20,
    type: 'Seafood',
    icon: <Fish size={18} />,
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2f4HD5kcGtjyeJ2z3e_vBP8X2WLLmF_A9JlwikSQwVw&s=10',
    location: '9 Bourke St, North Wollongong NSW 2500, Australia',
    specialty: 'Fresh seafood and fish & chips',
    popular_dishes: ['Grilled Fish', 'Seafood Basket', 'Calamari', 'Prawn Cutlets'],
    price: '$$',
    rating: 4.2,
    opening_hours: '11:30 AM',
    closing_hours: '9:00 PM',
  },
  {
    id: 'r5',
    name: 'Harbourside Fish Market & Cafe',
    x: 70,
    y: 25,
    type: 'Cafe',
    icon: <Coffee size={18} />,
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKqSpbsvOwmOFuZn2p_PF0-I9UCyY2_5ysL7tQgjLffA&s=10',
    location: '2A/6 Flinders St, North Wollongong NSW 2500, Australia',
    specialty: 'Fresh seafood and takeaway',
    popular_dishes: ['Fish & Chips', 'Fresh Oysters', 'Grilled Fish', 'Seafood Pack'],
    price: '$',
    rating: 4.3,
    opening_hours: '8:00 AM',
    closing_hours: '6:00 PM',
  },
  {
    id: 'r6',
    name: 'Lagoon Restaurant',
    x: 72,
    y: 35,
    type: 'Fine Dining',
    icon: <Star size={18} />,
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQny2Z3Eg7XcwwnLdS_O1L4V-LoQ891PGOfDGxcLqoXkw&s=10',
    location: 'George Hanley Dr, Wollongong NSW 2500',
    specialty: 'Award-winning seafood',
    popular_dishes: ['Seafood Platter', 'QLD Mud Crab', 'Barramundi Nick', 'Lobster'],
    price: '$$$',
    rating: 4.2,
    opening_hours: '12:00 PM',
    closing_hours: '9:30 PM',
  },
  {
    id: 'r7',
    name: 'Levendi',
    x: 60,
    y: 50,
    type: 'Takeaway',
    icon: <Fish size={18} />,
    image: 'https://media1.agfg.com.au/images/listing/46274/gallery/levendi-12.jpg',
    location: '81 Cliff Rd, Wollongong NSW 2500',
    specialty: 'Fish & Chips',
    popular_dishes: ['Fish & Chips', 'Calamari', 'Grilled Fish', 'Seafood Basket'],
    price: '$$',
    rating: 4.2,
    opening_hours: '6:30 AM',
    closing_hours: '6:00 PM',
  },
  {
    id: 'r8',
    name: 'Aqua Restaurant',
    x: 62,
    y: 55,
    type: 'Modern Australian',
    icon: <Utensils size={18} />,
    image:
      'https://static.wixstatic.com/media/5bc455_c0f6c1019442434597621fd3f4c74ff7~mv2.jpg/v1/fill/w_258,h_270,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/5bc455_c0f6c1019442434597621fd3f4c74ff7~mv2.jpg',
    location: '17/54-58 Cliff Rd, North Wollongong NSW',
    specialty: 'Modern Australian Seafood',
    popular_dishes: ['Atlantic Salmon', 'Prawns', 'Seafood Linguine'],
    price: '$$',
    rating: 4.1,
    opening_hours: '7:00 AM',
    closing_hours: '9:30 PM',
  },
  {
    id: 'r9',
    name: 'Palisade Kitchen & Bar',
    x: 78,
    y: 15,
    type: 'Bar & Grill',
    icon: <Anchor size={18} />,
    image:
      'https://regionillawarra.com.au/wp-content/uploads/sites/10/2023/08/VD-44-960x640.jpg',
    location: 'Novotel Northbeach, Wollongong',
    specialty: 'Premium Seafood',
    popular_dishes: ['Grilled Barramundi', 'Oysters', 'Prawns'],
    price: '$$$',
    rating: 3.9,
    opening_hours: '6:30 AM',
    closing_hours: '9:30 PM',
  },
  {
    id: 'r10',
    name: 'The Boathouse',
    x: 66,
    y: 40,
    type: 'Seafood',
    icon: <Anchor size={18} />,
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYYisgezKZn7B-B16BECj-Ei6czEdmoij64VOjkNKj4g&s',
    location: '1A Cliff Rd, Wollongong NSW',
    specialty: 'Seafood & Grill',
    popular_dishes: ['Seafood Platter', 'Grilled Fish', 'King Prawns'],
    price: '$$$',
    rating: 3.8,
    opening_hours: '11:30 AM',
    closing_hours: '10:00 PM',
  },
  {
    id: 'r11',
    name: 'Lux Bistro Bar',
    x: 50,
    y: 70,
    type: 'Bistro',
    icon: <Coffee size={18} />,
    image:
      'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/21/f1/52/9b/lux-bistro-bar.jpg?w=200&h=200&s=1',
    location: '110 Crown St, Wollongong NSW',
    specialty: 'Seafood & Mediterranean',
    popular_dishes: ['Garlic Prawns', 'Grilled Salmon', 'Calamari'],
    price: '$$',
    rating: 4.7,
    opening_hours: '8:30 AM',
    closing_hours: '9:00 PM',
  },
  {
    id: 'r12',
    name: 'The Imperial at Clifton',
    x: 85,
    y: 10,
    type: 'Pub Dining',
    icon: <Utensils size={18} />,
    image:
      'https://theimperialclifton.com.au/wp-content/uploads/2021/05/FINAL_HOME_Z7045_TIAC_MAGES_DINING-1024x1024.jpg',
    location: 'Clifton NSW',
    specialty: 'Seafood & Pub Dining',
    popular_dishes: ['Fish & Chips', 'Seafood Pasta', 'Salt & Pepper Squid'],
    price: '$$',
    rating: 4.4,
    opening_hours: '11:30 AM',
    closing_hours: '10:00 PM',
  },
  {
    id: 'r13',
    name: "Pepe's On The Beach",
    x: 80,
    y: 22,
    type: 'Beachside',
    icon: <Anchor size={18} />,
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyUXwnRC_GnxP0wcKcVgYmbIUpDVM94I3LQ655MKlDjSmc_MW-qDlMKp9G&s=10',
    location: '2-14 Cliff Rd, North Wollongong NSW 2500, Australia',
    specialty: 'Beachside Australian & Mediterranean',
    popular_dishes: [
      'Hot & Cold Seafood Platter',
      'Salt & Pepper Calamari',
      'Fish & Chips',
      'Grilled Barramundi',
    ],
    price: '$$',
    rating: 3.5,
    opening_hours: '10:00 AM',
    closing_hours: '12:00 AM',
  },
]

function loadBookmarks() {
  try {
    const saved = localStorage.getItem('singin_bookmarks')
    return saved ? JSON.parse(saved) : []
  } catch {
    return []
  }
}

export default function App() {
  const [loading, setLoading] = useState(true)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [activeRestaurant, setActiveRestaurant] = useState(null)
  const [hoveredLocation, setHoveredLocation] = useState(null)
  const [bookmarks, setBookmarks] = useState(loadBookmarks)
  const [isBookingOpen, setIsBookingOpen] = useState(false)
  const [bookingSuccess, setBookingSuccess] = useState(false)
  const [showAllRestaurants, setShowAllRestaurants] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed')
          }
        })
      },
      { threshold: 0.15, rootMargin: '0px 0px -50px 0px' },
    )

    const elements = document.querySelectorAll('.reveal-up, .reveal-fade, .reveal-scale')
    elements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [loading, activeRestaurant, showAllRestaurants])

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2800)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    localStorage.setItem('singin_bookmarks', JSON.stringify(bookmarks))
  }, [bookmarks])

  useEffect(() => {
    if (activeRestaurant || isSidebarOpen || loading || isBookingOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [activeRestaurant, isSidebarOpen, loading, isBookingOpen])

  const toggleBookmark = (id, e) => {
    if (e) e.stopPropagation()
    setBookmarks((prev) =>
      prev.includes(id) ? prev.filter((bId) => bId !== id) : [...prev, id],
    )
  }

  const handleBookingSubmit = (e) => {
    e.preventDefault()
    setBookingSuccess(true)
    setTimeout(() => {
      setBookingSuccess(false)
      setIsBookingOpen(false)
    }, 4000)
  }

  const exploreRestaurants = showAllRestaurants
    ? RESTAURANT_DATA
    : RESTAURANT_DATA.slice(0, 6)

  return (
    <div className="relative min-h-screen bg-[#F9F8F4] text-[#1A1A1A] font-sans selection:bg-[#B06D5B] selection:text-white overflow-x-hidden smooth-scroll">
      <CustomStyles />

      {/* Loading screen */}
      <div
        className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#F9F8F4] text-[#1A1A1A] transition-transform duration-1000 ease-in-out ${loading ? 'translate-y-0' : '-translate-y-full'}`}
      >
        <div className="overflow-hidden">
          <h1 className="text-4xl md:text-6xl tracking-[0.2em] uppercase loader-text font-serif">
            Singin
          </h1>
        </div>
        <div className="overflow-hidden mt-4">
          <p className="text-xs md:text-sm font-medium tracking-[0.3em] text-[#8A9A86] loader-text-delay font-hero uppercase">
            A reflection between sea and land
          </p>
        </div>
      </div>

      {/* Sidebar */}
      <div className="fixed inset-0 z-[70] pointer-events-none">
        <button
          type="button"
          className={`absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-700 pointer-events-auto ${isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
          aria-label="Close menu"
          onClick={() => setIsSidebarOpen(false)}
        />
        <div
          className={`absolute top-0 right-0 h-full w-full md:w-[450px] bg-[#1A1A1A] text-[#F9F8F4] p-12 md:p-16 transform transition-transform duration-700 ease-in-out pointer-events-auto overflow-y-auto ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'} flex flex-col custom-scrollbar`}
        >
          <button
            type="button"
            onClick={() => setIsSidebarOpen(false)}
            className="self-end mb-12 text-white/50 hover:text-white transition-colors"
            aria-label="Close"
          >
            <X size={32} strokeWidth={1} />
          </button>
          <nav className="flex flex-col gap-8 text-2xl md:text-4xl font-serif uppercase tracking-wide mb-16">
            <a href="#hero" onClick={() => setIsSidebarOpen(false)} className="hover:text-[#B06D5B] transition-colors fade-in-link">
              Home
            </a>
            <a href="#explore" onClick={() => setIsSidebarOpen(false)} className="hover:text-[#B06D5B] transition-colors fade-in-link">
              Explore
            </a>
            <a href="#map" onClick={() => setIsSidebarOpen(false)} className="hover:text-[#B06D5B] transition-colors fade-in-link">
              Map
            </a>
            <a href="#about" onClick={() => setIsSidebarOpen(false)} className="hover:text-[#B06D5B] transition-colors fade-in-link">
              About
            </a>
          </nav>

          <div className="border-t border-white/20 pt-8 flex-1">
            <div className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#B06D5B] mb-6 flex items-center gap-2 fade-in-link">
              <Bookmark size={14} /> Saved Places ({bookmarks.length})
            </div>
            {bookmarks.length === 0 ? (
              <p className="text-xs font-hero text-white/40 italic fade-in-link">
                No places bookmarked yet. Start exploring to save your favorites.
              </p>
            ) : (
              <ul className="space-y-4">
                {bookmarks.map((bId) => {
                  const rest = RESTAURANT_DATA.find((r) => r.id === bId)
                  if (!rest) return null
                  return (
                    <li
                      key={bId}
                      className="group cursor-pointer fade-in-link flex justify-between items-center"
                      onClick={() => {
                        setActiveRestaurant(rest)
                        setIsSidebarOpen(false)
                      }}
                    >
                      <div>
                        <p className="text-sm font-serif uppercase group-hover:text-[#B06D5B] transition-colors">
                          {rest.name}
                        </p>
                        <p className="text-[10px] font-hero text-white/50 uppercase tracking-widest">
                          {rest.type}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={(e) => toggleBookmark(bId, e)}
                        className="text-white/30 hover:text-white p-2"
                        aria-label={`Remove ${rest.name} from bookmarks`}
                      >
                        <X size={16} />
                      </button>
                    </li>
                  )
                })}
              </ul>
            )}
          </div>

          <div className="mt-12 pt-12 border-t border-white/20">
            <div className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#8A9A86] mb-4">
              Contact
            </div>
            <p className="text-sm font-hero text-white/70">reservations@singin.com</p>
            <p className="text-sm font-hero text-white/70">+61 2 4200 0000</p>
          </div>
        </div>
      </div>

      {/* Restaurant detail panel */}
      <div
        className={`fixed inset-0 z-[60] bg-[#F9F8F4] transform transition-transform duration-1000 ease-in-out flex flex-col md:flex-row overflow-hidden ${activeRestaurant ? 'translate-y-0' : 'translate-y-full'}`}
      >
        {activeRestaurant && (
          <>
            <button
              type="button"
              onClick={() => setActiveRestaurant(null)}
              className="absolute top-6 right-6 md:top-10 md:right-10 z-[70] bg-[#F9F8F4]/80 backdrop-blur-md p-4 rounded-full text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-[#F9F8F4] transition-all border border-[#1A1A1A]/10 shadow-lg"
              aria-label="Close details"
            >
              <X size={24} strokeWidth={1.5} />
            </button>

            <div className="w-full md:w-1/2 h-[40vh] md:h-full relative">
              <img
                src={activeRestaurant.image}
                alt={activeRestaurant.name}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent md:bg-gradient-to-r md:from-black/20 md:to-transparent" />
              <button
                type="button"
                onClick={(e) => toggleBookmark(activeRestaurant.id, e)}
                className="absolute bottom-6 left-6 md:bottom-10 md:left-10 z-[70] bg-[#1A1A1A]/80 backdrop-blur-md p-4 rounded-full text-[#F9F8F4] hover:bg-[#B06D5B] transition-all shadow-lg flex items-center gap-3"
              >
                <Bookmark
                  size={20}
                  strokeWidth={1.5}
                  fill={bookmarks.includes(activeRestaurant.id) ? 'currentColor' : 'none'}
                />
                <span className="text-xs uppercase tracking-widest font-bold">
                  {bookmarks.includes(activeRestaurant.id) ? 'Saved' : 'Save'}
                </span>
              </button>
            </div>

            <div className="w-full md:w-1/2 h-[60vh] md:h-full overflow-y-auto p-8 md:p-20 custom-scrollbar">
              <div className="text-[10px] tracking-[0.3em] uppercase mb-4 font-hero font-bold text-[#B06D5B] flex items-center gap-2">
                {activeRestaurant.icon} {activeRestaurant.type} • {activeRestaurant.price}
              </div>

              <h2 className="text-4xl md:text-6xl font-serif uppercase leading-none mb-6 text-[#1A1A1A]">
                {activeRestaurant.name}
              </h2>

              <p className="text-lg md:text-xl font-medium text-[#1A1A1A]/80 mb-10 leading-relaxed font-hero">
                {activeRestaurant.specialty}
              </p>

              <div className="grid grid-cols-2 gap-8 mb-12 py-8 border-y border-[#1A1A1A]/10">
                <div>
                  <div className="flex items-center gap-2 text-sm font-hero mb-2 text-[#8A9A86]">
                    <MapIcon size={16} /> Location
                  </div>
                  <p className="text-sm font-medium">{activeRestaurant.location}</p>
                </div>
                <div>
                  <div className="flex items-center gap-2 text-sm font-hero mb-2 text-[#8A9A86]">
                    <Clock size={16} /> Hours
                  </div>
                  <p className="text-sm font-medium">
                    {activeRestaurant.opening_hours} - {activeRestaurant.closing_hours}
                  </p>
                </div>
                <div>
                  <div className="flex items-center gap-2 text-sm font-hero mb-2 text-[#8A9A86]">
                    <Star size={16} /> Rating
                  </div>
                  <p className="text-sm font-medium">{activeRestaurant.rating} / 5.0</p>
                </div>
              </div>

              <div className="mb-12">
                <h3 className="text-2xl font-serif uppercase mb-6 text-[#1A1A1A]">Popular Dishes</h3>
                <ul className="space-y-4">
                  {activeRestaurant.popular_dishes.map((dish) => (
                    <li
                      key={dish}
                      className="flex items-center gap-4 text-sm md:text-base font-hero font-medium border-b border-[#1A1A1A]/5 pb-4"
                    >
                      <span className="w-2 h-2 rounded-full bg-[#B06D5B]" />
                      {dish}
                    </li>
                  ))}
                </ul>
              </div>

              <button
                type="button"
                onClick={() => setIsBookingOpen(true)}
                className="w-full bg-[#1A1A1A] text-white text-xs font-bold uppercase tracking-[0.2em] py-5 hover:bg-[#B06D5B] transition-colors duration-500"
              >
                Book a Table
              </button>
            </div>
          </>
        )}
      </div>

      {/* Booking modal */}
      <div
        className={`fixed inset-0 z-[80] flex items-center justify-center p-4 transition-all duration-700 ${isBookingOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      >
        <button
          type="button"
          className="absolute inset-0 bg-black/60 backdrop-blur-sm cursor-default"
          aria-label="Close booking"
          onClick={() => !bookingSuccess && setIsBookingOpen(false)}
        />
        <div className="relative w-full max-w-xl bg-[#F9F8F4] p-10 md:p-14 shadow-2xl transform transition-transform duration-700 popup-card border border-[#1A1A1A]/10 overflow-hidden">
          {!bookingSuccess && (
            <button
              type="button"
              onClick={() => setIsBookingOpen(false)}
              className="absolute top-6 right-6 text-[#1A1A1A]/50 hover:text-[#1A1A1A] transition-colors z-10"
              aria-label="Close"
            >
              <X size={24} strokeWidth={1.5} />
            </button>
          )}

          <div
            className={`transition-opacity duration-500 ${bookingSuccess ? 'opacity-0 pointer-events-none hidden' : 'opacity-100'}`}
          >
            <div className="mb-6 text-[10px] font-bold uppercase tracking-[0.2em] text-[#B06D5B]">
              Reserve Your Experience
            </div>
            <h3 className="text-3xl md:text-4xl font-serif uppercase leading-tight mb-2">
              Dine With Us
            </h3>
            <p className="text-sm font-medium text-[#1A1A1A]/60 mb-8 leading-relaxed font-hero">
              {activeRestaurant
                ? `Booking a table at ${activeRestaurant.name}.`
                : 'Select a date and time for your dining experience.'}
            </p>

            <form onSubmit={handleBookingSubmit} className="flex flex-col gap-6">
              <div className="grid grid-cols-2 gap-6">
                <input
                  required
                  type="date"
                  className="w-full bg-transparent border-b border-[#1A1A1A]/20 py-3 text-sm font-hero focus:outline-none focus:border-[#1A1A1A] transition-colors"
                />
                <input
                  required
                  type="time"
                  className="w-full bg-transparent border-b border-[#1A1A1A]/20 py-3 text-sm font-hero focus:outline-none focus:border-[#1A1A1A] transition-colors"
                />
              </div>
              <select
                required
                defaultValue=""
                className="w-full bg-transparent border-b border-[#1A1A1A]/20 py-3 text-sm font-hero text-[#1A1A1A]/80 focus:outline-none focus:border-[#1A1A1A] transition-colors appearance-none cursor-pointer"
              >
                <option value="" disabled>
                  Number of Guests
                </option>
                <option value="1">1 Guest</option>
                <option value="2">2 Guests</option>
                <option value="3">3 Guests</option>
                <option value="4">4 Guests</option>
                <option value="5+">5+ Guests (Requires confirmation)</option>
              </select>
              <input
                required
                type="text"
                placeholder="Full Name"
                className="w-full bg-transparent border-b border-[#1A1A1A]/20 py-3 text-sm font-hero placeholder-[#1A1A1A]/40 focus:outline-none focus:border-[#1A1A1A] transition-colors"
              />
              <input
                required
                type="email"
                placeholder="Email Address"
                className="w-full bg-transparent border-b border-[#1A1A1A]/20 py-3 text-sm font-hero placeholder-[#1A1A1A]/40 focus:outline-none focus:border-[#1A1A1A] transition-colors"
              />
              <button
                type="submit"
                className="bg-[#1A1A1A] text-white text-xs font-bold uppercase tracking-[0.2em] py-5 hover:bg-[#B06D5B] transition-colors duration-500 mt-4 w-full"
              >
                Confirm Reservation
              </button>
            </form>
          </div>

          <div
            className={`absolute inset-0 bg-[#F9F8F4] flex flex-col items-center justify-center p-12 text-center transition-all duration-700 ${bookingSuccess ? 'opacity-100 z-20' : 'opacity-0 -z-10 pointer-events-none'}`}
          >
            <CheckCircle size={64} className="text-[#8A9A86] mb-6 animate-fade-in" strokeWidth={1} />
            <h3 className="text-3xl font-serif uppercase leading-tight mb-4 animate-fade-in">
              Request Received
            </h3>
            <p className="text-sm font-medium text-[#1A1A1A]/60 leading-relaxed font-hero animate-fade-in">
              Thank you. You will get your confirmation in your email shortly. We look forward to
              hosting you.
            </p>
          </div>
        </div>
      </div>

      <main className={`transition-opacity duration-1000 ${loading ? 'opacity-0' : 'opacity-100'}`}>
        {/* Hero */}
        <section id="hero" className="relative h-screen flex flex-col justify-center items-center overflow-hidden bg-[#1A1A1A]">
          <div
            className="absolute inset-0 z-0 bg-cover bg-center transform scale-105 animate-slow-zoom"
            style={{
              backgroundImage:
                'url(https://images.unsplash.com/photo-1534482421-64566f976cfa?q=80&w=2000&auto=format&fit=crop)',
            }}
          />
          <div className="absolute inset-0 z-10 bg-black/40" />

          <header className="absolute top-0 left-0 w-full px-6 md:px-12 py-8 flex justify-between items-center z-20 text-white">
            <button
              type="button"
              onClick={() => setIsBookingOpen(true)}
              className="text-[10px] md:text-xs tracking-[0.2em] uppercase border border-white/40 px-6 py-3 hover:bg-white hover:text-black transition-colors duration-500 font-hero"
            >
              Book Now
            </button>
            <div className="text-2xl md:text-4xl tracking-[0.3em] uppercase font-serif text-white">
              Singin
            </div>
            <button
              type="button"
              onClick={() => setIsSidebarOpen(true)}
              className="flex flex-col gap-2 w-8 group p-2"
              aria-label="Open menu"
            >
              <div className="w-full h-px bg-white group-hover:bg-[#B06D5B] transition-colors" />
              <div className="w-full h-px bg-white group-hover:bg-[#B06D5B] transition-colors" />
            </button>
          </header>

          <div className="relative z-20 text-center text-white px-4 flex flex-col items-center mt-12 w-full max-w-5xl mx-auto">
            <span className="text-[10px] md:text-xs tracking-[0.3em] uppercase mb-8 md:mb-12 font-medium font-hero text-white/80 reveal-up">
              Gallery
            </span>
            <h1 className="text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-light tracking-[0.1em] leading-[1.3] uppercase font-hero drop-shadow-lg reveal-up reveal-delay-1">
              Let&apos;s sink in
              <br />
              with the food —
              <br />
              Simple, Timeless,
              <br />
              Authentic
            </h1>
          </div>

          <div className="absolute bottom-10 z-20 text-white animate-bounce-slow">
            <ArrowDown size={24} strokeWidth={1} />
          </div>
        </section>

        {/* Transition */}
        <section className="py-32 px-6 text-center bg-[#F9F8F4]">
          <h2 className="text-3xl md:text-5xl lg:text-7xl font-serif uppercase tracking-wide leading-tight reveal-up">
            Shaped by Sea.
            <br />
            Grounded in Land.
          </h2>
        </section>

        {/* Explore grid */}
        <section id="explore" className="w-full bg-[#F9F8F4] pb-32 pt-12 px-6 md:px-12 max-w-screen-2xl mx-auto">
          <div className="flex justify-between items-end mb-16 reveal-up">
            <div>
              <div className="text-[10px] tracking-[0.3em] uppercase mb-4 font-hero font-bold text-[#8A9A86]">
                Curated Collection
              </div>
              <h3 className="text-4xl md:text-5xl font-serif uppercase">Explore The Coast</h3>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
            {exploreRestaurants.map((rest, index) => (
              <div
                key={rest.id}
                className="group cursor-pointer reveal-up relative"
                style={{ transitionDelay: `${(index % 3) * 0.15}s` }}
                onClick={() => setActiveRestaurant(rest)}
              >
                <button
                  type="button"
                  className="absolute top-4 right-4 z-20 bg-[#F9F8F4]/90 p-2 rounded-full shadow-sm hover:bg-[#1A1A1A] hover:text-[#F9F8F4] transition-colors"
                  onClick={(e) => toggleBookmark(rest.id, e)}
                  aria-label={bookmarks.includes(rest.id) ? 'Remove bookmark' : 'Add bookmark'}
                >
                  <Bookmark
                    size={18}
                    fill={bookmarks.includes(rest.id) ? 'currentColor' : 'none'}
                    strokeWidth={1.5}
                  />
                </button>

                <div className="relative w-full aspect-[4/5] overflow-hidden mb-6 bg-[#EFECE5]">
                  <img
                    src={rest.image}
                    alt={rest.name}
                    className="absolute inset-0 w-full h-full object-cover transform transition-transform duration-1000 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500 flex items-center justify-center">
                    <span className="opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 text-white border border-white px-6 py-3 text-xs uppercase tracking-widest backdrop-blur-sm">
                      View Details
                    </span>
                  </div>
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-xl font-serif uppercase mb-2 group-hover:text-[#B06D5B] transition-colors">
                      {rest.name}
                    </h4>
                    <p className="text-xs font-hero text-[#1A1A1A]/60 uppercase tracking-wider">
                      {rest.specialty}
                    </p>
                  </div>
                  <span className="text-xs font-bold text-[#8A9A86]">{rest.rating} ★</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-20 text-center reveal-up">
            <button
              type="button"
              onClick={() => setShowAllRestaurants((prev) => !prev)}
              className="text-xs tracking-[0.2em] uppercase border-b border-[#1A1A1A] pb-1 hover:text-[#B06D5B] transition-colors"
            >
              {showAllRestaurants ? 'Show Fewer' : 'View All Destinations'}
            </button>
          </div>
        </section>

        {/* Map */}
        <section id="map" className="relative py-32 bg-[#EFECE5] border-t border-[#1A1A1A]/10 overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col lg:flex-row items-center gap-16">
            <div className="w-full lg:w-1/3 text-center lg:text-left">
              <div className="text-[10px] tracking-[0.3em] uppercase mb-6 font-hero font-bold text-[#B06D5B] reveal-up">
                Location
              </div>
              <h2 className="text-4xl md:text-6xl font-serif uppercase leading-tight mb-8 reveal-up reveal-delay-1">
                A Meeting
                <br />
                Point, Naturally.
              </h2>
              <p className="text-sm leading-relaxed font-hero text-[#1A1A1A]/70 mb-12 reveal-up reveal-delay-2">
                Follow the coastline. Click on the map pins to uncover the detailed menus, operating
                hours, and signature dishes of Wollongong&apos;s finest establishments.
              </p>

              <div className="h-24 reveal-up reveal-delay-3">
                {hoveredLocation ? (
                  <div className="animate-fade-in text-left">
                    <h4 className="text-xl font-serif uppercase mb-1">{hoveredLocation.name}</h4>
                    <p className="text-xs font-bold text-[#8A9A86] uppercase tracking-widest">
                      {hoveredLocation.type}
                    </p>
                    <p className="text-xs mt-2 text-[#1A1A1A]/60 truncate">
                      {hoveredLocation.location}
                    </p>
                  </div>
                ) : (
                  <div className="text-sm text-[#1A1A1A]/40 font-hero italic">
                    Interact with the map...
                  </div>
                )}
              </div>
            </div>

            <div className="w-full lg:w-2/3 aspect-square md:aspect-[4/3] relative bg-[#DFE4E0] rounded-sm overflow-hidden reveal-fade shadow-xl border border-[#1A1A1A]/5 cursor-crosshair">
              <svg
                className="absolute inset-0 w-full h-full opacity-40"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path
                  d="M 90 -10 Q 80 20 70 30 T 60 60 Q 50 90 30 110"
                  fill="none"
                  stroke="#8A9A86"
                  strokeWidth="1"
                  className="coastline-path"
                />
                <path
                  d="M 10 10 L 90 90"
                  fill="none"
                  stroke="#1A1A1A"
                  strokeWidth="0.2"
                  strokeDasharray="1 2"
                />
                <path
                  d="M 20 80 L 80 20"
                  fill="none"
                  stroke="#1A1A1A"
                  strokeWidth="0.2"
                  strokeDasharray="1 3"
                />
              </svg>

              <div
                className="absolute top-0 right-0 w-[55%] h-full bg-[#D4DFDA]/60"
                style={{ clipPath: 'polygon(100% 0, 100% 100%, 0% 100%, 40% 50%, 60% 0)' }}
              />

              {RESTAURANT_DATA.map((loc) => (
                <button
                  key={loc.id}
                  type="button"
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer z-10"
                  style={{ top: `${loc.y}%`, left: `${loc.x}%` }}
                  onClick={() => setActiveRestaurant(loc)}
                  onMouseEnter={() => setHoveredLocation(loc)}
                  onMouseLeave={() => setHoveredLocation(null)}
                  onFocus={() => setHoveredLocation(loc)}
                  onBlur={() => setHoveredLocation(null)}
                  aria-label={`View ${loc.name}`}
                >
                  <div className="relative flex items-center justify-center">
                    <div className="absolute inset-0 bg-[#B06D5B] rounded-full animate-ping opacity-30 group-hover:opacity-80 transition-opacity duration-300" />
                    <div className="relative bg-[#F9F8F4] text-[#1A1A1A] w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transform transition-all duration-300 group-hover:scale-110 shadow-lg border border-[#1A1A1A]/10 group-hover:bg-[#1A1A1A] group-hover:text-[#F9F8F4] group-focus:scale-110 group-focus:bg-[#1A1A1A] group-focus:text-[#F9F8F4]">
                      {loc.icon}
                      {bookmarks.includes(loc.id) && (
                        <div className="absolute top-0 right-0 w-3 h-3 bg-[#B06D5B] border-2 border-[#F9F8F4] rounded-full" />
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer id="about" className="bg-[#1A1A1A] text-[#F9F8F4] pt-32 pb-16 px-6 md:px-12">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-16 mb-24">
            <div className="reveal-up">
              <h4 className="text-2xl font-serif uppercase mb-6">Singin</h4>
              <p className="text-sm font-hero text-white/60 leading-relaxed max-w-xs">
                Driven by a passion for cuisine and genuine hospitality, we curate memorable dining
                experiences across the Illawarra coastline.
              </p>
            </div>
            <div className="reveal-up reveal-delay-1">
              <h4 className="text-[10px] font-bold tracking-[0.2em] uppercase mb-6 text-[#8A9A86]">
                Navigation
              </h4>
              <ul className="space-y-4 text-sm font-hero uppercase tracking-widest text-white/80">
                <li>
                  <a href="#explore" className="hover:text-[#B06D5B] transition-colors">
                    Explore
                  </a>
                </li>
                <li>
                  <a href="#map" className="hover:text-[#B06D5B] transition-colors">
                    Map
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#B06D5B] transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#B06D5B] transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div className="reveal-up reveal-delay-2">
              <h4 className="text-[10px] font-bold tracking-[0.2em] uppercase mb-6 text-[#8A9A86]">
                Newsletter
              </h4>
              <input
                type="email"
                placeholder="EMAIL"
                className="w-full bg-transparent border-b border-white/20 py-3 text-sm font-hero mb-4 focus:outline-none focus:border-white transition-colors"
              />
              <button
                type="button"
                className="text-xs font-bold uppercase tracking-[0.2em] hover:text-[#B06D5B] transition-colors"
              >
                Subscribe →
              </button>
            </div>
          </div>
          <div className="max-w-7xl mx-auto text-center md:text-left text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between">
            <p>© 2026 Singin Group. Wollongong.</p>
            <p className="mt-4 md:mt-0 cursor-pointer hover:text-white transition-colors">
              Privacy Policy
            </p>
          </div>
        </footer>
      </main>
    </div>
  )
}

function CustomStyles() {
  return (
    <style
      dangerouslySetInnerHTML={{
        __html: `
    @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600&family=Montserrat:wght@300;400;500;600&display=swap');

    html {
      scroll-behavior: smooth;
    }

    body {
      font-family: 'Montserrat', sans-serif;
      background-color: #F9F8F4;
    }

    .font-serif {
      font-family: 'Cinzel', serif;
    }
    .font-hero {
      font-family: 'Montserrat', sans-serif;
    }

    .reveal-up {
      opacity: 0;
      transform: translateY(40px);
      transition: opacity 1s cubic-bezier(0.16, 1, 0.3, 1), transform 1s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .reveal-fade {
      opacity: 0;
      transition: opacity 1.5s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .reveal-scale {
      transform: scale(1.1);
      transition: transform 1.5s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .is-revealed.reveal-up, .is-revealed .reveal-up {
      opacity: 1;
      transform: translateY(0);
    }
    .is-revealed.reveal-fade {
      opacity: 1;
    }
    .is-revealed.reveal-scale {
      transform: scale(1);
    }

    .reveal-delay-1 { transition-delay: 0.15s; }
    .reveal-delay-2 { transition-delay: 0.3s; }
    .reveal-delay-3 { transition-delay: 0.45s; }

    .fade-in-link {
        animation: fadeInRight 0.5s ease-out forwards;
        opacity: 0;
    }
    .fade-in-link:nth-child(1) { animation-delay: 0.2s; }
    .fade-in-link:nth-child(2) { animation-delay: 0.3s; }
    .fade-in-link:nth-child(3) { animation-delay: 0.4s; }
    .fade-in-link:nth-child(4) { animation-delay: 0.5s; }

    @keyframes fadeInRight {
        from { opacity: 0; transform: translateX(20px); }
        to { opacity: 1; transform: translateX(0); }
    }

    .loader-text {
      animation: revealUp 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
      clip-path: polygon(0 100%, 100% 100%, 100% 100%, 0% 100%);
    }
    .loader-text-delay {
      animation: revealUp 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.3s forwards;
      clip-path: polygon(0 100%, 100% 100%, 100% 100%, 0% 100%);
    }

    @keyframes revealUp {
      to { clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%); }
    }

    .animate-fade-in {
      animation: simpleFadeIn 0.5s ease-out forwards;
    }
    @keyframes simpleFadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
    }

    .animate-slow-zoom {
      animation: slowZoom 25s ease-in-out infinite alternate;
    }
    @keyframes slowZoom {
      0% { transform: scale(1); }
      100% { transform: scale(1.1); }
    }

    .animate-bounce-slow {
      animation: bounceSlow 3s infinite;
    }
    @keyframes bounceSlow {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(10px); }
    }

    .coastline-path {
      stroke-dasharray: 10;
      animation: dash 40s linear infinite;
    }
    @keyframes dash {
      to { stroke-dashoffset: -1000; }
    }

    ::-webkit-scrollbar {
      width: 6px;
    }
    ::-webkit-scrollbar-track {
      background: #F9F8F4;
    }
    ::-webkit-scrollbar-thumb {
      background: #1A1A1A;
    }

    .custom-scrollbar::-webkit-scrollbar {
        width: 4px;
    }
    .custom-scrollbar::-webkit-scrollbar-track {
        background: transparent;
    }
    .custom-scrollbar::-webkit-scrollbar-thumb {
        background: #1A1A1A40;
        border-radius: 4px;
    }
  `,
      }}
    />
  )
}
