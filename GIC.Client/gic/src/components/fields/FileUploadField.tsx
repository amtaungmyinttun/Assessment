import { UploadOutlined } from '@ant-design/icons';
import { Button, message, Upload, UploadProps } from 'antd';
import { useField } from 'formik';
import { useCallback, useMemo } from 'react';
import FormItem, { FormItemProps } from './FormItem';

export type SingleUploadFileProps = Omit<UploadProps, 'accept' | 'listType' | 'maxCount'> & {
    name: string;
    extensions: string[];
    label?: string;
    required?: boolean;
    getLink?: (field: string, documentId: string) => Promise<string>;
    sizeLimitInMiB?: number;
    tooltip?: FormItemProps['tooltip'];
};

const FileUploadField = ({
    name,
    extensions,
    label,
    required = false,
    getLink,
    sizeLimitInMiB = 2,
    tooltip,
    ...props
}: SingleUploadFileProps) => {
    const [{ value }, meta, helpers] = useField(name);

    var fileList = useMemo(() => {
        if (value instanceof File) {
            console.log(value);
            return [{
                uid: value.name,
                name: value.name,
                url: URL.createObjectURL(value),
            }]
        }

        if (value) {
            return [{
                uid: value,
                name: value,
                url: value,
            }]
        }
        
        return [];
    }, [value]);

    const accept = useMemo(() => extensions.join(','), [extensions]);
    const customRequest = useCallback(
        ({ file, onSuccess }: any) => {
            // set the file manually
            helpers.setValue(file);
            // touch the field manually
            helpers.setTouched(true);
            // no preview
            onSuccess(null);
        },
        [helpers, value]
    );

    const onRemove = useCallback(
        () => {
            helpers.setTouched(true);

            helpers.setValue(null);
        },
        [helpers, value]
    );

    const beforeUpload = useCallback(
        (file: File) => {
            if (file.size > sizeLimitInMiB * 1024 * 1024) {
                message.error(`File size should not exceed {${sizeLimitInMiB}}MB.`);

                return Upload.LIST_IGNORE;
            }

            return true;
        },
        [sizeLimitInMiB]
    );

    return (
        <FormItem label={label} meta={meta} name={name} required={required} tooltip={tooltip}>
            <Upload
                accept={accept}
                beforeUpload={beforeUpload}
                customRequest={customRequest}
                listType="picture-card"
                maxCount={1}
                onRemove={onRemove}
                {...props}
                showUploadList={{
                    showPreviewIcon: false,
                }}
                fileList={fileList}
            >
                {!value && <UploadOutlined />}
            </Upload>
        </FormItem>
    );
};

export default FileUploadField;
