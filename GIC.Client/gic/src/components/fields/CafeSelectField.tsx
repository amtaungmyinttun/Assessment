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

// export type BankSelectFieldProps = Omit<SelectFieldProps, 'children'> & {
//     banks?: api.BankOptionsDataFragment[];
//     companyId?: string;
//     forceSkipFetch?: boolean;
//     moduleId?: string;
//     bankIntegrationProviders?: api.BankIntegrationProvider[];
// };

// const filterOption: SelectProps['filterOption'] = (inputValue, option) =>
//     option.children.toString().toLowerCase().includes(inputValue.toLowerCase());

// const CafeSelectField = ({
//     banks: banksFromProps,
//     companyId,
//     moduleId,
//     bankIntegrationProviders,
//     forceSkipFetch = false,
//     ...props
// }: BankSelectFieldProps) => {
//     const company = useCompany(true);
//     const filter = useMemo(
//         (): api.BankFilteringRule => ({ companyId: companyId || company?.id, moduleId, bankIntegrationProviders }),
//         [company, companyId, moduleId, bankIntegrationProviders]
//     );

//     const { data, loading } = api.useGetBankOptionsQuery({
//         fetchPolicy: 'cache-and-network',
//         variables: { filter },
//         skip: !!banksFromProps || forceSkipFetch,
//     });

//     const banks = useMemo(() => banksFromProps || data?.banks?.items, [data?.banks?.items, banksFromProps]);

//     const options = useMemo(
//         () => [...(banks || []).map(bank => ({ value: bank.id, label: bank.displayName }))].filter(Boolean),
//         [banks]
//     );

//     return <SelectField {...props} filterOption={filterOption} loading={!banks && loading} options={options} />;
// };

// export default CafeSelectField;
