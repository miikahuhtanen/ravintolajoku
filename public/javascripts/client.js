// $(function () {
//     var $body = $('#content');
//     var pohja = 'http://localhost:3000/yhteys';
//
//     function haeTiedot() {
//         fetch(pohja)
//             .then(function (tulokset) {
//                 return tulokset.json();
//             })
//             .then(function (lista) {
//                 for (let i = 0; i < lista.length; i++) {
//                     let ravintola = lista[i];
//                     console.log(ravintola);
//                     $("<li>")
//                         .text("Ravintolan nimi: " + ravintola.name + ", Kaupuningosa: " + ravintola.borough)
//                         .appendTo($body);
//                 }
//             });
//     }
//
//     $("#napukka").on("click", haeTiedot());
// });

// $(function () {
//     var $body = $('#content');
//     var pohja = 'http://localhost:3000/yhteys';
//
//     function haeTiedot(paikka, laji) {
//         fetch(pohja)
//             .then(function (tulokset) {
//                 return tulokset.json();
//             })
//             .then(function (lista) {
//                 for (let i = 0; i < lista.length; i++) {
//                     let ravintola = lista[i];
//                     var alue = ravintola.borough;
//                     var keittio = ravintola.cuisine;
//
//                     if (alue === paikka && keittio === laji) {
//                         // console.log(ravintola);
//                         $("<li>")
//                             .text(ravintola.name)
//                             .appendTo($body)
//                     }
//                 }
//             });
//     }
//
//     $("#napukka").on("click", haeTiedot(document.getElementById("haku1").value, document.getElementById("haku2").value));
//     // console.log(document.getElementById("haku1").value);
// });

$(function () {
    var $body = $('#content');
    var pohja = 'http://localhost:3000/yhteys';

    function haeTiedot(paikka, laji) {
        var url = pohja + "?borough=" + paikka + "&cuisine=" + laji;
        fetch(url)
            .then(function (tulokset) {
                return tulokset.json();
            })
            .then(function (lista) {
                for (let i = 0; i < lista.length; i++) {
                    let ravintola = lista[i];
                    var alue = ravintola.borough;
                    var keittio = ravintola.cuisine;
                        $("<li>")
                            .text(ravintola.name)
                            .appendTo($body)
                    }
            });
    }

    $("#napukka").on("click", haeTiedot(document.getElementById("haku1").value, document.getElementById("haku2").value));
    // console.log(document.getElementById("haku1").value);
});