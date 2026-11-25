/* =====================================================================
   EQUILIBRIA — TODO EL JAVASCRIPT DEL SITIO
   Un solo archivo, cargado al final de cada página:
     <script src="js/equilibria.js"></script>

   ÍNDICE
   PARTE 1. Datos
            1.1 Emociones y sus consejos
            1.2 Juegos: lista, palabras y pistas
   PARTE 2. Funciones generales (menú, emoción guardada, piedras,
            tarjetas de consejos, color de fondo, formulario)
   PARTE 3. Lista de juegos (juegos.html)
   PARTE 4. Minijuegos
            4.1 Memoria   4.2 Sopa de letras   4.3 Crucigrama
   PARTE 5. Página de un juego (juego.html?juego=...)

   Cada parte revisa si su página tiene los elementos que necesita;
   si no los encuentra, no hace nada. Por eso el mismo archivo sirve
   para todas las páginas sin dar errores.
   ===================================================================== */


/* =====================================================================
   PARTE 1. DATOS
   ===================================================================== */

/* ---- 1.1 Emociones y sus consejos -------------------------------- */
/* EDITAR AQUÍ LOS CONSEJOS: 4 tarjetas por cada emoción.
   Cada consejo es [título, descripción, nota breve]. */
window.EQUILIBRIA_TEMAS = {
  estres: {nombre:'Estrés',emoji:'⚡',clase:'tema-coral',resumen:'Cuando todo parece demasiado, empieza por algo pequeño.',frase:'Hoy no tienes que resolverlo todo.', consejos:[
    ['Una tarea a la vez','Escribe lo que necesitas hacer y escoge una sola cosa para comenzar.','Empieza por lo posible.'],
    ['Respira sin apuro','Intenta inhalar y exhalar lentamente, sin exigirte un ritmo perfecto.','A tu propio ritmo.'],
    ['Habla con alguien','Contarle a una persona de confianza cómo te sientes puede aliviar la carga.','No tienes que cargarlo solo.'],
    ['Reconoce lo que hiciste','Al terminar el día, identifica algo que sí lograste, aunque sea pequeño.','Tu esfuerzo vale.']
  ]},
  ansiedad: {nombre:'Ansiedad',emoji:'◉',clase:'tema-azul',resumen:'Ideas sencillas para volver al momento presente.',frase:'Puedes avanzar con calma.',consejos:[
    ['Mira a tu alrededor','Nombra cinco cosas que puedas observar en el lugar donde estás.','Vuelve al presente.'],
    ['Anota tu inquietud','Escribir lo que te preocupa puede ayudarte a ordenar tus pensamientos.','Una idea a la vez.'],
    ['Reduce el ruido','Si puedes, toma un descanso breve de notificaciones y pantallas.','Menos estímulos.'],
    ['Pide orientación','Si la preocupación interfiere con tu vida diaria, considera buscar ayuda profesional.','Buscar apoyo es válido.']
  ]},
  tristeza: {nombre:'Tristeza',emoji:'☁',clase:'tema-amarillo',resumen:'Pequeños gestos de cuidado para días difíciles.',frase:'Lo que sientes merece ser escuchado.',consejos:[
    ['Ponle nombre a lo que sientes','No necesitas explicar todo: una palabra puede ser un inicio.','Date permiso.'],
    ['Acércate a alguien','Un mensaje sencillo a una persona de confianza puede abrir una conversación.','Un hola basta.'],
    ['Haz algo amable por ti','Una ducha, una comida o un paseo corto pueden ser pequeños actos de cuidado.','Paso a paso.'],
    ['Considera pedir ayuda','Si la tristeza persiste o se intensifica, consulta con un profesional de salud mental.','Mereces apoyo.']
  ]},
  autoestima: {nombre:'Autoestima',emoji:'♡',clase:'tema-menta',resumen:'Reconoce tus fortalezas sin exigirte perfección.',frase:'Tu valor no depende de un solo día.',consejos:[
    ['Reconoce un logro','Piensa en algo que hiciste bien hoy, incluso si parece pequeño.','Cuenta lo pequeño.'],
    ['Habla con amabilidad','Pregúntate si le hablarías a un amigo como te hablas a ti mismo.','Sé tu aliado.'],
    ['Evita la comparación constante','Las redes muestran fragmentos, no historias completas.','Cada camino es distinto.'],
    ['Aprende de los errores','Equivocarte no define quién eres ni lo que puedes conseguir.','Puedes intentarlo otra vez.']
  ]},
  relaciones: {nombre:'Relaciones',emoji:'♧',clase:'tema-violeta',resumen:'Comunicación, respeto y límites saludables.',frase:'Conectar también significa cuidarte.',consejos:[
    ['Escucha con atención','Deja que la otra persona termine de hablar antes de responder.','Escuchar también comunica.'],
    ['Expresa lo que necesitas','Puedes decir cómo te sientes usando frases que empiecen con «yo».','Habla desde tu experiencia.'],
    ['Respeta los límites','Está bien decir que no y también respetar la respuesta de los demás.','El respeto es mutuo.'],
    ['Pide apoyo si es necesario','Si una relación te hace sentir inseguro, conversa con alguien de confianza.','Tu seguridad va primero.']
  ]},
  emociones: {nombre:'Emociones',emoji:'?',clase:'tema-rosa',resumen:'Un espacio para explorar lo que estás viviendo.',frase:'No necesitas tener una respuesta inmediata.',consejos:[
    ['Haz un pequeño registro','Anota qué pasó hoy y qué notaste en tu cuerpo.','Observa sin juzgar.'],
    ['Busca una palabra cercana','Puedes empezar con «cansado», «raro» o «confundido» si encaja contigo.','No hay respuesta perfecta.'],
    ['Identifica lo que necesitas','Pregúntate si te ayudaría descansar, conversar o estar en silencio.','Escúchate.'],
    ['Comparte tu experiencia','Si algo te preocupa, puedes hablarlo con una persona de confianza.','Pedir apoyo ayuda.']
  ]}
};

