import { Analyzer } from '../crowller'

export default class MyAnalyzer implements Analyzer {
  analyze(html: string, filePath: string) {
    return html + filePath
  }
}
