ActionGetUser = function (id) {
  const user = Meteor.users.findOne({ _id: id });
  delete user.services;
  return user;
}