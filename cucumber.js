const common = `
    --require cucumber-bdd/setup/assertions.js
    --require cucumber-bdd/setup/hooks.js
    --require cucumber-bdd/step-defitions/**/*.step.js
`
module.exports = {
  default: `${common} cucumber-bdd/features/**/*.feature`,
}