/* ---- 1.2 Juegos: lista, palabras y pistas ------------------------ */
/* =====================================================================
   EQUILIBRIA — CONTENIDO DE LOS MINIJUEGOS
   Las palabras cambian según la emoción elegida en el Inicio.
   Si todavía no se eligió ninguna, se usa el grupo "general".

   Cada grupo tiene:
   - palabras: 8 palabras (pueden llevar tildes y Ñ).
       · Memoria usa las 6 primeras (6 pares = 12 cartas).
       · Sopa de letras usa las 8.
   - crucigrama: 6 pares ['PALABRA', 'Pista'].
       El crucigrama se arma solo: si cambias palabras, se reacomoda.
   ===================================================================== */

/* Lista de juegos */
window.EQUILIBRIA_JUEGOS = [
  { id: 'memoria',    nombre: 'Memoria de pares', clase: 'tema-violeta',  descripcion: 'Voltea las cartas y encuentra las parejas de palabras.',  instrucciones: 'Toca dos cartas para darles la vuelta. Si son iguales, se quedan abiertas. Encuentra todos los pares.' },
  { id: 'sopa',       nombre: 'Sopa de letras',   clase: 'tema-amarillo', descripcion: 'Busca palabras que ayudan a sentirte mejor.',            instrucciones: 'Arrastra sobre las letras para marcar una palabra, o toca la primera letra y luego la última. Las palabras van en línea recta.' },
  { id: 'crucigrama', nombre: 'Crucigrama',       clase: 'tema-menta',    descripcion: 'Resuelve las pistas y completa la cuadrícula.',          instrucciones: 'Toca una casilla o una pista y escribe. Toca dos veces la misma casilla para cambiar entre horizontal y vertical.' }
];

window.EQUILIBRIA_CONTENIDO_JUEGOS = {
  general: {
    palabras: ['Respirar', 'Calma', 'Pausa', 'Meditar', 'Descanso', 'Abrazo', 'Amistad', 'Planificar'],
    crucigrama: [
      ['RESPIRAR', 'Tomar aire despacio para calmarte'],
      ['CALMA', 'Estado de tranquilidad'],
      ['PAUSA', 'Detenerte un momento antes de seguir'],
      ['MEDITAR', 'Concentrarte en el presente, en silencio'],
      ['DESCANSO', 'Lo que necesitas después de un día largo'],
      ['ABRAZO', 'Gesto con los brazos que reconforta']
    ]
  },
  estres: {
    palabras: ['Meditar', 'Planificar', 'Respirar', 'Pausa', 'Orden', 'Priorizar', 'Descanso', 'Calma'],
    crucigrama: [
      ['MEDITAR', 'Concentrarte en el presente, en silencio'],
      ['PLANIFICAR', 'Organizar tus tareas antes de empezar'],
      ['RESPIRAR', 'Tomar aire despacio para calmarte'],
      ['PAUSA', 'Detenerte un momento antes de seguir'],
      ['ORDEN', 'Lo contrario del desorden'],
      ['PRIORIZAR', 'Elegir qué hacer primero']
    ]
  },
  ansiedad: {
    palabras: ['Presente', 'Respirar', 'Escribir', 'Silencio', 'Observar', 'Apoyo', 'Calma', 'Paseo'],
    crucigrama: [
      ['PRESENTE', 'El momento de ahora, ni pasado ni futuro'],
      ['RESPIRAR', 'Tomar aire despacio para calmarte'],
      ['ESCRIBIR', 'Poner en papel lo que te preocupa'],
      ['SILENCIO', 'Ausencia de ruido'],
      ['OBSERVAR', 'Mirar con atención lo que te rodea'],
      ['APOYO', 'Ayuda que te da una persona de confianza']
    ]
  },
  tristeza: {
    palabras: ['Abrazo', 'Compartir', 'Música', 'Cuidado', 'Esperanza', 'Amigos', 'Consuelo', 'Paseo'],
    crucigrama: [
      ['ABRAZO', 'Gesto con los brazos que reconforta'],
      ['COMPARTIR', 'Contarle a alguien lo que sientes'],
      ['MUSICA', 'Canciones que pueden acompañarte'],
      ['CUIDADO', 'Atención amable hacia ti mismo'],
      ['ESPERANZA', 'Confianza en que vendrán días mejores'],
      ['AMIGOS', 'Personas cercanas que te quieren']
    ]
  },
  autoestima: {
    palabras: ['Valor', 'Logro', 'Fortaleza', 'Confianza', 'Respeto', 'Crecer', 'Orgullo', 'Amable'],
    crucigrama: [
      ['VALOR', 'Lo que vales, más allá de un mal día'],
      ['LOGRO', 'Algo que conseguiste con esfuerzo'],
      ['FORTALEZA', 'Una cualidad que te hace fuerte'],
      ['CONFIANZA', 'Creer en ti y en lo que puedes hacer'],
      ['RESPETO', 'Trato digno hacia ti y hacia los demás'],
      ['CRECER', 'Aprender y mejorar con el tiempo']
    ]
  },
  relaciones: {
    palabras: ['Escuchar', 'Respeto', 'Diálogo', 'Límites', 'Acuerdo', 'Empatía', 'Confianza', 'Amistad'],
    crucigrama: [
      ['ESCUCHAR', 'Prestar atención cuando otra persona habla'],
      ['RESPETO', 'Trato digno hacia ti y hacia los demás'],
      ['DIALOGO', 'Conversación para entenderse'],
      ['LIMITES', 'Lo que está bien y lo que no está bien para ti'],
      ['ACUERDO', 'Decisión que dos personas toman juntas'],
      ['EMPATIA', 'Ponerte en el lugar de la otra persona']
    ]
  },
  emociones: {
    palabras: ['Sentir', 'Nombrar', 'Alegría', 'Miedo', 'Enojo', 'Diario', 'Calma', 'Sorpresa'],
    crucigrama: [
      ['SENTIR', 'Experimentar una emoción'],
      ['NOMBRAR', 'Ponerle una palabra a lo que sientes'],
      ['ALEGRIA', 'Emoción de los momentos felices'],
      ['MIEDO', 'Emoción que aparece ante un peligro'],
      ['ENOJO', 'Emoción cuando algo parece injusto'],
      ['DIARIO', 'Cuaderno para escribir lo que vives']
    ]
  }
};


