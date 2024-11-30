import { Form, FormItemProps as AntdFormItemProps } from 'antd';
import { FieldMetaProps } from 'formik';

export type FormItemProps = {
    meta?: Pick<FieldMetaProps<any>, 'error' | 'touched'>;
    // make it optional so it can be use in table header
    children?: JSX.Element;
} & Omit<AntdFormItemProps, 'validateStatus'>;

const FormItem = ({ meta, children, ...props }: FormItemProps) => {
    const hasError = !!meta?.error && meta?.touched;

    const errorMessage = Array.isArray(meta?.error) ? '' : meta?.error;

    return (
        <Form.Item
            {...props}
            help={hasError ? errorMessage : props.help}
            validateStatus={hasError ? 'error' : 'success'}
            layout='vertical'
        >
            {children}
        </Form.Item>
    );
};

export default FormItem;
