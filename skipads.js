//Youtube one-click ads skipper.
(function () {
  showMessage();
  let mutedBecauseAd = false;
  setInterval(() => {
    clickSkipButton();
    closeBannerAd();
    muteIfAdRunning();
  }, 500);

  function clickSkipButton() {
    let b = [...document.querySelectorAll('button')]
      .filter(x => ~x.textContent.search(/[sS]kip [aA]d/))[0];
    if (b) b.click();
  }
  function closeBannerAd() {
    let b2 = document.querySelector(".ytp-ad-overlay-close-button");
    // @ts-ignore
    if (b2) b2.click();
  }
  function muteIfAdRunning() {
    //also unmutes if Ad not running
    let adElem = document.querySelector(".ytp-ad-text");
    let muteBtn = document.querySelector(".ytp-mute-button");
    let adRunning = !!adElem;
    if (adRunning) {
      isMuted = !!~muteBtn.ariaLabel.toLowerCase().search("unmute");
      if (!isMuted) {
        muteBtn.click();
        mutedBecaseAd = true;
      }
    } else {
      if (mutedBecauseAd) {
        muteBtn.click();
        mutedBecauseAd = false;
      }
    }
  }
  function showMessage() {
    //create banner for top of screen
    let e = document.createElement("div");
    e.innerText = 'Ads will be skipped on this page.';
    let sheet = document.createElement('style');
    sheet.innerHTML = `#msg_b_._fade {
  opacity:0;
  }
  #msg_b_{
    background-color:LemonChiffon;
    color:LightCoral;
    position:fixed;
    font-size:24;
    top:2px;
    z-index:99999;
    opacity:1;
    transition:opacity 5s;
    }
  `;
    e.id = "msg_b_";
    document.body.append(sheet, e);
    setTimeout(() => e.classList.add('_fade'), 2000);
  }
})();