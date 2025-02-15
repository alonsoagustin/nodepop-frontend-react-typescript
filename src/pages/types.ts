export interface Advert {
  id: string;
  name: string;
  sale: boolean;
  price: number;
  tags: string[];
  photo: string;
}

export interface ErrorAdvert {
  statusCode: number;
  message: string;
  error: string;
}
