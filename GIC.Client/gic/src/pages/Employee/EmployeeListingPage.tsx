import { Button, Space, TableColumnsType } from "antd";
import Table from "../../components/Table";
import useGoTo from "../../utilities/useGoTo";
import { useCallback, useEffect, useMemo, useState } from "react";
import ApiClient from "../../utilities/ApiClient";
import PageHeader from "../../layout/PageHeader";
import { PlusOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import EditButton from "../../components/EditButton";
import DeleteButton from "../../components/DeleteButton";

const EmployeeListingPage = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    var goToNewEmployeePage = useGoTo('/employee/create');

    const extra = (
        <Button icon={<PlusOutlined />} onClick={goToNewEmployeePage} type="primary">
            New
        </Button>
    );

    var DeleteEmployee = useCallback(async (id: number) => {
        try {
            await ApiClient.post(`api/employee/deleteEmployee?id=${id}`);
            setData((prevData) => prevData.filter((x: any) => x.id !== id));
        } catch (error) {
            console.error('Error create employee:', error);
        }
    }, [ApiClient, setData]);

    const columns: TableColumnsType = useMemo(() => [
        {
            title: 'Employee Id',
            dataIndex: 'employeeId',
        },
        {
            title: 'Name',
            dataIndex: 'name',
        },
        {
            title: 'Email address',
            dataIndex: 'emailAddress',
        },
        {
            title: 'Phone number',
            dataIndex: 'phoneNumber',
        },
        {
            title: 'Days worked in the café',
            dataIndex: 'dayWorked'
        },
        {
            title: 'Café name',
            dataIndex: 'cafeName'
        }
        ,
        {
            title: 'Actions',
            dataIndex: 'id',
            render: (_, record) => (
                <Space size="middle">
                    <EditButton url={`/employee/update/${record.id}`}/>
                    <DeleteButton onConfirm={() => DeleteEmployee(record.id)} popConfirmTitle="Are you sure want to delete?" />
                </Space>
            ),
        }
    ], [DeleteEmployee]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await ApiClient.get('api/employee/getEmployeeList');
                setData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    return (
        <PageHeader title="Employee List" extra={extra}>
            <Table
                columns={columns}
                dataSource={data}
                loading={loading}
            />
        </PageHeader>
    );
}

export default EmployeeListingPage
