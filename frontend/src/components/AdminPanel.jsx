import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserCircleIcon, TrashIcon, PencilIcon } from '@heroicons/react/24/outline'

const mockUsers = {
  customers: [
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      type: 'customer',
      status: 'active',
      verified: true,
      createdAt: '2024-02-15',
      profilePicture: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=faces&auto=format&q=80',
      orders: ['Product A', 'Product B']
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@example.com',
      type: 'customer',
      status: 'inactive',
      verified: false,
      createdAt: '2024-02-10',
      profilePicture: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop&crop=faces&auto=format&q=80',
      orders: ['Product C']
    }
  ],
  dealers: [
    {
      id: 3,
      name: 'Mike Johnson',
      email: 'mike@dealer.com',
      type: 'dealer',
      status: 'active',
      verified: true,
      createdAt: '2024-01-20',
      profilePicture: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces&auto=format&q=80',
      productsSold: ['Product X', 'Product Y', 'Product Z'],
      totalSales: 15000
    }
  ],
  deliveryBoys: [
    {
      id: 4,
      name: 'Tom Wilson',
      email: 'tom@delivery.com',
      type: 'deliveryBoy',
      status: 'active',
      verified: true,
      createdAt: '2024-01-15',
      profilePicture: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=faces&auto=format&q=80',
      deliveriesCompleted: 45,
      activeDeliveries: 3
    }
  ]
}

function UserCard({ user, onDelete, onEdit, navigate }) {
  return (
    <div 
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1 hover:scale-[1.02] cursor-pointer"
      onClick={() => navigate(`/admin/user/${user.id}`)}
    >
      <div className="p-4">
        <div className="flex items-center gap-4">
          <div className="flex-shrink-0 relative group">
            <img
              src={user.profilePicture}
              alt={user.name}
              className="w-16 h-16 rounded-full object-cover border-2 border-gray-200 dark:border-gray-700 transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 rounded-full bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300"></div>
          </div>
          <div className="flex-grow min-w-0">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate transition-colors duration-200">
              {user.name}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm truncate transition-colors duration-200">
              {user.email}
            </p>
            <div className="mt-2 flex justify-between items-center">
              <span className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-300 ${
                user.status === 'active'
                  ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                  : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
              }`}>
                {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
              </span>
              <div className="flex gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    onEdit(user)
                  }}
                  className="p-2 text-blue-600 hover:bg-blue-100 rounded-full dark:text-blue-400 dark:hover:bg-blue-900 transition-all duration-200 transform hover:scale-110 active:scale-95"
                >
                  <PencilIcon className="h-5 w-5" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    onDelete(user)
                  }}
                  className="p-2 text-red-600 hover:bg-red-100 rounded-full dark:text-red-400 dark:hover:bg-red-900 transition-all duration-200 transform hover:scale-110 active:scale-95"
                >
                  <TrashIcon className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function AdminPanel() {
  const navigate = useNavigate()
  const [userType, setUserType] = useState('all')
  const [users, setUsers] = useState(mockUsers)

  const handleDelete = (user) => {
    if (window.confirm(`Are you sure you want to delete ${user.name}?`)) {
      // Handle delete logic here
      console.log('Deleting user:', user.id)
    }
  }

  const handleEdit = (user) => {
    navigate(`/admin/user/${user.id}/edit`)
  }

  const getAllUsers = () => {
    return [
      ...users.customers,
      ...users.dealers,
      ...users.deliveryBoys
    ]
  }

  const getFilteredUsers = () => {
    switch (userType) {
      case 'customers':
        return users.customers
      case 'dealers':
        return users.dealers
      case 'deliveryBoys':
        return users.deliveryBoys
      default:
        return getAllUsers()
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-200">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 animate-fadeIn">
            User Management
          </h1>
          <select
            value={userType}
            onChange={(e) => setUserType(e.target.value)}
            className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm transition-all duration-300 hover:border-indigo-500 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 cursor-pointer"
          >
            <option value="all">All Users</option>
            <option value="customers">Customers</option>
            <option value="dealers">Dealers</option>
            <option value="deliveryBoys">Delivery Boys</option>
          </select>
        </div>

        <div className="grid gap-4 animate-fadeIn">
          {getFilteredUsers().map((user, index) => (
            <div
              key={user.id}
              className="opacity-0 animate-slideIn"
              style={{
                animationDelay: `${index * 100}ms`,
                animationFillMode: 'forwards'
              }}
            >
              <UserCard
                user={user}
                onDelete={handleDelete}
                onEdit={handleEdit}
                navigate={navigate}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AdminPanel