 // Получение ссылок на элементы
    const burgerIcon = document.getElementById('burgerIcon');
    const menu = document.getElementById('menu');

    // Добавление обработчика события на клик по иконке бургер-меню
    burgerIcon.addEventListener('click', () => {
        menu.classList.toggle('open'); // Переключение класса для отображения/скрытия бургер-меню
    });

/*калндарь учит*/
document.addEventListener('DOMContentLoaded', () => {
    const events = new Set(['2023-06-08', '2023-06-15', '2023-06-22']); // Изначальные даты занятий

    const calendar = document.getElementById('calendar-body');
    const monthYear = document.getElementById('month-year');
    const prevMonth = document.getElementById('prev-month');
    const nextMonth = document.getElementById('next-month');
    const eventForm = document.getElementById('event-form');
    const eventDateInput = document.getElementById('event-date');

    let currentMonth = new Date().getMonth();
    let currentYear = new Date().getFullYear();

    const renderCalendar = (month, year) => {
        calendar.innerHTML = '';
        const firstDay = (new Date(year, month, 1).getDay() + 6) % 7; // Понедельник - первый день недели
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        monthYear.textContent = new Date(year, month).toLocaleString('ru-RU', { month: 'long', year: 'numeric' });

        let date = 1;
        let rowCount = Math.ceil((firstDay + daysInMonth) / 7);
        for (let i = 0; i < rowCount; i++) {
            const row = document.createElement('tr');

            for (let j = 0; j < 7; j++) {
                const cell = document.createElement('td');

                if (i === 0 && j < firstDay) {
                    cell.innerHTML = '';
                } else if (date > daysInMonth) {
                    cell.innerHTML = '';
                } else {
                    const cellDate = new Date(year, month, date).toISOString().split('T')[0];
                    cell.innerHTML = date;

                    if (events.has(cellDate)) {
                        cell.classList.add('event');
                    }

                    if (cellDate === new Date().toISOString().split('T')[0]) {
                        cell.classList.add('today');
                    }

                    date++;
                }

                row.appendChild(cell);
            }

            calendar.appendChild(row);
        }
    };

    const updateEvents = (event) => {
        event.preventDefault();
        const newEventDate = eventDateInput.value;
        if (newEventDate && !events.has(newEventDate)) {
            events.add(newEventDate);
            renderCalendar(currentMonth, currentYear);
        }
        eventDateInput.value = '';
    };

    prevMonth.addEventListener('click', () => {
        currentMonth--;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }
        renderCalendar(currentMonth, currentYear);
    });

    nextMonth.addEventListener('click', () => {
        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        renderCalendar(currentMonth, currentYear);
    });

    eventForm.addEventListener('submit', updateEvents);

    renderCalendar(currentMonth, currentYear);
});



/*обычн календарь*/
document.addEventListener('DOMContentLoaded', () => {
    const courseDays = [2, 5, 10, 15, 20]; // Определяем дни курсов

    const calendar = document.getElementById('course-calendar-body');
    const monthYear = document.getElementById('course-month-year');
    const prevMonth = document.getElementById('course-prev-month');
    const nextMonth = document.getElementById('course-next-month');

    let currentMonth = new Date().getMonth();
    let currentYear = new Date().getFullYear();

    const renderCalendar = (month, year) => {
        calendar.innerHTML = '';
        const firstDay = (new Date(year, month, 1).getDay() + 6) % 7; // Понедельник - первый день недели
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        monthYear.textContent = new Date(year, month).toLocaleString('ru-RU', { month: 'long', year: 'numeric' });

        let date = 1;
        let rowCount = Math.ceil((firstDay + daysInMonth) / 7);
        for (let i = 0; i < rowCount; i++) {
            const row = document.createElement('tr');

            for (let j = 0; j < 7; j++) {
                const cell = document.createElement('td');

                if (i === 0 && j < firstDay) {
                    cell.innerHTML = '';
                } else if (date > daysInMonth) {
                    cell.innerHTML = '';
                } else {
                    const cellDate = new Date(year, month, date).toISOString().split('T')[0];
                    cell.innerHTML = date;

                    if (courseDays.includes(date)) {
                        cell.classList.add('course-day');
                    }

                    date++;
                }

                row.appendChild(cell);
            }

            calendar.appendChild(row);
        }
    };

    prevMonth.addEventListener('click', () => {
        currentMonth--;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }
        renderCalendar(currentMonth, currentYear);
    });

    nextMonth.addEventListener('click', () => {
        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        renderCalendar(currentMonth, currentYear);
    });

    renderCalendar(currentMonth, currentYear);
});


  // Добавить скроллинг к секции "Курсы"
 document.getElementById("cours").addEventListener("click", function() {
    document.getElementById("branches2").scrollIntoView({ behavior: 'smooth' });
});

