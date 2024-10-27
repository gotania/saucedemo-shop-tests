const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ 
    headless: false,   // Браузер открывается в видимом режиме для отладки
    slowMo: 100        // Задержка между действиями для наглядности
  }); 

  const page = await browser.newPage();
  await page.goto('https://www.saucedemo.com'); // Переходим на сайт без параметра waitUntil

  // Заполняем поля логина и пароля
  await page.type('#user-name', 'standard_user');
  await page.type('#password', 'secret_sauce');

  // Кликаем на кнопку входа
  await page.click('#login-button');

  // Ожидаем появления элемента корзины после авторизации (успешный логин)
 
    await page.waitForSelector('.shopping_cart_link', { timeout: 30000 });
    console.log('Авторизация прошла успешно!');
  

  // Закрываем браузер после завершения
  await browser.close();
})();
