import { Form, Formik, FormikHelpers } from "formik";
import validators from "../../utilities/validators";
import useValidator from "../../utilities/useValidator";
import PageHeader from "../../layout/PageHeader";
import { useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import SubmitButton from "../../components/SubmitButton";
import { Col, Row } from "antd";
import InputField from "../../components/fields/InputField";
import TextAreaField from "../../components/fields/TextAreaField";
import FileUploadField from "../../components/fields/FileUploadField";
import { allowedImageExtensions } from "../../utilities/Extensions";

export type CafeDetail = {
    id?: number | null;
    name: string;
    description: string;
    location: string;
    logo?: string | File | null;
}

export type CafeFormProps = {
    initialValues?: CafeDetail | null;
    onSubmit: (values: CafeDetail, helpers: FormikHelpers<CafeDetail>) => void;
}

const defaultValues: CafeDetail = {
    name: '',
    description: '',
    location: '',
    logo: null,
};

const validations = validators.compose(
    validators.requiredString('name'),
    validators.requiredString('description'),
    validators.requiredString('location'),
);

const colSpan = { lg: 8, md: 12, xs: 24 };

const CafeForm = ({ onSubmit, initialValues: initialValuesProp }: CafeFormProps) => {
    const validate = useValidator(validations);
    const navigate = useNavigate();

    const initialValues = useMemo(() => initialValuesProp ?? defaultValues, [initialValuesProp]);
    const title = initialValuesProp ? 'Edit Cafe' : 'Create Cafe';

    const onBack = useCallback(() => navigate('/cafe'), [navigate]);

    return (
        <Formik initialValues={initialValues} onSubmit={onSubmit} validate={validate}>
            {({ handleSubmit, values }) => (
                <Form id="cafeForm" name="cafeForm" onSubmitCapture={handleSubmit}>
                    <PageHeader title={title} onBack={onBack} extra={<SubmitButton>Save</SubmitButton>}>
                        <Row gutter={16}>
                            <Col {...colSpan}>
                                <InputField
                                    name="name"
                                    label="Name"
                                    maxLength={10}
                                    minLength={6}
                                />
                            </Col>
                            <Col {...colSpan}>
                                <TextAreaField
                                    name="description"
                                    label="Description"
                                    maxLength={256}
                                />
                            </Col>
                            <Col {...colSpan}>
                                <InputField
                                    name="location"
                                    label="Location"
                                />
                            </Col>
                            <Col {...colSpan}>
                                <FileUploadField
                                    name="logo"
                                    label="Logo"
                                    extensions={allowedImageExtensions}
                                />
                            </Col>
                        </Row>
                    </PageHeader>
                </Form>
            )}
        </Formik>
    );
}

export default CafeForm;
