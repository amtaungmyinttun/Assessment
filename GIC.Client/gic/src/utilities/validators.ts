import { validators } from '@amille/simple-validators';
import { PropertyPath } from 'lodash';

const emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{1,}))$/;

const phoneRegex = /^[89][0-9]{7}$/;

const validEmail = (field: PropertyPath) =>
    validators.custom(field, (value, values, errors, context) => {
        if (value && !emailRegex.test(value)) {
            return context.defaultMessages.invalidEmail;
        }

        return null;
    });

const validPhone = (field: PropertyPath) =>
    validators.custom(field, (value, values, errors, context) => {
        if (value && !phoneRegex.test(value)) {
            return context.defaultMessages.invalidPhone;
        }

        return null;
    });

export default {
    ...validators,
    validEmail,
    validPhone,
};
