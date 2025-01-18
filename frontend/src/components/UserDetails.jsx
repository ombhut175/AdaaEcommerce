import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'

const mockUserDetails = {
  1: {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    password: '********',
    type: 'customer',
    status: 'active',
    devices: ['iPhone 12', 'MacBook Pro'],
    verified: true,
    createdAt: '2024-02-15',
    updatedAt: '2024-02-20',
    profilePicture: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=faces&auto=format&q=80',
    orders: ['Product A', 'Product B']
  },
  2: {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@example.com',
    password: '********',
    type: 'customer',
    status: 'inactive',
    devices: ['Android Phone'],
    verified: false,
    createdAt: '2024-02-10',
    updatedAt: '2024-02-12',
    profilePicture: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop&crop=faces&auto=format&q=80',
    orders: ['Product C']
  },
  3: {
    id: 3,
    name: 'Mike Johnson',
    email: 'mike@dealer.com',
    password: '********',
    type: 'dealer',
    status: 'active',
    devices: ['Samsung S21', 'iPad Pro'],
    verified: true,
    createdAt: '2024-01-20',
    updatedAt: '2024-02-18',
    profilePicture: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces&auto=format&q=80',
    productsSold: ['Product X', 'Product Y', 'Product Z'],
    totalSales: 15000,
    commission: '10%'
  },
  4: {
    id: 4,
    name: 'Tom Wilson',
    email: 'tom@delivery.com',
    password: '********',
    type: 'deliveryBoy',
    status: 'active',
    devices: ['iPhone 13'],
    verified: true,
    createdAt: '2024-01-15',
    updatedAt: '2024-02-19',
    profilePicture: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=faces&auto=format&q=80',
    deliveriesCompleted: 45,
    activeDeliveries: 3,
    rating: 4.8
  }
}

function UserDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const user = mockUserDetails[id]

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center animate-scaleIn">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">User not found</h2>
          <button
            onClick={() => navigate('/admin')}
            className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors duration-200 hover:scale-105 transform"
          >
            Go back to admin panel
          </button>
        </div>
      </div>
    )
  }

  const renderUserSpecificInfo = () => {
    switch (user.type) {
      case 'customer':
        return (
          <div className="space-y-4 animate-slideUp" style={{ animationDelay: '0.3s' }}>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Orders</h3>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 hover:shadow-lg transition-all duration-300">
              <ul className="space-y-2">
                {user.orders.map((order, index) => (
                  <li 
                    key={index} 
                    className="text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 p-2 rounded-lg transition-colors duration-200"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {order}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )
      case 'dealer':
        return (
          <div className="space-y-4 animate-slideUp" style={{ animationDelay: '0.3s' }}>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Dealer Information</h3>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 hover:shadow-lg transition-all duration-300">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-600 dark:text-gray-400">Products Sold</p>
                  <ul className="mt-1 space-y-1">
                    {user.productsSold.map((product, index) => (
                      <li 
                        key={index} 
                        className="text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700 p-2 rounded-lg transition-colors duration-200"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        {product}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-gray-600 dark:text-gray-400">Total Sales</p>
                  <p className="text-gray-900 dark:text-white text-2xl font-bold">${user.totalSales}</p>
                  <p className="text-gray-600 dark:text-gray-400 mt-2">Commission Rate</p>
                  <p className="text-gray-900 dark:text-white">{user.commission}</p>
                </div>
              </div>
            </div>
          </div>
        )
      case 'deliveryBoy':
        return (
          <div className="space-y-4 animate-slideUp" style={{ animationDelay: '0.3s' }}>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Delivery Statistics</h3>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 hover:shadow-lg transition-all duration-300">
              <div className="grid grid-cols-2 gap-4">
                <div className="hover:transform hover:scale-105 transition-transform duration-200">
                  <p className="text-gray-600 dark:text-gray-400">Completed Deliveries</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{user.deliveriesCompleted}</p>
                </div>
                <div className="hover:transform hover:scale-105 transition-transform duration-200">
                  <p className="text-gray-600 dark:text-gray-400">Active Deliveries</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{user.activeDeliveries}</p>
                </div>
                <div className="hover:transform hover:scale-105 transition-transform duration-200">
                  <p className="text-gray-600 dark:text-gray-400">Rating</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{user.rating} / 5.0</p>
                </div>
              </div>
            </div>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-200">
      <div className="container mx-auto px-4 py-8">
        <button
          onClick={() => navigate('/admin')}
          className="flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-6 transition-colors duration-200 hover:scale-105 transform"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-2" />
          Back to Admin Panel
        </button>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl animate-scaleIn">
          <div className="p-6">
            <div className="flex items-center gap-6 mb-6">
              <div className="relative group">
                <img
                  src={user.profilePicture}
                  alt={user.name}
                  className="w-24 h-24 rounded-full object-cover border-4 border-gray-200 dark:border-gray-700 transition-all duration-300 group-hover:scale-105 group-hover:border-indigo-500"
                />
                <div className="absolute inset-0 rounded-full bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300"></div>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{user.name}</h2>
                <p className="text-gray-600 dark:text-gray-400">{user.email}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="animate-slideUp" style={{ animationDelay: '0.1s' }}>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Basic Information</h3>
                <div className="space-y-3">
                  <div className="hover:bg-gray-50 dark:hover:bg-gray-700 p-2 rounded-lg transition-colors duration-200">
                    <p className="text-gray-600 dark:text-gray-400">User Type</p>
                    <p className="text-gray-900 dark:text-white capitalize">{user.type}</p>
                  </div>
                  <div className="hover:bg-gray-50 dark:hover:bg-gray-700 p-2 rounded-lg transition-colors duration-200">
                    <p className="text-gray-600 dark:text-gray-400">Status</p>
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium transition-all duration-300 ${
                      user.status === 'active'
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                    }`}>
                      {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                    </span>
                  </div>
                  <div className="hover:bg-gray-50 dark:hover:bg-gray-700 p-2 rounded-lg transition-colors duration-200">
                    <p className="text-gray-600 dark:text-gray-400">Verified</p>
                    <p className="text-gray-900 dark:text-white">{user.verified ? 'Yes' : 'No'}</p>
                  </div>
                </div>
              </div>

              <div className="animate-slideUp" style={{ animationDelay: '0.2s' }}>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Account Details</h3>
                <div className="space-y-3">
                  <div className="hover:bg-gray-50 dark:hover:bg-gray-700 p-2 rounded-lg transition-colors duration-200">
                    <p className="text-gray-600 dark:text-gray-400">Created At</p>
                    <p className="text-gray-900 dark:text-white">{user.createdAt}</p>
                  </div>
                  <div className="hover:bg-gray-50 dark:hover:bg-gray-700 p-2 rounded-lg transition-colors duration-200">
                    <p className="text-gray-600 dark:text-gray-400">Last Updated</p>
                    <p className="text-gray-900 dark:text-white">{user.updatedAt}</p>
                  </div>
                  <div className="hover:bg-gray-50 dark:hover:bg-gray-700 p-2 rounded-lg transition-colors duration-200">
                    <p className="text-gray-600 dark:text-gray-400">Devices</p>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {user.devices.map((device, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200 hover:scale-105 transform"
                        >
                          {device}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {renderUserSpecificInfo()}
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserDetails