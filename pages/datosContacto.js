export class datosContacto {
  constructor(page) {
    this.page = page;
    this.usuarioInput = page.locator('#username');
    this.passwordInput = page.locator('#password');
    this.loginButton = page.locator('#login');
  }

  async ir() {
    await this.page.goto('https://miapp.com/login');    
  }

  async login(usuario, password) {
    await this.usuarioInput.fill(usuario);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}