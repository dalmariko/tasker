function ShowmodalWin() {

    let modal = document.getElementById('myDetails');
    let btn = document.getElementById('modalDetails');

    btn.onclick = function () {
        modal.style.display = "block";
    };

    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    };

}