function drawCircle(num_list) {
    let container = document.getElementsByClassName("lotto-wrapper")[0];
    let row = document.createElement("div");
    let result_span = document.createElement("span");
    row.className = "ball-row";
    result_span.className = "result";
    for (i in num_list) {
        let num = num_list[i]
        let span = document.createElement("span");
        span.textContent = num_list[i]
        setBallColor(span, num)
        row.appendChild(span)
        row.appendChild(result_span)
    }
    container.appendChild(row)
    container.scrollTop = container.scrollHeight;
}

function drawWinCircle(num_list) {
    let win_wrapper = document.getElementsByClassName("win-number")[0];
    let bonus_wrapper = document.getElementsByClassName("bonus-number")[0];
    for (i in num_list) {
        let num = num_list[i]
        let span = document.createElement("span");
        span.textContent = num_list[i]
        setBallColor(span, num)
        if(i == 6) {
            win_wrapper.innerHTML += " + ";
            span.className += " bonus-num";
            bonus_wrapper.appendChild(span);
            return;
        }
        win_wrapper.appendChild(span)
    }
}

function setBallColor(span, num) {
    if(num > 0 && num < 11) {
        span.className = "num-circle num-1-10"
    }
    else if(num > 10 && num < 21) {
        span.className = "num-circle num-11-20"
    }
    else if(num > 20 && num < 31) {
        span.className = "num-circle num-21-30"
    }
    else if(num > 30 && num < 41) {
        span.className = "num-circle num-31-40"
    }
    else {
        span.className = "num-circle num-41-45"
    }
}

function reset(){
    // document.getElementsByClassName("lotto-wrapper")[0].innerHTML = ''
    $(".lotto-wrapper").text('')
    // document.getElementsByClassName("win-number")[0].innerHTML = ''
    $(".win-number").text('')
    // document.getElementsByClassName("bonus-number")[0].innerHTML = ''
    $(".bonus-number").text('')
    // document.getElementById("buy-lotto").disabled = false;
    $("#buy-lotto").attr("disabled", false)
    // document.getElementById("check-winner").disabled = false;
    $("#check-winner").attr("disabled", false)
    winning_numbers = []
    bonus_number = 0
    user_lotto_numbers_list = []
}