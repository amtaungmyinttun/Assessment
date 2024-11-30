import { Validator, defaultMessages } from '@amille/simple-validators';
import { useCallback, useMemo } from 'react';

var messages = {
    ...defaultMessages,
    invalidEmail: 'Invalid Email',
    invalidPhone: 'Invalid Phone'
}

const useValidator = <TValues = any, TContext = any>(
    validator: Validator<TContext>,
    context?: TContext
) => {
    return useCallback(
        (values: TValues) => validator.validate(values, context, { defaultMessages: messages }),
        [validator, context]
    );
};

export default useValidator;
