const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ 
    headless: false,   
    slowMo: 300       
  }); 

  const page = await browser.newPage();
  await page.goto('https://www.saucedemo.com');
  // Используем неверные данные для авторизации
  await page.type('#user-name', 'standard_user1');
  await page.type('#password', 'wrong_password');

  await page.click('#login-button');

  // Ожидаем появления сообщения об ошибке
  const errorMessageSelector = '#login_button_container > div > form > div.error-message-container.error > h3'; // Найди правильный селектор для сообщения об ошибке
  await page.waitForSelector(errorMessageSelector, { timeout: 1000 });

  // Проверяем, что сообщение об ошибке действительно отображается
  const errorMessage = await page.$eval(errorMessageSelector, el => el.textContent);
  
  if (errorMessage.includes('Epic sadface: Username and password do not match any user in this service')) {
    console.log('Тест с неверным логином прошел: Ошибка отображается корректно.');
  } else {
    console.log('Тест провален: Ошибка не отображается.');
  }

  await browser.close();
})();

