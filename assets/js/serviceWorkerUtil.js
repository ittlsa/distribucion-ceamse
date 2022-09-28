const URL_TAREAS = "/RestServiceImpl.svc/tareas";
const URL_LOGIN = "/RestServiceImpl.svc/usuario/validar";


const ARRAY_URL = [{
    url: "/RestServiceImpl.svc/fotos/subir",
    titulo: "Envio de imagen"
}, {
    url: "/RestServiceImpl.svc/deficienciaOrdinaria",
    titulo: "Formulario de deficiencia ordinaria"
}, {
    url: "/RestServiceImpl.svc/deficienciaTecnica",
    titulo: "Formulario de deficiencia tecnica"
}];

function manejoApiMensajes(req) {


    console.log("Estoy en manejo api mensajes");

    if ((req.url.indexOf(URL_TAREAS) >= 0) || req.url.indexOf(URL_LOGIN) >= 0) {

        console.log("Estoy en index of");

        return fetch(req);

    } else if (req.clone().method === 'POST') {
        // POSTEO de un nuevo mensaje
        console.log("Estoy en envio de mensaje");

        if (self.registration.sync) {

            console.log("Estoy en el if sync");

            return respuestaGuardarMensaje(req);
        } else {
            return fetch(req);
        }


    } else {
        return fetch(req);
    }


}


function respuestaGuardarMensaje(req) {

    return req.clone().text().then(body => {

        console.log("Valor de req.clone:", req.clone());
        console.log("Valor de body:", body);
        console.log("Estoy dentro de clonar req a json");

        return guardarMensaje(body, req.clone().url, getHeaders(req), getTituloEnvio(req.clone().url));

    });

}

function getHeaders(req) {

    let headers = "{";

    console.log("Empezar a recorrer headers");

    for (const pair of req.headers.entries()) {
        headers += '"' + pair[0] + '":"' + pair[1] + '",';
    }
    headers = headers.substring(0, headers.length - 1);
    headers += "}";

    console.log("Valor de los headers: ", headers);
    let retorno = JSON.parse(headers);
    console.log("Valor de retorno:", retorno);
    return retorno;

}

function getTituloEnvio(url) {

    let retorno = "Otros";

    ARRAY_URL.forEach(item => {
        if (url.indexOf(item.url) >= 0) {
            retorno = item.titulo;
        }
    });

    console.log("Valor de getTitulo: ", retorno);
    return retorno;
}