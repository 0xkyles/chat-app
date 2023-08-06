type User = {
  username: string;
  id: string;
};

let users: User[] = [];

const getUsers = () => users;

const addUser = (user: User) => users.push(user);

const getUser = (id: string) => users.find((user) => user.id === id);

const removeUser = (id: string) =>
  (users = users.filter((user) => user.id !== id));

const userExists = (username: string) =>
  users.some((user) => user.username === username);

export { getUsers, userExists, User, addUser, removeUser, getUser };
