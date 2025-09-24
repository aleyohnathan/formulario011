export function toggleMenu() {
    const navMenu = document.getElementById("navMenu");
    navMenu.classList.toggle("active");
}
export function guardarIdEmpresa() { 
    const idEmpresa = document.getElementById("idEmpresa").value;
    localStorage.setItem("idEmpresa", idEmpresa);
}
