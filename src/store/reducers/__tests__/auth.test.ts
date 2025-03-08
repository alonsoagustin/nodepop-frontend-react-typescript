import auth from "../auth";

const initialState = false;

describe("auth reducer", () => {
  test("should return initial state when an unknow action is dispatched", () => {
    expect(
      auth(initialState, {
        type: "AUTH_LOGIN_PENDING",
      })
    ).toEqual(initialState);
  });

  test("should return true when AUTH_LOGIN_FULFILLED action is dispatched", () => {
    expect(auth(initialState, { type: "AUTH_LOGIN_FULFILLED" })).toEqual(true);
  });

  test("should return false when AUTH_LOGOUT action is dispatched", () => {
    expect(auth(initialState, { type: "AUTH_LOGOUT" })).toEqual(false);
  });
});
