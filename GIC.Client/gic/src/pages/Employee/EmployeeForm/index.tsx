import { Form, Formik, FormikHelpers } from "formik";
import validators from "../../../utilities/validators";
import useValidator from "../../../utilities/useValidator";
import PageHeader from "../../../layout/PageHeader";
import { useCallback, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import SubmitButton from "../../../components/SubmitButton";
import EmployeeFormDetails from "./EmployeeFormDetails";

export type EmployeeDetail = {
    id?: number;
    name: string;
    emailAddress: string;
    phoneNumber: string;
    gender: string;
    startDate?: Date | null;
    cafeId?: number | null;
}

export type EmployeeFormProps = {
    initialValues?: EmployeeDetail | null;
    onSubmit: (values: EmployeeDetail, helpers: FormikHelpers<EmployeeDetail>) => void;
}

const defaultValues: EmployeeDetail = {
    name: '',
    emailAddress: '',
    phoneNumber: '',
    gender: 'M',
    startDate: null,
    cafeId: null,
};

const validations = validators.compose(
    validators.requiredString('name'),
    validators.requiredString('emailAddress'),
    validators.validEmail('emailAddress'),
    validators.requiredNumber('phoneNumber'),
    validators.validPhone('phoneNumber'),
    validators.requiredString('gender'),
    validators.only(
        values => values.cafeId,
        validators.compose(validators.requiredDate('startDate'))
    )
);

const EmployeeForm = ({ onSubmit, initialValues: initialValuesProp }: EmployeeFormProps) => {
    const validate = useValidator(validations);
    const navigate = useNavigate();

    const initialValues = useMemo(() => initialValuesProp ?? defaultValues, [initialValuesProp]);
    const title = initialValuesProp ? 'Edit Employee' : 'Create Employee';

    const onBack = useCallback(() => navigate('/employee'), [navigate]);

    return (
        <Formik initialValues={initialValues} onSubmit={onSubmit} validate={validate}>
            {({ handleSubmit }) => (
                <Form id="employeeForm" name="employeeForm" onSubmitCapture={handleSubmit}>
                    <PageHeader title={title} onBack={onBack} extra={<SubmitButton>Save</SubmitButton>}>
                        <EmployeeFormDetails />
                    </PageHeader>
                </Form>
            )}
        </Formik>
    );
}

export default EmployeeForm;
