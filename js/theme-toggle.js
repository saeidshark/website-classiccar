document.addEventListener('DOMContentLoaded', () => {
    const themeBtn = document.createElement('button');
    themeBtn.textContent = '🌓 تغییر تم';
    themeBtn.onclick = () => {
        const themeCss = document.getElementById('themeCss');
        if (themeCss.getAttribute('href') === 'css/style.css') {
            themeCss.setAttribute('href', 'css/dark.css');
        } else {
            themeCss.setAttribute('href', 'css/style.css');
        }
    };
    document.body.insertBefore(themeBtn, document.body.firstChild);
});