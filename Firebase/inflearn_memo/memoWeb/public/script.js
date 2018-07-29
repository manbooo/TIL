var auth, database, userInfo;
var authProvider = new firebase.auth.GoogleAuthProvider();

auth = firebase.auth();

auth.onAuthStateChanged(function(user) {
  if(user) {
    // 인증 성공
    console.log("sucess!");

    userInfo = user;

    // 메모 리스트 출력
  } else {
    // 인증 실패
    auth.signInWithPopup(authProvider);
    console.log("false!");
  }
});

database = firebase.database();

function getMemoList() {
  /*
    {
      memos : {
        uid : {
          text : "내용",
          date : "작성일",
          title : "제목"
        },
        uid : {
          text : "내용",
          date : "작성일",
          title : "제목"
        },
        ...
      }
    }
  */
  var memoRef = database.ref('memos/' + userInfo.uid);

  memoRef.on('child_added', on_child_added);
}

function on_child_added(data) {
  //console.log(data.val());

  var key = data.key;
  var memoData = data.val();
  var txt = memoData.txt;
  var firstTxt = txt.substr(0, 1);
  var title = memoData.title;

  var html =
         "<li id='" + key + "' class=\"collection-item avatar\" onclick=\"fn_get_data_one(this.id);\" >" +
         "<i class=\"material-icons circle red\">" + firstTxt + "</i>" +
         "<span class=\"title\">" + title + "</span>" +
         "<p class='txt'>" + txt + "<br>" +
         "</p>" +
         "</li>";

  $(".collection").append(html);
}
