const joiErrorMessages = {
    'any.required': 'El campo "{#key}" es obligatorio.',
    'string.base': 'El campo "{#key}" debe ser una cadena de texto.',
    'string.empty': 'El campo "{#key}" no puede estar vacío.',
    'number.base': 'El valor de "{#key}" debe ser un número.',
    'number.max': 'El valor de "{#key}" no puede ser mayor a {#limit}.',
    'object.base': 'El valor de "{#key}" debe ser un objeto válido.',
    'any.only': 'Solo se permiten valores específicos en "{#key}".',

    'string.email':
        'El campo "{#key}" debe contener un correo electrónico válido.',
    'string.pattern.base': [
        'El campo "{#key}" debe contener al menos:',
        '- 1 letra mayúscula',
        '- 1 letra minúscula',
        '- 1 número',
        '- 1 símbolo especial (!@#$%^&*)',
        '- Tener al menos {#limit} caracteres.',
    ].join(' '),
    'string.min': 'El campo "{#key}" debe tener al menos {#limit} caracteres.',
    'string.max': 'El campo "{#key}" no debe exceder los {#limit} caracteres.',

    'date.base':
        'El campo "{#key}" debe ser una fecha válida en formato YYYY-MM-DD.',
    'date.min': 'La fecha en "{#key}" no puede ser anterior a {#limit}.',
    'date.max': 'La fecha en "{#key}" no puede ser posterior a {#limit}.',

    'object.unknown': 'No se permiten campos adicionales en este objeto.',
};

export default joiErrorMessages;
