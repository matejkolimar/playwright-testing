# Playwright web test framework

I use Playwright web testing framework to test functionality.
In this repository you can found:

- **basic-tests section** -> Here are basic tests where I learn basics.
- **page-object section** -> All tests here use page-object pattern.
  - **api section** -> Example how to do api testing.
  - **data section** -> All data used in tests, in this case there are only user credentials.
  - **features section** -> Features contains tests split by features.
  - **pages section** -> Every page represent one page in browser.
  - **utils section** -> Here are only helpers we can use in tests for example RNG generator.
  - **tips section** -> Here are some tips & tricks (Skip browser, rerun test for different inputs, ...).
  - **visual section** -> Example how to use visual testing.
- **cucumber-bdd section** -> In this section is used cucumber and also page object.
- **reports section** -> Is used for cucumber reports.
- **screenshots** -> Output folder for visual testing.
- **api.config.ts, e2e.config.ts, page-object.config.ts, tips.config.ts, visual.config.ts** -> Config files that are used for basic test setup.
- **playwright.config.ts** -> Base config files that are inherited into other files like **api.config.ts**.
- **cucumber-reporter.js** -> Config for cucumber reporter.
- **cucumber.js** -> Base config for cucumber.
- **custom-reporter.ts** -> Custom reporter that can be used in **page-object** tests. Example is in Tips tests. After usage it generate **test-results.json**.
- **jenkins.war** -> File needed for jenkins. Inside package.json is also script that run jenkins if it is installed.
- **package.json** -> Is used as global config for this repository, here are scripts that execute tests.

## Test srcipt execution

Use ** npm run test:features:all** to execute all feature tests in all browsers. Here are examples off all scscripts used in this repository.

```json
"test:chrome": "playwright test --config=playwright.config.ts --project=Chromium",
"test:firefox": "playwright test --config=playwright.config.ts --project=Firefox",
"test:webkit": "playwright test --config=playwright.config.ts --project=Webkit",
"test:e2e": "playwright test --config=e2e.config.ts --project=Chromium",
"test:visual:all": "playwright test --config=visual.config.ts --reporter=list",
"test:visual:all:update": "playwright test --config=visual.config.ts --update-snapshots",
"test:features:all": "playwright test --config=page-object.config.ts --reporter=list",
"test:api": "playwright test --config=api.config.ts --project=Chromium --reporter=list",
"jenkins-server": "java -jar jenkins.war --httpPort=8080 --enable-future-java",
"test:tips:chrome": "playwright test --config=tips.config.ts --project=Chromium",
"test:tips:custom:reporter": "playwright test --config=tips.config.ts --project=Chromium --reporter=custom-reporter.ts",
"test:cucumber": "./node_modules/.bin/cucumber-js --require cucumber.js --require ./cucumber-bdd/step-definitions/**/*.js -f json:cucumber_report.json --publish-quiet",
"report": "node cucumber-reporter.js"
```
