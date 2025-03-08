import adverts from "../adverts";

const initialState = {
  data: [],
  loaded: false,
};

const advert = {
  id: "mockId",
  createdAt: "mockDate",
  name: "mockName",
  sale: true,
  price: 111,
  tags: ["mockTag"],
  photo: "http://mockPhoto.jpg",
};

describe("adverts reducer", () => {
  test("should return initial state when an unknow action is dispatched", () => {
    expect(adverts(initialState, { type: "ADVERT_DELETED_PENDING" })).toEqual(
      initialState
    );
  });

  test("should return an empty array and loaded true when ADVERTS_LOADED_FULFILLED action is dispatched", () => {
    const result = adverts(initialState, {
      type: "ADVERTS_LOADED_FULFILLED",
      payload: { data: [], loaded: true },
    });

    expect(result.data).toEqual([]);
    expect(result.loaded).toEqual(true);
  });

  test("should return an array with one advert and loaded true when ADVERTS_LOADED_FULFILLED action is dispatched", () => {
    const result = adverts(initialState, {
      type: "ADVERTS_LOADED_FULFILLED",
      payload: { data: [advert], loaded: true },
    });

    expect(result.data).toEqual([advert]);
    expect(result.loaded).toEqual(true);
  });

  test("should return an array without the deleted advert when ADVERT_DELETED_FULFILLED action is dispatched", () => {
    const result = adverts(
      { data: [advert], loaded: true },
      { type: "ADVERT_DELETED_FULFILLED", payload: advert }
    );

    expect(result.data).toEqual([]);
    expect(result.loaded).toEqual(true);
  });

  test("should update the state with the new advert when ADVERT_CREATED_FULFILLED action is dispatched", () => {
    const result = adverts(initialState, {
      type: "ADVERT_CREATED_FULFILLED",
      payload: advert,
    });

    expect(result.data).toEqual([advert]);
    expect(result.loaded).toEqual(false);
  });

  test("should return an empty array and loaded false when AUTH_LOGOUT action is dispatched", () => {
    const result = adverts(
      { data: [advert], loaded: true },
      { type: "AUTH_LOGOUT" }
    );
    expect(result.data).toEqual([]);
    expect(result.loaded).toEqual(false);
  });
});
