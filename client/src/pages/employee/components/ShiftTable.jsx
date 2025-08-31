import React, { useState, useEffect } from 'react'
import api from '../../../api/axios'

export const ShiftTable = () => {
  const [shifts, setShifts] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [editingShift, setEditingShift] = useState(null)
  const [deletingShift, setDeletingShift] = useState(null)
  const [replacementShift, setReplacementShift] = useState('')
  const [formData, setFormData] = useState({
    shiftName: '',
    startTime: '',
    endTime: '',
    noOfUsers: ''
  })

  useEffect(() => {
    const fetchShifts = async () => {
      try {
        const res = await api.get('/api/shifts/')
        setShifts(res.data)
      } catch (err) {
        console.error(err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchShifts()
  }, [])

  // ---------- MODALS ----------
  const openModal = (shift = null) => {
    if (shift) {
      setEditingShift(shift)
      setFormData({
        shiftName: shift.shiftName,
        startTime: shift.startTime ? new Date(shift.startTime).toISOString().substring(11, 16) : '',
        endTime: shift.endTime ? new Date(shift.endTime).toISOString().substring(11, 16) : '',
        noOfUsers: shift.noOfUsers || ''
      })
    } else {
      setEditingShift(null)
      setFormData({
        shiftName: '',
        startTime: '',
        endTime: '',
        noOfUsers: ''
      })
    }
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setEditingShift(null)
    setFormData({
      shiftName: '',
      startTime: '',
      endTime: '',
      noOfUsers: ''
    })
  }

  const openDeleteModal = (shift) => {
    setDeletingShift(shift)
    setReplacementShift('')
    setIsDeleteModalOpen(true)
  }

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false)
    setDeletingShift(null)
    setReplacementShift('')
  }

  // ---------- INPUT HANDLERS ----------
  const handleInputChange = e => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  // ---------- API PLACEHOLDER FUNCTIONS ----------
  const updateShift = async (shiftId, updatedData) => {
    try {
      // await api.put(`/api/shifts/${shiftId}`, updatedData)
      setShifts(prev =>
        prev.map(shift =>
          shift._id === shiftId ? { ...shift, ...updatedData } : shift
        )
      )
      closeModal()
    } catch (err) {
      console.error(err)
    }
  }

  const deleteShift = async (shiftId, alternateShiftId) => {
    try {
      // await api.delete(`/api/shifts/${shiftId}`, { data: { alternateShiftId } })
      setShifts(prev => prev.filter(shift => shift._id !== shiftId))
      closeDeleteModal()
    } catch (err) {
      console.error(err)
    }
  }

  // ---------- SUBMIT ----------
  const handleSubmit = () => {
    if (!formData.shiftName || !formData.startTime || !formData.endTime) {
      alert('Please fill in all fields')
      return
    }

    const updatedData = {
      shiftName: formData.shiftName,
      startTime: `1970-01-01T${formData.startTime}:00.000Z`,
      endTime: `1970-01-01T${formData.endTime}:00.000Z`,
      noOfUsers: formData.noOfUsers
    }

    if (editingShift) {
      updateShift(editingShift._id, updatedData)
    } else {
      const newShift = { ...updatedData, _id: Date.now().toString() }
      setShifts(prev => [...prev, newShift])
      closeModal()
    }
  }

  // ---------- HELPERS ----------
  const formatLocalTime = utcString => {
    if (!utcString) return ''
    const date = new Date(utcString)
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  const PlusButton = () => {
    return (
      <button
        type='button'
        onClick={() => openModal()}
        aria-label='Add new shift'
        className='fixed bottom-4 right-4 sm:bottom-8 sm:right-20 w-12 h-12 sm:w-16 sm:h-16 bg-[#c2d9d7] rounded-full flex items-center justify-center cursor-pointer group hover:bg-[#b2ccc9] transition-colors duration-300 z-[1000] shadow-lg'
      >
        <svg
          className='w-6 h-6 sm:w-8 sm:h-8 text-black transform transition-transform duration-300 ease-in-out group-hover:rotate-[180deg]'
          fill='none'
          stroke='currentColor'
          strokeWidth={3}
          viewBox='0 0 24 24'
        >
          <path strokeLinecap='round' strokeLinejoin='round' d='M12 5v14M5 12h14' />
        </svg>
      </button>
    )
  }

  return (
    <div className='w-full bg-white relative p-2 sm:p-4'>
      {/* Mobile Card View */}
      <div className='block sm:hidden space-y-4'>
        <h2 className='text-lg font-bold text-gray-900 mb-4'>Shift Details</h2>
        {shifts.map(shift => (
          <div
            key={shift._id}
            className='bg-white border border-gray-200 rounded-lg p-4 shadow-sm'
          >
            <button
              onClick={() => openModal(shift)}
              className='text-gray-500 hover:text-gray-700 p-1 transition-colors duration-200'
              title='Edit shift'
            >
              ✏️
            </button>
            <button
              onClick={() => openDeleteModal(shift)}
              className='text-gray-500 hover:text-gray-700 p-1 transition-colors duration-200'
              title='Delete shift'
            >
              🗑️
            </button>
            <div className='space-y-2 text-sm text-gray-600'>
              <div className='flex justify-between'>
                <span className='font-medium'>Start Time:</span>
                <span>{formatLocalTime(shift.startTime)}</span>
              </div>
              <div className='flex justify-between'>
                <span className='font-medium'>End Time:</span>
                <span>{formatLocalTime(shift.endTime)}</span>
              </div>
              <div className='flex justify-between'>
                <span className='font-medium'>No. of Users:</span>
                <span>{shift.noOfUsers}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Table View */}
      <div className='hidden sm:block overflow-x-auto'>
        <table className='w-full min-w-full'>
          <thead>
            <tr className='bg-gray-100 border-b border-gray-200'>
              <th className='text-left py-3 px-2 md:py-4 md:px-4 font-bold'>Shift Name</th>
              <th className='text-left py-3 px-2 md:py-4 md:px-4 font-bold'>Start Time</th>
              <th className='text-left py-3 px-2 md:py-4 md:px-4 font-bold'>End Time</th>
              <th className='text-left py-3 px-2 md:py-4 md:px-4 font-bold'>No. of Users</th>
              <th className='text-left py-3 px-2 md:py-4 md:px-4 font-bold'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {shifts.map(shift => (
              <tr key={shift._id} className='border-b border-gray-200 hover:bg-gray-50'>
                <td className='py-3 px-2 md:py-4 md:px-4'>{shift.shiftName}</td>
                <td className='py-3 px-2 md:py-4 md:px-4'>{formatLocalTime(shift.startTime)}</td>
                <td className='py-3 px-2 md:py-4 md:px-4'>{formatLocalTime(shift.endTime)}</td>
                <td className='py-3 px-2 md:py-4 md:px-4'>{shift.noOfUsers}</td>
                <td className='py-3 px-2 md:py-4 md:px-4'>
                  <button onClick={() => openModal(shift)} className='mr-2'>✏️</button>
                  <button onClick={() => openDeleteModal(shift)}>🗑️</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Plus Button */}
      <PlusButton />

      {/* Edit/Add Modal */}
      {isModalOpen && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[1001] p-4'>
          <div className='bg-white rounded-lg w-full max-w-md mx-auto max-h-[90vh] overflow-y-auto'>
            <div className='p-4 sm:p-6'>
              <h2 className='text-lg sm:text-xl font-bold mb-4 text-gray-900'>
                {editingShift ? 'Edit Shift' : 'Add New Shift'}
              </h2>

              <div className='space-y-4'>
                <div>
                  <label htmlFor='shiftName' className='block text-sm font-medium text-gray-700 mb-1'>Shift Name</label>
                  <input
                    type='text'
                    id='shiftName'
                    name='shiftName'
                    value={formData.shiftName}
                    onChange={handleInputChange}
                    className='w-full px-3 py-2 border rounded-md'
                  />
                </div>

                <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                  <div>
                    <label htmlFor='startTime' className='block text-sm font-medium'>Start Time</label>
                    <input
                      type='time'
                      id='startTime'
                      name='startTime'
                      value={formData.startTime}
                      onChange={handleInputChange}
                      className='w-full px-3 py-2 border rounded-md'
                    />
                  </div>

                  <div>
                    <label htmlFor='endTime' className='block text-sm font-medium'>End Time</label>
                    <input
                      type='time'
                      id='endTime'
                      name='endTime'
                      value={formData.endTime}
                      onChange={handleInputChange}
                      className='w-full px-3 py-2 border rounded-md'
                    />
                  </div>
                </div>

                <div className='flex justify-end space-x-3 pt-4'>
                  <button onClick={closeModal} className='px-4 py-2 bg-gray-200 rounded-md'>Cancel</button>
                  <button onClick={handleSubmit} className='px-4 py-2 bg-blue-600 text-white rounded-md'>
                    {editingShift ? 'Update' : 'Add'} Shift
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {isDeleteModalOpen && deletingShift && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[1001] p-4'>
          <div className='bg-white rounded-lg w-full max-w-md mx-auto'>
            <div className='p-6'>
              <h2 className='text-lg font-bold mb-4 text-gray-900'>
                Are you sure you want to delete "{deletingShift.shiftName}"?
              </h2>

              <label className='block text-sm font-medium mb-2'>Move users to:</label>
              <select
                value={replacementShift}
                onChange={e => setReplacementShift(e.target.value)}
                className='w-full px-3 py-2 border rounded-md mb-4'
              >
                <option value=''>-- Select Shift --</option>
                {shifts
                  .filter(s => s._id !== deletingShift._id)
                  .map(s => (
                    <option key={s._id} value={s._id}>
                      {formatLocalTime(s.startTime)} - {formatLocalTime(s.endTime)} | {s.shiftName}
                    </option>
                  ))}
              </select>

              <div className='flex justify-end space-x-3'>
                <button onClick={closeDeleteModal} className='px-4 py-2 bg-gray-200 rounded-md'>Cancel</button>
                <button
                  onClick={() => deleteShift(deletingShift._id, replacementShift)}
                  disabled={!replacementShift}
                  className={`px-4 py-2 rounded-md text-white ${replacementShift ? 'bg-red-600 hover:bg-red-700' : 'bg-gray-400 cursor-not-allowed'}`}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
