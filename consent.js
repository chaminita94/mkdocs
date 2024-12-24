
/* Wait for page to load */
document.addEventListener("DOMContentLoaded", function() {
  // Load Google Translate API
  var translateScript = document.createElement("script");
  translateScript.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
  document.head.appendChild(translateScript);

  // Add Google Translate widget container
  var translateDiv = document.createElement("div");
  translateDiv.id = "google_translate_element";
  translateDiv.classList.add("translate-widget");
  document.body.insertBefore(translateDiv, document.body.firstChild);

  // Consent configuration
  var buttons = document.querySelectorAll(".md-consent__controls button");
  buttons.forEach(function(button) {
    if (button.dataset.mdconsentAction === "manage") {
      button.addEventListener("click", function() {
        /* Open custom dialog */
        var dialog = document.createElement("dialog");
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
        `;
        document.body.appendChild(dialog);
        dialog.showModal();

        dialog.querySelector("form").addEventListener("submit", function(e) {
          e.preventDefault();
          var formData = new FormData(e.target);
          var newConsent = {};
          for (var [key, value] of formData.entries()) {
            newConsent[key] = true;
          }
          __md_set("__consent", newConsent);
          location.reload();
        });
      });
    }
  });
});

function googleTranslateElementInit() {
  console.log("Initializing Google Translate...");
  new google.translate.TranslateElement(
      {
          pageLanguage: 'ca',
          layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
          autoDisplay: false, 
      },
      'google_translate_element'
  );
}
