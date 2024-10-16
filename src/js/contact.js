// Клас для користувача
class User {
    constructor(name, age, education, email, reason, date, time) {
        this._name = name;
        this._age = Number(age); // Number перетворення типу
        this._education = education;
        this._email = email;
        this._reason = reason;
        this._date = new Date(date); // Створюємо об'єкт дати
        this._time = time;
    }

    // Метод для отримання часу звернення як числа
    getTimeInHours() {
        return Number(this._time.split(':')[0]); // повертаємо годину
    }

    // Метод для порівняння імен користувачів
    static compareNames(userA, userB) {
        return userA._name.localeCompare(userB._name); // сортування за алфавітом
    }
}

// Масив для зберігання користувачів
const users = [];

// Функція для додавання користувача
function addUser(user) {
    users.push(user);
}

// Обробка форми зворотнього зв'язку
document.getElementById('feedback-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const age = Number(document.getElementById('age').value);
    const education = document.getElementById('education').value;
    const email = document.getElementById('email').value;
    const reason = document.getElementById('reason').value;
    const date = new Date().toLocaleDateString();  // поточна дата
    const time = new Date().toLocaleTimeString();  // поточний час
    
    const newUser = new User(name, age, education, email, reason, date, time);
    addUser(newUser);

    console.dir(newUser); // Використання console.dir() для виведення об'єкту
});

// Функція для виведення користувачів за певний місяць
function getUsersByMonth(month) {
    return users.filter(user => user._date.getMonth() + 1 === month);
}

// Функція для отримання наймолодшого користувача
function getYoungestUser() {
    let youngestUser = users[0];
    for (let i = 1; i < users.length; i++) {
        if (users[i]._age < youngestUser._age) {
            youngestUser = users[i];
        }
    }
    console.log(`Наймолодший користувач: ${youngestUser._name}, Вік: ${youngestUser._age}, Освіта: ${youngestUser._education}`);
    return youngestUser;
}

// Функція для поділу користувачів за часом звернення (робочий/неробочий)
function categorizeUsersByTime() {
    const workingUsers = [];
    const nonWorkingUsers = [];
    let workingAgeSum = 0, nonWorkingAgeSum = 0;

    users.forEach(user => {
        const hour = user.getTimeInHours();
        if (hour >= 9 && hour <= 17) {
            workingUsers.push(user);
            workingAgeSum += user._age;
        } else {
            nonWorkingUsers.push(user);
            nonWorkingAgeSum += user._age;
        }
    });

    const workingAverageAge = workingUsers.length ? (workingAgeSum / workingUsers.length).toFixed(2) : 0;
    const nonWorkingAverageAge = nonWorkingUsers.length ? (nonWorkingAgeSum / nonWorkingUsers.length).toFixed(2) : 0;

    console.log(`Кількість користувачів у робочий час: ${workingUsers.length}, Середній вік: ${workingAverageAge}`);
    console.log(`Кількість користувачів у неробочий час: ${nonWorkingUsers.length}, Середній вік: ${nonWorkingAverageAge}`);
}

// Функція для сортування користувачів за алфавітом і виведення мети
function sortUsersAlphabetically() {
    users.sort(User.compareNames);
    console.log("Користувачі за алфавітом:");
    users.forEach(user => console.log(`${user._name}: Мета - ${user._reason}`));
}

// Функція для створення 10 прикладів користувачів
function createSampleUsers() {
    const sampleData = [
        { name: "Іван Петров", age: 30, education: "Вища", email: "ivan@example.com", reason: "collaboration", date: "2024-10-01", time: "10:00" },
        { name: "Олена Коваль", age: 25, education: "Середня", email: "olena@example.com", reason: "complaint", date: "2024-10-05", time: "12:30" },
        { name: "Марія Шевченко", age: 22, education: "Вища", email: "maria@example.com", reason: "suggestion", date: "2024-09-15", time: "16:00" },
        { name: "Андрій Лисенко", age: 40, education: "Вища", email: "andriy@example.com", reason: "error", date: "2024-10-20", time: "19:00" },
        { name: "Світлана Бондар", age: 35, education: "Середня", email: "svitlana@example.com", reason: "suggestion", date: "2024-10-01", time: "11:15" },
        { name: "Петро Іваненко", age: 28, education: "Вища", email: "petro@example.com", reason: "collaboration", date: "2024-09-10", time: "08:00" },
        { name: "Олег Козак", age: 32, education: "Середня", email: "oleg@example.com", reason: "complaint", date: "2024-10-05", time: "17:45" },
        { name: "Тетяна Зубенко", age: 27, education: "Вища", email: "tania@example.com", reason: "error", date: "2024-09-21", time: "09:30" },
        { name: "Наталія Мельник", age: 29, education: "Вища", email: "natalia@example.com", reason: "suggestion", date: "2024-10-08", time: "13:50" },
        { name: "Максим Волошин", age: 33, education: "Вища", email: "maxim@example.com", reason: "complaint", date: "2024-10-12", time: "15:00" }
    ];

    sampleData.forEach(data => {
        const user = new User(data.name, data.age, data.education, data.email, data.reason, data.date, data.time);
        addUser(user);
    });
}

// Викликаємо функції для тестування
createSampleUsers();
console.log(getUsersByMonth(10));  // Користувачі за жовтень
getYoungestUser();  // Наймолодший користувач
categorizeUsersByTime();  // Поділ на робочий/неробочий час
sortUsersAlphabetically();  // Сортування за алфавітом