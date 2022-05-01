import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/actions";
import Booklist from "../Booklist/Booklist";
import Navbar from "../Navbar/Navbar";
import Addbook from "../Addbook/Addbook";
import Depositbook from "../Depositbook/Depositbook";
import "./Dashboard.scss";

export default function Dashboard() {
	const dispatch = useDispatch();
	const isLogged = useSelector((state) => state.isLogged);
	const userReducer = useSelector((state) => state.userReducer);
	const sectionReducer = useSelector((state) => state.sectionReducer);
    console.log(sectionReducer, userReducer)
	return (
		<div className="DashboardContainer">
            <Navbar />
			{
				sectionReducer == "view-booklist" && <Booklist />
			}
			{
				sectionReducer == "add-book" && <Addbook />
			}
			{
				sectionReducer == "deposit-book" && <Depositbook />
			}
		</div>
	);
}
