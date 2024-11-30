import { ShopOutlined, UserOutlined } from "@ant-design/icons";
import ProLayout, { MenuDataItem, ProLayoutProps } from "@ant-design/pro-layout";
import { useCallback } from "react";
import { Link, useLocation } from "react-router-dom";

export type LayoutProps = {
    children: JSX.Element;
};

var menus = [
    {
        path: '/employee',
        name: "Employee",
        icon: <UserOutlined />,
        key: 'employee'
    },
    {
        path: '/cafe',
        name: "Cafe",
        icon: <ShopOutlined />,
        key: 'cafe'
    }
];

const loopMenuItem = (menus: any[]): MenuDataItem[] =>
    menus.map(({ icon, routes, ...item }) => ({
      ...item,
      icon: icon,
      children: routes && loopMenuItem(routes),
}));


const itemRender = (route: any) => <Link to={route.path}>{route.breadcrumbName}</Link>;
const Layout = ({ children }: LayoutProps) => {
    const location = useLocation();

    const menuItemRender = useCallback<Exclude<ProLayoutProps['menuItemRender'], undefined | false>>(
        (menuItemProps, defaultDom) => {
            if (menuItemProps.isUrl || menuItemProps.children) {
                return defaultDom;
            }

            if (menuItemProps.path && location.pathname !== menuItemProps.path) {
                return (
                    <Link target={menuItemProps.target} to={menuItemProps.path}>
                        {defaultDom}
                    </Link>
                );
            }

            return defaultDom;
        },
        [location]
    );

    return(
        <ProLayout itemRender={itemRender} menuItemRender={menuItemRender} menu={{ request: async () => loopMenuItem(menus) }}>
            {children}
        </ProLayout>
    )
}

export default Layout;
