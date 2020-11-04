var espacioJuego = document.getElementById("juego")
var espacioMovimientos = document.getElementById("movimientos")
var fichas = new Array()
const cantidadFichas = 5;

//Clase de juego

//Clase contenedores
class Cajas {
    constructor(juego) {
        this.j = juego
        this.elemento = document.createElement("section")
        this.elemento.classList.add("caja")
        this.fichas = new Array()
        espacioJuego.appendChild(this.elemento)
        this.clicked = false
        this.elemento.addEventListener("click", () => {
            if (juego.clicked && juego.clicked.fichas[0] && juego.clicked != this) {
                this.agregarFichas(juego.clicked.fichas[0], juego.clicked)
                juego.clicked = undefined
                this.clicked = false
            }
            else {
                if (this.fichas[0]) {
                    if (!this.clicked) {
                        this.fichas[0].elemento.classList.add("selected")
                        this.clicked = true
                        juego.clicked = this
                    }
                    else {
                        this.fichas[0].elemento.classList.remove("selected")
                        this.clicked = false
                        juego.clicked = undefined
                    }
                }
            }
        })
    }
    agregarFichas(ficha, origen = undefined) {
        ficha.elemento.classList.remove("selected")
        if (origen) {
            origen.clicked = false
        }
        if (!this.fichas[0] || this.fichas[0].ancho > ficha.ancho) {
            this.fichas.unshift(ficha)
            this.elemento.appendChild(ficha.elemento)
            if (origen) {
                origen.quitarFichas()
                this.j.movimientos--;
                espacioMovimientos.innerText = this.j.movimientos
                if (j.movimientos === 0) {
                    if (this.j.right.fichas.length == this.j.cantidadFichas) {
                        swal("Bien hecho", "Ganaste", "success")
                        .then(() => cambiarDiscos(this.j.cantidadFichas))
                    }
                    else {
                        swal("Has perdido", "Inténtalo de nuevo", "error")
                            .then(() => cambiarDiscos(this.j.cantidadFichas))

                    }
                }
            }
        }
    }

    quitarFichas() {
        this.fichas.shift()
    }

    limpiar(){
        espacioJuego.removeChild(this.elemento)
    }
}
// Clase de las fichas
class Fichas {
    constructor(ancho, color) {
        this.ancho = ancho
        this.color = color
        this.crear()
    }

    crear() {
        this.elemento = document.createElement("div")
        this.elemento.classList.add("elemento")
        this.elemento.style.width = this.ancho + "%";
        this.elemento.style.background = this.color;
    }
}

class Juego {
    constructor(cantidadFichas) {

        this.clicked = undefined
        this.left = new Cajas(this)
        this.center = new Cajas(this)
        this.right = new Cajas(this)
        this.anchoDiscoUno = 100
        this.cantidadFichas = cantidadFichas
        this.primerasFichas(cantidadFichas)
        this.movimientos = (2 ** cantidadFichas) - 1
        espacioMovimientos.innerText = this.movimientos
    }

    primerasFichas() {
        var a = this.anchoDiscoUno;
        for (var i = 0; i < this.cantidadFichas; i++) {
            var f = new Fichas(a, this.obtenerColor(i))
            a = a - 10;
            this.left.agregarFichas(f)
        }
    }

    obtenerColor(n) {
        switch (n) {
            case 0:
                return "#a7194b";
                break;
            case 1:
                return "#8601b0";
                break;
            case 2:
                return "#3e01a4";
                break;
            case 3:
                return "#0247fe";
                break;
            case 4:
                return "#0291cd";
                break;
            case 5:
                return "#66b132";
                break;
            case 6:
                return "#d0e92b";
                break;
            case 7:
                return "#fffe34";
                break;
        }
    }
    limpiar(){
        this.left.limpiar()
        this.center.limpiar()
        this.right.limpiar()
    }
}

function cambiarDiscos(discos = null){
    if(!discos){
        discos = prompt("Nuevo número de discos (3 - 8)")
        if(discos >= 3 && discos <= 8){
            j.limpiar()
            j = new Juego(discos)
        }
    }
    else{
        j.limpiar()
        j = new Juego(discos)
    }
}

var j = new Juego(cantidadFichas);

function mostrarInstrucciones(){
    const instructions = "Instrucciones: \nPara jugar debes hacer click en el disco que deseas mover y " +
    "luego hacer click en la columna a donde quieres pasar el disco. Recuerda que no puedes colocar un disco grande sobre uno pequeño " +
    "y que para mover un disco, debes de quitar primero los discos que tiene sobre él";
    swal(instructions);
}

function mostrarDatos() {
    swal("Nombre: César Reginaldo Tzoc Alvarado \nCarnet: 201430927");
}