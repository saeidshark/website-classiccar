document.addEventListener('DOMContentLoaded', () => {
    const accBtn = document.querySelector('.accordion-btn');
    const accContent = document.querySelector('.accordion-content');
    accBtn.onclick = () => {
        accContent.style.display = accContent.style.display === 'block' ? 'none' : 'block';
    };
});

function showPopup() {
    document.getElementById('popupBox').classList.remove('hidden');
}

function hidePopup() {
    document.getElementById('popupBox').classList.add('hidden');
}
