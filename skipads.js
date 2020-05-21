//Youtube one-click ads skipper.
(function () {
  //look for a button with the text "skip ads"
  setInterval(() => {
    let b = [...document.querySelectorAll('button')]
      .filter(x => x.textContent.toLowerCase() == 'skip ads')[0];
    let b2 = document.querySelector(".ytp-ad-overlay-close-button");
    if (b) b.click();
    // @ts-ignore
    if (b2) b2.click();
  }, 500);

  //create banner for top of screen
  let e = document.createElement("div");
  e.innerText = 'From now on Ads will be skipped on this page.'
    + 'If a new webpage is loaded, you will need to click again for the new webpage.';
  let sheet = document.createElement('style');
  sheet.innerHTML = `#msg_b_._fade {
  opacity:0;
}
#msg_b_{
  background-color:green;
  color:black;
  position:fixed;
  font-size:14px;
  top:2px;
  z-index:99999;
  opacity:1;
  transition:opacity 5s;
   }
`;
  e.id = "msg_b_";
  document.body.append(sheet, e);
  setTimeout(() => e.classList.add('_fade'), 2000);
})();