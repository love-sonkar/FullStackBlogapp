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

  async CreatePost({ title,  content, images, status, userid,author }) {
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
          author,
        }
      );
    } catch (error) {
      console.log(error,"create post")
    }
  }

  async updatePost({ title, content,id }) {
    try {
      return await this.Databases.updateDocument(
        conf.DbId,
        conf.collectionId,
        id,
        {
          title,
          content,
        }
      );
    } catch (error) {
      toast.error(error.response.message)
    }
  }

  async deletePost(id) {
    try {
      await this.Databases.deleteDocument(conf.DbId, conf.collectionId, id);
      return true;
    } catch (error) {
      toast.error(error.response.message)
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
      toast.error(error.response.message)
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
      toast.error(error.response.message)
    }
  }
}

const DataBase = new dbService();
export default DataBase;
