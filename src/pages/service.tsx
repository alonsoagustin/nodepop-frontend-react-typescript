export const getAllAdverts = async () => {
  const response = await fetch("http://localhost:3001/api/v1/adverts", {
    headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
  });
  const data = await response.json();
  return data;
};

export const getAdvertById = async (id: string) => {
  const response = await fetch(`http://localhost:3001/api/v1/adverts/${id}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
  });
  const data = await response.json();
  return data;
};

export const createAdvert = async (advert: FormData) => {
  const response = await fetch("http://localhost:3001/api/v1/adverts", {
    method: "POST",
    headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
    body: advert,
  });
  const data = await response.json();
  return data;
};
