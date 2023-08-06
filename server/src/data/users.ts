type User = {
  username: string;
  id: string;
};

const users: User[] = [];

const getUsers = () => users;

const addUser = (user: User) => users.push(user);

const userExists = (username: string) =>
  users.some((user) => user.username === username);

export { getUsers, userExists, User, addUser };
