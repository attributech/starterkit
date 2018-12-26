const pkg = require('./package.json');
const fractal = require('@frctl/fractal').create();
const twigAdapter = require('@wondrousllc/fractal-twig-drupal-adapter');
const twig = twigAdapter({
  handlePrefix: '@components',
  importContext: true
});

const paths = {
  build: `${__dirname}/styleguide`,
  docs: `${__dirname}/docs`,
  components: `${__dirname}/components`,
  static: `${__dirname}/dist`,
};

fractal.set('project.title', pkg.name);
fractal.set('project.version', pkg.version);
fractal.set('project.author', pkg.author);

fractal.components.engine(twig);
fractal.components.set('default.preview', '@preview');
fractal.components.set('ext', '.twig');
fractal.components.set('path', paths.components);

fractal.components.set('resources', {
  scss: {
    label: 'SCSS',
    match: ['**/*.scss']
  },
  css: {
    label: 'CSS',
    match: ['**/*.css']
  },
  other: {
    label: 'Other Assets',
    match: ['**/*', '!**/*.scss', '!**.css']
  }
});

fractal.docs.set('path', paths.docs);

fractal.web.set('static.path', paths.static);
fractal.web.set('static.mount', 'themes/starterkit/dist');
fractal.web.set('builder.dest', paths.build);

fractal.components.set('default.status', 'prototype');

const statusesComponents = {
  unused: {
    label: "Unused",
    description: "Ready to for review.",
    color: "#555555"
  },
  prototype: {
    label: "Prototype",
    description: "Do not implement.",
    color: "#FF3333"
  },
  wip: {
    label: "WIP",
    description: "Work in progress. Implement with caution.",
    color: "#FF9233"
  },
  review: {
    label: "Review",
    description: "Ready to for review.",
    color: "#2625cc"
  },
  ready: {
    label: "Done",
    description: "Signed off.",
    color: "#29CC29"
  }
};

fractal.components.set('statuses', statusesComponents);

module.exports = fractal;
