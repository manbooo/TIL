# -*- coding: utf-8 -*-

# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: https://doc.scrapy.org/en/latest/topics/item-pipeline.html

from scrapy.exceptions import DropItem

# 한글 인코딩 문제 해결
import sys
reload(sys)
sys.setdefaultencoding('utf-8')

class CommunityPipeline(object):
    words_to_filter = [u'19금', u'후방주의']

    # 처리할 로직
    def process_item(self, item, spider):
        for word in self.words_to_filter:
            if word in unicode(item['title']):
                raise DropItem("Contains forbidden word: %s" % word)
            else:
                return item
