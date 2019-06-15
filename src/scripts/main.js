(function () {
  const container = document.querySelector(`.authorization__container`);

  if (!container) {
    return;
  }

  const form = container.querySelector(`.form`);

  if (!form) {
    return;
  }

  const submitBtn = form.querySelector(`.form__submit`);
  const tel = document.getElementById(`tel`);
  const password = document.getElementById(`password`);
  const inputs = form.querySelectorAll(`.form__input`);

  form.setAttribute(`novalidate`, true);

  if (!submitBtn && tel && password) {
    return;
  }

  submitBtn.setAttribute(`disabled`, true);

  function isTelValid(val) {
    const pattern = new RegExp(/^8\([0-9]{3}\)[0-9]{3}-[0-9]{2}-[0-9]{2}/i);
    return pattern.test(val);
  }

  function onTelInput(val) {
    let telValue = val.value;
    let valid = false;
    if (telValue !== 0) {
      if (isTelValid(telValue)) {
        valid = true;
      }
    }
    return valid;
  }

  function onPasswordInput(val) {
    let passwordValue = val.value;
    let valid = false;
    if (passwordValue.length >= 5) {
      valid = true;
    }
    return valid;
  }

  function onFormSubmit(evt) {
    evt.preventDefault();
    container.innerHTML = ``;
    container.classList.add(`authorization__container--new`);
    container.textContent = `Добро пожаловать ` + tel.value + `!`;
  }

  function onInput(evt) {
    if (evt.target === tel) {
      if (onTelInput(tel)) {
        tel.classList.add(`form__input--valid`);
        tel.classList.remove(`form__input--invalid`);
      } else {
        tel.classList.add(`form__input--invalid`);
        tel.classList.remove(`form__input--valid`);
      }
    }

    if (evt.target === password) {
      if (onPasswordInput(password)) {
        password.classList.add(`form__input--valid`);
        password.classList.remove(`form__input--invalid`);
      } else {
        password.classList.add(`form__input--invalid`);
        password.classList.remove(`form__input--valid`);
      }
    }

    if (onPasswordInput(password) && onTelInput(tel)) {
      submitBtn.removeAttribute(`disabled`);
      form.addEventListener(`submit`, onFormSubmit);
    } else {
      submitBtn.setAttribute(`disabled`, true);
      form.removeEventListener(`submit`, onFormSubmit);
    }
  }

  if (!inputs) {
    return;
  }

  function addTelMask() {
    tel.addEventListener(`click`, function () {
      tel.value = `8`;
    });

    let oldValue = 0;

    tel.addEventListener(`keydown`, function () {
      let curLen = tel.value.length;

      if (curLen < oldValue) {
        oldValue--;
        return;
      }

      if (curLen === 1) {
        tel.value = tel.value + `(`;
      }

      if (curLen === 5) {
        tel.value = tel.value + `)`;
      }

      if (curLen === 9) {
        tel.value = tel.value + `-`;
      }

      if (curLen === 12) {
        tel.value = tel.value + `-`;
      }

      if (curLen > 15) {
        tel.value = tel.value.substring(0, tel.value.length - 1);
      }

      oldValue++;
    });
  }

  Array.prototype.forEach.call(inputs, function (input) {
    input.addEventListener(`change`, onInput);
    addTelMask();
  });

})();
