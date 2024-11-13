var consent = __md_get("__consent")
if (consent && consent.custom) {
  /* The user accepted custom cookies */
}

/* Wait for page to load */
document.addEventListener("DOMContentLoaded", function() {
  var buttons = document.querySelectorAll(".md-consent__controls button")
  buttons.forEach(function(button) {
    if (button.dataset.mdconsentAction === "manage") {
      button.addEventListener("click", function() {
        /* Open custom dialog */
        var dialog = document.createElement("dialog")
        dialog.innerHTML = `
          <h2>Configuració de galetes</h2>
          <form method="dialog">
            <label>
              <input type="checkbox" name="analytics" ${consent && consent.analytics ? "checked" : ""}>
              Google Analytics
            </label>
            <br>
            <label>
              <input type="checkbox" name="custom" ${consent && consent.custom ? "checked" : ""}>
              Galetes personalitzades
            </label>
            <br><br>
            <button type="submit">Desar configuració</button>
          </form>
        `
        document.body.appendChild(dialog)
        dialog.showModal()

        dialog.querySelector("form").addEventListener("submit", function(e) {
          e.preventDefault()
          var formData = new FormData(e.target)
          var newConsent = {}
          for (var [key, value] of formData.entries()) {
            newConsent[key] = true
          }
          __md_set("__consent", newConsent)
          location.reload()
        })
      })
    }
  })
})