/* =====================================================================
   PARTE 2. FUNCIONES GENERALES DEL SITIO
   ===================================================================== */
/* EQUILIBRIA — JAVASCRIPT PRINCIPAL
   1. Navegación y memoria local
   2. Selección de una situación (Inicio)
   3. Tarjetas reversibles (Consejos)
   4. Validación del formulario (Contacto)
   Los textos de las tarjetas se editan en la PARTE 1.1 de este archivo.
*/

// 1. NAVEGACIÓN Y MEMORIA LOCAL
/* Funciones compartidas. localStorage mantiene el tema al cambiar de página. */
const CLAVE_TEMA='equilibria-tema-elegido';
function obtenerTema(){try{const v=localStorage.getItem(CLAVE_TEMA);return window.EQUILIBRIA_TEMAS[v]?v:null;}catch(e){return window.__temaTemporal||null;}}
function guardarTema(tema){if(!window.EQUILIBRIA_TEMAS[tema])return;window.__temaTemporal=tema;try{localStorage.setItem(CLAVE_TEMA,tema);}catch(e){/* Algunos navegadores restringen el almacenamiento en archivos locales */}}
function marcarNav(){const pagina=location.pathname.split('/').pop()||'index.html';document.querySelectorAll('.nav-enlaces a').forEach(a=>{const actual=a.getAttribute('href')===pagina||(pagina==='juego.html'&&a.getAttribute('href')==='juegos.html');a.classList.toggle('activo',actual);if(actual)a.setAttribute('aria-current','page');});}
function aplicarColorTema(){const id=obtenerTema();if(!id)return;document.body.classList.add('con-tema',window.EQUILIBRIA_TEMAS[id].clase);}
function actualizarAvisos(){const id=obtenerTema();document.querySelectorAll('[data-tema-actual]').forEach(n=>{n.textContent=id?window.EQUILIBRIA_TEMAS[id].nombre:'Ninguno por ahora'});document.querySelectorAll('[data-enlace-consejos]').forEach(a=>{a.textContent=id?'Ver mis consejos':'Elegir cómo me siento';a.setAttribute('href',id?'consejos.html':'index.html#explorar');});}
function configurarMenu(){const boton=document.querySelector('#boton-menu');const nav=document.querySelector('#enlaces-nav');if(!boton||!nav)return;boton.addEventListener('click',()=>{const abierto=nav.classList.toggle('abierto');boton.setAttribute('aria-expanded',String(abierto));});nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('abierto');boton.setAttribute('aria-expanded','false');}));}



// 2. INICIO: la pila de piedras. Cada piedra es una situación.
/* Orden de arriba hacia abajo: la piedra más pequeña arriba, la más ancha abajo.
   w/h = tamaño en px, rot = inclinación, dx = desplazamiento lateral,
   forma = border-radius irregular para que parezca una piedra real. */
const PILA=[
 {id:'estres',     w:150,h:62,rot:'-5deg',dx:'14px', forma:'55% 45% 50% 50% / 62% 60% 40% 38%'},
 {id:'ansiedad',   w:188,h:68,rot:'3deg', dx:'-10px',forma:'48% 52% 45% 55% / 58% 64% 36% 42%'},
 {id:'emociones',  w:214,h:72,rot:'-2deg',dx:'8px',  forma:'52% 48% 55% 45% / 60% 55% 45% 40%'},
 {id:'tristeza',   w:246,h:78,rot:'2deg', dx:'-6px', forma:'46% 54% 50% 50% / 56% 62% 38% 44%'},
 {id:'relaciones', w:282,h:84,rot:'-1.5deg',dx:'6px',forma:'50% 50% 46% 54% / 62% 58% 42% 38%'},
 {id:'autoestima', w:318,h:92,rot:'1deg', dx:'0px',  forma:'47% 53% 52% 48% / 58% 60% 40% 42%'}
];
function iniciarInicio(){
 const pila=document.getElementById('opciones-tema');if(!pila)return;
 const previo=obtenerTema();
 const sinMovimiento=matchMedia('(prefers-reduced-motion: reduce)').matches;
 PILA.forEach((p,i)=>{
  const t=window.EQUILIBRIA_TEMAS[p.id];if(!t)return;
  const piedra=document.createElement('button');piedra.type='button';
  piedra.className=`piedra ${t.clase}`+(p.id==='estres'?' tambalea':'');
  piedra.dataset.tema=p.id;piedra.textContent=t.nombre;
  piedra.setAttribute('aria-pressed',String(p.id===previo));
  piedra.style.cssText=`--w:${p.w}px;--h:${p.h}px;--rot:${p.rot};--dx:${p.dx};--forma:${p.forma};--orden:${PILA.length-1-i}`;
  piedra.addEventListener('click',()=>{
   guardarTema(p.id);piedra.classList.add('elegida');document.body.className=document.body.className.replace(/\btema-\S+/g,'');document.body.classList.add('con-tema',t.clase);
   setTimeout(()=>{location.href='consejos.html';},sinMovimiento?0:260);
  });
  pila.appendChild(piedra);
 });
 const acceso=document.getElementById('acceso-rapido');if(acceso)acceso.hidden=!previo;
}

