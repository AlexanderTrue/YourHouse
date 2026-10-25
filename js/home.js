// YourHouse — redesign 2026 · интерактив главной страницы
(function () {
	"use strict";

	// ---------- sticky header ----------
	const header = document.getElementById("header");
	const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 10);
	window.addEventListener("scroll", onScroll, { passive: true });
	onScroll();

	// ---------- мобильное меню ----------
	const burger = document.getElementById("burger");
	const nav = document.getElementById("nav");
	burger.addEventListener("click", () => {
		const open = nav.classList.toggle("open");
		burger.classList.toggle("open", open);
		burger.setAttribute("aria-expanded", open);
		document.body.classList.toggle("lock", open);
	});
	nav.addEventListener("click", (e) => {
		if (e.target.closest(".nav__link")) {
			nav.classList.remove("open");
			burger.classList.remove("open");
			burger.setAttribute("aria-expanded", "false");
			document.body.classList.remove("lock");
		}
	});

	// ---------- reveal on scroll ----------
	const io = new IntersectionObserver(
		(entries) => {
			entries.forEach((en) => {
				if (en.isIntersecting) {
					en.target.classList.add("on");
					io.unobserve(en.target);
				}
			});
		},
		{ threshold: 0.12 }
	);
	document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

	// ---------- rail «Хиты продаж» ----------
	const rail = document.getElementById("rail");
	const step = () => 305; // ширина карточки + gap
	document.getElementById("railPrev").addEventListener("click", () => {
		rail.scrollBy({ left: -step() * 2, behavior: "smooth" });
	});
	document.getElementById("railNext").addEventListener("click", () => {
		rail.scrollBy({ left: step() * 2, behavior: "smooth" });
	});

	// ---------- демо-корзина ----------
	let count = 0;
	let sum = 0;
	const countEl = document.getElementById("cartCount");
	const cartBtn = document.getElementById("cartBtn");
	document.querySelectorAll(".to-cart").forEach((btn) => {
		btn.addEventListener("click", () => {
			count += 1;
			sum += parseInt(btn.dataset.price, 10);
			countEl.textContent = count;
			countEl.style.transform = "scale(1.35)";
			setTimeout(() => (countEl.style.transform = ""), 180);
			cartBtn.classList.remove("bump");
			void cartBtn.offsetWidth; // reflow для перезапуска анимации
			cartBtn.classList.add("bump");
			btn.textContent = "Добавлено ✓";
			btn.disabled = true;
			setTimeout(() => {
				btn.textContent = "В корзину";
				btn.disabled = false;
			}, 1400);
		});
	});

	// ---------- dialog «Заказать звонок» ----------
	const dlg = document.getElementById("callback");
	document.querySelectorAll("[data-open-dialog]").forEach((b) =>
		b.addEventListener("click", () => dlg.showModal())
	);
	document.querySelectorAll("[data-close-dialog]").forEach((b) =>
		b.addEventListener("click", () => dlg.close())
	);
	dlg.addEventListener("click", (e) => {
		const r = dlg.getBoundingClientRect();
		const inside = e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom;
		if (!inside) dlg.close();
	});
	document.getElementById("callbackForm").addEventListener("submit", () => {
		const form = document.getElementById("callbackForm");
		form.innerHTML =
			'<p class="dlg__eyebrow">Готово</p><h3 class="dlg__title">Спасибо! Перезвоним за 15 минут</h3>' +
			'<p class="dlg__note" style="margin-bottom:8px">Заявка принята — менеджер уже набирает номер.</p>' +
			'<button type="button" class="btn btn_dark btn_wide" data-close-dialog>Хорошо</button>';
		form.querySelector("[data-close-dialog]").addEventListener("click", () => dlg.close());
	});
})();
