const conf = {
    appwriteUrl:String(import.meta.env.VITE_APPWRITE_URL),
    ProjectId:String(import.meta.env.VITE_APPWRITE_PROJECTID),
    DbId:String(import.meta.env.VITE_APPWRITE_DBID),
    collectionId:String(import.meta.env.VITE_APPWRITE_COLLECTIONID),
    BucketID:String(import.meta.env.VITE_APPWRITE_BUCKETID),
}

export default conf