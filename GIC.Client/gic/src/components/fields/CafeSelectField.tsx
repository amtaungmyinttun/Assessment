import { useEffect, useState } from 'react';
import SelectField, { SelectFieldProps } from './SelectField';
import ApiClient from '../../utilities/ApiClient';

export type CafeSelectFieldProps = Omit<SelectFieldProps, 'children'> & {
    defaultOptions?: { value: string; label: string }[] | null;
}

const CafeSelectField = ({ defaultOptions, ...props }: CafeSelectFieldProps) => {
    const [options, setOptions] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await ApiClient.get('api/cafe/getCafeList');
                setOptions(response.data.map((data: any) => ({
                    value: data.id,
                    label: data.name,
                })));
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        }

        if (defaultOptions) {
            setOptions(defaultOptions);
            setLoading(false);
        } else {
            fetchData();
        }
    }, []);

    return <SelectField {...props} options={options} loading={loading} />
}

export default CafeSelectField;
