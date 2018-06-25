class Users {
  constructor() {
    this.users = [];
  }

  addUser(id, name, room) {
    const user = {
      id,
      name,
      room
    };

    this.users.push(user);
    return user;

  }

  removeUser(id) {
    const targetUser = this.users.filter((user) =>  {
      return user.id === id;
    });

    this.users = this.users.filter((user) =>  {
      return user.id !== id;
    });

    return targetUser[0];
  }

  getUser(id) {
    return this.users.filter((user) => user.id === id)[0];
  }

  getUserList(room) {
    const users = this.users.filter((user) =>  user.room === room);
    const nameArray = users.map(user => user.name);
    return nameArray;
  }
}

module.exports = {Users};