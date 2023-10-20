import config from "../conf/conf";
import { Client, Account, ID } from "appwrite";

class AuthService {
  client = new Client();
  constructor() {
    this.client.setEndpoint(config.appwriteUrl).setProject(config.projectUrl);
    this.account = new Account(this.client);
  }

  //   creating the newuser

  async createAccount({ name, password, email }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      return userAccount;
    } catch (error) {
      console.log(error);
    }
  }

  //   Login the user
  async Login({ email, password }) {
    try {
      const user = this.account.createEmailSession(email, password);
      if (user) {
        return user;
      } else {
        console.log(user);
      }
    } catch (error) {
      console.log(error);
    }
  }

  // Logout
  async Logout() {
    try {
      await this.account.deleteSessions();
    } catch (error) {
      throw error;
    }
  }

  //check user
  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (e) {
      console.log(`error`, e);
    }
    return null;
  }
}

const authService = new AuthService();

export default authService;