// 3. CONSEJOS: cada botón es una tarjeta con dos caras y giro de 180°.
// Pulsar otra vez la misma tarjeta la cierra; las demás funcionan independientemente.
function iniciarConsejos(){
 const cabecera=document.getElementById('cabecera-consejos'),tarjetas=document.getElementById('lista-consejos');
 if(!cabecera||!tarjetas)return;
 const id=obtenerTema();
 if(!id){cabecera.innerHTML='<div class="contenedor sin-tema"><h1>¿Cómo te sientes hoy?</h1><p>Elige una situación en el inicio y aquí aparecerán cuatro consejos para ti.</p><a class="boton" href="index.html#explorar">Elegir cómo me siento</a></div>';return;}
 const tema=window.EQUILIBRIA_TEMAS[id];
 cabecera.className=`cabecera-consejos ${tema.clase}`;
 tarjetas.className=`grid-consejos ${tema.clase}`;
 cabecera.innerHTML=`<div class="contenedor cabecera-consejos-interior"><div><p class="previo">Tus consejos para</p><h1>${tema.nombre}</h1><p class="resumen">${tema.resumen}</p><p class="frase">${tema.frase}</p></div><a class="boton secundario" href="index.html#explorar">Cambiar cómo me siento</a></div>`;
 tema.consejos.forEach(([titulo,descripcion,nota],i)=>{
  const tarjeta=document.createElement('button');tarjeta.type='button';tarjeta.className='tarjeta-girable';
  tarjeta.setAttribute('aria-pressed','false');tarjeta.setAttribute('aria-label',`${titulo}. Toca para leer el consejo.`);
  const interior=document.createElement('span');interior.className='tarjeta-girable-interior';
  const frente=document.createElement('span');frente.className='cara-tarjeta frente-tarjeta';
  const tituloFrente=document.createElement('strong');tituloFrente.className='titulo-tarjeta';tituloFrente.textContent=titulo;
  const indicador=document.createElement('span');indicador.className='indicador-giro';indicador.textContent='Toca para leer';
  frente.append(tituloFrente,indicador);
  const dorso=document.createElement('span');dorso.className='cara-tarjeta dorso-tarjeta';
  const tituloDorso=document.createElement('strong');tituloDorso.className='titulo-dorso';tituloDorso.textContent=titulo;
  const parrafo=document.createElement('span');parrafo.className='texto-dorso';parrafo.textContent=descripcion;
  const mini=document.createElement('span');mini.className='mini-etiqueta';mini.textContent=nota;
  const cerrar=document.createElement('span');cerrar.className='indicador-giro';cerrar.textContent='Toca para cerrar';
  dorso.append(tituloDorso,parrafo,mini,cerrar);interior.append(frente,dorso);tarjeta.append(interior);
  tarjeta.addEventListener('click',()=>{const abierta=tarjeta.classList.toggle('girada');tarjeta.setAttribute('aria-pressed',String(abierta));tarjeta.setAttribute('aria-label',abierta?`${titulo}: ${descripcion} ${nota}. Toca para cerrar.`:`${titulo}. Toca para leer el consejo.`);});
  tarjetas.append(tarjeta);
 });
 const nota=document.getElementById('nota-consejos');if(nota)nota.hidden=false;
 const instr=document.getElementById('instruccion-consejos');if(instr)instr.hidden=false;
}

// 4. CONTACTO: validación local, sin enviar ni almacenar mensajes
/* Validación local: no se envían mensajes ni se guardan datos personales. */
function iniciarContacto(){
 const form=document.getElementById('form-contacto'),salida=document.getElementById('confirmacion');
 if(!form||!salida)return;
 const campos=[{id:'nombre',validar:v=>v.trim().length>=2,error:'Escribe tu nombre (mínimo 2 caracteres).'},{id:'correo',validar:v=>/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()),error:'Escribe un correo válido.'},{id:'motivo',validar:v=>v!=='',error:'Selecciona el motivo de tu mensaje.'},{id:'mensaje',validar:v=>v.trim().length>=10,error:'Escribe al menos 10 caracteres.'}];
 form.addEventListener('submit',e=>{
  e.preventDefault();let valido=true;salida.hidden=true;
  campos.forEach(({id,validar,error})=>{const campo=document.getElementById(id);const bien=validar(campo.value);document.getElementById(`error-${id}`).textContent=bien?'':error;campo.classList.toggle('invalido',!bien);campo.setAttribute('aria-invalid',String(!bien));if(!bien)valido=false;});
  const acepto=document.getElementById('acepto');document.getElementById('error-acepto').textContent=acepto.checked?'':'Confirma que comprendes que esto es una demostración.';if(!acepto.checked)valido=false;
  if(!valido){const err=form.querySelector('.invalido');if(err)err.focus();return;}
  salida.hidden=false;salida.textContent='Mensaje validado. Esta es una demostración: tu mensaje no se ha enviado ni almacenado. Para recibir mensajes necesitarán añadir un servicio o servidor.';form.reset();salida.scrollIntoView({behavior:'smooth',block:'nearest'});
 });
}


// INICIALIZACIÓN: cada función actúa solamente en su página HTML correspondiente.
document.addEventListener('DOMContentLoaded',()=>{
 aplicarColorTema();marcarNav();actualizarAvisos();configurarMenu();
 iniciarInicio();iniciarConsejos();iniciarContacto();
});


/* =====================================================================
   PARTE 3. LISTA DE JUEGOS (juegos.html)
   ===================================================================== */
/* EQUILIBRIA — LISTA DE JUEGOS (juegos.html)
   Los nombres y descripciones se editan en la PARTE 1.2. */
document.addEventListener('DOMContentLoaded',()=>{
 const cont=document.getElementById('lista-juegos');if(!cont)return;
 window.EQUILIBRIA_JUEGOS.forEach(j=>{
  const article=document.createElement('article');article.className=`juego ${j.clase}`;
  article.innerHTML=`<div class="juego-arte" aria-hidden="true"><span></span><span></span><span></span></div><h2>${j.nombre}</h2><p class="descripcion">${j.descripcion}</p><a class="boton chico" href="juego.html?juego=${encodeURIComponent(j.id)}">Jugar</a>`;
  cont.appendChild(article);
 });
});


/* =====================================================================
   PARTE 4. MINIJUEGOS
   ===================================================================== */

/* ---- 4.1 Memoria ------------------------------------------------- */
/* =====================================================================
   EQUILIBRIA — JUEGO DE MEMORIA
   12 cartas boca abajo (6 palabras repetidas dos veces).
   Se voltean dos cartas por turno: si coinciden se quedan abiertas;
   si no, se vuelven a cerrar.
   ===================================================================== */
window.EQUILIBRIA_MINIJUEGOS = window.EQUILIBRIA_MINIJUEGOS || {};

