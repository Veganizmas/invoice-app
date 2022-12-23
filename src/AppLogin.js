import React, { Component } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import NotFound from "./components/NotFound";

import AuthService from "./services/auth.service";

import Login from "./components/login.component";
import Register from "./components/register.component";
// import Home from "./components/home.component";
import Profile from "./components/profile.component";
import BoardUser from "./components/board-user.component";
import BoardModerator from "./components/board-moderator.component";
import BoardAdmin from "./components/board-admin.component";
import ItemsList from "./components/ItemsList";
import CustomersList from "./components/CustomersList";
import InvoiceList from "./components/InvoiceList";
import AddCustomer from "./components/AddCustomer";
import AddItem from "./components/AddItem";
import AddInvoice from "./components/AddInvoice";
import InvoicePreview from "./components/InvoicePreview";
import Layout from "./pages/StartLayout";
import PrivateRoutes from "./components/PrivateRoutes";
import Home from "./pages/Home";

// import AuthVerify from "./common/auth-verify";
import EventBus from "./common/EventBus";

class AppLogin extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
      });
    }

    EventBus.on("logout", () => {
      this.logOut();
    });
  }

  componentWillUnmount() {
    EventBus.remove("logout");
  }

  logOut() {
    AuthService.logout();
    this.setState({
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    });
  }

  render() {
    const { currentUser, showModeratorBoard, showAdminBoard } = this.state;

    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/"} className="navbar-brand">
            CodeAcademy
          </Link>
          <div className="navbar-nav mr-auto">
            {/* <li className="nav-item">
              <Link to={"/home"} className="nav-link">
                Home
              </Link>
            </li> */}

            <li className="nav-item">
              <Link to={"/items"} className="nav-link">
                Prekės
              </Link>
            </li>

            <li className="nav-item">
              <Link to={"/customers"} className="nav-link">
                Klientai
              </Link>
            </li>

            <li className="nav-item">
              <Link to={"/invoices"} className="nav-link">
                Sąskaitos
              </Link>
            </li>

            {showModeratorBoard && (
              <li className="nav-item">
                <Link to={"/mod"} className="nav-link">
                  Moderator Board
                </Link>
              </li>
            )}

            {showAdminBoard && (
              <li className="nav-item">
                <Link to={"/admin"} className="nav-link">
                  Admin Board
                </Link>
              </li>
            )}

            {currentUser && (
              <li className="nav-item">
                <Link to={"/user"} className="nav-link">
                  User
                </Link>
              </li>
            )}
          </div>

          {currentUser ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/profile"} className="nav-link">
                  {currentUser.username}
                </Link>
              </li>
              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={this.logOut}>
                  Log Out
                </a>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Log in
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/register"} className="nav-link">
                  Sign up
                </Link>
              </li>
            </div>
          )}
        </nav>

        <div className="container mt-3">
          <Routes>
            {/* tik autentifikuotiem */}
            <Route element={<PrivateRoutes />}>
              {/* <Route element={<BoardAdmin />} path="/admin"></Route> */}
            </Route>

            {/* visiems */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
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
            <Route path="/profile" element={<Profile />} />
            <Route path="/user" element={<BoardUser />} />
            <Route path="/mod" element={<BoardModerator />} />
            <Route path="/admin" element={<BoardAdmin />} />
            <Route path="*" element={<NotFound />}></Route>
          </Routes>
        </div>

        {/* <AuthVerify logOut={this.logOut}/> */}
      </div>
    );
  }
}

export default AppLogin;
