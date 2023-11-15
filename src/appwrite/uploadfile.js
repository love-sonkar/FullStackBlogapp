import { Client, Storage, ID } from "appwrite";
import conf from "../conf/conf";

export class FileUpload {
  client = new Client();
  bucket;

  constructor() {
    this.client.setEndpoint(conf.appwriteUrl).setProject(conf.ProjectId);
    this.bucket = new Storage(this.client);
  }

  async UploadFile(file) {
    try {
      return await this.bucket.createFile(conf.BucketID, ID.unique(), file);
    } catch (error) {
      console.log("uploadfile", error);
      return false;
    }
  }

  async DeleteFile(fileId) {
    try {
      await this.bucket.deleteFile(conf.BucketID, fileId);
      return true;
    } catch (error) {
      console.log("deletfile", error);
      return false;
    }
  }

  async GetFile (fileId){
    try {
      return await this.bucket.getFile(conf.BucketID,fileId)
    } catch (error) {
      console.log(error)
    }
  }

  FilePreview(fileId) {
    try {
      return this.bucket.getFilePreview(conf.BucketID, fileId);
    } catch (error) {
      console.log("filepreview", error);
    }
  }


}

const fileUpload = new FileUpload();
export default fileUpload;
