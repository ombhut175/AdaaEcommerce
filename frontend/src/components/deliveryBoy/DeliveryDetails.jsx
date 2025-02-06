import axios from 'axios';
import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {toast} from "react-toastify";

function DeliveryDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [showCancelForm, setShowCancelForm] = useState(false)
  const [cancelReason, setCancelReason] = useState('')

  const handleDelivered = () => {
    axios.post(import.meta.env.VITE_BACKEND_URL + '/api/orders/' + id,{},{withCredentials: true})
    .then((res)=>{
      console.log(res.data);
    })
    toast.success('Delivery marked as completed!')
    navigate('/delivery');
  }

  const handleCancel = () => {
    axios.post(import.meta.env.VITE_BACKEND_URL + '/api/orders/cancel/' + id,{},{withCredentials:true})
    .then((res)=>{
      
      toast.success('Delivery marked as completed!')
      navigate('/delivery');
        
      
    })
  }

  const submitCancelForm = () => {
    if (!cancelReason) {
      toast.error('Please provide a reason for cancellation')
      return
    }
    // Update delivery status with cancel reason
    toast.success('Delivery canceled!')
    navigate('/delivery');
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 pt-24">
      <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Delivery Details #{id}</h2>
      
      {!showCancelForm ? (
        <div className="space-y-4">
          <div className="flex justify-between gap-4">
            <button
              onClick={handleDelivered}
              className="flex-1 bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600"
            >
              Mark as Delivered
            </button>
            <button
              onClick={handleCancel}
              className="flex-1 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
            >
              Cancel Delivery
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Cancel Delivery</h3>
          <select
            value={cancelReason}
            onChange={(e) => setCancelReason(e.target.value)}
            className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          >
            <option value="">Select a reason</option>
            <option value="customer_unavailable">Customer Unavailable</option>
            <option value="wrong_address">Wrong Address</option>
            <option value="damaged_package">Damaged Package</option>
            <option value="other">Other</option>
          </select>
          
          <div className="flex justify-between gap-4">
            <button
              onClick={() => setShowCancelForm(false)}
              className="flex-1 bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600"
            >
              Back
            </button>
            <button
              onClick={submitCancelForm}
              className="flex-1 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
            >
              Confirm Cancellation
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default DeliveryDetails