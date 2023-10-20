import config from "../conf/conf";
import { Client, Account, ID, Storage } from "appwrite";

class storage {
  constructor() {
    this.client = new Client();
    this.storage = new Storage(this.client);

    this.client.setEndpoint(config.appwriteUrl).setProject(config.projectUrl);
  }

  // upload file

  async uploadFile(file) {
    try {
      return await this.storage.createFile(config.bucketUrl, ID.unique(), file);
    } catch (e) {
      console.log(e);
    }
  }
  // Delete file

  async deleteFile(fileid) {
    try {
      await this.storage.deleteFile(config.bucketUrl, fileid);
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  //  file preview

  filePreview(fileid) {
    const result = this.storage.getFilePreview(config.bucketUrl, fileid);
    return result;
  }
}

const storageservice = new storage();

export default storageservice;
