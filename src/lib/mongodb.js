import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const options = {
  // Add any MongoClient options here if needed, e.g.:
  // useNewUrlParser: true, // Often default in newer driver versions
  // useUnifiedTopology: true, // Often default in newer driver versions
  // connectTimeoutMS: 10000,
  // socketTimeoutMS: 45000,
  // maxPoolSize: 10,
};

let client;
let clientPromise;

if (!process.env.MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable");
}

if (process.env.NODE_ENV === "development") {
  // In dev mode, use a global variable so it isn't recreated on every reload
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production, create a new connection
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;
