import axios from "axios";

const url = "https://dummyjson.com/users";

export async function getUser(id) {
  const res = await fetch(`${url}/${id}`);
  const data = await res.json();
  console.log(data);
  return data;
}

// export async function createUser({ newUser }) {
//   const res = await fetch(`${url}/new`, {
//     method: "POST",
//     body: JSON.stringify(newUser),
//   });
//   const data = await res.json();

//   return data;
// }

export async function createUser(newUser) {
  const { fullName, email, pwd: password } = newUser;
  console.log("sldnfosdnfosdnfsndf", fullName);
  const response = await axios.post(
    "/api/v1/user/register",
    JSON.stringify({ fullName, email, password }),
    {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    }
  );
  if (response.statusCode === 401) throw new Error("Error, ", response.message);
  return response?.data;
}

export async function getUserHealthData(id) {
  const res = await fetch(
    `http://localhost:8000/api/v1/health-data/getUser/${id}`
  );
  const data = await res.json();
  return data;
}

export async function updateUser({ id, updatedData }) {
  const response = await axios.patch(
    `http://localhost:8000/api/v1/health-data/update-data/${id}`,
    JSON.stringify(updatedData),
    {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    }
  );
  console.log(response.data);

  if (response.statusCode === 401) throw new Error("Error, ", response.message);
  return response?.data;
}

export async function authenticateUser(user) {
  console.log("spdnf");
  const { email, password } = user;
  const response = await axios.post(
    "/api/v1/user/login",
    JSON.stringify({ email, password }),
    {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    }
  );
  console.log(response);

  return response.data;
}

export async function signInWithGoogle(supabase) {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      scopes: "https://www.googleapis.com/auth/calendar",
    },
  });
  if (error) {
    console.log(error);
    alert("Error logging in with google");
  }
  return;
}
