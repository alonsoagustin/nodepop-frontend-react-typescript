const LoginPage = () => {
  return (
    <>
      <h2 className="loginPage-title">ACCESS YOUR ACCOUNT</h2>
      <form className="loginPage-form" onSubmit={handleSubmit}>
        <div className="formField">
          <label className="formField-label" htmlFor="email">
            <span>Email:</span>
          </label>
          <input
            className="formField-input"
            type="email"
            name="email"
            id="email"
            placeholder="Insert your email here"
            autoComplete="on"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <div className="formField">
          <label className="formField-label" htmlFor="password">
            <span>Password:</span>
          </label>
          <input
            className="formField-input"
            type="password"
            name="password"
            id="password"
            placeholder="Insert your password here"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <div className="formField">
          <label className="formField-label" htmlFor="remember">
            <span>Remember me</span>
          </label>
          <input
            className="formField-input"
            type="checkbox"
            name="remember"
            id="remember"
            checked={checked}
            onChange={handleRememberChange}
          />
        </div>
        <div className="formField">
          <Link to={"/signup"}>
            <span>I don't have an account yet</span>
          </Link>
        </div>
        <div className="formActions">
          <button
            className="loginForm-submit"
            type="submit"
            disabled={isDisabled}
          >
            Login
          </button>
        </div>
      </form>
    </>
  );
};

export default LoginPage;
