import {
  AdvertsLoaded,
  AdvertsLoadedFulfilled,
  AdvertsLoadedPending,
  AdvertsLoadedRejected,
} from "../creators";

describe("AdvertsLoaded", () => {
  const dispatch = vi.fn();
  const getState = vi.fn();
  const thunk = AdvertsLoaded();

  afterEach(() => {
    vi.restoreAllMocks();
  });

  test("when adverts are already loaded", async () => {
    getState.mockReturnValue({ adverts: { loaded: true } });

    await thunk(dispatch, getState, undefined);

    expect(getState).toHaveBeenCalled();
    expect(dispatch).not.toHaveBeenCalled();
  });

  test("when adverts are loaded successfully", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: vi.fn().mockResolvedValue([]),
      })
    );

    vi.stubGlobal("localStorage", { getItem: vi.fn() });

    getState.mockReturnValue({ adverts: { loaded: false } });

    await thunk(dispatch, getState, undefined);

    expect(getState).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledTimes(2);
    expect(dispatch).toHaveBeenNthCalledWith(1, AdvertsLoadedPending());
    expect(dispatch).toHaveBeenNthCalledWith(
      2,
      AdvertsLoadedFulfilled([], true)
    );
  });

  test("when loading adverts fails", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockRejectedValue(new Error("Ooops! Something went wrong"))
    );

    vi.stubGlobal("localStorage", { getItem: vi.fn() });

    getState.mockReturnValue({ adverts: { loaded: false } });

    await thunk(dispatch, getState, undefined);

    expect(getState).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledTimes(2);
    expect(dispatch).toHaveBeenNthCalledWith(1, AdvertsLoadedPending());
    expect(dispatch).toHaveBeenNthCalledWith(
      2,
      AdvertsLoadedRejected("Ooops! Something went wrong")
    );
  });
});

describe("AdvertsLoadedPending", () => {
  test("should return an action with type ADVERTS_LOADED_PENDING", () => {
    const action = { type: "ADVERTS_LOADED_PENDING" };
    const result = AdvertsLoadedPending();
    expect(result).toEqual(action);
  });
});

describe("ADvertsLoadedFullfilled", () => {
  test("should return an acion with type ADVERTS_LOADED_FULFILLED and payload data and loaded", () => {
    const action = {
      type: "ADVERTS_LOADED_FULFILLED",
      payload: { data: [], loaded: true },
    };
    const result = AdvertsLoadedFulfilled([], true);
    expect(result).toEqual(action);
  });
});

describe("AdvertsLoadedRejected", () => {
  test("should return an action with type ADVERTS_LOADED_REJECTED and payload error", () => {
    const action = {
      type: "ADVERTS_LOADED_REJECTED",
      payload: "Ooops! Something went wrong",
    };
    const result = AdvertsLoadedRejected("Ooops! Something went wrong");
    expect(result).toEqual(action);
  });
});
