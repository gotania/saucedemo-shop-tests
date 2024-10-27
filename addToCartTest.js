const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ 
    headless: false,   
    slowMo: 300       
  });

  const page = await browser.newPage();
  await page.goto('https://www.saucedemo.com', { timeout: 60000 });

  // Входим в систему с правильным логином
  await page.type('#user-name', 'standard_user');
  await page.type('#password', 'secret_sauce');

  // Кликаем на кнопку входа
  await page.click('#login-button');

  // Ждем, пока элемент корзины появится (подтверждение входа)
  await page.waitForSelector('#shopping_cart_container > a', { visible: true });

  // Добавляем первый товар в корзину
  await page.click('.btn_primary'); // Нажимаем кнопку "Add to cart"

  // Проверяем, что товар добавлен в корзину
  const cartCount = await page.$eval('.shopping_cart_badge', (element) => {
    return element.textContent; 
  });

  if (cartCount === '1') {
    console.log('Товар успешно добавлен в корзину.');
  } else {
    console.log('Не удалось добавить товар в корзину.');
  }

  // Кликаем на элемент корзины, чтобы перейти в корзину
  await page.click('#shopping_cart_container > a');

 

  await browser.close();
})();
