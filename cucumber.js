const common = {
  paths: ['features/**/*.feature'],
  requireModule: ['ts-node/register'],
  require: [
    'support/world.ts',
    'support/hooks.ts',
    'steps/*.steps.ts'
  ],
  format: [
    '@cucumber/pretty-formatter',
    'json:reports/cucumber-report.json'
  ],
  formatOptions: {
    snippetInterface: 'async-await'
  },
  parallel: 1
};
 
module.exports = {
  default: common,
  smoke:      { ...common, tags: '@smoke'      },
  regression: { ...common, tags: '@regression' },
  companies:  { ...common, tags: '@companies'  },
  jobs:       { ...common, tags: '@jobs'       },
  profile:    { ...common, tags: '@profile'    }
};