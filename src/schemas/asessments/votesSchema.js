import Joi from "joi";

export const votesSchema = Joi.object({
    vote: Joi.number().integer().min(1).max(5).required().messages({
        'number.base': 'El voto debe ser un número',
        'nomber.integer': 'El voto debe de ser un número entero',
        'number.min': 'El voto debe de ser como mínimo 1',
        'number.max': 'El voto debe de ser como máximo 5',
        'any.required': 'El voto es obligatorio'
    }),
    Comment: Joi.string().required().messages({
        'string.base': 'El cometario debe de ser un texto',
        'any.required': 'El comentario es obligatorio',
    }),
});