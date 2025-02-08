export async function useGetMedicData(id) {
  const res = await fetch(
    `http://localhost:8000/api/v1/health-data/getUser/${id}`
  );
  const data = await res.json();
  return data;
}
