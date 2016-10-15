class Auth {

  /**
   * Authenticate a user. Save a token string in Local Storage
   *
   * @param {string} token
   */
  static authenticateUser(token, userData) {
    localStorage.setItem('token', token);
    localStorage.setItem('user', userData.name);
  }

  /**
   * Check if a user is authenticated - check if a token is saved in Local Storage
   *
   */
  static isUserAuthenticated() {
    return localStorage.getItem('token') !== null;
  }

  static getUserInfo() {
    return localStorage.getItem('user');
  }
  /**
   * Deauthenticate a user. Remove a token from Local Storage.
   *
   */
  static deauthenticateUser() {
    localStorage.removeItem('token');
  }

  /**
   * Get a token value.
   *
   */
  static getToken() {
    return localStorage.getItem('token');
  }

}

export default Auth;
