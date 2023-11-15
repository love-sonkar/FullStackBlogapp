import { Client, Account, ID } from "appwrite";
import conf from "../conf/conf";
import toast from "react-hot-toast";

export class authservice {
  client = new Client();
  account;
  constructor() {
    this.client.setEndpoint(conf.appwriteUrl).setProject(conf.ProjectId);
    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }) {
    try {
      const account = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (account) {
        return this.login({email, password});
      } else {
        return account;
      }
    } catch (error) {
      toast.error(error.response.message)
    }
  }

  async login({ email, password }) {
    try {
      return await this.account.createEmailSession(email, password);
    } catch (error) {
      toast.error(error.response.message)
    }
  }

  async logout() {
    try {
      return this.account.deleteSessions();
    } catch (error) {
      toast.error(error.response.message)
    }
  }

  async getUser() {
    try {
      return this.account.get();
    } catch (error) {
      toast.error(error.response.message)
    }
  }
}

const authServcie = new authservice();

export default authServcie;
