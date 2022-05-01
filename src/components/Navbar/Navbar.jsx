import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { changesection, logout } from "../../redux/actions";
import "./Navbar.scss";

export default function Navbar() {
	const dispatch = useDispatch();
	const isLogged = useSelector((state) => state.isLogged);
	const userReducer = useSelector((state) => state.userReducer);
	const sectionReducer = useSelector((state) => state.sectionReducer);
	console.log(sectionReducer, userReducer);

	const handleSectionchange = (e, section) => {
		if (section == "logout") {
			dispatch(logout);
		} else if (section == "add-book") {
			dispatch(changesection("add-book"));
		} else if (section == "view-booklist") {
			dispatch(changesection("view-booklist"));
		} else if (section == "deposit-book") {
			dispatch(changesection("deposit-book"));
		}
	};

	return (
		<div className='NavbarContainer'>
			<div className='container'>
				<div className='row'>
					<div className='col-md-2 brand-logo text-start'>BMS</div>
					<div className='col row d-flex justify-content-end align-items-center'>
						{userReducer.type == "admin" ? (
							<>
								<div className='col-2'>
									<button
										className='btn btn-sm btn-primary'
										onClick={(e) =>
											handleSectionchange(e, "add-book")
										}>
										Add Book
									</button>
								</div>
								<div className='col-2'>
									<button
										className='btn btn-sm btn-primary'
										onClick={(e) =>
											handleSectionchange(e, "deposit-book")
										}>
										Deposit Book
									</button>
								</div>
							</>
						) : (
							<></>
						)}
						<div className='col-2'>
							<button
								className='btn btn-sm btn-primary'
								onClick={(e) =>
									handleSectionchange(e, "view-booklist")
								}>
								View Books
							</button>
						</div>
						<div className='col-1'>
							<button
								className='btn btn-sm btn-danger'
								onClick={(e) =>
									handleSectionchange(e, "logout")
								}>
								Logout
							</button>
						</div>
						<div className='col-2 rounded rounded-3 bg-success py-1 text-white fw-bold'>
							<span>{'User ' + userReducer.username}</span>
						</div>
						
					</div>
				</div>
			</div>
		</div>
	);
}
