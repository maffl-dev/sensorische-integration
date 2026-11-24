// Slideshow: crossfade, arrows, swipe, keyboard, autoplay
(function () {
	var root = document.querySelector('.slideshow');
	if (!root) return;

	var slides = root.querySelectorAll('img');
	var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
	var interval = 5000;
	var current = 0;
	var timer = null;

	function show(index, byUser) {
		current = (index + slides.length) % slides.length;
		for (var i = 0; i < slides.length; i++) {
			slides[i].classList.toggle('is-active', i === current);
		}
		if (byUser) restart();
	}

	function restart() {
		clearInterval(timer);
		if (reduceMotion || document.hidden) return;
		timer = setInterval(function () { show(current + 1); }, interval);
	}

	root.querySelector('.slideshow-prev').addEventListener('click', function () { show(current - 1, true); });
	root.querySelector('.slideshow-next').addEventListener('click', function () { show(current + 1, true); });

	// swipe
	var startX = null;
	root.addEventListener('touchstart', function (e) { startX = e.touches[0].clientX; }, { passive: true });
	root.addEventListener('touchend', function (e) {
		if (startX === null) return;
		var dx = e.changedTouches[0].clientX - startX;
		if (Math.abs(dx) > 40) show(current + (dx < 0 ? 1 : -1), true);
		startX = null;
	});

	// keyboard
	root.addEventListener('keydown', function (e) {
		if (e.key === 'ArrowLeft') show(current - 1, true);
		if (e.key === 'ArrowRight') show(current + 1, true);
	});

	// pause while the tab is in the background
	document.addEventListener('visibilitychange', restart);

	show(0);
	restart();
})();

// Impressum dialog
(function () {
	var dialog = document.getElementById('impressum');
	var link = document.querySelector('.impressum-link');
	if (!dialog || !link || typeof dialog.showModal !== 'function') return;

	link.addEventListener('click', function (e) {
		e.preventDefault();
		dialog.showModal();
	});

	// close when clicking the backdrop
	dialog.addEventListener('click', function (e) {
		if (e.target === dialog) dialog.close();
	});
})();
