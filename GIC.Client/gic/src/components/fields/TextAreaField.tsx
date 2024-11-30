import { Input } from 'antd';
import { TextAreaProps } from 'antd/es/input';
import { useField } from 'formik';
import { memo } from 'react';
import FormItem, { FormItemProps } from './FormItem';

export interface TextAreaFieldProps extends Omit<TextAreaProps, 'value' | 'onChange'> {
    name: string;
    label?: JSX.Element | string;
    tooltip?: FormItemProps['tooltip'];
}

const TextAreaField = ({ name, required, label, tooltip, ...props }: TextAreaFieldProps) => {
    const [field, meta] = useField({ name });

    return (
        <FormItem label={label} meta={meta} required={required} tooltip={tooltip}>
            <Input.TextArea
                autoSize={{ minRows: 2, maxRows: 6 }}
                // spread props
                {...props}
                // then spread the field properties itself
                {...field}
            />
        </FormItem>
    );
};

export default memo(TextAreaField);
