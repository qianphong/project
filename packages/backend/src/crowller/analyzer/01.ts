import fs from 'fs'
import cheerio from 'cheerio'
import { Analyzer } from '../crowller'
import dayjs from 'dayjs'
interface Ticket {
  departure: string
  destination: string
  price: number
  date: string
}
interface TicketResult {
  time: number | string
  data: Array<Ticket>
}
interface Content {
  [propName: string]: Ticket[]
}

export default class MyAnalyzer implements Analyzer {
  private constructor() {}
  private static instance: MyAnalyzer
  static getInstance() {
    if (!MyAnalyzer.instance) {
      MyAnalyzer.instance = new MyAnalyzer()
    }
    return MyAnalyzer.instance
  }
  private getPageInfo(html: string): TicketResult {
    const $ = cheerio.load(html)
    const list = $('.bargain-content .swiper-slide-item')
    let data: Array<Ticket> = []
    list.map((idx, ele) => {
      const topText = $(ele)
        .children('h3')
        .text()
        .replace(/\s+/g, '-')
        .split('-')
      const bottomEle = $(ele).children('div')
      let departure = topText[0]
      let destination = topText[1]
      let price = parseInt(bottomEle.children('.price').text().substring(1))
      let date = bottomEle.children('.date').text()
      data.push({ departure, destination, price, date })
    })
    return { time: dayjs().format('YYYY-MM-DD HH:mm:ss'), data }
  }
  private generateJsonContent(ticketInfo: TicketResult, filePath: string) {
    let fileContent: Content = {}
    if (fs.existsSync(filePath)) {
      fileContent = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
    }
    fileContent[ticketInfo.time] = ticketInfo.data
    return fileContent
  }
  analyze(html: string, filePath: string) {
    const result = this.getPageInfo(html)
    const fileContent = this.generateJsonContent(result, filePath)
    return JSON.stringify(fileContent)
  }
}
