//TODO: overwrite with MVC
//https://alexatnet.com/model-view-controller-mvc-in-javascript_ru/
//https://www.taniarascia.com/javascript-mvc-todo-app/

//TODO: Can include TS

window.addEventListener('DOMContentLoaded', () => {
	const prev = document.querySelector('.player-chunk-prev');
	const next = document.querySelector('.player-chunk-next');

	const moveClass = (classNameActive, method, pred) => {
		const active = document.querySelector(`.${classNameActive}`)
		const next = active[method]

		if (pred && !pred(active)) {
			return null
		}

		if (next) {
			active.classList.remove(classNameActive)
			next.classList.add(classNameActive)

			return active
		}

		return null
	}

	const nextStory = () => {
		moveClass('player-chunk--active', 'nextElementSibling')
		const el = moveClass('timeline-chunk--active', 'nextElementSibling')
		if (el) {
			el.querySelector('.timeline-chunk__inner').style.width = ''
		}
	}
	const prevStory = () => {
		moveClass('player-chunk--active', 'previousElementSibling')
		const el = moveClass('timeline-chunk--active', 'previousElementSibling', (active) => {
			const
					inner = active.querySelector('.timeline-chunk__inner')
			width = parseFloat(inner.style.width) || 0

			active.querySelector('.timeline-chunk__inner').style.width = ''
			return width <= 30
		})
		if (el) {
			el.querySelector('.timeline-chunk__inner').style.width = ''
		}
	}

	const step = 1

	let timer;
	const runInterval = (time = 2, step = 1) => {
		clearInterval(timer)

		timer = setInterval(() => {
			const
					active = document.querySelector(`.timeline-chunk--active`).querySelector('.timeline-chunk__inner')
			let
					width = parseFloat(active.style.width) || 0

			if (width === 100) {
				nextStory()
				return
			}

			active.style.width = `${width + step}%`

		}, time * 1000 * step / 100)
	}

	runInterval()
	prev.addEventListener('click', prevStory)
	next.addEventListener('click', nextStory)
})
