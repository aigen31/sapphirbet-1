// // Import vendor jQuery plugin example

$(function() {
	$('#form-button').click(function() {
		$('.s-bonus__wrapper').fadeOut(300)
		$('.s-bonus__modal').css("display", "flex").hide().fadeIn(300)
		// $('.parallax').addClass('active')
	})

	$('.s-bonus__modal #close').click(function() {
		$('.s-bonus__wrapper').fadeIn(300)
		$('.s-bonus__modal').fadeOut(300)
		// $('.parallax').removeClass('active')
	})

	$('#password__show').click(function() {
		let input = $(this).siblings('input')
		input.attr('type') === 'password' ? input.attr('type', 'text') : input.attr('type', 'password')
	})

	let baseUrl = 'images/dist/'

	const countryCodes = [
		{
			name: 'United Kingdom',
			value: 'United_Kingdom',
			code: '+1'
		},
		{
			name: 'Russian Federation',
			value: 'Russian_Federation',
			code: '+7'
		},
	]

	let currentCode = countryCodes[0]

	for (let i = 0; i < countryCodes.length; i++) {
		$(".s-bonus__tel-contry").append(`<option value="${countryCodes[i].value}"><img src="${baseUrl}${countryCodes[i].value}.svg"/>${countryCodes[i].name}</option>`)
	}

	$(".s-bonus__tel-area").inputmask(`${currentCode.code} 999 999 9999`, {
		clearMaskOnLostFocus: false
	})

	$(".s-bonus__tel-contry").select2({
		templateResult: function (idioma) {
			var $span = $(`<span><img src="${baseUrl}${idioma.id}.svg"/>${idioma.text}</span>`);
			return $span;
		},
		templateSelection: function (idioma) {
			var $span = $(`<img src="${baseUrl}${idioma.id}.svg"/>`);
			return $span;
		}
	});

	$(".s-bonus__tel-contry").on('select2:select', function (e) {
		const data = e.params.data;

		for (let i = 0; i < countryCodes.length; i++) {
			if (countryCodes[i].value === data.id) {
				currentCode = countryCodes[i]
				$(".s-bonus__tel-area").inputmask(`${currentCode.code} 999 999 9999`, {
					clearMaskOnLostFocus: false
				})
			}
		}
	});
})
