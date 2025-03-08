import {
  getAdvert,
  getAdverts,
  getFilters,
  getIsLogged,
  getTags,
  getUi,
} from "../selectors";

const mockState = {
  auth: true,
  adverts: {
    data: [
      {
        id: "123",
        createdAt: "mockDate",
        name: "mockNameItemOne",
        sale: true,
        price: 111,
        tags: ["mockTag1"],
        photo: "http://mockPhotoItemOne.jpg",
      },
      {
        id: "456",
        createdAt: "mockDate",
        name: "mockNameItemTwo",
        sale: true,
        price: 222,
        tags: ["mockTag1"],
        photo: "http://mockPhotoItemTwo.jpg",
      },
    ],
    loaded: true,
  },
  tags: { data: ["mockTag1", "mockTag2", "mockTag3"], loaded: true },
  filters: { name: "", tags: [], tag: [] },
  ui: { error: null, loading: false },
};

describe("getIsLogged", () => {
  test("should return the auth state", () => {
    const result = getIsLogged(mockState);
    expect(result).toBe(true);
  });
});

describe("getAdverts", () => {
  test("should return the adverts state", () => {
    const result = getAdverts(mockState);
    expect(result).toEqual(mockState.adverts);
  });
});

describe("getAdvert", () => {
  test("should return the advert with the given id", () => {
    const result = getAdvert("123")(mockState);
    expect(result).toEqual(mockState.adverts.data[0]);
    expect(getAdvert("789")(mockState)).toBeUndefined();
  });
});

describe("getTags", () => {
  test("should return the tags state", () => {
    const result = getTags(mockState);
    expect(result).toEqual(mockState.tags);
  });
});

describe("getFilters", () => {
  test("should return the filters state", () => {
    const result = getFilters(mockState);
    expect(result).toEqual(mockState.filters);
  });
});

describe("getUi", () => {
  test("should return the ui state", () => {
    const result = getUi(mockState);
    expect(result).toEqual(mockState.ui);
  });
});
