function ShowmodalWin() {
    let shedow = document.createElement('div');
    shedow.id = 'shadow';
    document.body.appendChild(shedow);

    let modal = document.getElementById('myDetails');

    modal.style.display = 'block';

    shedow.onclick = function () {
        shedow.parentNode.removeChild(shedow);
        modal.style.display = 'none';
        return false;
    };

}