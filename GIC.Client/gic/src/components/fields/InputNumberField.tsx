import { InputNumber as AntdInputNumber, InputNumberProps } from 'antd';
import { useField } from 'formik';
import { memo } from 'react';
import FormItem, { FormItemProps } from './FormItem';

export interface InputFieldProps extends Omit<InputNumberProps, 'value' | 'onChange' | 'autoComplete'> {
    name: string;
    label?: string;
    itemProps?: Omit<FormItemProps, 'label' | 'meta' | 'required' | 'children'>;
}

const InputNumberField = ({ name, required, label, itemProps, ...props }: InputFieldProps) => {
    const [field, meta, { setValue }] = useField({ name });

    return (
        <FormItem {...itemProps} label={label} meta={meta} required={required}>
            <AntdInputNumber
                autoComplete="off"
                // spread props
                {...props}
                // then spread the field properties itself
                {...field}
                // manually attach on change
                controls={false}
                onChange={value => setValue(value)}
                style={{ width: '100%' }}
            />
        </FormItem>
    );
};

export default memo(InputNumberField);
