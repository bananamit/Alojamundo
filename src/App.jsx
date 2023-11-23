import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import Login from "./page/Login";
import Register from "./page/Register";
import Home from "./page/Home";
import CreateAccommodationForm from "./components/CreateAccommodationForm";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/home" element={<Home />} />
          <Route
            path="/create-accomodation"
            element={<CreateAccommodationForm />}
          />
          <Route path="/" element={<Login />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
