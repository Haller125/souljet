let changeThemeButtons = document.querySelectorAll('.changeTheme'); // Помещаем кнопки смены темы в переменную
let nameHtml = document.getElementById('mainCss').getAttribute('href').substring(7, document.getElementById('mainCss').getAttribute('href').length - 4);
console.log(nameHtml);

changeThemeButtons.forEach(button => {
    button.addEventListener('click', function () { // К каждой добавляем обработчик событий на клик
        let theme = this.dataset.theme; // Помещаем в переменную название темы из атрибута data-theme
        applyTheme(theme); // Вызываем функцию, которая меняет тему и передаем в нее её название
    });
});

function applyTheme(themeName) {
    document.querySelector('[title="theme"]').setAttribute('href', `../Css/${nameHtml}${themeName}.css`); // Помещаем путь к файлу темы в пустой link в head
    changeThemeButtons.forEach(button => {
        button.style.display = 'block'; // Показываем все кнопки смены темы
    });
    document.querySelector(`[data-theme="${themeName}"]`).style.display = 'none';
    localStorage.setItem('theme', themeName);
}

let activeTheme = localStorage.getItem('theme'); // Проверяем есть ли в LocalStorage записано значение для 'theme' и присваиваем его переменной.

if(activeTheme === null || activeTheme === 'light') { // Если значение не записано, или оно равно 'light' - применяем светлую тему
    applyTheme('light');
} else if (activeTheme === 'dark') { // Если значение равно 'dark' - применяем темную
    applyTheme('dark');
}