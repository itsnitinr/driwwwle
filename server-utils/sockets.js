const users = [];

const addUser = (userId, socketId) => {
  const user = users.find((user) => user.userId === userId);

  if (user && user.socketId === socketId) {
    return users;
  } else {
    if (user && user.socketId !== socketId) {
      removeUser(user.socketId);
    }
    const newUser = { userId, socketId };
    users.push(newUser);
    return users;
  }
};

const removeUser = (socketId) => {
  const index = users.map((user) => user.socketId).indexOf(socketId);
  users.splice(index, 1);
  return users;
};

const findConnectedUser = (userId) => {
  return users.find((user) => user.userId === userId);
};

module.exports = { addUser, removeUser, findConnectedUser };
