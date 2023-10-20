const config = {
  appwriteUrl: String(import.meta.env.VITE_APPWRITE_URL),
  projectUrl: String(import.meta.env.VITE_APPWRITE_PROJECT_URL),
  databaseUrl: String(import.meta.env.VITE_APPWRITE_DATABASE_URL),
  bucketUrl: String(import.meta.env.VITE_APPWRITE_BUCKET_URL),
  collectionUrl: String(import.meta.env.VITE_APPWRITE_COLLECTION_URL),
};

export default config;
