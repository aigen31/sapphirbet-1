$(function () {
  function Translator(language) {
    this.language = language
    this.data = []
    this.haveInput = () => {
      return this.currencyInput.is(this.currencyInput)
    }

    this.getData = () => {
      $.ajax({
        dataType: "json",
        url: `data/${this.language}.json`,
        success: (data) => {
          this.data = data

          data.forEach(function (element) {
            $(`[data-translate=${element.id}]`).html(element.content)
          })
        },
        error: (xhr) => {
          console.log("Geo-position detection error")
          this.language = "us"
					this.switcher.val(this.language)
					this.switcher.select2().trigger("change")
          this.getData(this.language)
        },
      })
    }

    this.changeLanguage = (language) => {
      this.language = language
      this.getData()
    }

    this.getCurrency = (selector) => {
      this.currencyInput = $(selector)

			console.log(this.language)

      if (this.haveInput(this.currencyInput)) {
        $(this.currencyInput).select2({
          minimumResultsForSearch: -1,
        })

        $.ajax({
          dataType: "json",
          url: `data/currencies.json`,
          success: (data) => {
            this.currencies = data

						setTimeout(() => {
							data.forEach((element) => {
								if (element.country === this.language) {
									$(this.currencyInput).val(element.currency)
									$(this.currencyInput).select2().trigger("change")
								} else {
									console.log(`Currency ${element.currency} not found`)
								}
							})
						}, 500)
          },
          error: (xhr) => {
            console.log("Ошибка")
          },
        })
      }
    }

    this.geoLanguage = () => {
      $.ajax({
        url: "https://get.geojs.io/v1/ip/geo.json",
        dataType: "json",
        success: (data) => {
          const countryCode = data.country_code.toLowerCase()

          this.changeLanguage(countryCode)

					this.switcher.val(countryCode)
					this.switcher.select2().trigger("change")

          console.log(`Current Geo-Position: ${countryCode}`)
        },
      })
    }

    this.mount = (detection) => {
      this.switcher = $(".language-switcher__select")
      this.switcher
        .select2({
          minimumResultsForSearch: -1,
        })
        .data("select2")
        .$dropdown.addClass("language-dropdown")

      this.switcher.on("select2:select", function (e) {
        var data = e.params.data
        translator.changeLanguage(data.id)
        setTimeout(equivalentHeight, 10)
      })

			detection ? this.geoLanguage() : this.changeLanguage(this.language)
    }
  }

	
	translator = new Translator("us")

	translator.mount(true)

	translator.getCurrency(".s-bonus__currency")

  $("#form-button").click(function () {
    $(".s-bonus__wrapper").fadeOut(300)
    $(".s-bonus__modal").css("display", "flex").hide().fadeIn(300)
  })

  $(".s-bonus__modal #close").click(function () {
    $(".s-bonus__wrapper").fadeIn(300)
    $(".s-bonus__modal").fadeOut(300)
  })

  $("#password__show").click(function () {
    let input = $(this).siblings("input")
    input.attr("type") === "password"
      ? input.attr("type", "text")
      : input.attr("type", "password")
  })

  let baseUrl = "images/dist/"

  const countryCodes = [
    {
      name: "United Kingdom",
      value: "United_Kingdom",
      code: "+1",
    },
    {
      name: "Russian Federation",
      value: "Russian_Federation",
      code: "+7",
    },
  ]

  let currentCode = countryCodes[0]

  for (let i = 0; i < countryCodes.length; i++) {
    $(".s-bonus__tel-contry").append(
      `<option value="${countryCodes[i].value}"><img src="${baseUrl}${countryCodes[i].value}.svg"/>${countryCodes[i].name}</option>`
    )
  }

  $(".s-bonus__tel-area").inputmask(`${currentCode.code} 999 999 9999`, {
    clearMaskOnLostFocus: false,
  })

  $(".s-bonus__tel-contry")
    .select2({
      templateResult: function (idioma) {
        var $span = $(
          `<span><img src="${baseUrl}${idioma.id}.svg"/>${idioma.text}</span>`
        )
        return $span
      },
      templateSelection: function (idioma) {
        var $span = $(`<img src="${baseUrl}${idioma.id}.svg"/>`)
        return $span
      },
    })
    .data("select2")
    .$dropdown.addClass("tel-dropdown")

  $(".s-bonus__tel-contry").on("select2:select", function (e) {
    const data = e.params.data

    for (let i = 0; i < countryCodes.length; i++) {
      if (countryCodes[i].value === data.id) {
        currentCode = countryCodes[i]
        $(".s-bonus__tel-area").inputmask(`${currentCode.code} 999 999 9999`, {
          clearMaskOnLostFocus: false,
        })
      }
    }
  })

  function equivalentHeight() {
    $(".s-bonus__form-wrapper.--equivalent").css("height", "")
    $(".s-bonus__sidebar.--equivalent").css("height", "")
    if ($(window).outerWidth() > 768) {
      if (
        $(".s-bonus__form-wrapper.--equivalent").outerHeight() <
        $(".s-bonus__sidebar.--equivalent").outerHeight()
      ) {
        $(".s-bonus__form-wrapper.--equivalent").css(
          "height",
          $(".s-bonus__sidebar.--equivalent").outerHeight()
        )
      } else {
        $(".s-bonus__sidebar.--equivalent").css(
          "height",
          $(".s-bonus__form-wrapper.--equivalent").outerHeight()
        )
      }
    }
  }
  setTimeout(equivalentHeight, 0)
})
