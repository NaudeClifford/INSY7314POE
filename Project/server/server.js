require("dotenv").config();

const connectDB = require("./config/database");
const app = require("./app");
const { createHttpsServer } = require("./config/https");

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    // Load the certificate first so configuration problems are reported immediately.
    const server = createHttpsServer(app);

    // Connect before accepting traffic so requests never use an unavailable database.
    await connectDB();

    await new Promise((resolve, reject) => {
      server.once("error", reject);
      server.listen(PORT, () => {
        server.off("error", reject);
        console.log(`HTTPS server running on https://localhost:${PORT}`);
        resolve();
      });
    });

    return server;
  } catch (error) {
    console.error("Server failed to start:", error.message);
    process.exitCode = 1;
    return null;
  }
};

if (require.main === module) {
  startServer();
}

module.exports = { startServer };
