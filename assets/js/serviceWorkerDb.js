// Utilidades para grabar PouchDB
const db = new PouchDB('formularios');


function guardarMensaje(cuerpo, url, headers, titulo) {

    console.log("Estoy en guardar mensaje de pouchDB");

    let registro = {
        _id: new Date().toISOString(),
        cuerpo: cuerpo,
        url: url,
        encabezado: headers,
        titulo: titulo
    };
    //mensaje._id = new Date().toISOString();

    return db.put(registro).then((x) => {

        console.log("nuevoMensaje:", x);

        self.registration.sync.register('nuevo-post');

        const newResp = { ok: true, offline: true };

        return new Response(JSON.stringify(newResp));

    });

}


// Postear mensajes a la API
function postearMensajes() {

    const posteos = [];

    return db.allDocs({ include_docs: true }).then(docs => {


        docs.rows.forEach(row => {

            const doc = row.doc;

            console.log("Valor de doc en postear mensajes:", doc);

            const fetchPom = fetch(doc.url, {
                method: 'POST',
                headers: doc.encabezado,
                body: doc.cuerpo
            }).then(res => {

                return db.remove(doc);

            });

            posteos.push(fetchPom);


        }); // fin del foreach

        return Promise.all(posteos);

    });





}