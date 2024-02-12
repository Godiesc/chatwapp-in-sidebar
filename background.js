const sidebarToggle = "_execute_sidebar_action";

// Adds Sidebar Toggle Button
function openSidebar() {
  browser.sidebarAction.toggle();
}

browser.browserAction.onClicked.addListener(openSidebar);

