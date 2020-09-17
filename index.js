const express = require('express');
const PlatformSDK = require('platform-sdk-node');

/** Config */
const {
  port,
  baseUrl,
  user,
  password,
  productPath,
  userPath,
} = require('./config.json');

const platformClient = new PlatformSDK({
  host: baseUrl,
  authorization: {
    username: user,
    password: password,
  },
  requestTimeout: 10000,
});

const app = express();

app.use(productPath, async (req, res) => {
  try {
    const { apiKey, productId } = req.params;
    const response = await platformClient.v2.products.getProduct({
      apiKey,
      productId,
    });

    res.status(200).send(response);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

app.use(userPath, async (req, res) => {
  try {
    const { apiKey, anonymousId } = req.params;
    const response = await platformClient.v2.users.getReals({
      apiKey,
      anonymousId,
    });

    res.status(200).send(response);
  } catch (err) {
    console.log(err.response);
    res.sendStatus(500);
  }
});

app.listen(port, () => {
  console.log(`Proxy app listening at http://localhost:${port}`)
});
