import { useNavigate } from "react-router-dom";
import CafeForm, { CafeDetail } from "./CafeForm";
import ApiClient from "../../utilities/ApiClient";

const CreateCafePage = () => {
    const navigate = useNavigate();

    const onSubmit = async (values: CafeDetail) => {
        try {
            var { logo, ...others } = values;
            await ApiClient.post('api/cafe/createCafe', {
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

    return <CafeForm onSubmit={onSubmit} />
}

export default CreateCafePage;
