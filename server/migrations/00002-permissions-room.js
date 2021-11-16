Migrations.add({
  version: 2,
  name: 'İzinler tanimlaniyor: permissions.room',
  up: function () {
    Roles.createRole('permissions.room');
    Roles.createRole('permissions.room.read');
    Roles.createRole('permissions.room.create');
    Roles.createRole('permissions.room.update');
    Roles.createRole('permissions.room.delete');

    Roles.addRolesToParent([
      'permissions.room.read',
      'permissions.room.create',
      'permissions.room.update',
      'permissions.room.delete',
    ], 'permissions.room');

    Roles.addRolesToParent([
      'permissions.room.read',
    ], 'roles.user');

    Roles.addRolesToParent([
      'permissions.room',
    ], 'roles.admin');
  }
});