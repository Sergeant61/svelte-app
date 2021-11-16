Migrations.add({
  version: 3,
  name: 'İzinler tanimlaniyor: permissions.message',
  up: function () {
    Roles.createRole('permissions.message');
    Roles.createRole('permissions.message.read');
    Roles.createRole('permissions.message.create');
    Roles.createRole('permissions.message.update');
    Roles.createRole('permissions.message.delete');

    Roles.addRolesToParent([
      'permissions.message.read',
      'permissions.message.create',
      'permissions.message.update',
      'permissions.message.delete',
    ], 'permissions.message');

    Roles.addRolesToParent([
      'permissions.message',
    ], 'roles.user');

    Roles.addRolesToParent([
      'permissions.message',
    ], 'roles.admin');
  }
});