import generateErrorUtils from './helpersUtils.js';

const validateSchemaUtil = async (schema, data) => {
    try {
        await schema.validateAsync(data, {
            abortEarly: false,
            allowUnknown: false,
            stripUnknown: true,
        });
    } catch (error) {
        throw generateErrorUtils(400, 'BAD_DATA', error.message);
    }
};

export default validateSchemaUtil;
