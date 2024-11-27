import React, { useState,useEffect } from 'react';
import { availablePermissions } from '../data/availablePermissions';

const RoleModal = ({ isOpen, onClose, onSubmit, role }) => {
    const [formData, setFormData] = useState(role || {
      name: '',
      permissions: []
    });

     // Reset form when user changes
    useEffect(() => {
      setFormData(role || {
        name: '',
        permissions: []
      });
    }, [role]);

    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4 md:mx-auto">
          <h2 className="text-xl font-bold mb-4">
            {role ? 'Edit Role' : 'Add New Role'}
          </h2>
          <form onSubmit={(e) => {
            e.preventDefault();
            onSubmit(formData);
          }}>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Role Name</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Permissions</label>
                <div className="space-y-2">
                  {availablePermissions.map(permission => (
                    <label key={permission} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.permissions.includes(permission)}
                        onChange={(e) => {
                          const newPermissions = e.target.checked
                            ? [...formData.permissions, permission]
                            : formData.permissions.filter(p => p !== permission);
                          setFormData({...formData, permissions: newPermissions});
                        }}
                        className="mr-2"
                      />
                      {permission.replace(/_/g, ' ').charAt(0).toUpperCase() + permission.slice(1).replace(/_/g, ' ')}
                    </label>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                {role ? 'Update' : 'Add'} Role
              </button>
            </div>
          </form>
        </div>
      </div>
    );
};

export default RoleModal