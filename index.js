const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const cors = require("cors");

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const proxyOptions = {
  target: "",
  changeOrigin: true,
  secure: false,
  onProxyReq: (proxyReq, req, res) => {
    if (req.body && Object.keys(req.body).length) {
      const bodyData = JSON.stringify(req.body);

      proxyReq.setHeader("Content-Type", "application/json");
      proxyReq.setHeader("Content-Length", Buffer.byteLength(bodyData));

      proxyReq.write(bodyData);
    }
  },
  onProxyRes: (proxyRes, req, res) => {
    proxyRes.headers["Access-Control-Allow-Origin"] = "*";
  },
  router: (req) => {
    const target = req.query.target || req.headers["x-target-url"];
    if (!target) {
      throw new Error("Target URL is missing");
    }
    return target;
  },
};

app.use("/", createProxyMiddleware(proxyOptions));

app.use((err, req, res, next) => {
  console.error("Proxy Error:", err.message);
  res.status(500).json({ error: err.message });
});

const PORT = process.env.PORT || 4242;
app.listen(PORT, () => {
  console.log(`Proxy server is running on port ${PORT}`);
});
