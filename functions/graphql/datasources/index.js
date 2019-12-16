const GraphCMSAPI = require('./graphcms');
const PrintfulAPI = require('./printful');

const datasources = () => ({
  GraphCMSAPI: new GraphCMSAPI(),
  PrintfulAPI: new PrintfulAPI(),
});

module.exports = datasources;
