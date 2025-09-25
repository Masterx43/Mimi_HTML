const CLP = new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 });

                const els = {
                    service: document.getElementById('bkService'),
                    price: document.getElementById('bkPrice'),
                    date: document.getElementById('bkDate'),
                    time: document.getElementById('bkTime'),
                    name: document.getElementById('bkName'),
                    phone: document.getElementById('bkPhone'),
                    email: document.getElementById('bkEmail'),
                    form: document.getElementById('bookingForm'),
                    ok: document.getElementById('bkOk'),
                    err: document.getElementById('bkErr'),
                };

                // Click en "Agendar" → precarga servicio y precio + baja al formulario
                document.addEventListener('click', (e) => {
                    const btn = e.target.closest('.btn-agendar');
                    if (!btn) return;
                    const service = btn.dataset.service || 'Servicio';
                    const price = Number(btn.dataset.price) || 0;

                    els.service.value = service;
                    els.price.value = CLP.format(price);

                    // fecha mínima = hoy
                    const today = new Date();
                    const y = today.getFullYear();
                    const m = String(today.getMonth() + 1).padStart(2, '0');
                    const d = String(today.getDate()).padStart(2, '0');
                    els.date.min = `${y}-${m}-${d}`;

                    // limpiar selección previa
                    els.date.value = '';
                    els.time.innerHTML = `<option value="" selected disabled>Selecciona hora</option>`;
                    els.time.disabled = true;
                    els.name.value = '';
                    els.phone.value = '';
                    els.email.value = '';

                    // scroll suave al formulario
                    document.getElementById('reserva').scrollIntoView({ behavior: 'smooth' });
                });

                // bloque para que al elegur el domingo de un mensaje
                els.date?.addEventListener('change', () => {
                    els.time.innerHTML = `<option value="" selected disabled>Selecciona hora</option>`;

                    const sel = new Date(els.date.value + 'T00:00:00');
                    const dow = sel.getDay(); // Domingos 
                    if (dow === 0) {
                        els.err.classList.remove('d-none');
                        els.err.textContent = 'No atendemos los domingos. Por favor elige otro día.';
                        els.time.disabled = true;
                        return;
                    } else {
                        els.err.classList.add('d-none');
                        els.time.disabled = false;
                    }

                    // Horarios 
                    const openH = 10, closeH = 18, stepMin = 60;
                    for (let h = openH; h < closeH; h++) {
                        for (let m = 0; m < 60; m += stepMin) {
                            const hh = String(h).padStart(2, '0');
                            const mm = String(m).padStart(2, '0');
                            const label = `${hh}:${mm}`;
                            const opt = document.createElement('option');
                            opt.value = label;
                            opt.textContent = label;
                            els.time.appendChild(opt);
                        }
                    }
                });

                // Enviar reserva
                els.form?.addEventListener('submit', (e) => {
                    e.preventDefault();

                    if (!els.service.value || !els.date.value || !els.time.value ||
                        !els.name.value || !els.phone.value || !els.email.value) {
                        els.ok.classList.add('d-none');
                        els.err.classList.remove('d-none');
                        els.err.textContent = 'Completa todos los campos obligatorios.';
                        return;
                    }

                    const booking = {
                        service: els.service.value,
                        price: els.price.value,
                        date: els.date.value,
                        time: els.time.value,
                        name: els.name.value,
                        phone: els.phone.value,
                        email: els.email.value,
                        createdAt: new Date().toISOString()
                    };

                    // Guardar en localStorage (luego puedes enviar a backend)
                    if (!isNaN(booking.phone)){
                        const key = 'mimiBookings';
                        const list = JSON.parse(localStorage.getItem(key) || '[]');
                        list.push(booking);
                        localStorage.setItem(key, JSON.stringify(list));

                        els.err.classList.add('d-none');
                        els.ok.classList.remove('d-none');
                    } else {
                        alert("El telefono debe tener numeros.");
                        return;
                    }
                });