import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import Calendar from './pages/Calendar';
import Chart from './pages/Chart';
import Dashboard from './pages/Dashboard';
import FormElements from './pages/Form/FormElements';
import FormLayout from './pages/Form/FormLayout';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Buttons from './pages/UiElements/Buttons';
import DefaultLayout from './layout/DefaultLayout';
import Loader from './common/Loader';
import SignIn from './pages/Authentication/SignIn';
import PageTitle from './components/PageTitle';
import Tables from './pages/Tables';
import Alerts from './pages/UiElements/Alerts';
import InventoryTable from './components/Tables/InventoryManagement/InventoryTable';
import AddEditProduct from './components/Tables/InventoryManagement/AddEditProduct';
import StockTracking from './components/Tables/InventoryManagement/StockTracking';
import SupplierList from './components/Tables/Supplier/SupplierList';
import AddSupplier from './components/Tables/Supplier/AddSupplier';
import OrderList from './components/Tables/Orders/OrderList';
import OrderFulfillment from './components/Tables/Orders/OrderFulfillment';
import TrackFulfillment from './components/Tables/Orders/TrackFulfillment';
import SalesReport from './pages/ReportsAndAnalytics/SalesReport';
import InventoryReport from './pages/ReportsAndAnalytics/InventoryReport';
// import SignUp from './pages/Authentication/SignUp'; // Uncomment if SignUp component exists

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
    <DefaultLayout>
      <Routes>
        <Route
          index
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
        <Route
          path="/inventory/list"
          element={
            <>
              <PageTitle title="List | Inventory of Koel Modish Apparels" />
              <InventoryTable />
            </>
          }
        />
        <Route
          path="/inventory/add-edit"
          element={
            <>
              <PageTitle title="List | Inventory of Koel Modish Apparels" />
              <AddEditProduct />
            </>
          }
        />
        <Route
          path="/inventory/stock-tracking"
          element={
            <>
              <PageTitle title="List | Inventory of Koel Modish Apparels" />
              <StockTracking />
            </>
          }
        />
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
              <PageTitle title="Sales Report | Inventory of Koel Modish Apparels" />
              <InventoryReport />
            </>
          }
        />
        <Route
          path="/calendar"
          element={
            <>
              <PageTitle title="Calendar | Inventory of Koel Modish Apparels" />
              <Calendar />
            </>
          }
        />
        <Route
          path="/profile"
          element={
            <>
              <PageTitle title="Profile | Inventory of Koel Modish Apparels" />
              <Profile />
            </>
          }
        />
        <Route
          path="/forms/form-elements"
          element={
            <>
              <PageTitle title="Form Elements | Inventory of Koel Modish Apparels" />
              <FormElements />
            </>
          }
        />
        <Route
          path="/forms/form-layout"
          element={
            <>
              <PageTitle title="Form Layout | Inventory of Koel Modish Apparels" />
              <FormLayout />
            </>
          }
        />
        <Route
          path="/tables"
          element={
            <>
              <PageTitle title="Tables | Inventory of Koel Modish Apparels" />
              <Tables />
            </>
          }
        />
        <Route
          path="/settings"
          element={
            <>
              <PageTitle title="Settings | Inventory of Koel Modish Apparels" />
              <Settings />
            </>
          }
        />
        <Route
          path="/chart"
          element={
            <>
              <PageTitle title="Basic Chart | Inventory of Koel Modish Apparels" />
              <Chart />
            </>
          }
        />
        <Route
          path="/ui/alerts"
          element={
            <>
              <PageTitle title="Alerts | Inventory of Koel Modish Apparels" />
              <Alerts />
            </>
          }
        />
        <Route
          path="/ui/buttons"
          element={
            <>
              <PageTitle title="Buttons | Inventory of Koel Modish Apparels" />
              <Buttons />
            </>
          }
        />
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
          path="/auth/signup"
          element={
            <>
              <PageTitle title="Signup | Inventory of Koel Modish Apparels" />
              {/* Uncomment the next line if you have a SignUp component */}
              {/* <SignUp /> */}
            </>
          }
        />
      </Routes>
    </DefaultLayout>
  );
}

export default App;
