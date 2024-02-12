const sidebarToggle = "_execute_sidebar_action";
const successMessage = document.querySelector("#success_message");
const failureMessage = document.querySelector("#failure_message");
const shortcutInput = document.querySelector("#shortcut");

// Update UI and set value of textbox
async function updateUI() {
  const commands = await browser.commands.getAll();
  const sidebarCommand = commands.find(command => command.name === sidebarToggle);
  if (sidebarCommand) {
    shortcutInput.value = sidebarCommand.shortcut;
  }
}

// Show success message
function showSuccessMessage(message) {
  successMessage.textContent = message;
  setTimeout(() => {
    hideSuccessMessage();
  }, 2000);
}

// Hide success message
function hideSuccessMessage() {
  successMessage.textContent = "";
}

// Show failure message
function showFailureMessage(message, link) {
  const errorMessage = document.createElement("span");
  errorMessage.textContent = message;

  const errorLink = document.createElement("a");
  errorLink.textContent = "key combination";
  errorLink.href = link;
  errorLink.target = "_blank";

  errorMessage.appendChild(errorLink);

  failureMessage.innerHTML = "";
  failureMessage.appendChild(errorMessage);
}

// Hide failure message
function hideFailureMessage() {
  failureMessage.textContent = "";
}

// Update shortcut to value of textbox
async function updateShortcut() {
  try {
    await browser.commands.update({
      name: sidebarToggle,
      shortcut: shortcutInput.value,
    });
    showSuccessMessage("Shortcut updated successfully");
    hideFailureMessage(); // Oculta el mensaje de fallo si estaba siendo mostrado
  } catch (error) {
    showFailureMessage("Error updating shortcut, verify the ", "https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json/commands#key_combinations");
    hideSuccessMessage(); // Oculta el mensaje de éxito si estaba siendo mostrado
  }
}

// Reset shortcut and update textbox
async function resetShortcut() {
  try {
    await browser.commands.reset(sidebarToggle);
    updateUI();
    showSuccessMessage("Shortcut reset successfully");
    hideFailureMessage(); // Oculta el mensaje de fallo si estaba siendo mostrado
  } catch (error) {
    showFailureMessage("Error resetting shortcut, verify the ", "https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json/commands#key_combinations");
    hideSuccessMessage(); // Oculta el mensaje de éxito si estaba siendo mostrado
  }
}

// Update UI on page load
document.addEventListener("DOMContentLoaded", updateUI);

// Act on update and reset buttons
document.querySelector("#update").addEventListener("click", updateShortcut);
document.querySelector("#reset").addEventListener("click", resetShortcut);