window.EQUILIBRIA_MINIJUEGOS.memoria = {
  iniciar(tablero, contenido, api) {
    const palabras = contenido.palabras.slice(0, 6);
    const cartas = mezclar([...palabras, ...palabras]);
    let abiertas = [];
    let bloqueado = false;
    let pares = 0;
    let movimientos = 0;

    const grid = document.createElement('div');
    grid.className = 'memoria';
    cartas.forEach((palabra, i) => {
      const carta = document.createElement('button');
      carta.type = 'button';
      carta.className = 'carta';
      carta.dataset.palabra = palabra;
      carta.setAttribute('aria-label', `Carta ${i + 1}, boca abajo`);
      carta.innerHTML = `<span class="carta-interior"><span class="carta-cara carta-dorso" aria-hidden="true"></span><span class="carta-cara carta-frente">${palabra}</span></span>`;
      carta.addEventListener('click', () => voltear(carta, i));
      grid.append(carta);
    });
    tablero.append(grid);
    actualizar();

    function voltear(carta, i) {
      if (bloqueado || carta.classList.contains('abierta')) return;
      carta.classList.add('abierta');
      carta.setAttribute('aria-label', `Carta ${i + 1}: ${carta.dataset.palabra}`);
      abiertas.push(carta);
      if (abiertas.length < 2) return;

      movimientos++;
      const [a, b] = abiertas;
      if (a.dataset.palabra === b.dataset.palabra) {
        a.classList.add('resuelta');
        b.classList.add('resuelta');
        abiertas = [];
        pares++;
        actualizar();
        if (pares === palabras.length) {
          api.terminar(`Encontraste los ${pares} pares en ${movimientos} movimientos.`);
        }
      } else {
        bloqueado = true;
        actualizar();
        setTimeout(() => {
          [a, b].forEach(c => {
            c.classList.remove('abierta');
            c.setAttribute('aria-label', c.getAttribute('aria-label').replace(/:.*/, ', boca abajo'));
          });
          abiertas = [];
          bloqueado = false;
        }, 900);
      }
    }

    function actualizar() {
      api.progreso(`<span>Pares: <strong>${pares} de ${palabras.length}</strong></span><span>Movimientos: <strong>${movimientos}</strong></span>`);
    }
  }
};

function mezclar(lista) {
  const copia = [...lista];
  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }
  return copia;
}

/* ---- 4.2 Sopa de letras ------------------------------------------ */
/* =====================================================================
   EQUILIBRIA — SOPA DE LETRAS
   Las palabras se esconden en línea recta: hacia la derecha, hacia abajo
   o en diagonal. Se marcan arrastrando sobre las letras, o tocando la
   primera letra y luego la última (también funciona con teclado).
   ===================================================================== */
window.EQUILIBRIA_MINIJUEGOS = window.EQUILIBRIA_MINIJUEGOS || {};

window.EQUILIBRIA_MINIJUEGOS.sopa = {
  iniciar(tablero, contenido, api) {
    const palabras = contenido.palabras.map(original => ({ original, letras: normalizar(original), encontrada: false }));
    const largo = Math.max(...palabras.map(p => p.letras.length));
    const tam = Math.max(10, largo + 2);
    const sopa = crearSopa(palabras.map(p => p.letras), tam);
    let encontradas = 0;

    // ---- Dibujo del tablero y la lista
    const zona = document.createElement('div');
    zona.className = 'sopa';
    const grid = document.createElement('div');
    grid.className = 'sopa-tablero';
    grid.style.setProperty('--columnas', tam);
    grid.setAttribute('aria-label', 'Sopa de letras');
    const celdas = [];
    for (let f = 0; f < tam; f++) {
      celdas[f] = [];
      for (let c = 0; c < tam; c++) {
        const b = document.createElement('button');
        b.type = 'button';
        b.className = 'letra';
        b.textContent = sopa[f][c];
        b.dataset.f = f;
        b.dataset.c = c;
        b.setAttribute('aria-label', `${sopa[f][c]}, fila ${f + 1}, columna ${c + 1}`);
        celdas[f][c] = b;
        grid.append(b);
      }
    }
    const lista = document.createElement('ul');
    lista.className = 'sopa-lista';
    lista.setAttribute('aria-label', 'Palabras para encontrar');
    palabras.forEach(p => {
      const li = document.createElement('li');
      li.textContent = p.original;
      p.elemento = li;
      lista.append(li);
    });
    zona.append(grid, lista);
    tablero.append(zona);
    actualizar();

    // ---- Selección
    let inicio = null, actual = null, arrastrando = false, ancla = null;

    grid.addEventListener('pointerdown', e => {
      const celda = e.target.closest('.letra');
      if (!celda) return;
      e.preventDefault();
      if (ancla && ancla !== celda) { comprobar(ancla, celda); return; }
      inicio = actual = celda;
      arrastrando = true;
      pintar(inicio, celda);
    });
    grid.addEventListener('pointermove', e => {
      if (!arrastrando) return;
      const el = document.elementFromPoint(e.clientX, e.clientY);
      const celda = el && el.closest('.letra');
      if (celda && celda !== actual) { actual = celda; pintar(inicio, celda); }
    });
    window.addEventListener('pointerup', soltar);
    function soltar() {
      if (!arrastrando) return;
      arrastrando = false;
      if (actual === inicio) {               // fue un toque: queda como primera letra
        limpiarSeleccion();
        ancla = inicio;
        ancla.classList.add('ancla');
      } else {
        comprobar(inicio, actual);
      }
    }
    // Teclado (Enter o Espacio sobre una letra)
    grid.addEventListener('click', e => {
      if (e.detail !== 0) return;            // los clics de ratón/dedo ya se manejan arriba
      const celda = e.target.closest('.letra');
      if (!celda) return;
      if (!ancla) { ancla = celda; ancla.classList.add('ancla'); }
      else if (ancla !== celda) comprobar(ancla, celda);
    });

    function linea(a, b) {
      const f1 = +a.dataset.f, c1 = +a.dataset.c, f2 = +b.dataset.f, c2 = +b.dataset.c;
      const df = Math.sign(f2 - f1), dc = Math.sign(c2 - c1);
      const pasos = Math.max(Math.abs(f2 - f1), Math.abs(c2 - c1));
      const recta = f1 === f2 || c1 === c2 || Math.abs(f2 - f1) === Math.abs(c2 - c1);
      if (!recta) return null;
      return Array.from({ length: pasos + 1 }, (_, i) => celdas[f1 + df * i][c1 + dc * i]);
    }
    function pintar(a, b) {
      limpiarSeleccion();
      (linea(a, b) || [a]).forEach(c => c.classList.add('marcada'));
    }
    function limpiarSeleccion() {
      grid.querySelectorAll('.marcada').forEach(c => c.classList.remove('marcada'));
      if (ancla) { ancla.classList.remove('ancla'); ancla = null; }
    }
    function comprobar(a, b) {
      const camino = linea(a, b);
      limpiarSeleccion();
      if (!camino) return;
      const texto = camino.map(c => c.textContent).join('');
      const alReves = [...texto].reverse().join('');
      const p = palabras.find(x => !x.encontrada && (x.letras === texto || x.letras === alReves));
      if (!p) {
        camino.forEach(c => { c.classList.add('fallo'); setTimeout(() => c.classList.remove('fallo'), 450); });
        return;
      }
      p.encontrada = true;
      const color = `color-${encontradas % 6}`;
      camino.forEach(c => c.classList.add('encontrada', color));
      p.elemento.classList.add('hecha', color);
      encontradas++;
      actualizar();
      if (encontradas === palabras.length) {
        window.removeEventListener('pointerup', soltar);
        api.terminar(`Encontraste las ${palabras.length} palabras.`);
      }
    }
    function actualizar() {
      api.progreso(`<span>Palabras: <strong>${encontradas} de ${palabras.length}</strong></span>`);
    }

    // ---- Utilidades
    function normalizar(t) {
      return t.toUpperCase().replace(/Ñ/g, '#').normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/#/g, 'Ñ').replace(/[^A-ZÑ]/g, '');
    }
    function crearSopa(lista, n) {
      const direcciones = [[0, 1], [1, 0], [1, 1], [-1, 1]];   // derecha, abajo y dos diagonales
      const relleno = 'ABCDEFGHIJLMNOPRSTUVÑ';
      const ordenadas = [...lista].sort((a, b) => b.length - a.length);
      for (let intento = 0; intento < 80; intento++) {
        const m = Array.from({ length: n }, () => Array(n).fill(''));
        const ok = ordenadas.every(w => {
          for (let t = 0; t < 300; t++) {
            const [df, dc] = direcciones[Math.floor(Math.random() * direcciones.length)];
            const f = Math.floor(Math.random() * n), c = Math.floor(Math.random() * n);
            const ff = f + df * (w.length - 1), cf = c + dc * (w.length - 1);
            if (ff < 0 || ff >= n || cf < 0 || cf >= n) continue;
            let cabe = true;
            for (let i = 0; i < w.length && cabe; i++) {
              const l = m[f + df * i][c + dc * i];
              if (l && l !== w[i]) cabe = false;
            }
            if (!cabe) continue;
            for (let i = 0; i < w.length; i++) m[f + df * i][c + dc * i] = w[i];
            return true;
          }
          return false;
        });
        if (ok) return m.map(fila => fila.map(l => l || relleno[Math.floor(Math.random() * relleno.length)]));
      }
      throw new Error('No se pudo armar la sopa de letras: revisa la longitud de las palabras.');
    }
  }
};

