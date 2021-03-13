require('dotenv').config();
const express = require('express');
const axios = require('axios').default;

const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req, res) =>
  res.send(`
  <html>
    <head><title>Success!</title></head>
    <body>
      <h1>You did it!</h1>
      <img src="https://media.giphy.com/media/XreQmk7ETCak0/giphy.gif" alt="Cool kid doing thumbs up" />
    </body>
  </html>
`)
);

app.post('/github', (req, res) => {
  const userName = req.body.sender.login;
  const repoName = req.body.repository.name;
  const repoUrl = `https://github.com/${req.body.repository.full_name}`;
  const userGH = req.body.sender.html_url;
  const content = `:star: Your repo ${repoName} was starred by ${userName}.
  ${repoUrl}
  ${userGH}`;
  const avatarUrl = req.body.sender.avatar_url;
  axios
    .post(process.env.DISCORD_WEBHOOK_URL, {
      content: content,
      embeds: [
        {
          image: {
            url: avatarUrl,
          },
        },
      ],
    })
    .then((discordResponse) => {
      console.log('Success!');
      res.status(204).send();
    })
    .catch((err) => console.error(`Error sending to Discord: ${err}`));
});

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
