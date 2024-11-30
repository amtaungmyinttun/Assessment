import { PlusOutlined } from "@ant-design/icons";
import { Table as AntTable, TableProps as AntTableProps } from "antd";

const Table = ({ locale, ...props }: AntTableProps) => {
    return (
        <AntTable locale={{ ...locale, emptyText: 'Data not found' }} {...props}/>
    )
}

export default Table;
