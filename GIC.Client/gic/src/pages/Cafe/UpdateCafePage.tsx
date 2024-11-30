import { useNavigate, useParams } from "react-router-dom";
import CafeForm, { CafeDetail } from "./CafeForm";
import ApiClient from "../../utilities/ApiClient";
import { useEffect, useState } from "react";
import { Spin } from "antd";

const UpdateCafePage = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<CafeDetail | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data: cafe } = await ApiClient.get(`api/cafe/GetCafe?id=${id}`);

                setData({
                    id: cafe.id,
                    name: cafe.name,
                    description: cafe.description,
                    location: cafe.location,
                    logo: cafe.logo,
                });
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    const onSubmit = async (values: CafeDetail) => {
        try {
            var { logo, ...others } = values;
            await ApiClient.post('api/cafe/updateCafe', {
                ...others,
                logo: logo instanceof File ? null : logo,
                upload: logo instanceof File ? logo : null,
            }, {
                headers:  {
                    'Content-Type': 'multipart/form-data',
                }
            });
            navigate('/cafe');
        } catch (error) {
            console.error('Error create cafe:', error);
        }
    };

    if (loading) {
        return <Spin tip="loading..." />
    }

    return <CafeForm onSubmit={onSubmit} initialValues={data} />
}

export default UpdateCafePage;
