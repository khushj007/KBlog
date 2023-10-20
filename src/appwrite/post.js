import config from "../conf/conf";

import { Client, ID, Databases, Storage, Query } from "appwrite";

class Post {
  constructor() {
    this.client = new Client();
    this.client.setEndpoint(config.appwriteUrl).setProject(config.projectUrl);

    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  //   create post

  async createPost({ title, slug, content, featuredImage, status, userid }) {
    try {
      return await this.databases.createDocument(
        config.databaseUrl,
        config.collectionUrl,
        slug,
        { title, content, featuredImage, status, userid }
      );
    } catch (error) {
      throw error;
    }
  }

  //   update post

  async updatePost(slug, { title, content, featuredImage, status }) {
    try {
      return this.databases.updateDocument(
        config.databaseUrl,
        config.collectionUrl,
        slug,
        { title, content, featuredImage, status }
      );
    } catch (error) {
      throw error;
    }
  }

  //   delete post

  async deletePost(slug) {
    try {
      this.databases.deleteDocument(
        config.databaseUrl,
        config.collectionUrl,
        slug
      );
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  //   get post

  async getPost(slug) {
    try {
      return await this.databases.getDocument(
        config.databaseUrl,
        config.collectionUrl,
        slug
      );
    } catch (e) {
      console.log(e);
    }
  }

  //   get Posts
  async getPosts(quaries = [Query.equal("status", "active")]) {
    try {
      return this.databases.listDocuments(
        config.databaseUrl,
        config.collectionUrl,
        quaries
      );
    } catch (e) {
      console.log(e);
      return false;
    }
  }
}

const post = new Post();

export default post;
