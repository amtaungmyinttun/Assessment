import { Button, ButtonProps } from 'antd';
import useGoTo from '../utilities/useGoTo';

export type EditButtonProps = Omit<ButtonProps, 'onClick'> & {
    url: string;
};

const EditButton = ({ url, ...props }: EditButtonProps) => {
    const goToEditPage = useGoTo(url);

    return <Button {...props} onClick={goToEditPage}>Edit</Button>
}

export default EditButton
