Meteor.callWithPromise = (method, ...myParameters) => new Promise((resolve, reject) => {
  Meteor.call(method, ...myParameters, (err, res) => {
      if (err) reject(err);
      resolve(res);
  });
});