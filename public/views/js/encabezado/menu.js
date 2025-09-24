export function toggleMenu() {
    const navMenu = document.getElementById("navMenu");
    navMenu.classList.toggle("active");
}

export function mostrarIdEmpresa() {
    const idEmpresa = localStorage.getItem("idEmpresa");
    if (idEmpresa) {
        document.getElementById("idEmpresa2").value = idEmpresa;
    }
}
