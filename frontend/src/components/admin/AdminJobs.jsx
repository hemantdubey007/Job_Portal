import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import CompaniesTable from "./CompaniesTable";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setsearchCompanyByText } from "@/redux/companySlice";
import AdminJobsTable from "./AdminJobsTable";

const AdminJobs = () => {
    const navigate = useNavigate();
    const [input, setInput] = useState("");
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(setsearchCompanyByText(input))
    }, [input])
  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto my-10">
        <div className="flex items-center justify-between my-5">
          <Input className="w-fit" placeholder="filter by name" onChange = {() => setInput(e.target.value)} />
          <Button onClick = {() => navigate("/admin/companies/create")}>New Jobs</Button>
        </div>
        <AdminJobsTable/>
      </div>
    </div>
  );
};

export default AdminJobs;
