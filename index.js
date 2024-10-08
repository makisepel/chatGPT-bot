// DOMContentLoaded 이벤트를 사용.
// DOM이 완전히 로드된 후에 JS코드가 실행되도록 보장할 수 있음.

document.addEventListener('DOMContentLoaded', function() {
    // 1. 사용할 DOM 선택하기
    const chatLog = document.getElementById('chat-log');
    const userInput = document.getElementById('user-input');
    const sendButton = document.getElementById('send-button');
    const buttonIcon = document.getElementById('button-icon');
    const info = document.querySelector('.info');


    // 2. 버튼 클릭 시 이벤트 추가하기.
    sendButton.addEventListener('click', sendMessage);

    /**
     * 3. sendMessage함수 구현하기
     * 입력창에 입력받은 값을 저장 및 보내는 함수
     */
    function sendMessage() {
        // 1. 받아온 값 저장하기 : trim()함수 사용 (공백 제거 함수)
        const message = userInput.value.trim();

        // 2. 비어있는 값은 함수 호출 X (공백 입력 시 send하지 않기)
        if (message === "") {
            return;
        } else {     // 3. 사용자가 입력한 message 화면에 띄우기 (container)
            // 입력창 비우기
            userInput.value = "";

            // else문으로 묶어도 됨
            appendMessage('user', message);
            setTimeout(() => {
                appendMessage('bot', '나는 봇입니다.');
                buttonIcon.classList.add('fa-solid', 'fa-paper-plane');
                buttonIcon.classList.remove('fas', 'fa-spinner', 'fa-pulse');
            }, 1000);
        }
    };

    /**
     * 4. appendMessage함수 구현하기.
     * message를 chat-log에 띄우는 함수.
     */
    function appendMessage(sender, message) {
        info.style.display = 'none';

        buttonIcon.classList.add('fas', 'fa-spinner', 'fa-pulse');
        buttonIcon.classList.remove('fa-solid', 'fa-paper-plane');

        // 메시지를 담을 node 생성하기
        const chatElement = document.createElement('div');      // 전체 채팅 div
        const messageElement = document.createElement('div');   // 채팅 텍스트가 들어갈 div
        const iconElement = document.createElement('div');      // 사용자/봇 icon이 들어갈 div
        const icon = document.createElement('i');             // icon이 들어갈 div

        chatElement.classList.add('chat-box');
        iconElement.classList.add('icon');
        messageElement.classList.add(sender);   // 전송자가 누구인지 명시

        messageElement.innerText = message;     // 메시지가 채팅 텍스트에 들어가도록 설정

        if (sender === 'user') {
            icon.classList.add('fa-regular', 'fa-user');
            iconElement.setAttribute('id', 'user-icon');    // 아이디를 #user-icon으로 설정
        } else {
            icon.classList.add('fa-solid', 'fa-robot');
            iconElement.setAttribute('id', 'bot-icon');     // 아이디를 #bot-icon으로 설정
        }

        // node를 tree에 연결하기 - appendChild()함수를 사용
        iconElement.appendChild(icon);              // icon div에 icon 추가
        chatElement.appendChild(iconElement);       // 전체 div에 iconElement 연결
        chatElement.appendChild(messageElement);    // 전체 div에 messageElement 연결
        chatLog.appendChild(chatElement);           // chatLog (container)에 전체 div를 연결
    }
});

