import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'
import { useSelector } from 'react-redux'

function UserDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

  // We'll fetch the user and orders from the backend.
  const [userData, setUserData] = useState(null)
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  // If you need something from redux (like an admin token), you can access it via useSelector:
  const user = useSelector((state) => state.user)

  // Fetch user info and orders from the backend using the admin route.
  useEffect(() => {
    axios
        .get(`${BACKEND_URL}/api/admin/${id}`, { withCredentials: true })
        .then((response) => {
          // Expected response shape: { user, orders }
          const { user, orders } = response.data
          setUserData(user)
          setOrders(orders)
          setLoading(false)
        })
        .catch((error) => {
          console.error('Error fetching user details:', error)
          setLoading(false)
        })
  }, [BACKEND_URL, id])

  // While loading, you may show a spinner or message.
  if (loading) {
    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
          <p className="text-gray-900 dark:text-white">Loading user details...</p>
        </div>
    )
  }

  // If no user is found, show a not-found message.
  if (!userData) {
    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
          <div className="text-center animate-scaleIn">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              User not found
            </h2>
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

  // Function to remove a permission from the user's role list.
  const handleRemovePermission = (e, permission) => {
    e.stopPropagation()
    Swal.fire({
      title: `Remove Permission?`,
      text: `Are you sure you want to remove the "${permission}" permission?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, remove it!',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33'
    }).then((result) => {
      if (result.isConfirmed) {
        axios
            .put(
                `${BACKEND_URL}/api/admin/removePermission`,
                { permission, userEmail: userData.email },
                { withCredentials: true }
            )
            .then(() => {
              Swal.fire('Removed!', 'The permission has been removed.', 'success')
              // Update the local user data by filtering out the removed permission.
              setUserData((prevData) => ({
                ...prevData,
                role: prevData.role.filter((p) => p !== permission)
              }))
            })
            .catch((error) => {
              console.error('Error removing permission:', error)
              Swal.fire('Error!', 'Failed to remove the permission.', 'error')
            })
      }
    })
  }

  // Renders user-specific info based on their type.
  const renderUserSpecificInfo = () => {
    switch (userData.userType || userData.type) {
      case 'customer':
        return (
            <div className="space-y-4 animate-slideUp" style={{ animationDelay: '0.3s' }}>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Orders
              </h3>
              {orders && orders.length > 0 ? (
                  <div className="grid grid-cols-1 gap-4">
                    {orders.map((order, index) => (
                        <div
                            key={order._id || index}
                            className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 hover:shadow-xl transition-all duration-300"
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                          <div className="mb-2">
                      <span className="text-sm font-medium text-gray-500 dark:text-gray-300">
                        Order ID:{' '}
                      </span>
                            <span className="text-sm font-medium text-gray-800 dark:text-white">
                        {order._id}
                      </span>
                          </div>
                          <div className="mb-2">
                      <span className="text-sm font-medium text-gray-500 dark:text-gray-300">
                        Order Date:{' '}
                      </span>
                            <span className="text-sm font-medium text-gray-800 dark:text-white">
                        {new Date(order.orderDate).toLocaleDateString()}
                      </span>
                          </div>
                          <div className="mb-2">
                      <span className="text-sm font-medium text-gray-500 dark:text-gray-300">
                        Price:{' '}
                      </span>
                            <span className="text-sm font-medium text-gray-800 dark:text-white">
                        ${order.price}
                      </span>
                          </div>
                          <div>
                      <span className="text-sm font-medium text-gray-500 dark:text-gray-300">
                        Status:{' '}
                      </span>
                            <span className="text-sm font-medium text-gray-800 dark:text-white">
                        {order.orderStatus}
                      </span>
                          </div>
                        </div>
                    ))}
                  </div>
              ) : (
                  <p className="text-gray-600 dark:text-gray-400">No orders found.</p>
              )}
            </div>
        )
      case 'dealer':
        return (
            <div className="space-y-4 animate-slideUp" style={{ animationDelay: '0.3s' }}>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Dealer Information
              </h3>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 hover:shadow-lg transition-all duration-300">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-600 dark:text-gray-400">Products Sold</p>
                    <ul className="mt-1 space-y-1">
                      {userData.productsSold?.map((product, index) => (
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
                    <p className="text-gray-900 dark:text-white text-2xl font-bold">
                      ${userData.totalSales}
                    </p>
                    <p className="text-gray-600 dark:text-gray-400 mt-2">Commission Rate</p>
                    <p className="text-gray-900 dark:text-white">{userData.commission}</p>
                  </div>
                </div>
              </div>
            </div>
        )
      case 'deliveryBoy':
        return (
            <div className="space-y-4 animate-slideUp" style={{ animationDelay: '0.3s' }}>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Delivery Statistics
              </h3>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 hover:shadow-lg transition-all duration-300">
                <div className="grid grid-cols-2 gap-4">
                  <div className="hover:transform hover:scale-105 transition-transform duration-200">
                    <p className="text-gray-600 dark:text-gray-400">Completed Deliveries</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {userData.deliveriesCompleted}
                    </p>
                  </div>
                  <div className="hover:transform hover:scale-105 transition-transform duration-200">
                    <p className="text-gray-600 dark:text-gray-400">Active Deliveries</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {userData.activeDeliveries}
                    </p>
                  </div>
                  <div className="hover:transform hover:scale-105 transition-transform duration-200">
                    <p className="text-gray-600 dark:text-gray-400">Rating</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {userData.rating} / 5.0
                    </p>
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
                      src={userData.profilePicture}
                      alt={userData.name}
                      className="w-24 h-24 rounded-full object-cover border-4 border-gray-200 dark:border-gray-700 transition-all duration-300 group-hover:scale-105 group-hover:border-indigo-500"
                  />
                  <div className="absolute inset-0 rounded-full bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300"></div>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {userData.name}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">{userData.email}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Basic Information */}
                <div className="animate-slideUp" style={{ animationDelay: '0.1s' }}>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Basic Information
                  </h3>
                  <div className="space-y-3">
                    <div className="hover:bg-gray-50 dark:hover:bg-gray-700 p-2 rounded-lg transition-colors duration-200">
                      <p className="text-gray-600 dark:text-gray-400">User Type</p>
                      <p className="text-gray-900 dark:text-white capitalize">
                        {userData.userType || userData.type}
                      </p>
                    </div>
                    <div className="hover:bg-gray-50 dark:hover:bg-gray-700 p-2 rounded-lg transition-colors duration-200">
                      <p className="text-gray-600 dark:text-gray-400">Status</p>
                      <span
                          className={`inline-block px-3 py-1 rounded-full text-sm font-medium transition-all duration-300 ${
                              userData.status === 'active'
                                  ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                  : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                          }`}
                      >
                      {userData.status.charAt(0).toUpperCase() +
                          userData.status.slice(1)}
                    </span>
                    </div>
                    <div className="hover:bg-gray-50 dark:hover:bg-gray-700 p-2 rounded-lg transition-colors duration-200">
                      <p className="text-gray-600 dark:text-gray-400">Verified</p>
                      <p className="text-gray-900 dark:text-white">
                        {userData.verified ? 'Yes' : 'No'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Account Details */}
                <div className="animate-slideUp" style={{ animationDelay: '0.2s' }}>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Account Details
                  </h3>
                  <div className="space-y-3">
                    <div className="hover:bg-gray-50 dark:hover:bg-gray-700 p-2 rounded-lg transition-colors duration-200">
                      <p className="text-gray-600 dark:text-gray-400">Created At</p>
                      <p className="text-gray-900 dark:text-white">{userData.createdAt}</p>
                    </div>
                    <div className="hover:bg-gray-50 dark:hover:bg-gray-700 p-2 rounded-lg transition-colors duration-200">
                      <p className="text-gray-600 dark:text-gray-400">Last Updated</p>
                      <p className="text-gray-900 dark:text-white">{userData.updatedAt}</p>
                    </div>
                    <div className="hover:bg-gray-50 dark:hover:bg-gray-700 p-2 rounded-lg transition-colors duration-200">
                      <p className="text-gray-600 dark:text-gray-400">Devices</p>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {userData.devices.map((device, index) => (
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

              {/* Permissions Section */}
              <div className="animate-slideUp mb-8" style={{ animationDelay: '0.3s' }}>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Permissions
                </h3>
                <div className="flex flex-wrap gap-2">
                  {userData.role.map((permission, index) => (
                      <div
                          key={index}
                          className="flex items-center bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full text-sm text-gray-700 dark:text-gray-300"
                      >
                        <span>{permission}</span>
                        <button
                            onClick={(e) => handleRemovePermission(e, permission)}
                            className="ml-2 text-red-500 hover:text-red-700"
                        >
                          &#x2715;
                        </button>
                      </div>
                  ))}
                </div>
              </div>

              {/* User-Specific Information */}
              {renderUserSpecificInfo()}

              {/* Orders Section (Alternative view) */}
              {orders && orders.length > 0 && (
                  <div className="animate-slideUp mt-8" style={{ animationDelay: '0.4s' }}>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      Orders
                    </h3>
                    <div className="grid grid-cols-1 gap-4">
                      {orders.map((order, index) => (
                          <div
                              key={order._id || index}
                              className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 hover:shadow-xl transition-all duration-300"
                              style={{ animationDelay: `${index * 100}ms` }}
                          >
                            <div className="mb-2">
                        <span className="text-sm font-medium text-gray-500 dark:text-gray-300">
                          Order ID:{' '}
                        </span>
                              <span className="text-sm font-medium text-gray-800 dark:text-white">
                          {order._id}
                        </span>
                            </div>
                            <div className="mb-2">
                        <span className="text-sm font-medium text-gray-500 dark:text-gray-300">
                          Order Date:{' '}
                        </span>
                              <span className="text-sm font-medium text-gray-800 dark:text-white">
                          {new Date(order.orderDate).toLocaleDateString()}
                        </span>
                            </div>
                            <div className="mb-2">
                        <span className="text-sm font-medium text-gray-500 dark:text-gray-300">
                          Price:{' '}
                        </span>
                              <span className="text-sm font-medium text-gray-800 dark:text-white">
                          ${order.price}
                        </span>
                            </div>
                            <div>
                        <span className="text-sm font-medium text-gray-500 dark:text-gray-300">
                          Status:{' '}
                        </span>
                              <span className="text-sm font-medium text-gray-800 dark:text-white">
                          {order.orderStatus}
                        </span>
                            </div>
                          </div>
                      ))}
                    </div>
                  </div>
              )}
            </div>
          </div>
        </div>
      </div>
  )
}

export default UserDetails
