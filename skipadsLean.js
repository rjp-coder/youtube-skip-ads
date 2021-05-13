(() => {
  setInterval(() => {
    ö = [...document.querySelectorAll('button')]
      .filter(x => ~x.textContent.search(/[sS]kip [aA]d/))[0];
    if (ö) ö.click();
  }, 500);
})();
