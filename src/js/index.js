// Вибір заголовку, де будуть з'являтися сніжинки
const header = document.querySelector('header');

// Функція для створення та анімації сніжинок
function createSnowflake() {
    const snowflake = document.createElement('div'); // Створення елемента сніжинки
    snowflake.innerHTML = '❄️'; // Символ сніжинки (можна також використовувати зображення)
    snowflake.style.position = 'absolute';
    snowflake.style.color = '#FFF';
    
    // Обчислення випадкового розміру сніжинки, що вдвічі перевищує висоту тексту заголовку
    const headerText = header.querySelector('h1');
    const headerFontSize = window.getComputedStyle(headerText).fontSize;
    const snowflakeSize = parseFloat(headerFontSize) * 2; // Подвоєна висота тексту заголовку
    
    // Встановлення розміру та позиції сніжинки    
    /* 1. Math.random() генерує випадкове число між 0 і 1.
       2. Помноживши це число на 100 (Math.random() * 100), ми отримуємо випадкове значення від 0 до 100.
       3. Значення додається в стилі через шаблонний рядок ${Math.random() * 100}%, перетворюючи його у відсотки (%), 
       що дозволяє позиціювати сніжинку в межах від 0% до 100% висоти екрану.
    */
    snowflake.style.fontSize = `${snowflakeSize}px`;
    snowflake.style.top = `${Math.random() * 100}%`; // Випадкова вертикальна позиція
    snowflake.style.left = `-${snowflakeSize}px`; // Початок за екраном з лівого боку
    header.appendChild(snowflake);
    
    // Визначення анімації для руху сніжинки по екрану
    const duration = 5000 + Math.random() * 3000; // Випадкова тривалість від 5 до 8 секунд
    const startTime = Date.now();

    function animate() {
        const elapsed = Date.now() - startTime;
        const progress = elapsed / duration;

        // Переміщення сніжинки зліва направо в залежності від прогресу
        snowflake.style.left = `${progress * 100}%`;

        // Якщо анімація завершена, видаляємо сніжинку та зупиняємо анімацію
        if (progress < 1) {
            requestAnimationFrame(animate); // Продовження анімації
        } else {
            snowflake.remove(); // Видалення сніжинки після виходу за екран
        }
    }
    animate();
}

// Функція для періодичного створення сніжинок
function startSnowfall() {
    setInterval(createSnowflake, 1000); // Створення сніжинки кожну секунду
}

// Запуск снігопаду після повного завантаження DOM
document.addEventListener('DOMContentLoaded', startSnowfall);
