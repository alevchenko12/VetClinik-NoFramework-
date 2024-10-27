// Створити контейнер акордеону
const accordion = document.createElement('div');
accordion.className = 'accordion';
accordion.style.position = 'fixed'; // Фіксована позиція в верхньому правому куті
accordion.style.top = '10px';
accordion.style.right = '10px'; // Змінено на розміщення в правому куті
accordion.style.width = '250px';
accordion.style.border = '1px solid #ccc';
accordion.style.borderRadius = '5px';
accordion.style.padding = '10px';
accordion.style.backgroundColor = '#f9f9f9';
accordion.style.zIndex = '1000'; // Забезпечити, щоб він був вище інших елементів

// Додати заголовок для акордеону
const accordionTitle = document.createElement('h2');
accordionTitle.innerText = 'Короткий опис послуг';
accordionTitle.style.marginTop = '0';
accordionTitle.style.fontSize = '18px';
accordionTitle.style.textAlign = 'center';
accordion.appendChild(accordionTitle);

// Отримати елементи послуг з HTML
const serviceItems = document.querySelectorAll('.service-item');

// Динамічно додати кожну послугу до акордеону
serviceItems.forEach(item => {
    const serviceName = item.querySelector('h3').innerText; // Назва послуги
    const serviceDescription = item.querySelector('p').innerText; // Опис послуги

    const serviceItem = document.createElement('div');

    // Створити кнопку для кожної послуги
    const btn = document.createElement('button');
    btn.className = 'accordion-btn';
    btn.innerText = serviceName;
    btn.style.backgroundColor = '#007bff';
    btn.style.color = 'white';
    btn.style.padding = '10px';
    btn.style.width = '100%';
    btn.style.textAlign = 'left';
    btn.style.border = 'none';
    btn.style.outline = 'none';
    btn.style.cursor = 'pointer';
    btn.style.borderRadius = '3px';
    btn.style.fontSize = '16px';
    serviceItem.appendChild(btn);

    // Створити блок вмісту для кожного опису послуги
    const content = document.createElement('div');
    content.className = 'accordion-content';
    content.innerText = serviceDescription;
    content.style.display = 'none';
    content.style.padding = '10px';
    content.style.borderTop = '1px solid #ddd';
    content.style.backgroundColor = '#fff';
    content.style.fontSize = '14px';
    content.style.color = '#333';
    serviceItem.appendChild(content);

    // Перемикати показ/сховати при натисканні на кнопку
    /* 
    Вся ця частина коду дозволяє переключати видимість вмісту акордеону при натисканні на кнопку. 
    Коли ви натискаєте кнопку, спочатку перевіряється, чи вміст вже видимий. 
    Якщо так, він буде прихований. Якщо ж вміст не видимий, він відобразиться. 
    Також перед відкриттям нового вмісту всі інші вмісти акордеону ховаються, 
    забезпечуючи, що на екрані відображається лише один активний вміст в даний момент.
    */
    btn.addEventListener('click', () => {
        const isVisible = content.style.display === 'block';
        document.querySelectorAll('.accordion-content').forEach(item => item.style.display = 'none');
        content.style.display = isVisible ? 'none' : 'block';
    });

    accordion.appendChild(serviceItem);
});

// Додати акордеон до тіла документа
document.body.appendChild(accordion);

/////////////////////////////////////////////////////////

document.addEventListener('DOMContentLoaded', () => {
    // Створюємо контейнер для пошуку
    const searchContainer = document.createElement('div');
    searchContainer.style.marginBottom = '20px';
    searchContainer.style.display = 'flex';
    searchContainer.style.alignItems = 'center';
    searchContainer.style.gap = '10px';

    // Створюємо елемент label для поля пошуку
    const searchLabel = document.createElement('label');
    searchLabel.innerText = 'Пошук:';
    searchLabel.style.fontSize = '16px';

    // Створюємо поле введення для пошуку
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Введіть назву послуги';
    searchInput.style.padding = '5px';
    searchInput.style.fontSize = '16px';
    searchInput.style.width = '100%';
    searchInput.style.maxWidth = '300px';
    searchInput.style.border = '1px solid #ccc';
    searchInput.style.borderRadius = '5px';

    // Додаємо label і input в контейнер
    searchContainer.appendChild(searchLabel);
    searchContainer.appendChild(searchInput);

    // Додаємо контейнер пошуку перед списком послуг
    const main = document.querySelector('main');
    main.insertBefore(searchContainer, main.querySelector('.service-list'));

    // Отримуємо всі елементи послуг
    const serviceItems = document.querySelectorAll('.service-item');

    // Функція для фільтрації послуг
    function filterServices() {
        const searchText = searchInput.value.toLowerCase();

        serviceItems.forEach(item => {
            const serviceName = item.querySelector('h3').innerText.toLowerCase();
            // Показуємо або приховуємо послугу на основі пошукового запиту
            item.style.display = serviceName.includes(searchText) ? 'block' : 'none';
        });
    }

    // Додаємо подію для фільтрації під час введення тексту в поле пошуку
    searchInput.addEventListener('input', filterServices);
});
