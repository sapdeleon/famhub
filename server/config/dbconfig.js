module.exports = {
  url: "mongodb://localhost:27017/famhubDB",
  options: {
    useNewUrlParser: true,
    useCreateIndex: true,
    autoIndex: true, //this is the code I added that solved it all
    keepAlive: true,
    poolSize: 10,
    bufferMaxEntries: 0,
    connectTimeoutMS: 10000,
    socketTimeoutMS: 45000,
    family: 4, // Use IPv4, skip trying IPv6
    useFindAndModify: false,
    useUnifiedTopology: true,
  },
};

// module.exports = {
//     url: process.env.MONGO_URI,
//     options: {
//         useNewUrlParser: true,
//         useCreateIndex: true,
//         autoIndex: true, //this is the code I added that solved it all
//         keepAlive: true,
//         poolSize: 10,
//         bufferMaxEntries: 0,
//         connectTimeoutMS: 10000,
//         socketTimeoutMS: 45000,
//         family: 4, // Use IPv4, skip trying IPv6
//         useFindAndModify: false,
//         useUnifiedTopology: true
//     }
// };