/* ---- 4.3 Crucigrama ---------------------------------------------- */
/* =====================================================================
   EQUILIBRIA — CRUCIGRAMA
   La cuadrícula se arma sola a partir de las palabras y pistas de
   la PARTE 1.2: coloca la palabra más larga y cruza las demás
   donde comparten una letra.
   ===================================================================== */
window.EQUILIBRIA_MINIJUEGOS = window.EQUILIBRIA_MINIJUEGOS || {};

window.EQUILIBRIA_MINIJUEGOS.crucigrama = {
  iniciar(tablero, contenido, api) {
    const norm = t => t.toUpperCase().replace(/Ñ/g, '#').normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/#/g, 'Ñ').replace(/[^A-ZÑ]/g, '');
    const clave = (f, c) => `${f},${c}`;
    const entrada = contenido.crucigrama.map(([palabra, pista]) => ({ palabra: norm(palabra), pista }));
    const { palabras, filas, columnas } = armar(entrada);

    // Mapa de casillas: "f,c" -> { letra, h: palabra horizontal, v: palabra vertical, input }
    const casillas = new Map();
    palabras.forEach(p => {
      for (let i = 0; i < p.palabra.length; i++) {
        const f = p.f + (p.dir === 'v' ? i : 0), c = p.c + (p.dir === 'h' ? i : 0);
        const k = clave(f, c);
        if (!casillas.has(k)) casillas.set(k, { f, c, letra: p.palabra[i] });
        casillas.get(k)[p.dir] = p;
      }
    });
    // Numeración en orden de lectura
    let n = 0;
    const inicios = new Map();
    [...palabras].sort((a, b) => a.f - b.f || a.c - b.c).forEach(p => {
      const k = clave(p.f, p.c);
      if (!inicios.has(k)) inicios.set(k, ++n);
      p.numero = inicios.get(k);
    });

    // ---- Dibujo
    const zona = document.createElement('div');
    zona.className = 'crucigrama';
    const grid = document.createElement('div');
    grid.className = 'cruci-tablero';
    grid.style.setProperty('--columnas', columnas);
    for (let f = 0; f < filas; f++) {
      for (let c = 0; c < columnas; c++) {
        const cas = casillas.get(clave(f, c));
        const div = document.createElement('div');
        if (!cas) { div.className = 'cruci-vacia'; grid.append(div); continue; }
        div.className = 'cruci-casilla';
        const num = inicios.get(clave(f, c));
        if (num) { const s = document.createElement('span'); s.className = 'cruci-numero'; s.textContent = num; div.append(s); }
        const input = document.createElement('input');
        input.autocomplete = 'off';
        input.spellcheck = false;
        input.setAttribute('autocapitalize', 'characters');
        input.setAttribute('aria-label', `Fila ${f + 1}, columna ${c + 1}`);
        div.append(input);
        cas.input = input;
        cas.div = div;
        grid.append(div);
      }
    }
    const pistas = document.createElement('div');
    pistas.className = 'cruci-pistas';
    [['h', 'Horizontales'], ['v', 'Verticales']].forEach(([dir, titulo]) => {
      const grupo = palabras.filter(p => p.dir === dir).sort((a, b) => a.numero - b.numero);
      if (!grupo.length) return;
      const bloque = document.createElement('div');
      bloque.innerHTML = `<h2>${titulo}</h2>`;
      const ol = document.createElement('ol');
      grupo.forEach(p => {
        const li = document.createElement('li');
        li.innerHTML = `<button type="button"><strong>${p.numero}</strong> ${p.pista} <span>(${p.palabra.length})</span></button>`;
        li.querySelector('button').addEventListener('click', () => { direccion = p.dir; casillas.get(clave(p.f, p.c)).input.focus(); });
        p.pistaEl = li;
        ol.append(li);
      });
      bloque.append(ol);
      pistas.append(bloque);
    });
    const acciones = document.createElement('div');
    acciones.className = 'cruci-acciones';
    acciones.innerHTML = '<button type="button" class="boton chico">Comprobar</button>';
    pistas.append(acciones);
    zona.append(grid, pistas);
    tablero.append(zona);

    // ---- Escritura y movimiento
    let direccion = 'h';
    let activa = null;
    casillas.forEach(cas => {
      const { input } = cas;
      input.addEventListener('focus', () => {
        if (!cas[direccion]) direccion = cas.h ? 'h' : 'v';
        resaltar(cas);
      });
      input.addEventListener('mousedown', () => {
        if (document.activeElement === input && cas.h && cas.v) { direccion = direccion === 'h' ? 'v' : 'h'; resaltar(cas); }
      });
      // Escribir una letra: reemplaza la que hubiera y pasa a la siguiente casilla
      function escribir(letra) {
        input.value = letra;
        cas.div.classList.remove('incorrecta', 'correcta');
        if (letra) mover(cas, 1);
        revisarFinal();
      }
      input.addEventListener('input', () => escribir(norm(input.value).slice(-1)));   // teclados de celular
      input.addEventListener('keydown', e => {
        const flechas = { ArrowRight: [0, 1, 'h'], ArrowLeft: [0, -1, 'h'], ArrowDown: [1, 0, 'v'], ArrowUp: [-1, 0, 'v'] };
        if (flechas[e.key]) {
          e.preventDefault();
          const [df, dc, dir] = flechas[e.key];
          const sig = casillas.get(clave(cas.f + df, cas.c + dc));
          if (cas[dir]) direccion = dir;
          if (sig) sig.input.focus(); else resaltar(cas);
        } else if (e.key.length === 1 && /[a-zñáéíóúü]/i.test(e.key) && !e.ctrlKey && !e.metaKey) {
          e.preventDefault();
          escribir(norm(e.key));
        } else if (e.key === 'Backspace') {
          e.preventDefault();
          if (input.value) { input.value = ''; cas.div.classList.remove('incorrecta', 'correcta'); actualizar(); }
          else { const ant = mover(cas, -1); if (ant) ant.input.value = ''; }
        }
      });
    });
    acciones.querySelector('button').addEventListener('click', () => {
      casillas.forEach(cas => {
        cas.div.classList.remove('incorrecta', 'correcta');
        if (cas.input.value) cas.div.classList.add(cas.input.value === cas.letra ? 'correcta' : 'incorrecta');
      });
      actualizar();
    });

    function mover(cas, paso) {
      const p = cas[direccion];
      if (!p) return null;
      const i = direccion === 'h' ? cas.c - p.c : cas.f - p.f;
      const j = i + paso;
      if (j < 0 || j >= p.palabra.length) return null;
      const sig = casillas.get(clave(p.f + (p.dir === 'v' ? j : 0), p.c + (p.dir === 'h' ? j : 0)));
      sig.input.focus();
      return sig;
    }
    function resaltar(cas) {
      grid.querySelectorAll('.en-palabra, .activa').forEach(d => d.classList.remove('en-palabra', 'activa'));
      pistas.querySelectorAll('.actual').forEach(li => li.classList.remove('actual'));
      const p = cas[direccion];
      activa = p;
      if (p) {
        casillas.forEach(x => { if (x[p.dir] === p) x.div.classList.add('en-palabra'); });
        p.pistaEl.classList.add('actual');
      }
      cas.div.classList.add('activa');
    }
    function completas() {
      return palabras.filter(p => {
        for (let i = 0; i < p.palabra.length; i++) {
          const cas = casillas.get(clave(p.f + (p.dir === 'v' ? i : 0), p.c + (p.dir === 'h' ? i : 0)));
          if (cas.input.value !== cas.letra) return false;
        }
        return true;
      });
    }
    function actualizar() {
      const ok = completas();
      palabras.forEach(p => p.pistaEl.classList.toggle('hecha', ok.includes(p)));
      api.progreso(`<span>Palabras correctas: <strong>${ok.length} de ${palabras.length}</strong></span>`);
      return ok.length;
    }
    function revisarFinal() {
      if (actualizar() === palabras.length) {
        casillas.forEach(cas => { cas.div.classList.add('correcta'); cas.input.readOnly = true; });
        api.terminar('Completaste todo el crucigrama.');
      }
    }
    actualizar();

    // ---- Generador de la cuadrícula
    function armar(lista) {
      let mejor = null;
      for (let intento = 0; intento < 80; intento++) {
        const orden = [...lista].sort((a, b) => b.palabra.length - a.palabra.length);
        if (intento > 0) {                     // primero la más larga, el resto en otro orden
          const resto = orden.slice(1);
          for (let i = resto.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [resto[i], resto[j]] = [resto[j], resto[i]]; }
          orden.splice(1, resto.length, ...resto);
        }
        const mapa = new Map();
        const colocadas = [];
        const poner = (p, f, c, dir) => {
          for (let i = 0; i < p.palabra.length; i++) {
            const k = clave(f + (dir === 'v' ? i : 0), c + (dir === 'h' ? i : 0));
            const cel = mapa.get(k) || { letra: p.palabra[i] };
            cel[dir] = true;
            mapa.set(k, cel);
          }
          colocadas.push({ ...p, f, c, dir });
        };
        const valida = (w, f, c, dir) => {
          const df = dir === 'v' ? 1 : 0, dc = dir === 'h' ? 1 : 0;
          if (mapa.has(clave(f - df, c - dc)) || mapa.has(clave(f + df * w.length, c + dc * w.length))) return -1;
          let cruces = 0;
          for (let i = 0; i < w.length; i++) {
            const ff = f + df * i, cc = c + dc * i;
            const cel = mapa.get(clave(ff, cc));
            if (cel) {
              if (cel.letra !== w[i] || cel[dir]) return -1;
              cruces++;
            } else if (mapa.has(clave(ff + dc, cc + df)) || mapa.has(clave(ff - dc, cc - df))) {
              return -1;
            }
          }
          return cruces;
        };
        poner(orden[0], 0, 0, 'h');
        for (const p of orden.slice(1)) {
          const opciones = [];
          mapa.forEach((cel, k) => {
            const [f0, c0] = k.split(',').map(Number);
            for (let i = 0; i < p.palabra.length; i++) {
              if (p.palabra[i] !== cel.letra) continue;
              for (const dir of ['h', 'v']) {
                if (cel[dir]) continue;
                const f = dir === 'v' ? f0 - i : f0, c = dir === 'h' ? c0 - i : c0;
                const cruces = valida(p.palabra, f, c, dir);
                if (cruces > 0) opciones.push({ f, c, dir, puntos: cruces * 10 - area(f, c, dir, p.palabra.length) / 20 + Math.random() });
              }
            }
          });
          if (!opciones.length) continue;
          opciones.sort((a, b) => b.puntos - a.puntos);
          poner(p, opciones[0].f, opciones[0].c, opciones[0].dir);
        }
        const fs = [], cs = [];
        mapa.forEach((_, k) => { const [f, c] = k.split(',').map(Number); fs.push(f); cs.push(c); });
        const minF = Math.min(...fs), minC = Math.min(...cs);
        const res = {
          palabras: colocadas.map(p => ({ ...p, f: p.f - minF, c: p.c - minC })),
          filas: Math.max(...fs) - minF + 1,
          columnas: Math.max(...cs) - minC + 1
        };
        const nota = res.palabras.length * 1000 - res.filas * res.columnas - Math.abs(res.filas - res.columnas) * 4;
        if (!mejor || nota > mejor.nota) mejor = { ...res, nota };
        if (mejor.palabras.length === lista.length && intento > 25) break;

        function area(f, c, dir, len) {
          let f1 = f, c1 = c, f2 = f + (dir === 'v' ? len - 1 : 0), c2 = c + (dir === 'h' ? len - 1 : 0);
          mapa.forEach((_, k) => { const [a, b] = k.split(',').map(Number); f1 = Math.min(f1, a); c1 = Math.min(c1, b); f2 = Math.max(f2, a); c2 = Math.max(c2, b); });
          return (f2 - f1 + 1) * (c2 - c1 + 1);
        }
      }
      return mejor;
    }
  }
};


