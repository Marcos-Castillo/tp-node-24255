document.addEventListener('DOMContentLoaded', () => {
    const ApiUrl = 'http://localhost:3000' 
    const registerForm = document.getElementById('register-form');
    const loginForm = document.getElementById('login-form');
    const createReservaForm = document.getElementById('create-reserva-form');
    const fetchReservasButton = document.getElementById('fetch-reservas');
    const reservasList = document.getElementById('reservas-list');
    const cardLogin = document.getElementById('cardLogin');
    const cardReservas = document.getElementById('cardReservas');
    const cardRegistrar = document.getElementById('cardRegistar');
    const verRegistrar = document.getElementById('verRegistrar');
    
    let token = '';
    
    verRegistrar.addEventListener('click', async () => {
        cardRegistrar.classList.toggle('d-none')
        cardLogin.classList.toggle('d-none')
    })


    registerForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const nombre = document.getElementById('register-nombre').value;
      const email = document.getElementById('register-email').value;
      const password = document.getElementById('register-password').value;
  
      try {
        const response = await fetch(ApiUrl+'/api/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ nombre, email, password }),
        });
        const data = await response.json();
        console.log(data);
        cardRegistrar.classList.toggle('d-none')
        cardLogin.classList.toggle('d-none')
      } catch (error) {
        console.error(error);
      }
    });
  
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = document.getElementById('login-email').value;
      const password = document.getElementById('login-password').value;
  
      try {
        const response = await fetch(ApiUrl + '/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });
        const data = await response.json();
        token = data.token;
        if(token){
            cardLogin.classList.toggle('d-none')
            cardReservas.classList.toggle('d-none')
        }
      } catch (error) {
        console.error(error);
      }
    });
  
    fetchReservasButton.addEventListener('click', async () => {
      try {
        const response = await fetch(ApiUrl + '/api/reservas', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        const data = await response.json();
        reservasList.innerHTML = '';
        data.forEach(reserva => {
          const li = document.createElement('li');
          li.className = 'list-group-item';
          li.textContent = `Fecha: ${reserva.fecha}, Hora Inicio: ${reserva.hora_inicio}, Hora Fin: ${reserva.hora_fin}, Tiempo de Permanencia: ${reserva.tiempo_permanencia}`;
          reservasList.appendChild(li);
        });
      } catch (error) {
        console.error(error);
      }
    });
  
    createReservaForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const fecha = document.getElementById('reserva-fecha').value;
      const hora_inicio = document.getElementById('reserva-hora-inicio').value;
      const hora_fin = document.getElementById('reserva-hora-fin').value;
      const tiempo_permanencia = document.getElementById('reserva-tiempo-permanencia').value;
  
      try {
        const response = await fetch(ApiUrl + '/api/reservas', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({ fecha, hora_inicio, hora_fin, tiempo_permanencia }),
        });
        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    });
  });
  