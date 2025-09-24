const CURRENCY = new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 });
            let cart = [];

            const els = {
                cartCount: document.getElementById('cartCount'),
                cartItems: document.getElementById('cartItems'),
                cartTotal: document.getElementById('cartTotal'),
                btnEmpty: document.getElementById('btnEmptyCart'),
                btnCheckout: document.getElementById('btnCheckout')
            };

            function renderCart() {
                els.cartItems.innerHTML = '';
                if (cart.length === 0) {
                    els.cartItems.innerHTML = '<li class="list-group-item text-center text-muted">Tu carrito está vacío</li>';
                } else {
                    cart.forEach(item => {
                        const li = document.createElement('li');
                        li.className = 'list-group-item d-flex justify-content-between align-items-center';
                        li.innerHTML = `
            ${item.name} x${item.qty}
            <span>${CURRENCY.format(item.price * item.qty)}</span>`;
                        els.cartItems.appendChild(li);
                    });
                }
                const total = cart.reduce((acc, it) => acc + it.price * it.qty, 0);
                els.cartTotal.textContent = CURRENCY.format(total);
                els.cartCount.textContent = cart.reduce((a, b) => a + b.qty, 0);
            }

            function addToCart(product) {
                const found = cart.find(p => p.id === product.id);
                if (found) {
                    found.qty++;
                } else {
                    cart.push({ ...product, qty: 1 });
                }
                renderCart();
            }

            document.addEventListener('click', (e) => {
                const btn = e.target.closest('.btn-add-to-cart');
                if (btn) {
                    addToCart({
                        id: btn.dataset.id,
                        name: btn.dataset.name,
                        price: Number(btn.dataset.price),
                        img: btn.dataset.img
                    });
                }
            });
                /*carrito*/
            els.btnEmpty.addEventListener('click', () => { cart = []; renderCart(); });
            els.btnCheckout.addEventListener('click', () => {
                if (cart.length === 0) return alert('Carrito vacío');
                alert('Aquí iría el pago (simulado)');
            });

            renderCart();