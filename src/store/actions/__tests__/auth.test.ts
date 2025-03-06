import {
  AuthLogin,
  AuthLogout,
  AuthLoginPending,
  AuthLoginRejected,
  AuthLoginFulfilled,
} from "../creators";

describe("AuthLogin", () => {
  const dispatch = vi.fn();
  const credentials = { email: "test@example.com", password: "test1234" };
  const thunk = AuthLogin(credentials);

  afterEach(() => {
    vi.restoreAllMocks();
  });

  test("when login is successful", async () => {
    // Replace the global fetch function with a mock that returns a resolved promise
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: vi.fn().mockResolvedValue({ accessToken: "mocked_token" }),
      })
    );

    // Replace the global localStorage.setItem function with a mock
    vi.stubGlobal("localStorage", {
      setItem: vi.fn(),
    });

    // @ts-expect-error getState is not used
    await thunk(dispatch, undefined, undefined);

    expect(dispatch).toHaveBeenCalledTimes(2);
    expect(dispatch).toHaveBeenNthCalledWith(1, AuthLoginPending());
    expect(dispatch).toHaveBeenNthCalledWith(2, AuthLoginFulfilled());
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "accessToken",
      "mocked_token"
    );
  });

  test("when login is rejected", async () => {
    // Replace the global fetch function with a mock that returns a rejected promise
    vi.stubGlobal(
      "fetch",
      vi.fn().mockRejectedValue(new Error("Ooops! Something went wrong"))
    );
    // @ts-expect-error getState is not used
    await thunk(dispatch, undefined, undefined);

    expect(dispatch).toHaveBeenCalledTimes(2);
    expect(dispatch).toHaveBeenNthCalledWith(1, AuthLoginPending());
    expect(dispatch).toHaveBeenNthCalledWith(
      2,
      AuthLoginRejected("Ooops! Something went wrong")
    );
  });
});

describe("AuthLogout", () => {
  const dispatch = vi.fn();
  const thunk = AuthLogout();
  test("should remove accessToken from localStorage and dispatch AUTH_LOGOUT action", async () => {
    // Replace the global localStorage.removeItem function with a mock
    vi.stubGlobal("localStorage", { removeItem: vi.fn() });

    // @ts-expect-error getState is not used
    thunk(dispatch, undefined, undefined);

    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith({ type: "AUTH_LOGOUT" });
    expect(localStorage.removeItem).toHaveBeenCalledWith("accessToken");

    vi.restoreAllMocks();
  });
});

describe("AuthLoginPending", () => {
  test("should return an action with type AUTH_LOGIN_PENDING", () => {
    const action = { type: "AUTH_LOGIN_PENDING" };
    const result = AuthLoginPending();
    expect(result).toEqual(action);
  });
});

describe("AuthLoginFulfilled", () => {
  test("should return an action with type AUTH_LOGIN_FULFILLED", () => {
    const action = { type: "AUTH_LOGIN_FULFILLED" };
    const result = AuthLoginFulfilled();
    expect(result).toEqual(action);
  });
});

describe("AuthLoginRejected", () => {
  test("should return an action with type AUTH_LOGIN_REJECTED and payload error", () => {
    const errorMessage = "Something went wrong";
    const action = { type: "AUTH_LOGIN_REJECTED", payload: errorMessage };
    const result = AuthLoginRejected(errorMessage);
    expect(result).toEqual(action);
  });
});
