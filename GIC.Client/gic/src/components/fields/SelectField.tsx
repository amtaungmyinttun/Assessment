import { Select, SelectProps } from 'antd';
import { useField } from 'formik';
import { memo, useMemo } from 'react';
import FormItem from './FormItem';

export interface SelectFieldProps extends Omit<SelectProps, 'value' | 'autoComplete'> {
    name: string;
    label?: string;
    required?: boolean;
    formItemNoStyle?: boolean;
}

const SelectField = ({
    name,
    label,
    required,
    disabled,
    formItemNoStyle,
    onChange: onChangeProp,
    ...props
}: SelectFieldProps) => {
    const [field, meta, helpers] = useField({ name });

    const onChange = useMemo(
        (): SelectFieldProps['onChange'] => onChangeProp ?? ((value: any) => helpers.setValue(value)),
        [onChangeProp, helpers]
    );

    return (
        <FormItem label={label} meta={meta} name={name} noStyle={formItemNoStyle} required={required}>
            <Select
                disabled={disabled}
                popupMatchSelectWidth={false}
                getPopupContainer={(trigger: any) => trigger.parentElement}
                onChange={onChange}
                value={field.value}
                // spread props
                {...props}
                notFoundContent={"No option"}
            />
        </FormItem>
    );
};

export default memo(SelectField);