'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function OwnerDashboard() {
  const [stats, setStats] = useState({ bookings: 0, activeCourts: 0, earnings: 0 })
  const [facilities, setFacilities] = useState([])
  const [bookings, setBookings] = useState([])
  const [chartData, setChartData] = useState({ trends: [], earnings: [], peakHours: [] })
  const [activeTab, setActiveTab] = useState('dashboard')
  const [showAddForm, setShowAddForm] = useState(false)
  const [showCourtForm, setShowCourtForm] = useState(false)
  const [showEditForm, setShowEditForm] = useState(false)
  const [showEditCourtForm, setShowEditCourtForm] = useState(false)
  const [selectedFacility, setSelectedFacility] = useState('')
  const [editingFacility, setEditingFacility] = useState(null)
  const [editingCourt, setEditingCourt] = useState(null)
  const [newFacility, setNewFacility] = useState({ 
    name: '', description: '', address: '', location: '', 
    sportTypes: [], amenities: [], image: '' 
  })
  const [showImagePicker, setShowImagePicker] = useState(false)
  const [newCourt, setNewCourt] = useState({
    name: '', sportType: 'BADMINTON', pricePerHour: '', 
    operatingHours: { open: '06:00', close: '22:00' }
  })
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('token')
    const user = JSON.parse(localStorage.getItem('user') || '{}')
    
    if (!token || user.role !== 'FACILITY_OWNER') {
      router.push('/')
      return
    }
    
    fetchData()
  }, [])

  const fetchData = async () => {
    const token = localStorage.getItem('token')
    try {
      const [statsRes, facilitiesRes, bookingsRes, chartsRes] = await Promise.all([
        fetch('/api/owner/stats', { headers: { 'Authorization': `Bearer ${token}` } }),
        fetch('/api/owner/facilities', { headers: { 'Authorization': `Bearer ${token}` } }),
        fetch('/api/owner/bookings', { headers: { 'Authorization': `Bearer ${token}` } }),
        fetch('/api/owner/charts', { headers: { 'Authorization': `Bearer ${token}` } })
      ])
      
      if (statsRes.ok) setStats(await statsRes.json())
      if (facilitiesRes.ok) setFacilities((await facilitiesRes.json()).facilities)
      if (bookingsRes.ok) setBookings((await bookingsRes.json()).bookings)
      if (chartsRes.ok) setChartData(await chartsRes.json())
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  const addFacility = async () => {
    const token = localStorage.getItem('token')
    try {
      const res = await fetch('/api/owner/facilities', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(newFacility)
      })
      
      if (res.ok) {
        setShowAddForm(false)
        setNewFacility({ name: '', description: '', address: '', location: '', sportTypes: [], amenities: [], image: '' })
        fetchData()
      }
    } catch (error) {
      console.error('Error adding facility:', error)
    }
  }

  const updateFacility = async () => {
    const token = localStorage.getItem('token')
    try {
      const res = await fetch(`/api/owner/facilities/${editingFacility.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(newFacility)
      })
      
      if (res.ok) {
        setShowEditForm(false)
        setEditingFacility(null)
        setNewFacility({ name: '', description: '', address: '', location: '', sportTypes: [], amenities: [], image: '' })
        fetchData()
      }
    } catch (error) {
      console.error('Error updating facility:', error)
    }
  }

  const addCourt = async () => {
    const token = localStorage.getItem('token')
    try {
      const res = await fetch('/api/owner/courts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ ...newCourt, facilityId: selectedFacility })
      })
      
      if (res.ok) {
        setShowCourtForm(false)
        setNewCourt({ name: '', sportType: 'BADMINTON', pricePerHour: '', operatingHours: { open: '06:00', close: '22:00' } })
        fetchData()
      }
    } catch (error) {
      console.error('Error adding court:', error)
    }
  }

  const updateCourt = async () => {
    const token = localStorage.getItem('token')
    try {
      const res = await fetch(`/api/owner/courts/${editingCourt.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(newCourt)
      })
      
      if (res.ok) {
        setShowEditCourtForm(false)
        setEditingCourt(null)
        setNewCourt({ name: '', sportType: 'BADMINTON', pricePerHour: '', operatingHours: { open: '06:00', close: '22:00' } })
        fetchData()
      }
    } catch (error) {
      console.error('Error updating court:', error)
    }
  }

  const deleteCourt = async (courtId: string) => {
    if (!confirm('Are you sure you want to delete this court?')) return
    
    const token = localStorage.getItem('token')
    try {
      const res = await fetch(`/api/owner/courts/${courtId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      })
      
      if (res.ok) {
        fetchData()
      }
    } catch (error) {
      console.error('Error deleting court:', error)
    }
  }

  const handleLogout = () => {
    localStorage.clear()
    router.push('/')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="text-2xl font-bold text-purple-600">FACILITY OWNER</div>
          <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded">
            Logout
          </button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex space-x-1 mb-6 bg-gray-100 p-1 rounded-xl">
          {['dashboard', 'facilities', 'courts', 'timeslots', 'bookings', 'profile'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 px-4 py-2 rounded-lg font-medium ${
                activeTab === tab ? 'bg-white text-purple-600 shadow-sm' : 'text-gray-600'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {activeTab === 'dashboard' && (
          <div>
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-2">Welcome back!</h2>
              <p className="text-gray-600">Here's your facility performance overview</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-2">Total Bookings</h3>
                <p className="text-3xl font-bold text-blue-600">{stats.bookings}</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-2">Active Courts</h3>
                <p className="text-3xl font-bold text-green-600">{stats.activeCourts}</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-2">Monthly Earnings</h3>
                <p className="text-3xl font-bold text-purple-600">₹{stats.earnings}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-4">Booking Trends (Last 7 Days)</h3>
                <div className="h-64 flex items-end justify-center space-x-2">
                  {chartData.trends && chartData.trends.length > 0 ? (
                    chartData.trends.map((day: any, index) => (
                      <div key={index} className="flex-1 flex flex-col items-center">
                        <div className="bg-blue-500 rounded-t w-full" style={{height: `${Math.max((day.count / 10) * 200, 20)}px`}}></div>
                        <div className="text-xs text-center mt-2">{day.day}</div>
                        <div className="text-xs text-gray-500">{day.count}</div>
                      </div>
                    ))
                  ) : (
                    <div className="text-gray-500">No booking data available</div>
                  )}
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-4">Peak Booking Hours</h3>
                <div className="space-y-3">
                  {chartData.peakHours && chartData.peakHours.length > 0 ? (
                    chartData.peakHours.map((hour: any, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <span className="font-medium">{hour.time}</span>
                        <div className="flex items-center">
                          <div className="w-32 bg-gray-200 rounded-full h-3 mr-3">
                            <div className="bg-orange-500 h-3 rounded-full" style={{width: `${Math.min((hour.bookings / 20) * 100, 100)}%`}}></div>
                          </div>
                          <span className="text-sm font-semibold w-8">{hour.bookings}</span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-gray-500">No peak hours data available</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'facilities' && (
          <div className="bg-white rounded-lg shadow">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">My Facilities</h3>
                <button
                  onClick={() => setShowAddForm(true)}
                  className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
                >
                  Add Facility
                </button>
              </div>

              {showAddForm && (
                <div className="mb-6 p-4 border rounded-lg bg-gray-50">
                  <h4 className="font-semibold mb-4">Add New Facility</h4>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Venue Image</label>
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-gray-100 rounded overflow-hidden">
                        {newFacility.image ? (
                          <img src={newFacility.image} alt="Facility" className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400 text-xs">No Image</div>
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={() => setShowImagePicker(!showImagePicker)}
                        className="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded text-sm"
                      >
                        Choose Image
                      </button>
                    </div>
                    {showImagePicker && (
                      <div className="mt-2 p-4 border rounded bg-gray-50">
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium mb-2">Upload from Device</label>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => {
                                const file = e.target.files?.[0]
                                if (file) {
                                  const reader = new FileReader()
                                  reader.onload = (event) => {
                                    setNewFacility({...newFacility, image: event.target?.result as string})
                                    setShowImagePicker(false)
                                  }
                                  reader.readAsDataURL(file)
                                }
                              }}
                              className="w-full px-3 py-2 border rounded text-sm"
                            />
                          </div>
                          <div className="text-center text-gray-500 text-sm">OR</div>
                          <div>
                            <label className="block text-sm font-medium mb-2">Image URL</label>
                            <div className="flex space-x-2">
                              <input
                                type="url"
                                placeholder="https://example.com/image.jpg"
                                className="flex-1 px-3 py-2 border rounded text-sm"
                                onKeyPress={(e) => {
                                  if (e.key === 'Enter') {
                                    setNewFacility({...newFacility, image: e.target.value})
                                    setShowImagePicker(false)
                                  }
                                }}
                              />
                              <button
                                type="button"
                                onClick={(e) => {
                                  const input = e.target.previousElementSibling as HTMLInputElement
                                  if (input.value) {
                                    setNewFacility({...newFacility, image: input.value})
                                    setShowImagePicker(false)
                                  }
                                }}
                                className="bg-blue-500 text-white px-4 py-2 rounded text-sm hover:bg-blue-600"
                              >
                                Add
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Facility Name"
                      value={newFacility.name}
                      onChange={(e) => setNewFacility({...newFacility, name: e.target.value})}
                      className="px-3 py-2 border rounded"
                    />
                    <input
                      type="text"
                      placeholder="Location"
                      value={newFacility.location}
                      onChange={(e) => setNewFacility({...newFacility, location: e.target.value})}
                      className="px-3 py-2 border rounded"
                    />
                    <input
                      type="text"
                      placeholder="Address"
                      value={newFacility.address}
                      onChange={(e) => setNewFacility({...newFacility, address: e.target.value})}
                      className="px-3 py-2 border rounded md:col-span-2"
                    />
                    <textarea
                      placeholder="Description"
                      value={newFacility.description}
                      onChange={(e) => setNewFacility({...newFacility, description: e.target.value})}
                      className="px-3 py-2 border rounded md:col-span-2"
                    />
                  </div>
                  <div className="flex space-x-2 mt-4">
                    <button onClick={addFacility} className="bg-green-500 text-white px-4 py-2 rounded">
                      Add
                    </button>
                    <button onClick={() => setShowAddForm(false)} className="bg-gray-500 text-white px-4 py-2 rounded">
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              {showEditForm && (
                <div className="mb-6 p-4 border rounded-lg bg-blue-50">
                  <h4 className="font-semibold mb-4">Edit Facility</h4>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Venue Image</label>
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-gray-100 rounded overflow-hidden">
                        {newFacility.image ? (
                          <img src={newFacility.image} alt="Facility" className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400 text-xs">No Image</div>
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={() => setShowImagePicker(!showImagePicker)}
                        className="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded text-sm"
                      >
                        Change Image
                      </button>
                    </div>
                    {showImagePicker && (
                      <div className="mt-2 p-4 border rounded bg-gray-50">
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium mb-2">Upload from Device</label>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => {
                                const file = e.target.files?.[0]
                                if (file) {
                                  const reader = new FileReader()
                                  reader.onload = (event) => {
                                    setNewFacility({...newFacility, image: event.target?.result as string})
                                    setShowImagePicker(false)
                                  }
                                  reader.readAsDataURL(file)
                                }
                              }}
                              className="w-full px-3 py-2 border rounded text-sm"
                            />
                          </div>
                          <div className="text-center text-gray-500 text-sm">OR</div>
                          <div>
                            <label className="block text-sm font-medium mb-2">Image URL</label>
                            <div className="flex space-x-2">
                              <input
                                type="url"
                                placeholder="https://example.com/image.jpg"
                                className="flex-1 px-3 py-2 border rounded text-sm"
                                onKeyPress={(e) => {
                                  if (e.key === 'Enter') {
                                    setNewFacility({...newFacility, image: e.target.value})
                                    setShowImagePicker(false)
                                  }
                                }}
                              />
                              <button
                                type="button"
                                onClick={(e) => {
                                  const input = e.target.previousElementSibling as HTMLInputElement
                                  if (input.value) {
                                    setNewFacility({...newFacility, image: input.value})
                                    setShowImagePicker(false)
                                  }
                                }}
                                className="bg-blue-500 text-white px-4 py-2 rounded text-sm hover:bg-blue-600"
                              >
                                Add
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Facility Name"
                      value={newFacility.name}
                      onChange={(e) => setNewFacility({...newFacility, name: e.target.value})}
                      className="px-3 py-2 border rounded"
                    />
                    <input
                      type="text"
                      placeholder="Location"
                      value={newFacility.location}
                      onChange={(e) => setNewFacility({...newFacility, location: e.target.value})}
                      className="px-3 py-2 border rounded"
                    />
                    <input
                      type="text"
                      placeholder="Address"
                      value={newFacility.address}
                      onChange={(e) => setNewFacility({...newFacility, address: e.target.value})}
                      className="px-3 py-2 border rounded md:col-span-2"
                    />
                    <textarea
                      placeholder="Description"
                      value={newFacility.description}
                      onChange={(e) => setNewFacility({...newFacility, description: e.target.value})}
                      className="px-3 py-2 border rounded md:col-span-2"
                    />
                  </div>
                  <div className="flex space-x-2 mt-4">
                    <button onClick={updateFacility} className="bg-blue-500 text-white px-4 py-2 rounded">
                      Update
                    </button>
                    <button onClick={() => {
                      setShowEditForm(false)
                      setEditingFacility(null)
                      setNewFacility({ name: '', description: '', address: '', location: '', sportTypes: [], amenities: [], image: '' })
                    }} className="bg-gray-500 text-white px-4 py-2 rounded">
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              <div className="space-y-4">
                {facilities.map((facility: any) => (
                  <div key={facility.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex space-x-4">
                        {facility.image && (
                          <img src={facility.image} alt={facility.name} className="w-16 h-16 object-cover rounded" />
                        )}
                        <div>
                          <h4 className="font-semibold">{facility.name}</h4>
                          <p className="text-gray-600">{facility.location}</p>
                          <p className="text-sm text-gray-500">{facility.description}</p>
                          <span className={`inline-block mt-2 px-2 py-1 rounded text-sm ${
                            facility.status === 'APPROVED' ? 'bg-green-100 text-green-800' :
                            facility.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {facility.status}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-500">{facility.courts?.length || 0} Courts</p>
                        <button 
                          onClick={() => {
                            setEditingFacility(facility)
                            setNewFacility({
                              name: facility.name,
                              description: facility.description,
                              address: facility.address,
                              location: facility.location,
                              sportTypes: facility.sportTypes || [],
                              amenities: facility.amenities || [],
                              image: facility.image || ''
                            })
                            setShowEditForm(true)
                          }}
                          className="mt-2 bg-blue-500 text-white px-3 py-1 rounded text-sm"
                        >
                          Edit
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'courts' && (
          <div className="bg-white rounded-lg shadow">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Court Management</h3>
                <button
                  onClick={() => setShowCourtForm(true)}
                  className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
                >
                  Add Court
                </button>
              </div>

              {showCourtForm && (
                <div className="mb-6 p-4 border rounded-lg bg-gray-50">
                  <h4 className="font-semibold mb-4">Add New Court</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <select
                      value={selectedFacility}
                      onChange={(e) => setSelectedFacility(e.target.value)}
                      className="px-3 py-2 border rounded"
                    >
                      <option value="">Select Facility</option>
                      {facilities.map((facility: any) => (
                        <option key={facility.id} value={facility.id}>{facility.name}</option>
                      ))}
                    </select>
                    <input
                      type="text"
                      placeholder="Court Name"
                      value={newCourt.name}
                      onChange={(e) => setNewCourt({...newCourt, name: e.target.value})}
                      className="px-3 py-2 border rounded"
                    />
                    <select
                      value={newCourt.sportType}
                      onChange={(e) => setNewCourt({...newCourt, sportType: e.target.value})}
                      className="px-3 py-2 border rounded"
                    >
                      <option value="BADMINTON">Badminton</option>
                      <option value="TENNIS">Tennis</option>
                      <option value="FOOTBALL">Football</option>
                      <option value="BASKETBALL">Basketball</option>
                    </select>
                    <input
                      type="number"
                      placeholder="Price per Hour"
                      value={newCourt.pricePerHour}
                      onChange={(e) => setNewCourt({...newCourt, pricePerHour: e.target.value})}
                      className="px-3 py-2 border rounded"
                    />
                  </div>
                  <div className="flex space-x-2 mt-4">
                    <button onClick={addCourt} className="bg-green-500 text-white px-4 py-2 rounded">
                      Add Court
                    </button>
                    <button onClick={() => setShowCourtForm(false)} className="bg-gray-500 text-white px-4 py-2 rounded">
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              {showEditCourtForm && (
                <div className="mb-6 p-4 border rounded-lg bg-blue-50">
                  <h4 className="font-semibold mb-4">Edit Court</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Court Name"
                      value={newCourt.name}
                      onChange={(e) => setNewCourt({...newCourt, name: e.target.value})}
                      className="px-3 py-2 border rounded"
                    />
                    <select
                      value={newCourt.sportType}
                      onChange={(e) => setNewCourt({...newCourt, sportType: e.target.value})}
                      className="px-3 py-2 border rounded"
                    >
                      <option value="BADMINTON">Badminton</option>
                      <option value="TENNIS">Tennis</option>
                      <option value="FOOTBALL">Football</option>
                      <option value="BASKETBALL">Basketball</option>
                    </select>
                    <input
                      type="number"
                      placeholder="Price per Hour"
                      value={newCourt.pricePerHour}
                      onChange={(e) => setNewCourt({...newCourt, pricePerHour: e.target.value})}
                      className="px-3 py-2 border rounded"
                    />
                  </div>
                  <div className="flex space-x-2 mt-4">
                    <button onClick={updateCourt} className="bg-blue-500 text-white px-4 py-2 rounded">
                      Update Court
                    </button>
                    <button onClick={() => {
                      setShowEditCourtForm(false)
                      setEditingCourt(null)
                      setNewCourt({ name: '', sportType: 'BADMINTON', pricePerHour: '', operatingHours: { open: '06:00', close: '22:00' } })
                    }} className="bg-gray-500 text-white px-4 py-2 rounded">
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              <div className="space-y-4">
                {facilities.map((facility: any) => 
                  facility.courts?.map((court: any) => (
                    <div key={court.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-semibold">{court.name}</h4>
                          <p className="text-gray-600">{facility.name} - {court.sportType}</p>
                          <p className="text-green-600 font-bold">₹{court.pricePerHour}/hour</p>
                        </div>
                        <div className="space-x-2">
                          <button 
                            onClick={() => {
                              setEditingCourt(court)
                              setNewCourt({
                                name: court.name,
                                sportType: court.sportType,
                                pricePerHour: court.pricePerHour.toString(),
                                operatingHours: court.operatingHours || { open: '06:00', close: '22:00' }
                              })
                              setSelectedFacility(facility.id)
                              setShowEditCourtForm(true)
                            }}
                            className="bg-blue-500 text-white px-3 py-1 rounded text-sm"
                          >
                            Edit
                          </button>
                          <button 
                            onClick={() => deleteCourt(court.id)}
                            className="bg-red-500 text-white px-3 py-1 rounded text-sm"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'timeslots' && (
          <div className="bg-white rounded-lg shadow">
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-4">Time Slot Management</h3>
              <div className="text-center py-8">
                <div className="text-gray-500 mb-4">Time slot management coming soon</div>
                <div className="text-sm text-gray-400">Set availability and block slots for maintenance</div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'bookings' && (
          <div className="bg-white rounded-lg shadow">
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-4">Booking Overview</h3>
              <div className="space-y-4">
                {bookings.map((booking: any) => (
                  <div key={booking.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-semibold">{booking.user?.fullName}</h4>
                        <p className="text-gray-600">{booking.facility?.name} - {booking.court?.name}</p>
                        <p className="text-sm text-gray-500">
                          {new Date(booking.bookingDate).toLocaleDateString()} | {booking.startTime} - {booking.endTime}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">₹{booking.totalPrice}</p>
                        <span className={`px-2 py-1 rounded text-sm ${
                          booking.status === 'CONFIRMED' ? 'bg-green-100 text-green-800' :
                          booking.status === 'CANCELLED' ? 'bg-red-100 text-red-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {booking.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="bg-white rounded-lg shadow">
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-4">Owner Profile</h3>
              <div className="max-w-md">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Full Name</label>
                    <input type="text" className="w-full px-3 py-2 border rounded" defaultValue="Facility Owner" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <input type="email" className="w-full px-3 py-2 border rounded" defaultValue="owner@quickcourt.com" disabled />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Phone</label>
                    <input type="tel" className="w-full px-3 py-2 border rounded" placeholder="+91 9876543210" />
                  </div>
                  <button className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700">
                    Update Profile
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}