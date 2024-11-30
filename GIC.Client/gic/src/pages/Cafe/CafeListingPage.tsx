import { Button, Image, Space, TableColumnsType } from "antd";
import Table from "../../components/Table";
import useGoTo from "../../utilities/useGoTo";
import { useCallback, useEffect, useMemo, useState } from "react";
import ApiClient from "../../utilities/ApiClient";
import PageHeader from "../../layout/PageHeader";
import { PlusOutlined } from "@ant-design/icons";
import EditButton from "../../components/EditButton";
import DeleteButton from "../../components/DeleteButton";

const CafeListingPage = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    var goToNewCafePage = useGoTo('/cafe/create');

    const extra = (
        <Button icon={<PlusOutlined />} onClick={goToNewCafePage} type="primary">
            New
        </Button>
    );

    var DeleteCafe = useCallback(async (id: number) => {
        try {
            await ApiClient.post(`api/cafe/deleteCafe?id=${id}`);
            setData((prevData) => prevData.filter((x: any) => x.id !== id));
        } catch (error) {
            console.error('Error create cafe:', error);
        }
    }, [ApiClient, setData]);

    const columns: TableColumnsType = useMemo(() => [
        {
            title: 'Logo',
            dataIndex: 'logo',
            render: (value, record) => (
                value && <Image
                    width={100}
                    height={100}
                    src={value}
                    preview={false}
                    style={{
                        objectFit: 'contain'
                    }}
                />
            )
        },
        {
            title: 'Name',
            dataIndex: 'name',
        },
        {
            title: 'Description',
            dataIndex: 'description',
        },
        {
            title: 'Employees',
            dataIndex: 'employeeCount',
        },
        {
            title: 'Location',
            dataIndex: 'location'
        },
        {
            title: 'Actions',
            dataIndex: 'id',
            render: (_, record) => (
                <Space size="middle">
                    <EditButton url={`/cafe/update/${record.id}`}/>
                    <DeleteButton onConfirm={() => DeleteCafe(record.id)} popConfirmTitle="Are you sure want to delete?" />
                </Space>
            ),
        }
    ], [DeleteCafe]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await ApiClient.get('api/cafe/getCafeList');
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
        <PageHeader title="Cafe List" extra={extra}>
            <Table
                columns={columns}
                dataSource={data}
                loading={loading}
            />
        </PageHeader>
    );
}

export default CafeListingPage
