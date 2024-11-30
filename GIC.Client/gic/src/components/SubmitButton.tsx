import { Button, ButtonProps, Form } from 'antd';
import { useFormikContext } from 'formik';
import { memo } from 'react';

export type SubmitButtonProps = Omit<ButtonProps, 'loading'> & { noFormItem?: boolean; dirtyCheck?: boolean };

const SubmitButton = ({
    disabled,
    dirtyCheck = true,
    noFormItem,
    htmlType = 'submit',
    ...props
}: SubmitButtonProps) => {
    const { isValid, isSubmitting, dirty } = useFormikContext();

    const button = (
        <Button
            type="primary"
            {...props}
            disabled={!isValid || disabled || (dirtyCheck && !dirty)}
            htmlType={htmlType}
            loading={isSubmitting}
        />
    );

    if (noFormItem) {
        return button;
    }

    return <Form.Item>{button}</Form.Item>;
};

export default memo(SubmitButton);
