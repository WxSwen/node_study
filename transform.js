let http = require("http");

let app = http.createServer((req, res) => {
  console.log(req.url);
  if (req.url === "/remote") {
    res.writeHead(200, { "content-type": "text/plain" });
    res.end("fuck");
  } else {
    // proxy(req, res);

    req.pipe(
      http.request(
        {
          host: req.host,
          port: 3000,
          headers: res.headers,
          path: "/remote",
          agent: false,
          method: "GET"
        },
        response => {
          response.pipe(res);
        }
      )
    );
  }
});

function proxy(req, res) {
  let options = {
    host: req.host,
    port: 3000,
    headers: res.headers,
    path: "/remote",
    agent: false,
    method: "GET"
  };

  let httpProxy = http.request(options, response => {
    response.pipe(res);
  });

  req.pipe(httpProxy);
}

app.listen(3000, () => {
  const PORT = app.address().port;

  console.log(`server running at http://127.0.0.1:${PORT}/`);
});
