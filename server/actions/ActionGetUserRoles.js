ActionGetUserRoles = function (userId) {
  return {
    roles: Meteor.roleAssignment.find({ 'role._id': { $regex: /^roles\./ }, scope: null, 'user._id': userId }).fetch().map(function (role) { return role.role._id }),
    permissions: Meteor.roleAssignment.find({ 'role._id': { $regex: /^permissions\./ }, scope: null, 'user._id': userId }).fetch().map(function (permission) { return permission.role._id })
  }
}