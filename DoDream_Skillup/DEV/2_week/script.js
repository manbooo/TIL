function signup() {
  firebase.auth().createUserWithEmailAndPassword(getEmail(), getPassword())
    .then(
      function(success) {
        console.log(success);
        alert("회원가입 성공");
      }, function(error) {
        console.log(error);
        alert("회원가입 실패");
      }
    );
  console.log("회원가입");
}

$("#signup-btn").click(
  function() {
    signup();
  }
);

function login() {
  firebase.auth().signInWithEmailAndPassword(getEmail(), getPassword())
  .then(
    function(success) {
      console.log(success);
      alert("로그인 성공");
      $("#login-frame").hide();
      $("#db-upload-frame").show();
      uploadDBListenner();
    }, function(error) {
      console.log(error);
      alert("로그인 실패");
    }
  );

  console.log("로그인 함수 실행 끝");
}

$("#login-btn").click(
  function() {
    login();
  }
);


function uploadDB() {
    firebase.database().ref().set(
      {
        groupChat: $("#input-txt").val()
      }
    );
}

function uploadDBListenner() {
  firebase.database().ref().on('child_changed', function(data) {
    $("#real-time-val").text(data.val());
  });
}

$("#send-btn").click(
  function() {
    uploadDB();
  }
);

function logout() {
  console.log("로그아웃");
  $("#db-upload-frame").hide();
  $("#login-frame").show();
}

$("#logout-btn").click(
  function() {
    logout();
  }
);

function getEmail() {
  return $("#email").val();
}

function getPassword() {
  return $("#password").val();
}

function setDBdata(data) {
  $("#real-time-val").text(data);
}
