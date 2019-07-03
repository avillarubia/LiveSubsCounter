config.plugins.push(
  new webpack.DefinePlugin({
    PRODUCTION: JSON.stringify(true),
    VERSION: JSON.stringify("5fa3b9"),
    BROWSER_SUPPORTS_HTML5: true,
    TWO: "1+1",
    "typeof window": JSON.stringify("object"),
    "process.env": {
      livesubscounter_apikey: JSON.stringify(process.env.livesubscounter_apikey)
    }
  })
);
