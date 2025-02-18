
const shortid = require('shortid');
require('dotenv').config();
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || "mongodb+srv://AdminUser:AdminUser@cluster0.hsmnl.mongodb.net/url_shortener?retryWrites=true&w=majority");


const URLSchema = new mongoose.Schema({
    shortId: String,
    longUrl: String
});

const URL = mongoose.model('URL', URLSchema);

module.exports.shorten = async (event) => {
    const { longUrl } = JSON.parse(event.body);
    const shortId = shortid.generate();
    await URL.create({ shortId, longUrl });
    return {
        statusCode: 200,
        body: JSON.stringify({ shortUrl: `https://your-domain.com/${shortId}` })
    };
};

module.exports.shorten = async (event) => {
  const { longUrl } = JSON.parse(event.body);
  const shortId = shortid.generate();
  await URL.create({ shortId, longUrl });
  return {
    statusCode: 200,
    body: JSON.stringify({ shortUrl: `https://your-domain.com/${shortId}` })
  };
};