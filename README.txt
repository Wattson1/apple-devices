Практическая работа №4
Тема: Добавление репозитория и локального хранилища (Git и LocalStorage)
Студент: Савин Иван Вадимович, БИВТ-24-5

================================================================
Состав проекта
================================================================
index.html             - главная страница сайта
catalog.html           - страница каталога устройств
iphone-17.html         - карточка товара iPhone 17
airpods-pro-3.html     - карточка товара AirPods Pro 3
macbook-pro-14-m5.html - карточка товара MacBook Pro 14" (M5)
cart.html              - страница корзины
script.js              - вся клиентская логика, включая работу с LocalStorage
style.css              - стили сайта
img/                   - изображения товаров

================================================================
Команды Git, использованные при выполнении работы
================================================================
# 1) Инициализация локального репозитория в папке проекта
git init
git add .
git commit -m "Initial commit: site from PR-3"

# 2) Подключение удалённого репозитория на GitHub
git remote add origin https://github.com/<username>/apple-devices.git
git branch -M main
git push -u origin main

# 3) Создание новой ветки для задачи LocalStorage
git checkout -b feature/LocalStorage

# 4) После реализации сохранения/загрузки корзины
git add script.js
git commit -m "feat(cart): сохранение и загрузка корзины через LocalStorage"
git push -u origin feature/LocalStorage

# 5) Объединение ветки с главной
git checkout main
git merge feature/LocalStorage
git push origin main

================================================================
Ключевые моменты по LocalStorage (см. script.js)
================================================================
1. Загрузка корзины при старте страницы (выполняется на этапе
   инициализации модуля script.js):

   let cart = JSON.parse(localStorage.getItem("appleDevicesCart") || "[]");

2. Сохранение корзины:

   const saveCart = () => {
     localStorage.setItem("appleDevicesCart", JSON.stringify(cart));
   };

3. После КАЖДОЙ операции с корзиной вызывается saveCart():
   - addToCart()    - добавление товара
   - removeFromCart() - удаление товара
   - clearCart()    - очистка корзины (вызывается также из pay())

4. Ключ хранения: "appleDevicesCart" (вместо общего "cart"), чтобы
   избежать конфликтов с другими сайтами на localhost.

================================================================
Запуск
================================================================
Открыть index.html в браузере (двойным щелчком) или запустить
встроенный HTTP-сервер из папки проекта:

   python3 -m http.server 8000

затем перейти по адресу http://localhost:8000/
