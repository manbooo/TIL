import scrapy
from tutorial.items import DmozItem

class DmozSpider(scrapy.Spider):
    name = "dmoz"
    allowed_domains = ["dmoztools.net"]

    start_urls = [
        "http://dmoztools.net/Computers/Programming/Languages/Python/Books/",
        "http://dmoztools.net/Computers/Programming/Languages/Python/Resources/"
    ]

    # action
    def parse(self, response):
        # filename = response.url.split("/")[-2]
        # with open(filename, 'wb') as f:
        #     f.write(response.body)

        for sel in response.xpath('//*[@id="site-list-content"]/div'):
            item = DmozItem()

            item['title'] = sel.xpath('div[3]/a/div/text()').extract()
            item['link'] = sel.xpath('div[3]/a/@href').extract()
            item['desc'] = sel.xpath('div[3]/div/text()').extract()

            print '*' * 30
            # print item['title']
            # print item['link']
            # print item['desc']

            yield item
