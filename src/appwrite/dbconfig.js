import { Client, Databases, Storage, Query,ID } from "appwrite";
import conf from "../conf/conf";
import toast from "react-hot-toast";

export class dbService {
  client = new Client();
  Databases;
  bucket;
  constructor() {
    this.client.setEndpoint(conf.appwriteUrl).setProject(conf.ProjectId);
    this.Databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  async CreatePost({ title,  content, images, status, userid }) {
    try {
      return await this.Databases.createDocument(
        conf.DbId,
        conf.collectionId,
        ID.unique(),
        {
          title,
          content,
          images,
          status,
          userid,
        }
      );
    } catch (error) {
      console.log(error,"create post")
    }
  }

  async updatePost({ title, content, images, status }) {
    try {
      return await this.Databases.updateDocument(
        conf.DbId,
        conf.collectionId,
        ID.unique(),
        {
          title,
          content,
          images,
          status,
        }
      );
    } catch (error) {

      console.log("update", error);
    }
  }

  async deletePost(id) {
    try {
      await this.Databases.deleteDocument(conf.DbId, conf.collectionId, id);
      return true;
    } catch (error) {

      console.log(error, "delete");
    }
  }

  async GetSinglePost(id) {
    try {
      return await this.Databases.getDocument(
        conf.DbId,
        conf.collectionId,
        id
      );
    } catch (error) {

      console.log("getpost", error);
    }
  }

  async GetAllPost(queries = [Query.equal("status", "active")]) {
    try {
      return await this.Databases.listDocuments(
        conf.DbId,
        conf.collectionId,
        queries
      );
    } catch (error) {

      console.log(error);
    }
  }
}

const DataBase = new dbService();
export default DataBase;
