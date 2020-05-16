const modal = document.getElementById('modal');
const modalBtn = document.getElementById('modalBtn');
const modalCloseBtn = document.querySelector('.modal-close-btn');
const changesSavedText = document.getElementById('changes-saved');

function openModal() {
    modal.style.height = '100%';
    changesSavedText.style.display = 'none';
}

function closeModal() {
    modal.style.height = '0%';
}

modalBtn.addEventListener('click', openModal);
modalCloseBtn.addEventListener('click', closeModal);

const aiInsane = document.querySelector('.ai-insane');
const aiNormal = document.querySelector('.ai-normal');

aiInsane.addEventListener('click', () => {
    aiInsane.classList.add('ai-insane-on');
    aiNormal.classList.remove('ai-normal-on');
});

aiNormal.addEventListener('click', () => {
    aiNormal.classList.add('ai-normal-on');
    aiInsane.classList.remove('ai-insane-on');
});