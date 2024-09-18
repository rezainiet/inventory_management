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

function App() {
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
      {/* Authentication Routes */}
      <Route
        path="/auth/signin"
        element={
          <>
            <PageTitle title="Signin | Inventory of Koel Modish Apparels" />
            <SignIn />
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
                  path="/dashboard"
                  element={
                    <PrivateRoute allowedRoles={['admin', 'manager']}>
                      <>
                        <PageTitle title="Inventory Dashboard | Inventory of Koel Modish Apparels" />
                        <Dashboard />
                      </>
                    </PrivateRoute>
                  }
                />
                {/* Inventory Management */}
                <Route
                  path="/inventory/list"
                  element={
                    <PrivateRoute allowedRoles={['admin', 'manager', 'staff']}>
                      <>
                        <PageTitle title="Inventory List | Inventory of Koel Modish Apparels" />
                        <InventoryTable />
                      </>
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/inventory/add"
                  element={
                    <PrivateRoute allowedRoles={['admin', 'manager']}>
                      <>
                        <PageTitle title="Add Product | Inventory of Koel Modish Apparels" />
                        <AddEditProduct />
                      </>
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/inventory/stock-tracking"
                  element={
                    <PrivateRoute allowedRoles={['admin', 'manager']}>
                      <>
                        <PageTitle title="Stock Tracking | Inventory of Koel Modish Apparels" />
                        <StockTracking />
                      </>
                    </PrivateRoute>
                  }
                />
                {/* Supplier Management */}
                <Route
                  path="/suppliers/list"
                  element={
                    <PrivateRoute allowedRoles={['admin', 'manager', 'staff']}>
                      <>
                        <PageTitle title="Supplier List | Inventory of Koel Modish Apparels" />
                        <SupplierList />
                      </>
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/suppliers/add"
                  element={
                    <PrivateRoute allowedRoles={['admin', 'manager']}>
                      <>
                        <PageTitle title="Add Supplier | Inventory of Koel Modish Apparels" />
                        <AddSupplier />
                      </>
                    </PrivateRoute>
                  }
                />
                {/* Orders */}
                <Route
                  path="/orders/list"
                  element={
                    <PrivateRoute allowedRoles={['admin', 'manager', 'staff']}>
                      <>
                        <PageTitle title="Order List | Inventory of Koel Modish Apparels" />
                        <OrderList />
                      </>
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/orders/fulfillment"
                  element={
                    <PrivateRoute allowedRoles={['admin', 'manager']}>
                      <>
                        <PageTitle title="Order Fulfillment | Inventory of Koel Modish Apparels" />
                        <OrderFulfillment />
                      </>
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/orders/track-fulfillment"
                  element={
                    <PrivateRoute allowedRoles={['admin', 'manager', 'staff']}>
                      <>
                        <PageTitle title="Track Fulfillment | Inventory of Koel Modish Apparels" />
                        <TrackFulfillment />
                      </>
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/orders/create"
                  element={
                    <PrivateRoute allowedRoles={['admin', 'manager']}>
                      <>
                        <PageTitle title="Create Order | Inventory of Koel Modish Apparels" />
                        <CreateOrder />
                      </>
                    </PrivateRoute>
                  }
                />
                {/* Reports */}
                <Route
                  path="/reports/sales"
                  element={
                    <PrivateRoute allowedRoles={['admin', 'manager']}>
                      <>
                        <PageTitle title="Sales Report | Inventory of Koel Modish Apparels" />
                        <SalesReport />
                      </>
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/reports/inventory"
                  element={
                    <PrivateRoute allowedRoles={['admin', 'manager']}>
                      <>
                        <PageTitle title="Inventory Report | Inventory of Koel Modish Apparels" />
                        <InventoryReport />
                      </>
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/reports/export"
                  element={
                    <PrivateRoute allowedRoles={['admin', 'manager']}>
                      <>
                        <PageTitle title="Export Reports | Inventory of Koel Modish Apparels" />
                        <ExportReports />
                      </>
                    </PrivateRoute>
                  }
                />
                {/* Admin Management */}
                <Route
                  path="/admin/user-roles"
                  element={
                    <PrivateRoute allowedRoles={['admin']}>
                      <>
                        <PageTitle title="User Roles | Inventory of Koel Modish Apparels" />
                        <UserRoles />
                      </>
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/admin/manage-users"
                  element={
                    <PrivateRoute allowedRoles={['admin']}>
                      <>
                        <PageTitle title="Manage Users | Inventory of Koel Modish Apparels" />
                        <ManageUsers />
                      </>
                    </PrivateRoute>
                  }
                />
                {/* Profile */}
                <Route
                  path="/profile/main"
                  element={
                    <PrivateRoute allowedRoles={['admin', 'manager', 'staff']}>
                      <>
                        <PageTitle title="Profile | Inventory of Koel Modish Apparels" />
                        <MainProfile />
                      </>
                    </PrivateRoute>
                  }
                />
                {/* Settings */}
                <Route
                  path="/settings/system"
                  element={
                    <PrivateRoute allowedRoles={['admin']}>
                      <>
                        <PageTitle title="System Settings | Inventory of Koel Modish Apparels" />
                        <SystemSettings />
                      </>
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
