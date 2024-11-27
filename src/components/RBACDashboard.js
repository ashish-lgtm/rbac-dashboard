import React, { useState, useEffect } from 'react';
import { Users, Shield, Key, Menu, Search, PlusCircle} from 'lucide-react';
import MobileMenu from './MobileMenu';
import RoleModal from './RoleModal';
import UserModal from './UserModal';
import ApiService from '../services/ApiService';
import { initialUsers } from '../data/initialUsers';
import { initialRoles } from '../data/initialRoles';
import { availablePermissions } from '../data/availablePermissions';
import useResponsive from '../hooks/useResponsive';

const RBACDashboard = () => {
  const [activeTab, setActiveTab] = useState('users');
  const [users, setUsers] = useState(initialUsers);
  const [roles, setRoles] = useState(initialRoles);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedRole, setSelectedRole] = useState(null);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // New state for search and filter
  const [userSearchTerm, setUserSearchTerm] = useState('');
  const [roleSearchTerm, setRoleSearchTerm] = useState('');
  const [userStatusFilter, setUserStatusFilter] = useState('All');

  const isMobile = useResponsive();

  // Enhanced data fetching with error handling
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setLoading(true);
        const usersResponse = await ApiService.getUsers();
        const rolesResponse = await ApiService.getRoles();

        if (usersResponse.success && rolesResponse.success) {
          setUsers(usersResponse.data);
          setRoles(rolesResponse.data);
        } else {
          setError('Failed to load initial data');
        }
      } catch (err) {
        setError('Unexpected error occurred');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  // Add user method with API simulation
  const addUser = async (userData) => {
    try {
      const response = await ApiService.createUser(userData);
      if (response.success) {
        setUsers(prevUsers => [...prevUsers, response.data]);
        setIsUserModalOpen(false);
      } else {
        // Show error to user
        alert(response.error);
      }
    } catch (error) {
      console.error('User creation failed:', error);
      alert('Failed to create user');
    }
  };

  // Update user method
  const updateUser = async (userData) => {
    try {
      const response = await ApiService.updateUser(userData.id, userData);
      if (response.success) {
        setUsers(prevUsers => 
          prevUsers.map(user => 
            user.id === userData.id ? response.data : user
          )
        );
        setIsUserModalOpen(false);
      } else {
        alert(response.error);
      }
    } catch (error) {
      console.error('User update failed:', error);
      alert('Failed to update user');
    }
  };

  // Enhanced delete user method
  const deleteUser = async (userId) => {
    // Confirm before deletion
    const confirmDelete = window.confirm('Are you sure you want to delete this user?');
    if (!confirmDelete) return;

    try {
      const response = await ApiService.deleteUser(userId);
      if (response.success) {
        setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
      } else {
        alert(response.error);
      }
    } catch (error) {
      console.error('User deletion failed:', error);
      alert('Failed to delete user');
    }
  };

  // Enhanced add role method with API simulation
  const addRole = async (roleData) => {
    try {
      const response = await ApiService.createRole(roleData);
      if (response.success) {
        setRoles(prevRoles => [...prevRoles, response.data]);
        setIsRoleModalOpen(false);
      } else {
        // Show error to user
        alert(response.error);
      }
    } catch (error) {
      console.error('Role creation failed:', error);
      alert('Failed to create role');
    }
  };

  // Enhanced update role method
  const updateRole = async (roleData) => {
    try {
      const response = await ApiService.updateRole(roleData.id, roleData);
      if (response.success) {
        setRoles(prevRoles => 
          prevRoles.map(role => 
            role.id === roleData.id ? response.data : role
          )
        );
        setIsRoleModalOpen(false);
      } else {
        alert(response.error);
      }
    } catch (error) {
      console.error('Role update failed:', error);
      alert('Failed to update role');
    }
  };

  // Enhanced delete role method
  const deleteRole = async (roleId) => {
    // Confirm before deletion
    const confirmDelete = window.confirm('Are you sure you want to delete this role?');
    if (!confirmDelete) return;

    try {
      const response = await ApiService.deleteRole(roleId);
      if (response.success) {
        setRoles(prevRoles => prevRoles.filter(role => role.id !== roleId));
      } else {
        alert(response.error);
      }
    } catch (error) {
      console.error('Role deletion failed:', error);
      alert('Failed to delete role');
    }
  };

  // Error Boundary Rendering
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
        {error}
      </div>
    );
  }

  // New filtering and search functions
  const filteredUsers = users.filter(user => 
    (userSearchTerm === '' || 
      user.name.toLowerCase().includes(userSearchTerm.toLowerCase()) || 
      user.email.toLowerCase().includes(userSearchTerm.toLowerCase())) &&
    (userStatusFilter === 'All' || user.status === userStatusFilter)
  );

  const filteredRoles = roles.filter(role => 
    roleSearchTerm === '' || 
    role.name.toLowerCase().includes(roleSearchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-center items-center">
            <h1 className="text-2xl font-bold text-gray-900 text-center">RBAC Dashboard</h1>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden absolute right-4"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation */}
      <MobileMenu />

      {/* Navigation */}
      <nav className={`bg-white shadow-sm ${isMobile ? 'hidden' : 'block'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center -mb-px space-x-8">
            <button
              onClick={() => setActiveTab('users')}
              className={`flex items-center px-4 py-2 border-b-2 text-sm font-medium ${
                activeTab === 'users'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Users className="h-5 w-5 mr-2" />
              Users
            </button>
            <button
              onClick={() => setActiveTab('roles')}
              className={`flex items-center px-4 py-2 border-b-2 text-sm font-medium ${
                activeTab === 'roles'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Shield className="h-5 w-5 mr-2" />
              Roles
            </button>
            <button
              onClick={() => setActiveTab('permissions')}
              className={`flex items-center px-4 py-2 border-b-2 text-sm font-medium ${
                activeTab === 'permissions'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Key className="h-5 w-5 mr-2" />
              Permissions
            </button>
          </div>
        </div>
      </nav>
      
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8 py-4 md:py-8">
        {/* Users Tab */}
        {activeTab === 'users' && (
          <div>
            <div className="flex flex-col md:flex-row justify-between items-center mb-4 md:mb-6 space-y-2 md:space-y-0">
              <h2 className="text-2xl font-semibold text-center">Users Management</h2>
              <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4 w-full md:w-auto">
                {/* Search Input */}
                <div className="relative flex-grow">
                  <input
                    type="text"
                    placeholder="Search users..."
                    className="w-full p-2 pl-8 border rounded"
                    value={userSearchTerm}
                    onChange={(e) => setUserSearchTerm(e.target.value)}
                  />
                  <Search className="absolute left-2 top-3 h-4 w-4 text-gray-400" />
                </div>
                
                {/* Status Filter */}
                <select 
                  className="p-2 border rounded"
                  value={userStatusFilter}
                  onChange={(e) => setUserStatusFilter(e.target.value)}
                >
                  <option value="All">All Status</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>

                {/* Add User Button */}
                <button
                  onClick={() => setIsUserModalOpen(true)}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center"
                >
                  <PlusCircle className="mr-2 h-5 w-5" /> Add User
                </button>
              </div>
            </div>
            
            <div className="bg-white shadow rounded-lg overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Role
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredUsers.map((user) => (
                    <tr key={user.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text -sm font-medium text-gray-900">{user.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{user.email}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{user.role}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          user.status === 'Active'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {user.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => {
                            setSelectedUser(user);
                            setIsUserModalOpen(true);
                            //updateUser(user);
                          }}
                          className="text-blue-600 hover:text-blue-900 mr-4"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deleteUser(user.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Roles Tab */}
        {activeTab === 'roles' && (
          <div>
            <div className="flex flex-col md:flex-row justify-between items-center mb-4 md:mb-6 space-y-2 md:space-y-0">
              <h2 className="text-2xl font-semibold text-center">Roles Management</h2>
              <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4 w-full md:w-auto">
                {/* Search Input for Roles */}
                <div className="relative flex-grow">
                  <input
                    type="text"
                    placeholder="Search roles..."
                    className="w-full p-2 pl-8 border rounded"
                    value={roleSearchTerm}
                    onChange={(e) => setRoleSearchTerm(e.target.value)}
                  />
                  <Search className="absolute left-2 top-3 h-4 w-4 text-gray-400" />
                </div>

                {/* Add Role Button */}
                <button
                  onClick={() => setIsRoleModalOpen(true)}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center"
                >
                  <PlusCircle className="mr-2 h-5 w-5" /> Add Role
                </button>
              </div>
            </div>
            <div className="bg-white shadow rounded-lg overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Role Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Permissions
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Users Count
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredRoles.map((role) => (
                    <tr key={role.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{role.name}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-1">
                          {role.permissions.map((permission) => (
                            <span
                              key={permission}
                              className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full"
                            >
                              {permission.replace(/_/g, ' ')}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {users.filter(user => user.role === role.name).length}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => {
                            setSelectedRole(role);
                            setIsRoleModalOpen(true);
                          }}
                          className="text-blue-600 hover:text-blue-900 mr-4"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deleteRole(role.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Permissions Tab */}
        {activeTab === 'permissions' && (
          <div>
            <div className="flex justify-center mb-6">
              <h2 className="text-2xl font-semibold text-center">Permissions Overview</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {roles.map((role) => (
                <div key={role.id} className="bg-white shadow rounded-lg p-4 md:p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">{role.name}</h3>
                  <div className="space-y-4">
                    {availablePermissions.map((permission) => (
                      <div key={permission} className="flex items-center justify-between">
                        <span className="text-sm text-gray-700">
                          {permission.replace(/_/g, ' ').charAt(0).toUpperCase() + 
                           permission.slice(1).replace(/_/g, ' ')}
                        </span>
                        <div className="relative inline-block w-10 mr-2 align-middle select-none">
                          <input
                            type="checkbox"
                            checked={role.permissions.includes(permission)}
                            onChange={(e) => {
                              const updatedRole = {...role};
                              if (e.target.checked) {
                                updatedRole.permissions = [...role.permissions, permission];
                              } else {
                                updatedRole.permissions = role.permissions.filter(p => p !== permission);
                              }
                              setRoles(roles.map(r => r.id === role.id ? updatedRole : r));
                            }}
                            className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                          />
                          <label className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></label>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Modals */}
        <UserModal
          isOpen={isUserModalOpen}
          onClose={() => {
            setIsUserModalOpen(false);
            setSelectedUser(null);
          }}
          onSubmit={(userData) => {
            if (selectedUser) {
              updateUser({...userData, id: selectedUser.id});
            } else {
              addUser(userData);
            }
            setIsUserModalOpen(false);
            setSelectedUser(null);
          }}
          user={selectedUser}
          roles={roles}
        />

        <RoleModal
          isOpen={isRoleModalOpen}
          onClose={() => {
            setIsRoleModalOpen(false);
            setSelectedRole(null);
          }}
          onSubmit={(roleData) => {
            if (selectedRole) {
              updateRole({...roleData, id: selectedRole.id});
            } else {
              addRole(roleData);
            }
            setIsRoleModalOpen(false);
            setSelectedRole(null);
          }}
          role={selectedRole}
        />
      </main>
    </div>
  );
};

export default RBACDashboard;