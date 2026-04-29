const consola = document.getElementById('consola');
const estadio = document.getElementById('estadio');
const logList = document.getElementById('log-list');

function ejecutarSimulacion() {
    const balls = [document.getElementById('ball-1'), document.getElementById('ball-2'), document.getElementById('ball-3')];
    const bat = document.getElementById('bat');
    const impact = document.getElementById('impact');

    balls.forEach(b => { b.style.top = "-50px"; b.classList.remove('fly-away'); });
    consola.innerHTML = "<p>> [TRY] Solicitando datos críticos...</p>";

    setTimeout(() => {
        try {
            let userIn = prompt("SIMULADOR DE EXCEPCIONES:\n1. Forzar ValueError\n2. Forzar FileNotFoundError\n3. Forzar ZeroDivisionError\n4. Entrada correcta (Robustez)");

            if (userIn === "1") throw new Error("ValueError: Formato de edad inválido");
            if (userIn === "2") throw new Error("FileNotFoundError: datos.csv no hallado");
            if (userIn === "3") throw new Error("ZeroDivisionError: Divisor es 0");
            if (userIn === "4") {
                consola.innerHTML += "<p style='color:white'>✅ [EXITO] Entrada válida. Programa estable.</p>";
                return;
            }
            throw new Error("UnknownError: El usuario canceló o ingresó basura");

        } catch (e) {
            // Feedback Útil al Usuario (KPI Aprendizaje)
            consola.innerHTML += `<p style="color:var(--error)">❌ [EXCEPT] Detenido: ${e.message}</p>`;
            
            // Registro en el Log (Mejora UX)
            let entry = document.createElement('li');
            entry.innerText = `[${new Date().toLocaleTimeString()}] ${e.message.split(':')[0]}`;
            logList.prepend(entry);

            // Secuencia de Batazo con Shake
            let ballToHit = balls[Math.floor(Math.random()*3)];
            ballToHit.style.top = "180px";

            setTimeout(() => {
                bat.classList.add('swing');
                impact.classList.add('show-impact');
                estadio.classList.add('shake'); // Efecto de temblor
                ballToHit.classList.add('fly-away');

                setTimeout(() => {
                    bat.classList.remove('swing');
                    impact.classList.remove('show-impact');
                    estadio.classList.remove('shake');
                }, 200);
            }, 500);

        } finally {
            setTimeout(() => {
                consola.innerHTML += "<p style='color:#666'>🏁 [FINALLY] Cierre de descriptores. Limpieza OK.</p>";
            }, 2000);
        }
    }, 300);
}

// Matrix Background
const canvas = document.getElementById('matrix-bg');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth; canvas.height = window.innerHeight;
const drops = Array(Math.floor(canvas.width/20)).fill(1);
function matrix() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)"; ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#020";
    drops.forEach((y, i) => {
        ctx.fillText(Math.random() > 0.5 ? "1" : "0", i * 20, y * 20);
        if (y * 20 > canvas.height && Math.random() > 0.98) drops[i] = 0;
        drops[i]++;
    });
}
setInterval(matrix, 50);