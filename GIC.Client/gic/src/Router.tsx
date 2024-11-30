import { Routes, Navigate, Route } from "react-router-dom";
import { EmployeeListingPage, CreateEmployeePage, UpdateEmployeePage } from "./pages/Employee";
import { CafeListingPage, CreateCafePage, UpdateCafePage } from "./pages/Cafe";
import Layout from "./Layout";

const Router = () => (
    <Layout>
        <Routes>
            <Route path="/" element={<Navigate to="/employee" />} />
            <Route path="/employee" element={<EmployeeListingPage />} />
            <Route path="/employee/create" element={<CreateEmployeePage />} />
            <Route path="/employee/update/:id" element={<UpdateEmployeePage />} />
            <Route path="/cafe" element={<CafeListingPage />} />
            <Route path="/cafe/create" element={<CreateCafePage />} />
            <Route path="/cafe/update/:id" element={<UpdateCafePage />} />
        </Routes>
    </Layout>
)

export default Router;
