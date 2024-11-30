import dayjs from 'dayjs';
import { useField } from 'formik';
import { memo, useState, useCallback, useEffect, useMemo } from 'react';
import FormItem, { FormItemProps } from './FormItem';
import { DatePicker, DatePickerProps } from 'antd';

export type DatePickerFieldProps = Omit<DatePickerProps<dayjs.Dayjs>, 'value' | 'onChange'> &
    Pick<FormItemProps, 'label'> & {
        name: string;
        required?: boolean;
        readOnly?: boolean;
    };

const DatePickerField = ({ name, required, label, disabled, readOnly, ...props }: DatePickerFieldProps) => {
    const [field, meta, { setValue: setFieldValue, setTouched }] = useField({ name });

    const defaultValue = useMemo(() => {
        if (meta.initialValue) {
            const wrapped = dayjs(meta.initialValue);

            if (wrapped.isValid()) {
                return wrapped;
            }
        }

        return null;
    }, [meta.initialValue]);

    const [value, setValue] = useState<dayjs.Dayjs | undefined>();

    useEffect(() => {
        const date = field.value ? dayjs(field.value) : undefined;
        // set internal date value
        setValue(date);
    }, [field.value]);

    const onChange = useCallback(
        (date: dayjs.Dayjs) => {
            // set formik date value
            // dates will be converted to native Date object
            let newDate;

            if (date) {
                newDate = date.toDate();
            }

            setFieldValue(newDate);
        },
        [setFieldValue]
    );

    const disableField = disabled || readOnly;

    return (
        <FormItem label={label} meta={meta} required={required}>
            <DatePicker
                disabled={disableField}
                picker="date"
                // spread props
                {...props}
                defaultValue={defaultValue}
                onChange={onChange}
                value={value}
                style={{ width: '100%' }}
                onClick={() => setTouched(true)}
            />
        </FormItem>
    );
};

export default memo(DatePickerField);
