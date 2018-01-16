# -*- coding: utf-8 -*-

# Define here the models for your scraped items
#
# See documentation in:
# https://doc.scrapy.org/en/latest/topics/items.html

import scrapy


class CommunityItem(scrapy.Item):
    # define the fields for your item here like:
    # name = scrapy.Field()

    source = scrapy.Field() # 위치 : 사이트 url
    category = scrapy.Field() # 게시판
    title = scrapy.Field()
    url = scrapy.Field()
    hits = scrapy.Field()
    date = scrapy.Field()

    pass
