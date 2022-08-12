import { Reporter } from '@playwright/test/reporter'
import * as fs from 'fs'

const fileName = 'test-results.json'
class CustomReporter implements Reporter {
  onBegin(config, suite) {
    console.log(`Running ${suite.allTests.length} tests`)
    fs.writeFileSync(fileName, '[')
  }

  onEnd(result) {
    console.log(`Execution finished with status of ${result.status}`)
    //! FIXME: ] is not inserted into end of file
    fs.writeFile(fileName, ']', { flag: 'a+' }, (err) => {
      if (err) throw err
    })
  }

  onTestBegin(test) {
    console.log(`Running test ${test.title}`)
  }

  onTestEnd(test, result) {
    const data = {
      title: test.title,
      status: result.status,
      error: result.error,
      duration: result.duration,
    }

    const dataToString = JSON.stringify({ test: data }, null, 2)
    console.log(dataToString)
    fs.appendFile(fileName, '\n' + dataToString + ',', function (err) {
      if (err) throw err
    })
  }
}

export default CustomReporter
