from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Post(models.Model):
    # 게시물의 고유한 인덱스 : models.Model에 기본으로 포함되는 PK 이용
    # 게시물의 제목 : 1024자 제한
    title = models.CharField(max_length=1024)
    # 게시물의 내용 : 4096자 제한
    body = models.CharField(max_length=4096)
    # 게시물의 작성자 : Django의 기본 User를 활용
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    # 게시물의 작성시간 : 게시물의 작성시간, 자동으로 게시물이 등록되는 시간이 설정
    regdate = models.DateTimeField(auto_created=True, auto_now_add=True)
    # 게시물의 고유 비밀번호 : author의 권한 인증을 따라 간다.
