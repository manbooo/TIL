# -*- coding: utf-8 -*-

__author__ = 'jjuya'

import scrapy,re

from community.items import CommunityItem
from datetime import datetime

class CommunitySpider(scrapy.Spider):
    name = "communityCrawler"

    #start_urls = []
    def start_requests(self):
        for i in range(1, 2, 1):
            yield scrapy.Request("https://www.clien.net/service/board/park?&od=T31&po=%d" % i, self.parse_clien)

    def parse_clien(self, response):
        for sel in response.xpath('//*[@id="div_content"]/div[@class="list_item symph_row"]'):
            item = CommunityItem()

            item['source'] = 'clien'
            item['category'] = 'free'

            title = sel.xpath('div[@class="list_title"]/a[@class="list_subject"]/span/text()').extract()[0] # .extract_first()
            item['title'] = title.encode('utf-8')

            url = 'https://www.clien.net' + sel.xpath('div[@class="list_title"]/a/@href').extract()[0]
            item['url'] = url

            dateTmp = datetime.strptime(sel.xpath('div[@class="list_time"]/span[@class="time popover"]/span[@class="timestamp"]/text()').extract()[0], "%Y-%m-%d %H:%M:%S")
            item['date'] = dateTmp.strftime("%Y-%m-%d %H:%M:%S")

            hit = sel.xpath('div[@class="list_hit"]/span[@class="hit"]/text()').extract()[0]
            item['hits'] = hit

            print '=' * 50
            print item['title']

            yield item
