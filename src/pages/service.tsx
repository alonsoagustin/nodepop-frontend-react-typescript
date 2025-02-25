import { Advert, ErrorAdvert } from "./types";

export const getAllAdverts = async (): Promise<Advert[]> => {
  const response = await fetch("http://localhost:3001/api/v1/adverts", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  });

  if (!response.ok) throw new Error(response.statusText);

  const data: Advert[] = await response.json();

  return data;
};

export const getAdvertById = async (id: string): Promise<Advert> => {
  const response = await fetch(`http://localhost:3001/api/v1/adverts/${id}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
  });

  if (!response.ok) throw new Error(response.statusText);

  const data: Advert = await response.json();
  return data;
};

export const createAdvert = async (
  advert: FormData
): Promise<Advert | ErrorAdvert> => {
  const response = await fetch("http://localhost:3001/api/v1/adverts", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
    body: advert,
  });

  if (!response.ok) {
    const errorData: ErrorAdvert = await response.json();
    throw errorData;
  }

  const data: Advert = await response.json();
  return data;
};

export const deleteAdvertById = async (
  advertId: string
): Promise<Advert | ErrorAdvert> => {
  const response = await fetch(
    `http://localhost:3001/api/v1/adverts/${advertId}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }
  );

  if (!response.ok) {
    const errorData: ErrorAdvert = await response.json();
    throw errorData;
  }

  const data: Advert = await response.json();
  return data;
};
