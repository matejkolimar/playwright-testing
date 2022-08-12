const reporter = require('cucumber-html-reporter')

const options = {
  theme: 'bootstrap',
  jsonFile: 'cucumber_report.json',
  output: 'reports/cucumber_report.html',
  reportSuiteAsScenario: true,
  scenarioTimestamp: true,
  launchReport: false,
  metadata: {
    'App Version': '0.0.1',
    'Test Environment': 'STAGING',
    Browser: 'Chrome 54.0',
    Platform: 'Mac OS Monterey 12.4',
  },
}

reporter.generate(options)
