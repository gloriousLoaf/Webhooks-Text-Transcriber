const axios = require('axios').default;

// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
exports.handler = async (event, context) => {
  try {
    const body = JSON.parse(event.body);
    const avatarUrl = body.sender.avatar_url;
    const userName = body.sender.login;
    const repoName = body.repository.name;
    const repoUrl = `https://github.com/${body.repository.full_name}`;
    const userGH = body.sender.html_url;
    const content = `:star: Your repo ${repoName} was starred by ${userName}.
    ${repoUrl}
    ${userGH}`;
    const res = await axios.post(process.env.DISCORD_WEBHOOK_URL, {
      content: content,
      embeds: [
        {
          image: {
            url: avatarUrl,
          },
        },
      ],
    });
    console.log('Submitted!');
    return {
      statusCode: 204,
    };
  } catch (err) {
    return { statusCode: 500, body: err.toString() };
  }
};
