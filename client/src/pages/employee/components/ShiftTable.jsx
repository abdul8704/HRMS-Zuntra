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
    startTime: '', // stored as "HH:mm" for <input type="time">
    endTime: '',
  })

  useEffect(() => {
    const fetchShifts = async () => {
      try {
        setLoading(true)
        const res = await api.get('/api/shifts/')
        setShifts(res.data)
      } catch (err) {
        console.error(err)
        setError(err.message || 'Failed to fetch shifts')
      } finally {
        setLoading(false)
      }
    }

    fetchShifts()
  }, [])

  // --- Helpers for time conversion ---
  // Formats a UTC datetime string to the human readable local "hh:mm AM/PM" (used for display in table and delete dropdown)
  const formatLocalTime = utcString => {
    if (!utcString) return ''
    const date = new Date(utcString)
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  // Converts a UTC datetime string into local "HH:mm" suitable for <input type="time"> default value
  const utcToInputTime = utcString => {
    if (!utcString) return ''
    const d = new Date(utcString) // local time created from the UTC datetime string
    const hh = d.getHours().toString().padStart(2, '0')
    const mm = d.getMinutes().toString().padStart(2, '0')
    return `${hh}:${mm}` // "HH:mm"
  }

  // Converts local "HH:mm" (from input) into an ISO string (local time -> ISO UTC representation)
  const inputTimeToIso = timeHHMM => {
    if (!timeHHMM) return ''
    const [hhStr, mmStr] = timeHHMM.split(':')
    const hh = parseInt(hhStr, 10)
    const mm = parseInt(mmStr, 10)
    const d = new Date()
    d.setHours(hh, mm, 0, 0) // set to that local time today
    return d.toISOString() // RFC ISO with timezone offset (UTC)
  }

  // ---------- MODALS ----------
  const openModal = (shift = null) => {
    if (shift) {
      setEditingShift(shift)
      setFormData({
        shiftName: shift.shiftName || '',
        // USE utcToInputTime to get a local HH:mm for the input value (fixes the timezone bug)
        startTime: utcToInputTime(shift.startTime),
        endTime: utcToInputTime(shift.endTime),
      })
    } else {
      setEditingShift(null)
      setFormData({
        shiftName: '',
        startTime: '',
        endTime: '',
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
    })
  }

  const openDeleteModal = shift => {
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
  // updateShift: pass shift id and updated data. (placeholder for actual API call)
  const updateShift = async (shiftId, updatedData) => {
    try {
      const res = await api.put(`/api/shifts/${shiftId}`, updatedData);

      const updatedShift = res.data;

      setShifts(prev =>
        prev.map(s => (s._id === shiftId ? updatedShift : s))
      );

      closeModal();
    } catch (err) {
      console.error("Failed to update shift", err);
    }
  };


  const deleteShift = async (shiftId, alternateShiftId) => {
    console.log("ids", shiftId, alternateShiftId);
    try {
      const res = await api.delete(`/api/shifts/delete-shift`, {
        params: {
          shiftId,
          newShiftId: alternateShiftId,
        },
      });
      console.log("res", res);
      setShifts(prev => prev.filter(s => s._id !== shiftId));
      closeDeleteModal();
    } catch (err) {
      console.error("Failed to delete shift", err);
    }
  };


  // ---------- SUBMIT ----------
  const handleSubmit = () => {
    if (!formData.shiftName || !formData.startTime || !formData.endTime) {
      alert('Please fill in all fields')
      return
    }

    const updatedData = {
      shiftName: formData.shiftName,
      startTime: inputTimeToIso(formData.startTime),
      endTime: inputTimeToIso(formData.endTime),
    }

    if (editingShift) {
      updateShift(editingShift._id, updatedData)
    } else {
      addShift(updatedData)
    }
  }

  const addShift = async (updatedData) => {
    try {
      const res = await api.post('/api/shifts/new-shift', updatedData) // replace with your actual endpoint
      console.log(res);
      closeModal()
    } catch (err) {
      console.error('Failed to add shift', err)
      alert('Failed to add shift. Please try again.')
    }
  }

  // --- Plus button (unchanged UI) ---
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
              <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z' />
              </svg>
            </button>
            <button
              onClick={() => openDeleteModal(shift)}
              className='text-gray-500 hover:text-gray-700 p-1 transition-colors duration-200'
              title='Delete shift'
            >
              <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16' />
              </svg>
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
                <span>{shift.userCount}</span>
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
              <th className='text-left py-3 px-2 md:py-4 md:px-4 font-bold text-gray-900 text-xs md:text-sm whitespace-nowrap'>
                Shift Name
              </th>
              <th className='text-left py-3 px-2 md:py-4 md:px-4 font-bold text-gray-900 text-xs md:text-sm whitespace-nowrap'>
                Start Time
              </th>
              <th className='text-left py-3 px-2 md:py-4 md:px-4 font-bold text-gray-900 text-xs md:text-sm whitespace-nowrap'>
                End Time
              </th>
              <th className='text-left py-3 px-2 md:py-4 md:px-4 font-bold text-gray-900 text-xs md:text-sm whitespace-nowrap'>
                No. of Users
              </th>
            </tr>
          </thead>
          <tbody>
            {shifts.map(shift => (
              <tr
                key={shift._id}
                className='border-b border-gray-200 hover:bg-gray-50 transition-colors group'
              >
                <td className='py-3 px-2 md:py-4 md:px-4 text-xs md:text-sm text-black'>
                  {shift.shiftName}
                </td>
                <td className='py-3 px-2 md:py-4 md:px-4 text-xs md:text-sm text-black'>
                  {formatLocalTime(shift.startTime)}
                </td>
                <td className='py-3 px-2 md:py-4 md:px-4 text-xs md:text-sm text-black'>
                  {formatLocalTime(shift.endTime)}
                </td>
                <td className='py-3 px-2 md:py-4 md:px-4 text-xs md:text-sm text-black relative'>
                  {shift.userCount}

                  {/* Hover buttons */}
                  <div className='absolute top-1/2 right-2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 flex space-x-2 transition-opacity duration-200'>
                    <button
                      onClick={() => openModal(shift)}
                      className='text-gray-500 hover:text-gray-700 p-1'
                      title='Edit shift'
                    >
                      <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z' />
                      </svg>
                    </button>
                    <button
                      onClick={() => openDeleteModal(shift)}
                      className='text-gray-500 hover:text-gray-700 p-1'
                      title='Delete shift'
                    >
                      <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16' />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Plus Button */}
      <PlusButton />

      {/* Modal */}
      {isModalOpen && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[1001] p-4'>
          <div className='bg-white rounded-lg w-full max-w-md mx-auto max-h-[90vh] overflow-y-auto'>
            <div className='p-4 sm:p-6'>
              <h2 className='text-lg sm:text-xl font-bold mb-4 text-gray-900'>
                {editingShift ? 'Edit Shift' : 'Add New Shift'}
              </h2>

              <div className='space-y-4'>
                <div>
                  <label
                    htmlFor='shiftName'
                    className='block text-sm font-medium text-gray-700 mb-1'
                  >
                    Shift Name
                  </label>
                  <input
                    type='text'
                    id='shiftName'
                    name='shiftName'
                    value={formData.shiftName}
                    onChange={handleInputChange}
                    className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base'
                    placeholder='Enter shift name'
                  />
                </div>

                <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                  <div>
                    <label
                      htmlFor='startTime'
                      className='block text-sm font-medium text-gray-700 mb-1'
                    >
                      Start Time
                    </label>
                    <input
                      type='time'
                      id='startTime'
                      name='startTime'
                      value={formData.startTime}
                      onChange={handleInputChange}
                      className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base'
                    />
                  </div>

                  <div>
                    <label
                      htmlFor='endTime'
                      className='block text-sm font-medium text-gray-700 mb-1'
                    >
                      End Time
                    </label>
                    <input
                      type='time'
                      id='endTime'
                      name='endTime'
                      value={formData.endTime}
                      onChange={handleInputChange}
                      className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base'
                    />
                  </div>
                </div>

                <div className='flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-3 pt-4'>
                  <button
                    type='button'
                    onClick={closeModal}
                    className='w-full sm:w-auto px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors text-sm sm:text-base order-2 sm:order-1'
                  >
                    Cancel
                  </button>
                  <button
                    type='button'
                    onClick={handleSubmit}
                    className='w-full sm:w-auto px-4 py-2 bg-[#BBD3CC] text-black rounded-md transition-colors text-sm sm:text-base order-1 sm:order-2'
                  >
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
                      {s.shiftName} | {formatLocalTime(s.startTime)} - {formatLocalTime(s.endTime)}
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
