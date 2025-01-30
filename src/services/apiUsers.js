const url = "https://dummyjson.com/users";

export async function getUser(id) {
  const res = await fetch(`${url}/${id}`);
  const data = await res.json();
  console.log(data);
  return data;
}

export async function createUser({ newUser }) {
  const res = await fetch(`${url}/new`, {
    method: "POST",
    body: JSON.stringify(newUser),
  });
  const data = await res.json();

  return data;
}
