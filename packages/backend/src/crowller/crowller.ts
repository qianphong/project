//ts -> .d.ts 翻译文件 -> js  "dev": "ts-node ./src/crowller.ts",
import fs from 'fs'
import path from 'path'
import superagent from 'superagent'
export interface Analyzer {
  analyze: (html: string, filePath: string) => string
}
export default class Crowller {
  constructor(
    private url: string,
    private _filePath: string,
    private analyzer: Analyzer
  ) {
    this.initSpiderProcess()
  }
  private get filePath() {
    return path.resolve(__dirname, this._filePath)
  }
  private async initSpiderProcess() {
    const html = await this.getRawHtml()
    const fileContent = this.analyzer.analyze(html, this.filePath)
    this.writeFile(fileContent)
  }
  private async getRawHtml() {
    const res = await superagent.get(this.url)
    return res.text
  }
  private writeFile(content: string) {
    fs.writeFileSync(this.filePath, content)
  }
}

// import MyAnalyzer from './analyzer/01'
// const analyzer = MyAnalyzer.getInstance()

// const url = 'https://www.meituan.com/flight/'
// const filePath = '../data/tickets.json'
// console.time()
// const crowller = new Crowller(url, filePath, analyzer)
// console.timeEnd()
