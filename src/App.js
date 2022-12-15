import ItemsList from "./components/ItemsList";
import CustomersList from "./components/CustomersList";
import { BrowserRouter, Routes, Route, Router } from "react-router-dom";
import NotFound from "./components/NotFound";
import AddItem from "./components/AddItem";
import AddCustomer from "./components/AddCustomer";
import Layout from "./pages/Layout";
import StartLayout from "./pages/StartLayout";
import Home from "./pages/Home";
import InvoiceList from "./components/InvoiceList";
import AddInvoice from "./components/AddInvoice";
import InvoicePreview from "./components/InvoicePreview";
import Login from "./security/Login";
import Registration from "./security/Registration";

const App = () => {
  return (
    <>
      <Layout />
      {/* <StartLayout /> */}
      <Routes>
        <Route exact path="/" element={<Home />}></Route>
        <Route path="/login/" element={<Login />}></Route>
        <Route path="/register/" element={<Registration />}></Route>
        <Route path="/items/" element={<ItemsList />}></Route>
        <Route path="/items/add" element={<AddItem />}></Route>
        <Route path="/items/edit/:id" element={<AddItem />}></Route>
        <Route path="/customers/" element={<CustomersList />}></Route>
        <Route path="/customers/add/" element={<AddCustomer />}></Route>
        <Route path="/customers/edit/:id" element={<AddCustomer />}></Route>
        <Route path="/invoices" element={<InvoiceList />}></Route>
        <Route path="/invoices/add/" element={<AddInvoice />}></Route>
        <Route path="/invoices/edit/:id" element={<AddInvoice />}></Route>
        <Route
          path="/invoices/invoicepreview/:id"
          element={<InvoicePreview />}
        ></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </>
  );
};
//komentarass
export default App;
