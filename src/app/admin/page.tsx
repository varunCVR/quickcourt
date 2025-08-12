'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminDashboard() {
  const [stats, setStats] = useState({ users: 0, facilityOwners: 0, facilities: 0, bookings: 0, activeCourts: 0 })
  const [facilities, setFacilities] = useState([])
  const [users, setUsers] = useState([])
  const [reports, setReports] = useState([])
  const [chartData, setChartData] = useState({ bookings: [], registrations: [], sports: [] })
  const [activeTab, setActiveTab] = useState('overview')
  const [searchTerm, setSearchTerm] = useState('')
  const [filterRole, setFilterRole] = useState('')
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('token')
    const user = JSON.parse(localStorage.getItem('user') || '{}')
    
    if (!token || user.role !== 'ADMIN') {
      router.push('/')
      return
    }
    
    fetchData()
  }, [])

  const fetchData = async () => {
    const token = localStorage.getItem('token')
    try {
      const [statsRes, facilitiesRes, usersRes, reportsRes, chartsRes] = await Promise.all([
        fetch('/api/admin/stats', { headers: { 'Authorization': `Bearer ${token}` } }),
        fetch('/api/admin/facilities', { headers: { 'Authorization': `Bearer ${token}` } }),
        fetch('/api/admin/users', { headers: { 'Authorization': `Bearer ${token}` } }),
        fetch('/api/admin/reports', { headers: { 'Authorization': `Bearer ${token}` } }),
        fetch('/api/admin/charts', { headers: { 'Authorization': `Bearer ${token}` } })
      ])
      
      if (statsRes.ok) setStats(await statsRes.json())
      if (facilitiesRes.ok) setFacilities((await facilitiesRes.json()).facilities)
      if (usersRes.ok) setUsers((await usersRes.json()).users)
      if (reportsRes.ok) setReports((await reportsRes.json()).reports || [])
      if (chartsRes.ok) setChartData(await chartsRes.json())
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  const approveFacility = async (id: string, action: 'approve' | 'reject', comment?: string) => {
    const token = localStorage.getItem('token')
    try {
      const res = await fetch(`/api/admin/facilities/${id}/${action}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ comment })
      })
      if (res.ok) fetchData()
    } catch (error) {
      console.error('Error updating facility:', error)
    }
  }

  const banUser = async (id: string, ban: boolean) => {
    const token = localStorage.getItem('token')
    try {
      const res = await fetch(`/api/admin/users/${id}/ban`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ ban })
      })
      if (res.ok) fetchData()
    } catch (error) {
      console.error('Error updating user:', error)
    }
  }

  const filteredUsers = users.filter((user: any) => 
    user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (filterRole === '' || user.role === filterRole)
  )

  const updateReportStatus = async (reportId: string, status: 'RESOLVED' | 'DISMISSED') => {
    const token = localStorage.getItem('token')
    try {
      const res = await fetch(`/api/admin/reports/${reportId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status })
      })
      if (res.ok) fetchData()
    } catch (error) {
      console.error('Error updating report:', error)
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
          <div className="text-2xl font-bold text-purple-600">QUICKCOURT ADMIN</div>
          <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded">
            Logout
          </button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex space-x-1 mb-6 bg-gray-100 p-1 rounded-xl">
          {['overview', 'facilities', 'users', 'reports', 'profile'].map((tab) => (
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

        {activeTab === 'overview' && (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-2">Total Users</h3>
                <p className="text-3xl font-bold text-blue-600">{stats.users}</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-2">Facility Owners</h3>
                <p className="text-3xl font-bold text-orange-600">{stats.facilityOwners}</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-2">Total Facilities</h3>
                <p className="text-3xl font-bold text-green-600">{stats.facilities}</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-2">Total Bookings</h3>
                <p className="text-3xl font-bold text-purple-600">{stats.bookings}</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-2">Active Courts</h3>
                <p className="text-3xl font-bold text-red-600">{stats.activeCourts}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-4">Booking Activity (Last 7 Days)</h3>
                <div className="h-64 flex items-end justify-center space-x-2">
                  {chartData.bookings && chartData.bookings.length > 0 ? (
                    chartData.bookings.map((day: any, index) => (
                      <div key={index} className="flex-1 flex flex-col items-center">
                        <div className="bg-purple-500 rounded-t w-full" style={{height: `${Math.max((day.count / 20) * 200, 20)}px`}}></div>
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
                <h3 className="text-lg font-semibold mb-4">Most Active Sports</h3>
                <div className="space-y-3">
                  {chartData.sports && chartData.sports.length > 0 ? (
                    chartData.sports.map((sport: any, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <span className="font-medium">{sport.name}</span>
                        <div className="flex items-center">
                          <div className="w-32 bg-gray-200 rounded-full h-3 mr-3">
                            <div className="bg-blue-600 h-3 rounded-full" style={{width: `${Math.min((sport.count / 50) * 100, 100)}%`}}></div>
                          </div>
                          <span className="text-sm font-semibold w-8">{sport.count}</span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-gray-500">No sports data available</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'facilities' && (
          <div className="bg-white rounded-lg shadow">
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-4">Facility Management</h3>
              <div className="space-y-4">
                {facilities.map((facility: any) => (
                  <div key={facility.id} className="border rounded-lg p-4 flex justify-between items-center">
                    <div>
                      <h4 className="font-semibold">{facility.name}</h4>
                      <p className="text-gray-600">{facility.location}</p>
                      <span className={`px-2 py-1 rounded text-sm ${
                        facility.status === 'APPROVED' ? 'bg-green-100 text-green-800' :
                        facility.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {facility.status}
                      </span>
                    </div>
                    {facility.status === 'PENDING' && (
                      <div className="space-x-2">
                        <button
                          onClick={() => approveFacility(facility.id, 'approve')}
                          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => approveFacility(facility.id, 'reject')}
                          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                        >
                          Reject
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="bg-white rounded-lg shadow">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">User Management</h3>
                <div className="flex space-x-4">
                  <input
                    type="text"
                    placeholder="Search users..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="px-3 py-2 border rounded"
                  />
                  <select
                    value={filterRole}
                    onChange={(e) => setFilterRole(e.target.value)}
                    className="px-3 py-2 border rounded"
                  >
                    <option value="">All Roles</option>
                    <option value="USER">User</option>
                    <option value="FACILITY_OWNER">Facility Owner</option>
                    <option value="ADMIN">Admin</option>
                  </select>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2">Name</th>
                      <th className="text-left py-2">Email</th>
                      <th className="text-left py-2">Role</th>
                      <th className="text-left py-2">Status</th>
                      <th className="text-left py-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map((user: any) => (
                      <tr key={user.id} className="border-b">
                        <td className="py-2">{user.fullName}</td>
                        <td className="py-2">{user.email}</td>
                        <td className="py-2">{user.role}</td>
                        <td className="py-2">
                          <span className={`px-2 py-1 rounded text-sm ${
                            user.isBanned ? 'bg-red-100 text-red-800' :
                            user.isVerified ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {user.isBanned ? 'Banned' : user.isVerified ? 'Verified' : 'Unverified'}
                          </span>
                        </td>
                        <td className="py-2">
                          <button
                            onClick={() => banUser(user.id, !user.isBanned)}
                            className={`px-3 py-1 rounded text-sm ${
                              user.isBanned ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                            }`}
                          >
                            {user.isBanned ? 'Unban' : 'Ban'}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'reports' && (
          <div className="bg-white rounded-lg shadow">
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-4">Reports & Moderation</h3>
              <div className="space-y-4">
                {reports && reports.length > 0 ? (
                  reports.map((report: any) => (
                    <div key={report.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-semibold">{report.reason}</h4>
                          <p className="text-gray-600">{report.description}</p>
                          <p className="text-sm text-gray-500">Reported by: {report.reporter?.fullName}</p>
                          <p className="text-xs text-gray-400">{new Date(report.createdAt).toLocaleDateString()}</p>
                        </div>
                        <div className="flex flex-col items-end space-y-2">
                          <span className={`px-2 py-1 rounded text-sm ${
                            report.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                            report.status === 'RESOLVED' ? 'bg-green-100 text-green-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {report.status}
                          </span>
                          {report.status === 'PENDING' && (
                            <div className="space-x-2">
                              <button 
                                onClick={() => updateReportStatus(report.id, 'RESOLVED')}
                                className="bg-green-500 text-white px-3 py-1 rounded text-sm"
                              >
                                Resolve
                              </button>
                              <button 
                                onClick={() => updateReportStatus(report.id, 'DISMISSED')}
                                className="bg-red-500 text-white px-3 py-1 rounded text-sm"
                              >
                                Dismiss
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <div className="text-gray-500 mb-4">No reports found</div>
                    <div className="text-sm text-gray-400">Reports submitted by users will appear here</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="bg-white rounded-lg shadow">
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-4">Admin Profile</h3>
              <div className="max-w-md">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Full Name</label>
                    <input type="text" className="w-full px-3 py-2 border rounded" defaultValue="Admin User" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <input type="email" className="w-full px-3 py-2 border rounded" defaultValue="admin@quickcourt.com" disabled />
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