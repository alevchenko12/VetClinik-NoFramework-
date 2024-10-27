document.addEventListener('DOMContentLoaded', () => {
    // Вибираємо форму зворотнього зв'язку, щоб додати нове поле
    const feedbackForm = document.getElementById('feedback-form');

    // Створюємо новий div з класом form-group для поля "Детально"
    const detailsFormGroup = document.createElement('div');
    detailsFormGroup.className = 'form-group';

    // Створюємо мітку (label) для поля "Детально"
    const detailsLabel = document.createElement('label');
    detailsLabel.setAttribute('for', 'details');
    detailsLabel.innerText = 'Детально:';

    // Створюємо textarea (поле для введення тексту) для поля "Детально"
    const detailsTextarea = document.createElement('textarea');
    detailsTextarea.id = 'details';
    detailsTextarea.name = 'details';

    // Додаємо мітку і textarea до блоку form-group
    detailsFormGroup.appendChild(detailsLabel);
    detailsFormGroup.appendChild(detailsTextarea);

    // Додаємо form-group до форми зворотнього зв'язку перед кнопкою відправки
    feedbackForm.insertBefore(detailsFormGroup, feedbackForm.querySelector('.form-group:last-child'));

    // Створюємо елемент підказки (tooltip)
    const tooltip = document.createElement('span');
    tooltip.innerText = 'Ваша думка для нас важлива! Конкретизуйте мету звернення, будь ласка';
    tooltip.style.position = 'absolute';
    tooltip.style.backgroundColor = '#333';
    tooltip.style.color = '#fff';
    tooltip.style.padding = '5px 10px';
    tooltip.style.borderRadius = '5px';
    tooltip.style.fontSize = '12px';
    tooltip.style.display = 'none'; // Спочатку прихований
    tooltip.style.whiteSpace = 'nowrap';
    document.body.appendChild(tooltip);

    // Додаємо обробник події для наведення миші, щоб показати підказку та застосувати стилі
    detailsTextarea.addEventListener('mouseenter', () => {
        const rect = detailsTextarea.getBoundingClientRect();
        tooltip.style.top = `${rect.top + window.scrollY}px`;
        tooltip.style.left = `${rect.right + 10 + window.scrollX}px`;
        tooltip.style.display = 'block'; // Показати підказку

        // Застосувати стилі до поля "Детально" при наведенні
        detailsTextarea.style.backgroundColor = '#e0f7fa';
        detailsTextarea.style.border = '1px solid #007bff';
        detailsTextarea.style.boxShadow = '0px 0px 8px rgba(0, 123, 255, 0.5)';
    });

    // Додаємо обробник події, щоб приховати підказку та зняти стилі при прибиранні курсора
    detailsTextarea.addEventListener('mouseleave', () => {
        tooltip.style.display = 'none'; // Приховати підказку

        // Зняти стилі з поля "Детально" при прибиранні курсора
        detailsTextarea.style.backgroundColor = '';
        detailsTextarea.style.border = '';
        detailsTextarea.style.boxShadow = '';
    });
});
