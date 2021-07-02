module.exports = {
    async redirects() {
      return [
        {
          source: '/',
          destination: '/blog',
          permanent: true,
        },
      ]
    },
    images: {
        domains: ["pbs.twimg.com"],
    },
    webpack: (config, { isServer }) => {
        if (!isServer) {
          config.resolve.fallback.fs = false;
        }
        return config;
    }
  }