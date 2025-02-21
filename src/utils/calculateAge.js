export const calculateAge = (birthday) => {
    // obtenemos la fecha nacimiento del usuario a registrar
    const nacimiento = new Date(birthday);
    // obtenemos la fecha actual
    const hoy = new Date();
    // calculamos la diferencia de años
    const edad = hoy.getFullYear() - nacimiento.getFullYear();
    // si la fecha actual es menor a la fecha de nacimiento, restamos 1 año
    // obtenemos la diferencia de meses
    const mesDiff = hoy.getMonth() - nacimiento.getMonth();
    // obtenemos la diferencia de días
    const diaDiff = hoy.getDate() - nacimiento.getDate();
    // si aún no ha cumplido años este año restamos 1 año
    if (mesDiff < 0 || (mesDiff === 0 && diaDiff < 0)) {
        edad--;
    }
    return edad;
};
