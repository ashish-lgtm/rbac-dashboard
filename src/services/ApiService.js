import { initialUsers } from '../data/initialUsers';
import { initialRoles } from '../data/initialRoles';

// Simulated API Service
const ApiService = {
    // User API Endpoints
    getUsers: async () => {
      try {
        // Simulating network delay
        await new Promise(resolve => setTimeout(resolve, 500));
        return {
          success: true,
          data: initialUsers,
          error: null
        };
      } catch (error) {
        return {
          success: false,
          data: null,
          error: 'Failed to fetch users'
        };
      }
    },
  
    createUser: async (userData) => {
      try {
        // Input validation
        if (!userData.name || !userData.email) {
          throw new Error('Name and email are required');
        }
    
        // Email format validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(userData.email)) {
          throw new Error('Invalid email format');
        }
    
        // Check for duplicate user
        const isDuplicate = initialUsers.some(user => 
          user.name === userData.name && user.email === userData.email
        );
        if (isDuplicate) {
          throw new Error('A user with this name and email already exists');
        }
    
        await new Promise(resolve => setTimeout(resolve, 500));
        return {
          success: true,
          data: { ...userData, id: Date.now() },
          error: null
        };
      } catch (error) {
        return {
          success: false,
          data: null,
          error: error.message
        };
      }
    },
    
    updateUser: async (userId, userData) => {
      try {
        // Input validation
        if (!userData.name || !userData.email) {
          throw new Error('Name and email are required');
        }
    
        // Check for duplicate user (excluding current user)
        const isDuplicate = initialUsers.some(user => 
          user.name === userData.name && 
          user.email === userData.email && 
          user.id !== userId
        );
        if (isDuplicate) {
          throw new Error('A user with this name and email already exists');
        }
    
        await new Promise(resolve => setTimeout(resolve, 500));
        return {
          success: true,
          data: { ...userData, id: userId },
          error: null
        };
      } catch (error) {
        return {
          success: false,
          data: null,
          error: error.message
        };
      }
    },
  
    deleteUser: async (userId) => {
      try {
        // Prevent deletion of users with certain conditions
        if (!userId) {
          throw new Error('Invalid user ID');
        }
  
        await new Promise(resolve => setTimeout(resolve, 500));
        return {
          success: true,
          data: { deletedId: userId },
          error: null
        };
      } catch (error) {
        return {
          success: false,
          data: null,
          error: error.message
        };
      }
    },
  
    // Similar methods for roles...
    getRoles: async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 500));
        return {
          success: true,
          data: initialRoles,
          error: null
        };
      } catch (error) {
        return {
          success: false,
          data: null,
          error: 'Failed to fetch roles'
        };
      }
    },
  
    createRole: async (roleData) => {
      try {
        // Role name validation
        if (!roleData.name) {
          throw new Error('Role name is required');
        }

        // Role permissions validation
        if (!roleData.permissions || roleData.permissions.length === 0) {
          throw new Error('Role permissions are required');
        }
  
        // Prevent duplicate role names
        const isDuplicate = initialRoles.some(role => role.name === roleData.name);
        if (isDuplicate) {
          throw new Error('Role name must be unique');
        }
  
        await new Promise(resolve => setTimeout(resolve, 500));
        return {
          success: true,
          data: { ...roleData, id: Date.now() },
          error: null
        };
      } catch (error) {
        return {
          success: false,
          data: null,
          error: error.message
        };
      }
    },

    updateRole: async (roleId, roleData) => {
      try {
        // Role name validation
        if (!roleData.name) {
          throw new Error('Role name is required');
        }
    
        // Role permissions validation
        if (!roleData.permissions || roleData.permissions.length === 0) {
          throw new Error('Role permissions are required');
        }
    
        // Prevent duplicate role names (excluding the current role)
        const isDuplicate = initialRoles.some(role => 
          role.name === roleData.name && role.id !== roleId
        );
    
        if (isDuplicate) {
          throw new Error('Role name must be unique');
        }
    
        await new Promise(resolve => setTimeout(resolve, 500));
        return {
          success: true,
          data: { ...roleData, id: roleId },
          error: null
        };
      } catch (error) {
        return {
          success: false,
          data: null,
          error: error.message
        };
      }
    },
    
    deleteRole: async (roleId) => {
      try {
        // Prevent deletion of roles with certain conditions
        if (!roleId) {
          throw new Error('Invalid role ID');
        }
    
        await new Promise(resolve => setTimeout(resolve, 500));
        return {
          success: true,
          data: { deletedId: roleId },
          error: null
        };
      } catch (error) {
        return {
          success: false,
          data: null,
          error: error.message
        };
      }
    },    
};

export default ApiService