/* =====================================================================
   PARTE 5. PÁGINA DE UN JUEGO (juego.html)
   ===================================================================== */
/* =====================================================================
   EQUILIBRIA — PÁGINA DE UN JUEGO (juego.html?juego=id)
   1. Lee qué juego se pidió en la dirección (?juego=memoria, sopa, crucigrama).
   2. Elige las palabras según la emoción guardada (o las generales).
   3. Dibuja la cabecera y pide al juego correspondiente que arme el tablero.
   Cada juego está en la PARTE 4 y se registra en window.EQUILIBRIA_MINIJUEGOS.
   ===================================================================== */
document.addEventListener('DOMContentLoaded', () => {
  const cont = document.getElementById('juego-detalle');
  if (!cont) return;
  const id = new URLSearchParams(location.search).get('juego');
  const juego = window.EQUILIBRIA_JUEGOS.find(j => j.id === id);
  const motor = (window.EQUILIBRIA_MINIJUEGOS || {})[id];

  if (!juego || !motor) {
    cont.className = 'zona-juego';
    cont.innerHTML = '<h1>No encontramos ese juego</h1><p class="juego-instruccion">Vuelve a la lista y elige uno de los juegos disponibles.</p><a href="juegos.html" class="boton">Volver a los juegos</a>';
    return;
  }

  // Emoción guardada (obtenerTema está en principal.js)
  const temaId = typeof obtenerTema === 'function' ? obtenerTema() : null;
  const tema = temaId ? window.EQUILIBRIA_TEMAS[temaId] : null;
  const datos = window.EQUILIBRIA_CONTENIDO_JUEGOS;
  const contenido = (temaId && datos[temaId]) || datos.general;

  document.title = `${juego.nombre} | Equilibria`;
  cont.className = `zona-juego juego-${juego.id} ${tema ? tema.clase : juego.clase}`;
  cont.innerHTML = `
    <a class="volver" href="juegos.html">Volver a los juegos</a>
    <h1>${juego.nombre}</h1>
    <p class="juego-instruccion">${juego.instrucciones}</p>
    <p class="juego-tema">${tema ? `Palabras para <strong>${tema.nombre}</strong>.` : 'Palabras generales de bienestar.'}
      <a href="index.html#explorar">${tema ? 'Cambiar cómo me siento' : 'Elegir cómo me siento'}</a></p>
    <div class="juego-barra">
      <p class="juego-progreso" id="juego-progreso" aria-live="polite"></p>
      <button type="button" class="boton secundario chico" id="juego-reiniciar">Reiniciar</button>
    </div>
    <div class="juego-final" id="juego-final" role="status" hidden></div>
    <div class="tablero" id="tablero"></div>`;

  const tablero = document.getElementById('tablero');
  const progreso = document.getElementById('juego-progreso');
  const final = document.getElementById('juego-final');

  // Lo que cada juego puede usar para comunicarse con la página
  const api = {
    progreso(html) { progreso.innerHTML = html; },
    terminar(mensaje) {
      final.hidden = false;
      final.innerHTML = `<div><h2>¡Lo lograste!</h2><p>${mensaje}</p></div><button type="button" class="boton">Jugar otra vez</button>`;
      final.querySelector('button').addEventListener('click', empezar);
      final.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  };

  function empezar() {
    final.hidden = true;
    final.innerHTML = '';
    tablero.innerHTML = '';
    motor.iniciar(tablero, contenido, api);
  }

  document.getElementById('juego-reiniciar').addEventListener('click', empezar);
  empezar();
});
