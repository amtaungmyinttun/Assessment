import { Button, ButtonProps, Popconfirm, PopconfirmProps } from 'antd';

export type DeleteButtonProps = Omit<ButtonProps, 'color'> & {
    popConfirmTitle: string;
    onConfirm: PopconfirmProps['onConfirm'];
};

const DeleteButton = ({ popConfirmTitle, onConfirm, ...rest }: DeleteButtonProps) => {
    return (
        <Popconfirm
            cancelText="Cancel"
            okText="Ok"
            onConfirm={onConfirm}
            title={popConfirmTitle}
        >
            <Button {...rest}>Delete</Button>
        </Popconfirm>
    );
};

export default DeleteButton;
