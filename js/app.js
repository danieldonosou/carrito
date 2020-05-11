//Variables
const carrito = document.getElementById('carrito');
const cursos = document.getElementById('lista-cursos');
const listaCursos=document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.getElementById('vaciar-carrito');
//Listeners
cargaEventosListeners();

function cargaEventosListeners(){
    //Dispara cuando se presiona agregar carrito
    cursos.addEventListener('click', comprarCurso);
    //delegation cuando elimina curso del carro
    carrito.addEventListener('click', eliminarCurso);
    //al vaciar el carrito
    vaciarCarritoBtn.addEventListener('click', vaciarCarrito);

    //al cargar documento mostrar local storage
    document.addEventListener('DOMContentLoaded', leerLocalStorage);
}

//Funciones

//leer registros desde el localStorage
function leerLocalStorage(){
    let cursosLS=obtenerCursosLocalStorage();
    cursosLS.forEach(function(curso){
        const row = document.createElement('tr');
    row.innerHTML=`
    <td>
    <img src="${curso.imagen}" width=100>
    </td>
    <td>${curso.titulo}</td>
    <td>${curso.precio}</td>
    <td>
        <a href="#" class="borrar-curso" data-id="${curso.id}">X</a>
    </td>
    `;
    listaCursos.appendChild(row);
    });
}

//funcion que vacia el carrito
function vaciarCarrito(){
    //listaCursos.innerHTML='';
    while(listaCursos.firstChild){
        listaCursos.removeChild(listaCursos.firstChild);
    }
    return false;
}

//funcion que elimina el curso del carrito
function eliminarCurso(e){
    e.preventDefault();
    let curso;
    if(e.target.classList.contains('borrar-curso'))
    {
        e.target.parentElement.parentElement.remove();
    }
   
}


//funcion que añade el curso al carrito
function comprarCurso(e){
    e.preventDefault();
    //delegation para agregar-carrito
    if(e.target.classList.contains('agregar-carrito'))
    {
        const curso=e.target.parentElement.parentElement;
        //Enviamos el curso seleccionado
        leerDatosCurso(curso);
    }


}

//Lee los datos del curso
function leerDatosCurso(curso){
    const infoCurso={
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id')
    }

    insertarCarrito(infoCurso);
   
}

//inserta el curso seleccionado en el carrito
function insertarCarrito(curso){
    const row = document.createElement('tr');
    row.innerHTML=`
    <td>
    <img src="${curso.imagen}" width=100>
    </td>
    <td>${curso.titulo}</td>
    <td>${curso.precio}</td>
    <td>
        <a href="#" class="borrar-curso" data-id="${curso.id}">X</a>
    </td>
    `;
    listaCursos.appendChild(row);
    guardarCursoLocalStorage(curso);
}

//funcion que guarda en el localStorage
function guardarCursoLocalStorage(curso){
    let cursos;
    cursos=obtenerCursosLocalStorage();
    cursos.push(curso);
    localStorage.setItem('cursos', JSON.stringify(cursos));
    //console.log(curso);
}

//obtiene los cursos guardados
function obtenerCursosLocalStorage(){
    let cursosLS;

    //chequea el localStorage
    if (localStorage.getItem('cursos')===null)
    {
        cursosLS=[];
    }
    else
    {
        cursosLS=JSON.parse(localStorage.getItem('cursos'));
    }
    return cursosLS;
}