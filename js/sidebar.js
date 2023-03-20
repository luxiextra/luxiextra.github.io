const includeSidebar = async () => {
    const response = await fetch("/elements/sidebar.html");
    const sidebarContent = await response.text();
    document.querySelector("#sidebar").innerHTML = sidebarContent;
};


document.addEventListener("DOMContentLoaded", function () {
    includeSidebar();
});