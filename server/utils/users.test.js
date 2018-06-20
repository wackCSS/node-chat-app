const expect = require('expect');
const {Users} = require('./users');

describe('users', () => {
  let users = null;

  beforeEach(() => {
    users = new Users();
    users.users = [
      {
        id: '1',
        name: 'user 1 name',
        room: 'default'
      },
      {
        id: '2',
        name: 'user 2 name',
        room: 'new room'
      },
      {
        id: '3',
        name: 'user 3 name',
        room: 'default'
      }
    ];
  });

  it('should add new user', () => {
    const user = {
      id: '123',
      name: 'Luke',
      room: 'default'
    };
    const users = new Users();
    users.addUser(user.id, user.name, user.room);

    expect(users.users).toEqual([user]);
  });


  it('should remove a user', () => {
    const expectedArray = [
      {
        id: '1',
        name: 'user 1 name',
        room: 'default'
      },
      {
        id: '3',
        name: 'user 3 name',
        room: 'default'
      }
    ];

    const user = {
      id: '2',
      name: 'user 2 name',
      room: 'new room'
    };

    const userToRemove = users.removeUser(users.users[1].id);

    expect(userToRemove[0]).toEqual(user);
    expect(users.users.length).toBe(2);
    expect(users.users).toEqual(expectedArray);
  });

  it('should not remove a user', () => {
    const userToRemove = users.removeUser('4');
    expect(userToRemove).toEqual([]);
    expect(users.users.length).toBe(3);
  });

  it('should find a user', () => {
    const user = {
      id: '2',
      name: 'user 2 name',
      room: 'new room'
    };

    const userToGet = users.getUser('2');

    expect(userToGet[0]).toEqual(user);
  });

  it('should not find a user', () => {
    const userToGet = users.getUser('4');

    expect(userToGet[0]).toNotExist();
  });

  it('should return list of users in default room', () => {
    const defaultRoomUsers = users.getUserList('default');

    expect(defaultRoomUsers.length).toBe(2);
    expect(defaultRoomUsers).toEqual(['user 1 name', 'user 3 name']);
  });

  it('should return list of users in new room', () => {
    const defaultRoomUsers = users.getUserList('new room');

    expect(defaultRoomUsers.length).toBe(1);
    expect(defaultRoomUsers).toEqual(['user 2 name']);
  });
});
