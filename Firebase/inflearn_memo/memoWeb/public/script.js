var auth = firebase.auth();
var authProvider = new firebase.auth.GoogleAuthProvider();

auth.onAuthStateChanged(function(user) {
  if(user) {
    // 인증 성공
    console.log("sucess!");

    // 메모 리스트 출력
  } else {
    // 인증 실패
    auth.signInWithPopup(authProvider);
    console.log("false!");
  }
});
