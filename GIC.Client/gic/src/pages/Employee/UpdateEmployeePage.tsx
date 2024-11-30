import { useNavigate, useParams } from "react-router-dom";
import EmployeeForm, { EmployeeDetail } from "./EmployeeForm";
import ApiClient from "../../utilities/ApiClient";
import { useEffect, useState } from "react";
import { Spin } from "antd";

const UpdateEmployeePage = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<EmployeeDetail | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data: employee } = await ApiClient.get(`api/employee/GetEmployee?id=${id}`);

                setData({
                    id: employee.id,
                    name: employee.name,
                    emailAddress: employee.emailAddress,
                    phoneNumber: employee.phoneNumber,
                    gender: employee.gender,
                    startDate: employee.startDate,
                    cafeId: employee.cafeId,
                });
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    const onSubmit = async (values: EmployeeDetail) => {
        try {
            const response = await ApiClient.post('api/employee/updateEmployee', {
                ...values,
                phoneNumber: values.phoneNumber.toString(),
            });
            navigate('/employee');
        } catch (error) {
            console.error('Error create employee:', error);
        }
    };

    if (loading) {
        return <Spin tip="loading..." />
    }

    return <EmployeeForm onSubmit={onSubmit} initialValues={data} />
}

export default UpdateEmployeePage;
