$(function () {
    var $body = $('#content');
    var pohja = 'http://localhost:3000/yhteys';

    function haeTiedot() {
        fetch(pohja)
            .then(function (tulokset) {
                return tulokset.json();
            })
            .then(function (lista) {
                for (let i = 0; i < lista.length; i++) {
                    let ravintola = lista[i];
                    console.log(ravintola);
                    $("<li>")
                        .text("Ravintolan nimi: " + ravintola.name + ", Kaupuningosa: " + ravintola.borough)
                        .appendTo($body);
                }
            });
    }

    haeTiedot();
});