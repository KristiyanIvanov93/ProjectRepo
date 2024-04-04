import { html, render, page } from "../lib.js";
import { login } from "../data/users.js"
import { createSubmitHandler, updateNav } from "../data/util.js";
import { showError } from "../data/errors.js";

const loginTemplate = (onLogin) => html`
        <section id="login">
          <div class="form">
            <h2>Login</h2>
            <form class="login-form" @submit=${onLogin}>
              <input type="text" name="email" id="email" placeholder="email" />
              <input
                type="password"
                name="password"
                id="password"
                placeholder="password"
              />
              <button type="submit">login</button>
              <p class="message">
                Not registered? <a href="/register">Create an account</a>
              </p>
            </form>
          </div>
        </section>
`;

export function showLogin(ctx) {
  render(loginTemplate(createSubmitHandler(onLogin)))
};

export async function onLogin({ email, password }, form) {
  if (!email || !password) {
      showError("Email and password are required!"); 
      return;
  }

  try {
      await login(email, password);
      updateNav();
      page.redirect('/');
  } catch (error) {
      showError("Invalid email or password. Please try again."); 
  };
};