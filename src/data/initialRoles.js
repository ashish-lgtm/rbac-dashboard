export const initialRoles = [
    { 
      id: 1, 
      name: 'Admin', 
      permissions: ['create_user', 'edit_user', 'delete_user', 'manage_roles']
    },
    { 
      id: 2, 
      name: 'Editor', 
      permissions: ['edit_user', 'view_users']
    },
    { 
      id: 3, 
      name: 'Viewer', 
      permissions: ['view_users']
    },
  ];