/**
 * Este archivo sirve como un punto central para exportar todos los assets
 * Facilita la importación y el mantenimiento de rutas de assets en el proyecto
 */
export const BACKGROUNDS = {
    sliderBackground: '/assets/backgrounds/background-slider.png',
};

export const getAssetPath = (path: string): string => {
    if (path.startsWith('http')) {
        return path; // URL externa
    }
    return path.startsWith('/') ? path : `/${path}`;
}; 