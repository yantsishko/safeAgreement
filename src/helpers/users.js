import { dataToJson } from './responseParser';

export async function addUser (name) {
  const getAllUsers = await window.session.request('SELECT id FROM users').result();
  const ids = dataToJson(getAllUsers.asString());
  const lastId = +ids[ids.length - 1].id + 1;

  await window.session.request(`INSERT INTO users VALUES (${lastId}, '${name}')`).result();
}


export async function getUserById(id) {
  const getAllUsers = await window.session.request(`SELECT * FROM users WHERE id=${id}`).result();
  const data = dataToJson(getAllUsers.asString());

  return data;
}

