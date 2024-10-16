// Крок 1: Створення масиву для зберігання послуг із властивостями послуг
const services = [
    { id: 1, name: 'Анестезія', doctor: 'Др. Олексій', usersMonth1: 200, usersMonth2: 200, price: 3580, duration: 30 },
    { id: 2, name: 'Вакцинації', doctor: 'Др. Олена', usersMonth1: 120, usersMonth2: 90, price: 1550, duration: 15 },
    { id: 3, name: 'Діагностика', doctor: 'Др. Микола', usersMonth1: 80, usersMonth2: 60, price: 3580, duration: 45 }, // Та ж ціна, що й у Анестезії
    { id: 4, name: 'Консультації', doctor: 'Др. Ірина', usersMonth1: 200, usersMonth2: 250, price: 1550, duration: 20 }, // Та ж ціна, що й у Вакцинації
    { id: 5, name: 'Стаціонар', doctor: 'Др. Галина', usersMonth1: 50, usersMonth2: 40, price: 1000, duration: 60 },
    { id: 6, name: 'Терапія', doctor: 'Др. Андрій', usersMonth1: 180, usersMonth2: 180, price: 600, duration: 25 },
    { id: 7, name: 'Хірургія для тварин', doctor: 'Др. Сергій', usersMonth1: 90, usersMonth2: 80, price: 16000, duration: 120 },
    { id: 8, name: 'Чіпування тварин', doctor: 'Др. Лариса', usersMonth1: 75, usersMonth2: 70, price: 1250, duration: 10 },
    { id: 9, name: 'Рентген', doctor: 'Др. Петро', usersMonth1: 45, usersMonth2: 55, price: 1000, duration: 30 }, // Та ж ціна, що й у Стаціонару
    { id: 10, name: 'Стоматологія', doctor: 'Др. Анастасія', usersMonth1: 130, usersMonth2: 90, price: 600, duration: 30 } // Та ж ціна, що й у Терапії
];

// Крок 2: Функція для сортування послуг за ціною 
function sortServicesByPrice(services) {
    return services.sort((a, b) => a.price - b.price); // Сортування за зростанням ціни
}

// Крок 3: Функція для обчислення середньої тривалості послуг, які мають однакову ціну
function calculateAverageDuration(services) {
    const durationMap = {}; // Об'єкт для зберігання загальної тривалості та кількості послуг для кожної ціни

    services.forEach(service => {
        // Групуємо послуги за ціною
        if (!durationMap[service.price]) {
            durationMap[service.price] = { totalDuration: 0, count: 0 };
        }
        // Додаємо тривалість і збільшуємо кількість для кожної групи послуг з однаковою ціною
        durationMap[service.price].totalDuration += service.duration;
        durationMap[service.price].count++;
    });

    const averages = {}; // Об'єкт для зберігання середньої тривалості для кожної ціни
    for (const price in durationMap) {
        if (durationMap.hasOwnProperty(price)) {
            // Обчислюємо середню тривалість для послуг з однаковою ціною
            averages[price] = Number((durationMap[price].totalDuration / durationMap[price].count).toFixed(2)); // Округлення до двох знаків після коми
        }
    }

    return averages; // Повертаємо об'єкт з середніми значеннями тривалості
}

// Крок 4: Функція для пошуку послуги з максимальною кількістю користувачів у першому місяці
function findMaxUsers(services) {
    let maxUsersService = services[0]; // Початково припускаємо, що перша послуга має максимум користувачів
    for (let i = 1; i < services.length; i++) {
        if (services[i].usersMonth1 > maxUsersService.usersMonth1) {
            maxUsersService = services[i]; // Якщо знайдено послугу з більшою кількістю користувачів, оновлюємо
        }
    }
    return maxUsersService; // Повертаємо послугу з найбільшою кількістю користувачів
}

// Крок 5: Функція для додавання нової послуги з валідацією даних
function addService(newService) {
    // Перевірка на відсутність інформації (якщо хоч одна властивість undefined, null або порожній рядок)
    const hasMissingInfo = !newService.name || !newService.doctor || !newService.price || !newService.duration;

    if (hasMissingInfo) {
        // Якщо є відсутня інформація, додаємо послугу в кінець масиву
        services.push(newService);
        console.log("Додано послугу з відсутньою інформацією в кінець:", newService);
    } else {
        // Якщо всі дані присутні, знаходимо правильне місце в порядку спадання цін
        let added = false;
        for (let i = 0; i < services.length; i++) {
            if (newService.price > services[i].price) {
                services.splice(i, 0, newService); // Вставляємо нову послугу на відповідну позицію
                added = true;
                break;
            }
        }

        // Якщо нова послуга має найменшу ціну, додаємо її в кінець
        if (!added) {
            services.push(newService);
        }

        console.log("Додано послугу з повною інформацією на відповідну позицію:", newService);
    }
}

// Крок 6: Функція для оновлення цін на послуги на основі залученості користувачів (за місяць)
function updateServicePrices(services) {
    return services.map(service => {
        if (service.usersMonth1 < service.usersMonth2) {
            service.price = Number((service.price * 1.15).toFixed(2)); // Збільшення ціни на 15%, якщо залученість зросла
        } else if (service.usersMonth1 > service.usersMonth2) {
            service.price = Number((service.price * 0.95).toFixed(2)); // Зменшення ціни на 5%, якщо залученість впала
        }
        return service;
    });
}

// Крок 7: Ініціалізація основної логіки програми
function initialize() {
    const sortedServices = sortServicesByPrice(services); // Сортуємо послуги за ціною
    const averageDurations = calculateAverageDuration(services); // Обчислюємо середню тривалість
    const maxUsersService = findMaxUsers(services); // Знаходимо послугу з найбільшою кількістю користувачів у першому місяці

    // Крок 8: Виведення результатів у консоль
    console.log("Відсортовані послуги за ціною:", sortedServices);
    console.dir(sortedServices); // Використовуємо console.dir() для зручного перегляду об'єктів
    console.log("Середня тривалість за ціною:", averageDurations);
    console.log("Послуга з максимальною кількістю користувачів у першому місяці:", maxUsersService.id);

    // Крок 9: Додаємо нову послугу
    const newServiceWithMissingInfo = { id: 11, name: 'Гомеопатія', doctor: '', usersMonth1: 60, usersMonth2: 80, price: 1000, duration: 30 }; // Відсутній лікар
    const newServiceComplete = { id: 12, name: 'Масаж для тварин', doctor: 'Др. Валентина', usersMonth1: 40, usersMonth2: 50, price: 5000, duration: 45 }; // Повна інформація
    addService(newServiceWithMissingInfo);
    addService(newServiceComplete);
    console.log("Оновлений список послуг:");
    console.dir(services);
    
    // Крок 10: Оновлюємо ціни на основі залученості користувачів
    const updatedServices = updateServicePrices(services);

    // Виводимо оновлений список послуг у консоль
    console.log("Оновлені ціни на послуги:");
    console.dir(updatedServices.map(s => ({ name: s.name, price: s.price, doctor: s.doctor })));

    // Крок 11: Додатковий приклад використання Math та Date
    const currentDate = new Date();
    console.log("Поточна дата:", currentDate.toLocaleDateString());

    // Приклад використання Math.random для генерації випадкових знижок на послуги
    services.forEach(service => {
        const randomDiscount = Number((Math.random() * 10).toFixed(2)); // Випадкова знижка між 0 та 10%
        console.log(`Випадкова знижка для ${service.name}: ${randomDiscount}%`);
    });
}

// Викликаємо функцію initialize при завантаженні скрипта
initialize();
