import { Col, Row } from "antd";
import InputField from "../../../components/fields/InputField";
import InputNumberField from "../../../components/fields/InputNumberField";
import RadioField from "../../../components/fields/RadioField";
import CafeSelectField from "../../../components/fields/CafeSelectField";
import DatePickerField from "../../../components/fields/DatePickerField";
import dayjs from "dayjs";
import { useFormikContext } from "formik";
import { EmployeeDetail } from ".";
import { useEffect } from "react";

const colSpan = { lg: 8, md: 12, xs: 24 };

const genderOptions = [
    { label: 'Male', value: 'M' },
    { label: 'Female', value: 'F' },
];

const EmployeeFormDetails = () => {
    const { values, setFieldValue } = useFormikContext<EmployeeDetail>();

    useEffect(() => {
        if (!values.cafeId) {
            setFieldValue('startDate', null)
        }
    }, [values.cafeId, setFieldValue]);

    return (
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
                <InputField
                    name="emailAddress"
                    label="Email Address"
                />
            </Col>
            <Col {...colSpan}>
                <InputNumberField
                    name="phoneNumber"
                    label="Phone Number"
                />
            </Col>
            <Col {...colSpan}>
                <RadioField
                    name="gender"
                    label="Gender"
                    options={genderOptions}
                />
            </Col>
            <Col {...colSpan}>
                <CafeSelectField
                    name="cafeId"
                    label="Cafe"
                    allowClear
                />
            </Col>
            <Col {...colSpan}>
                <DatePickerField
                    name="startDate"
                    label="Start Date"
                    maxDate={dayjs()}
                    disabled={!values.cafeId}
                />
            </Col>
        </Row>
    );
}

export default EmployeeFormDetails
