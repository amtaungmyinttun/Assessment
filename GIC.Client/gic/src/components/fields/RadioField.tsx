import { Radio, RadioGroupProps } from 'antd';
import { useField } from 'formik';
import { memo } from 'react';
import FormItem, { FormItemProps } from './FormItem';

export interface RadioGroupFieldProps extends Omit<RadioGroupProps, 'onChange'> {
    name: string;
    label?: string;
    itemProps?: Omit<FormItemProps, 'label' | 'meta' | 'required' | 'children'>;
    required?: boolean;
}

const RadioField = ({ name, required, label, itemProps, ...props }: RadioGroupFieldProps) => {
    const [field, meta] = useField({ name });

    return (
        <FormItem {...itemProps} label={label} meta={meta} required={required}>
            <Radio.Group
                checked={field.value}
                // spread props
                {...props}
                // then spread the field properties itself
                {...field}
            />
        </FormItem>
    );
};

export default memo(RadioField);
