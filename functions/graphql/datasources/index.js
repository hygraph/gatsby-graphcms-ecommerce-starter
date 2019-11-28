const GraphCMSAPI = require('./graphcms');

const datasources = () => ({
  GraphCMSAPI: new GraphCMSAPI(),
});

module.exports = datasources;