/*окно обр связи */
var feedbackModal = document.getElementById("feedbackModal");
var spanFeedback = document.getElementsByClassName("close")[1];

spanFeedback.onclick = function() {
    feedbackModal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == feedbackModal) {
        feedbackModal.style.display = "none";
    }
}

function openModal(courseName) {
    var courseTitle = document.getElementById("course-title");
    var courseNameInput = document.getElementById("course-name");
    
    courseTitle.textContent = "Запись на курс: " + courseName;
    courseNameInput.value = courseName;
    
    feedbackModal.style.display = "block";
}

function showFeedbackForm(courseName) {
    openModal(courseName);
}

function submitForm() {
    var courseName = document.getElementById("course-name").value;
    var name = document.getElementById("name").value;
    var surname = document.getElementById("surname").value;
    var age = document.getElementById("age").value;
    var phone = document.getElementById("phone").value;

    var nameError = document.getElementById("name-error");
    var surnameError = document.getElementById("surname-error");
    var ageError = document.getElementById("age-error");
    var phoneError = document.getElementById("phone-error");

    // Очистка предыдущих сообщений об ошибках
    nameError.textContent = "";
    surnameError.textContent = "";
    ageError.textContent = "";
    phoneError.textContent = "";

    var isValid = true;

    // Валидация имени
    if (!name) {
        nameError.textContent = "Обязательно к заполнению";
        isValid = false;
    }

    // Валидация фамилии
    if (!surname) {
        surnameError.textContent = "Обязательно к заполнению";
        isValid = false;
    }

    // Валидация возраста
    if (!age) {
        ageError.textContent = "Обязательно к заполнению";
        isValid = false;
    } else if (isNaN(age) || age <= 0) {
        ageError.textContent = "Возраст должен быть положительным числом";
        isValid = false;
    }

    // Валидация телефона
    var phonePattern = /^\+?\d{10,15}$/;
    if (!phone) {
        phoneError.textContent = "Обязательно к заполнению";
        isValid = false;
    } else if (!phone.match(phonePattern)) {
        phoneError.textContent = "Некорректный формат номера телефона";
        isValid = false;
    }

    if (!isValid) {
        return;
    }

    var message = "Запись на курс: " + courseName + "\n";
    message += "Имя: " + name + "\n";
    message += "Фамилия: " + surname + "\n";
    message += "Возраст ребенка: " + age + "\n";
    message += "Телефон: " + phone;
    
    var whatsappLink = "https://wa.me/+79515022195/?text=" + encodeURIComponent('Здравствуйте! Хочу получить подробную информацию.\n' + message);
    window.open(whatsappLink);
    
    closeFeedbackModal();
}

function closeFeedbackModal() {
    feedbackModal.style.display = "none";
}

    /*окно авториз и регистр*/
    var loginModal = document.getElementById("loginModal");
        var btnLogin = document.getElementById("loginBtn");
        var spanLogin = document.getElementsByClassName("close")[0];
    
        btnLogin.onclick = function() {
            loginModal.style.display = "block";
        }
    
        spanLogin.onclick = function() {
            loginModal.style.display = "none";
        }
    
        window.onclick = function(event) {
            if (event.target == loginModal) {
                loginModal.style.display = "none";
            }
        }
    
        function openTab(evt, tabName) {
            var i, tabcontent, tablinks;
            tabcontent = document.getElementsByClassName("tabcontent");
            for (i = 0; i < tabcontent.length; i++) {
                tabcontent[i].style.display = "none";
            }
            tablinks = document.getElementsByClassName("tablinks");
            for (i = 0; i < tablinks.length; i++) {
                tablinks[i].className = tablinks[i].className.replace(" active", "");
            }
            document.getElementById(tabName).style.display = "block";
            evt.currentTarget.className += " active";
        }
    
        document.getElementById("defaultOpen").click();
    
        function togglePasswordVisibility(...ids) {
            ids.forEach(id => {
                var input = document.getElementById(id);
                if (input.type === "password") {
                    input.type = "text";
                } else {
                    input.type = "password";
                }
            });
        }


