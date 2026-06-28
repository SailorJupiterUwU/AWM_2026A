export const useRol = () => {
    const rol = (sessionStorage.getItem("rol") || "").trim();

    const esVisualizador = rol.toLowerCase() === "visualizador";

    return {
        rol,
        esVisualizador,
    };
};