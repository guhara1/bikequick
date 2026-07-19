// 모바일 네비게이션 토글 + 드롭다운 아코디언
(function () {
  "use strict";
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".main-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "메뉴 닫기" : "메뉴 열기");
    });
  }

  // 모바일에서 드롭다운이 있는 상위 메뉴는 탭 시 하위 메뉴 펼치기
  var mq = window.matchMedia("(max-width: 820px)");
  document.querySelectorAll(".nav-item.has-dd > .nav-link").forEach(function (link) {
    link.addEventListener("click", function (e) {
      if (mq.matches) {
        var item = link.parentElement;
        // 이미 펼쳐진 상태면 링크 이동 허용, 아니면 펼치기
        if (!item.classList.contains("expanded")) {
          e.preventDefault();
          item.classList.toggle("expanded");
        }
      }
    });
  });

  // 화면 크기 변경 시 모바일 메뉴 상태 초기화
  window.addEventListener("resize", function () {
    if (!mq.matches && nav) {
      nav.classList.remove("open");
      if (toggle) toggle.setAttribute("aria-expanded", "false");
    }
  });
})();
