function includeHTML() { //HTML에 외부파일을 끼워넣는 함수 (AJAX 기반)
    var z, i, elmnt, file, xhttp; //변수선언

    z = document.getElementsByTagName("*") //페이지 안에 있는 모든 태그들을 z라는 변수에 담음

    for (i = 0; i < z.length; i++) { //요소 개수만큼 반복
        elmnt = z[i]; // 현재 반복 중인 요소를 elmnt 변수에 저장
        file = elmnt.getAttribute("w3-include-html"); //모든 요소를 순회하면서 속성 검사
        if (file) { //만약 file 속성이 있다면
            xhttp = new XMLHttpRequest(); //속성이 있다면 AJAX 요청 준비

            xhttp.onreadystatechange = function () {
                if (this.readyState == 4) { //요청 완료되면
                    if (this.status == 200) { //성공
                        elmnt.innerHTML = this.responseText;
                    }

                    if (this.status == 404) { //실패
                        elmnt.innerHTML = "Page not found"
                    }
                    elmnt.removeAttribute("w3-include-html"); //"w3-include-html" 제거
                    includeHTML(); //재귀(스스로 호출) 호출
                }
            }
            xhttp.open("GET", file, true);//비동기(true) 방식 요청
            xhttp.send();
            return; //함수 종료, 현재 요소 처리
        }
    }
}