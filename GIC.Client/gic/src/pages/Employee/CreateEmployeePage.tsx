import { useNavigate } from "react-router-dom";
import EmployeeForm, { EmployeeDetail } from "./EmployeeForm";
import ApiClient from "../../utilities/ApiClient";

const CreateEmployeePage = () => {
    const navigate = useNavigate();

    const onSubmit = async (values: EmployeeDetail) => {
        try {
            await ApiClient.post('api/employee/createEmployee', {
                ...values,
                phoneNumber: values.phoneNumber.toString(),
            });
            navigate('/employee');
        } catch (error) {
            console.error('Error create employee:', error);
        }
    };

    return <EmployeeForm onSubmit={onSubmit} />
}

export default CreateEmployeePage;
