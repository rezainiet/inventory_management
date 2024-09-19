import React, { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import DefaultLayout from './layout/DefaultLayout';
import Loader from './common/Loader';
import SignIn from './pages/Authentication/SignIn';
import PageTitle from './components/PageTitle';
import Dashboard from './pages/Dashboard';
import InventoryTable from './components/Tables/InventoryManagement/InventoryTable';
import AddEditProduct from './components/Tables/InventoryManagement/AddEditProduct';
import StockTracking from './components/Tables/InventoryManagement/StockTracking';
import SupplierList from './components/Tables/Supplier/SupplierList';
import AddSupplier from './components/Tables/Supplier/AddSupplier';
import OrderList from './components/Tables/Orders/OrderList';
import OrderFulfillment from './components/Tables/Orders/OrderFulfillment';
import TrackFulfillment from './components/Tables/Orders/TrackFulfillment';
import CreateOrder from './components/Tables/Orders/CreateOrder';
import SalesReport from './pages/ReportsAndAnalytics/SalesReport';
import InventoryReport from './pages/ReportsAndAnalytics/InventoryReport';
import ExportReports from './pages/ReportsAndAnalytics/ExportReports';
import UserRoles from './pages/Admin/UserRoles';
import ManageUsers from './pages/Admin/ManageUsers';
import MainProfile from './pages/Profile/MainProfile';
import SystemSettings from './pages/Settings/SystemSettings';
import PrivateRoute from './hooks/PrivateRoute';
import useUser from './hooks/useUser';
import NotAuthorized from './pages/NotAuthorized/NotAuthorized';

function App() {
  const { user } = useUser();
  const [loading, setLoading] = useState(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <Routes>
      {/* Authentication Route */}
      <Route
        path="/auth/signin"
        element={
          <>
            <PageTitle title="Signin | Inventory of Koel Modish Apparels" />
            <SignIn />
          </>
        }
      />
      <Route
        path="/not-authorized"
        element={
          <>
            <PageTitle title="Not Authorized | Inventory of Koel Modish Apparels" />
            <NotAuthorized />
          </>
        }
      />

      {/* Protected Routes */}
      <Route
        path="*"
        element={
          <PrivateRoute>
            <DefaultLayout>
              <Routes>
                {/* Dashboard */}
                <Route
                  path='/'
                  element={
                    <>
                      <PageTitle title="Inventory Dashboard | Inventory of Koel Modish Apparels" />
                      <Dashboard />
                    </>
                  }
                />

                <Route
                  path="/dashboard"
                  element={
                    <>
                      <PageTitle title="Inventory Dashboard | Inventory of Koel Modish Apparels" />
                      <Dashboard />
                    </>
                  }
                />
                {/* Inventory Management */}
                <Route
                  path="/inventory/list"
                  element={
                    <>
                      <PageTitle title="Inventory List | Inventory of Koel Modish Apparels" />
                      <InventoryTable />
                    </>
                  }
                />
                <Route
                  path="/inventory/add-edit"
                  element={
                    <>
                      <PageTitle title="Add Product | Inventory of Koel Modish Apparels" />
                      <AddEditProduct />
                    </>
                  }
                />
                <Route
                  path="/inventory/stock-tracking"
                  element={
                    <>
                      <PageTitle title="Stock Tracking | Inventory of Koel Modish Apparels" />
                      <StockTracking />
                    </>
                  }
                />
                {/* Supplier Management */}
                <Route
                  path="/supplier/list"
                  element={
                    <>
                      <PageTitle title="Supplier List | Inventory of Koel Modish Apparels" />
                      <SupplierList />
                    </>
                  }
                />
                <Route
                  path="/supplier/add"
                  element={
                    <>
                      <PageTitle title="Add Supplier | Inventory of Koel Modish Apparels" />
                      <AddSupplier />
                    </>
                  }
                />
                {/* Orders */}
                <Route
                  path="/orders/list"
                  element={
                    <>
                      <PageTitle title="Order List | Inventory of Koel Modish Apparels" />
                      <OrderList />
                    </>
                  }
                />
                <Route
                  path="/orders/fulfillment"
                  element={
                    <>
                      <PageTitle title="Order Fulfillment | Inventory of Koel Modish Apparels" />
                      <OrderFulfillment />
                    </>
                  }
                />
                <Route
                  path="/orders/tracking"
                  element={
                    <>
                      <PageTitle title="Track Fulfillment | Inventory of Koel Modish Apparels" />
                      <TrackFulfillment />
                    </>
                  }
                />
                <Route
                  path="/orders/create"
                  element={
                    <>
                      <PageTitle title="Create Order | Inventory of Koel Modish Apparels" />
                      <CreateOrder />
                    </>
                  }
                />
                {/* Reports */}
                <Route
                  path="/reports/sales"
                  element={
                    <>
                      <PageTitle title="Sales Report | Inventory of Koel Modish Apparels" />
                      <SalesReport />
                    </>
                  }
                />
                <Route
                  path="/reports/inventory"
                  element={
                    <>
                      <PageTitle title="Inventory Report | Inventory of Koel Modish Apparels" />
                      <InventoryReport />
                    </>
                  }
                />
                <Route
                  path="/reports/export"
                  element={
                    <>
                      <PageTitle title="Export Reports | Inventory of Koel Modish Apparels" />
                      <ExportReports />
                    </>
                  }
                />
                {/* Admin Management */}
                <Route
                  path="/admin/user-roles"
                  element={
                    <>
                      <PageTitle title="User Roles | Inventory of Koel Modish Apparels" />
                      <UserRoles />
                    </>
                  }
                />
                <Route
                  path="/admin/manage-users"
                  element={
                    <>
                      <PageTitle title="Manage Users | Inventory of Koel Modish Apparels" />
                      <ManageUsers />
                    </>
                  }
                />
                {/* Profile */}
                <Route
                  path="/profile/main"
                  element={
                    <>
                      <PageTitle title="Profile | Inventory of Koel Modish Apparels" />
                      <MainProfile />
                    </>
                  }
                />
                {/* Settings */}
                <Route
                  path="/settings/system"
                  element={
                    <PrivateRoute allowed={"admin"}>
                      <PageTitle title="System Settings | Inventory of Koel Modish Apparels" />
                      <SystemSettings />
                    </PrivateRoute>
                  }
                />
              </Routes>
            </DefaultLayout>
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

export default App;
