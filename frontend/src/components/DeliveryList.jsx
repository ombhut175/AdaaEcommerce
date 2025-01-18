import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSwipeable } from 'react-swipeable'
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline'

const mockDeliveries = [
  {
    id: 1,
    customerName: 'John Doe',
    address: '123 Main St',
    status: 'pending',
    items: ['T-shirt', 'Jeans'],
    total: '$59.99',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=faces&auto=format&q=80'
  },
  {
    id: 2,
    customerName: 'Jane Smith',
    address: '456 Oak Ave',
    status: 'pending',
    items: ['Dress', 'Shoes'],
    total: '$89.99',
    image: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop&crop=faces&auto=format&q=80'
  }
]

function DeliveryCard({ delivery, onSwipeAction, navigate }) {
  const [offset, setOffset] = useState(0)
  const [showActions, setShowActions] = useState(false)

  const handlers = useSwipeable({
    onSwiping: (event) => {
      if (event.dir === 'Left') {
        const newOffset = Math.min(200, Math.max(0, event.deltaX * -1))
        setOffset(newOffset)
      }
    },
    onSwipedLeft: (event) => {
      const threshold = 100 // Minimum swipe distance to trigger actions
      if (event.deltaX * -1 >= threshold) {
        setShowActions(true)
        setOffset(200) // Fully open
      } else {
        setShowActions(false)
        setOffset(0) // Reset position
      }
    },
    onTouchEndOrOnMouseUp: () => {
      if (offset < 100) {
        setOffset(0)
        setShowActions(false)
      }
    },
    trackMouse: true,
    trackTouch: true,
    preventScrollOnSwipe: true,
    delta: 10,
    swipeDuration: 500,
    touchEventOptions: { passive: false }
  })

  const handleActionClick = (action) => {
    onSwipeAction(delivery.id, action)
    setShowActions(false)
    setOffset(0)
  }

  const handleCardClick = (e) => {
    // Prevent navigation if we're showing actions or in the middle of a swipe
    if (!showActions && offset === 0) {
      e.stopPropagation()
      navigate(`/delivery/${delivery.id}`)
    }
  }

  return (
    <div className="relative mb-4 overflow-hidden rounded-lg touch-pan-y">
      {/* Actions Container */}
      <div className="absolute inset-y-0 right-0 flex items-center justify-end gap-2 px-4">
        <button
          onClick={() => handleActionClick('delivered')}
          className="p-2 bg-green-500 text-white rounded-full shadow-lg transform transition-transform hover:scale-110 active:scale-95"
        >
          <CheckCircleIcon className="h-6 w-6" />
        </button>
        <button
          onClick={() => handleActionClick('canceled')}
          className="p-2 bg-red-500 text-white rounded-full shadow-lg transform transition-transform hover:scale-110 active:scale-95"
        >
          <XCircleIcon className="h-6 w-6" />
        </button>
      </div>

      {/* Card Content */}
      <div
        {...handlers}
        onClick={handleCardClick}
        style={{
          transform: `translateX(${-offset}px)`,
          transition: offset === 0 ? 'transform 0.2s ease-out' : undefined
        }}
        className="relative bg-white dark:bg-gray-800 rounded-lg shadow-md cursor-grab active:cursor-grabbing"
      >
        <div className="flex p-4 items-center gap-4">
          {/* Profile Image */}
          <div className="flex-shrink-0">
            <img
              src={delivery.image}
              alt={delivery.customerName}
              className="w-16 h-16 rounded-full object-cover border-2 border-gray-200 dark:border-gray-700"
            />
          </div>

          {/* Content */}
          <div className="flex-grow min-w-0">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
              {delivery.customerName}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm truncate">
              {delivery.address}
            </p>
            <div className="mt-2 flex justify-between items-center">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                delivery.status === 'pending'
                  ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                  : delivery.status === 'delivered'
                  ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                  : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
              }`}>
                {delivery.status.charAt(0).toUpperCase() + delivery.status.slice(1)}
              </span>
              <span className="font-semibold text-gray-900 dark:text-white">
                {delivery.total}
              </span>
            </div>
          </div>

          {/* Swipe Indicator */}
          {!showActions && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center text-gray-400">
              <span className="text-sm mr-1">←</span>
              <span className="text-sm">Swipe</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function DeliveryList() {
  const navigate = useNavigate()
  const [filter, setFilter] = useState('all')
  const [deliveries, setDeliveries] = useState(mockDeliveries)

  const filteredDeliveries = deliveries.filter(delivery => 
    filter === 'all' ? true : delivery.status === filter
  )

  const handleSwipeAction = (id, action) => {
    setDeliveries(prev => 
      prev.map(d => d.id === id ? { ...d, status: action } : d)
    )
  }

  return (
    <div className="space-y-6">
      <div className="relative">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm transition-all duration-200 hover:border-indigo-500 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        >
          <option value="all">All Deliveries</option>
          <option value="pending">Pending</option>
          <option value="delivered">Delivered</option>
          <option value="canceled">Canceled</option>
        </select>
      </div>

      <div className="space-y-2">
        {filteredDeliveries.map(delivery => (
          <DeliveryCard 
            key={delivery.id}
            delivery={delivery} 
            onSwipeAction={handleSwipeAction}
            navigate={navigate}
          />
        ))}
      </div>
    </div>
  )
}

export default DeliveryList