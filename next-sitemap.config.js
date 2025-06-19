module.exports = {
  siteUrl: "https://www.thevu.world",
  generateRobotsTxt: true,
  exclude: ["/auth/*", "/api/*"],
  additionalPaths: async (config) => {
    return [
      { loc: "/", changefreq: "weekly", priority: 1.0 },
      { loc: "/courses", changefreq: "weekly", priority: 0.9 },
      { loc: "/contact", changefreq: "monthly", priority: 0.6 },
      { loc: "/courses/680a29684557e496e6f00d5f", changefreq: "weekly", priority: 0.9 },
      { loc: "/quiz/midterm/680a29684557e496e6f00d5f", changefreq: "weekly", priority: 0.8 },
    ];
  },
};
