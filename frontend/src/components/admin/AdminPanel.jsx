import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'
import { TrashIcon, PencilIcon } from '@heroicons/react/24/outline'

function UserCard({ user, onDelete, onEdit }) {
  return (
      <div
          className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1 hover:scale-[1.02] cursor-pointer"
          onClick={() => onEdit(user)}
      >
        <div className="p-4">
          <div className="flex items-center gap-4">
            <div className="flex-shrink-0 relative group">
              <img
                  src={user.profilePicture}
                  alt={user.name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-gray-200 dark:border-gray-700 transition-transform duration-300 group-hover:scale-110"
              />
            </div>
            <div className="flex-grow min-w-0">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate transition-colors duration-200">
                {user.name}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm truncate transition-colors duration-200">
                {user.email}
              </p>
              <div className="mt-2 flex justify-between items-center">
              <span
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-300 ${
                      user.status === 'active'
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                          : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                  }`}
              >
                {user.status?.charAt(0).toUpperCase() + user.status?.slice(1)}
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
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL
  const [users, setUsers] = useState([])
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    axios
        .get(`${BACKEND_URL}/api/admin`, { withCredentials: true })
        .then((response) => {
          // Assuming response.data is an array of user objects
          setUsers(response.data)
        })
        .catch((error) => {
          console.error('Error fetching users', error)
        })
  }, [BACKEND_URL])

  const handleDelete = (user) => {
    Swal.fire({
      title: `Are you sure you want to delete ${user.name}?`,
      text: "This action cannot be undone!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        axios
            .delete(`${BACKEND_URL}/api/admin/${user._id}`, { withCredentials: true })
            .then(() => {
              // Remove the deleted user from the state.
              setUsers((prevUsers) => prevUsers.filter((u) => u._id !== user._id))
              Swal.fire('Deleted!', `${user.name} has been deleted.`, 'success')
            })
            .catch((error) => {
              console.error('Error deleting user', error)
              Swal.fire('Error!', 'There was a problem deleting the user.', 'error')
            })
      }
    })
  }

  const handleEdit = (user) => {
    navigate(`/admin/${user._id}`)
  }

  // New handler for giving roles.
  const handleGiveRoles = () => {
    navigate('/admin/give-roles')
  }

  const getFilteredUsers = () => {
    if (filter === 'all') return users

    const roleMapping = {
      customers: 'customer',
      dealers: 'dealer',
      deliveryBoys: 'Delivery Boy'
    }
    return users.filter((user) => user.role.includes(roleMapping[filter]))
  }

  return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-200 pt-10">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm transition-all duration-300 hover:border-indigo-500 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 cursor-pointer"
              >
                <option value="all">All Users</option>
                <option value="customers">Customers</option>
                <option value="dealers">Dealers</option>
                <option value="deliveryBoys">Delivery Boys</option>
              </select>
            </div>
            {/* New "Give More Roles" Button */}
            <div>
              <button
                  onClick={handleGiveRoles}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors duration-200"
              >
                Give More Roles
              </button>
            </div>
          </div>

          <div className="grid gap-4 animate-fadeIn">
            {getFilteredUsers().map((user) => (
                <UserCard key={user._id} user={user} onDelete={handleDelete} onEdit={handleEdit} />
            ))}
          </div>
        </div>
      </div>
  )
}

export default AdminPanel
