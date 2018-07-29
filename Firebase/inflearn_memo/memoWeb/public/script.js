var auth, database, userInfo, selectedKey;
var authProvider = new firebase.auth.GoogleAuthProvider();

auth = firebase.auth();
database = firebase.database();

auth.onAuthStateChanged(function(user) {
  if(user) {
    // 인증 성공
    console.log("sucess!");

    userInfo = user;

    // 메모 리스트 출력
    get_memo_list();

  } else {
    // 인증 실패
    auth.signInWithPopup(authProvider);
    console.log("false!");
  }
});

function get_memo_list() {
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
  memoRef.on('child_changed', on_child_changed);
}

function on_child_added(data) {
  //console.log(data.val());

  var key = data.key;
  var memoData = data.val();
  var txt = memoData.txt;
  var title = txt.substr(0, txt.indexOf('\n'));
  var firstTxt = txt.substr(0, 1);

  var html =
         "<li id='" + key + "' class=\"collection-item avatar\" onclick=\"fn_get_data_one(this.id)\" >" +
         "<i class=\"material-icons circle red\">" + firstTxt + "</i>" +
         "<span class=\"title\">" + title + "</span>" +
         "<p class='txt'>" + txt + "<br>" +
         "</p>" +
         "<a href=\"#!\" class=\"secondary-content\" onclick=\"fn_delete_data('" + key + "')\" ><i class=\"material-icons\">grade</i></a>" +
         "</li>";

  $(".collection").append(html);
}

function on_child_changed(data) {
  var key = data.key;
  var txt = data.val().txt;
  var title = txt.substr(0, txt.indexOf('\n'));

  $("#" + key + "> .title").text(title);
  $("#" + key + "> .txt").text(txt);
}

function fn_get_data_one(key) {
  selectedKey = key;

  var memoRef = database.ref('memos/' + userInfo.uid + '/' + key)
            .once('value').then(function(snapshot) {
            if (snapshot.val() == null) {
              return;
            }
              $(".textarea").val(snapshot.val().txt);
            });
}

function fn_delete_data(key) {
  if(!confirm("삭제하시겠습니까?")) {
    return ;
  } else {
    var memoRef = database.ref('memos/' + userInfo.uid + '/' + key);

    memoRef.remove();
    $("#" + key).remove();
  }
}

function save_data() {
  var memoRef = database.ref('memos/' + userInfo.uid);

  var txt =  $(".textarea").val();

  // 유효성 검사
  if(txt == '') {
    return;
  } else {
    // push
    if(selectedKey) {
      memoRef = database.ref('memos/' + userInfo.uid + '/' + selectedKey);

      memoRef.update({
        txt : txt,
        updateDate : new Date().getTime()
      });
    } else {
      memoRef.push({
        txt : txt,
        createDate : new Date().getTime()
      });
    }

    $(".textarea").val('');
  }
}

function initMemo() {
  $(".textarea").val('');
  selectedKey = null;
}

$(function() {
  $(".textarea").blur(function() {
    save_data();
  });
});
