import axios from "axios";
import QueryString from "qs";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout, setbooklist } from "../../redux/actions";
import "./Booklist.scss";

export default function Booklist() {
	const dispatch = useDispatch();
	const isLogged = useSelector((state) => state.isLogged);
	const userReducer = useSelector((state) => state.userReducer);
	const bookReducer = useSelector((state) => state.bookReducer);
	const [filter, setFilter] = useState({});
	const [offset, setOffset] = useState(0);
	const [limit, setLimit] = useState(50);
	const [pageno, setPageno] = useState(0);

	const fetchBooklist = (formdata) => {
		// console.log(formdata);

		const url = "http://localhost:8080/v1/api/book/get-book";

		const options = {
			method: "GET",
			url: url,
			params: formdata,
			data: QueryString.stringify(formdata),
			headers: {
				"content-type":
					"application/x-www-form-urlencoded;charset=utf-8",
				"Access-Control-Allow-Origin": "*",
				Authorization:
					"Bearer " + localStorage.getItem("Authorization"),
			},
		};

		// console.log(options);

		axios(options)
			.then((response) => {
				const { data } = response;
				// console.log(data);
				try {
					if (data) {
						const books = response.data || [];
						dispatch(setbooklist(books));

						// const selecteddom =
						// 	document.getElementsByClassName("selected");
						// for (let i = 0; i < selecteddom.length; i++) {
						// 	selecteddom[i].classList.remove("selected");
						// }
					}
				} catch (error) {
					alert(error?.response?.data?.msg);
				}
			})
			.catch((error, res) => {
				// console.log("Error", error, res);
				alert(error?.response?.data?.msg);
			});
	};

	const issueBookById = (formdata, callback) => {
		// console.log(formdata);

		const url =
			"http://localhost:8080/v1/api/book/decrease-copy/" + formdata.id;

		const options = {
			method: "PATCH",
			url: url,
			data: QueryString.stringify(formdata),
			headers: {
				"content-type":
					"application/x-www-form-urlencoded;charset=utf-8",
				"Access-Control-Allow-Origin": "*",
				Authorization:
					"Bearer " + localStorage.getItem("Authorization"),
			},
		};

		// console.log(options);

		axios(options)
			.then((response) => {
				const { data } = response;
				console.log(data);
				if (data) {
					const { book } = response.data;
					callback(null, book.availablecopies);
				}
			})
			.catch((error, res) => {
				console.log("Error", error, res);
				console.log(error?.response?.data?.msg);
			});
	};

	useEffect(() => {
		return () => {
			if (!bookReducer.length && !Object.keys(filter).length) {
				setOffset(0);
				setPageno(0);
				fetchBooklist({ offset: 0 });
			}
		};
	});

	return (
		<div className='BooklistContainer'>
			<div className='container'>
				<div className='row filter-container'>
					<h4 className='col-2'>Filters</h4>

					<div className='col'>
						<label htmlFor='search-title'>Title</label>
						<input
							type='text'
							placeholder='Search by Title'
							id='search-title'
							class='mx-2'
							value={filter.title || ""}
							defaultValue={filter.title || ""}
							onChange={(e) => {
								setFilter({
									title: e.target.value,
								});
								fetchBooklist({
									title: e.target.value,
								});
							}}
						/>
					</div>

					<div className='col'>
						<label htmlFor='search-author'>Author</label>
						<input
							type='text'
							placeholder='Search by Author'
							id='search-author'
							class='mx-2'
							value={filter.authorname || ""}
							defaultValue={filter.authorname || ""}
							onChange={(e) => {
								setFilter({
									authorname: e.target.value,
								});
								fetchBooklist({
									authorname: e.target.value,
								});
							}}
						/>
					</div>

					<div className='col'>
						<label htmlFor='search-year'>Year</label>
						<input
							type='number'
							placeholder='Min Year'
							id='search-year'
							class='mx-2'
							min={1950}
							max={2022}
							step={1}
							value={filter.yearofpublication || ""}
							defaultValue={filter.yearofpublication || ""}
							onChange={(e) => {
								setFilter({
									yearofpublication: e.target.value,
								});

								if ((e.target.value + "").length < 4) return;

								fetchBooklist({
									yearofpublication: e.target.value,
								});
							}}
						/>
					</div>

					<div className='col-1'>
						<input
							type='reset'
							className='col'
							onClick={() => {
								console.log(filter);
								setFilter({});
								fetchBooklist({});
							}}
						/>
					</div>
				</div>
			</div>

			<div
				className='container'
				onClick={(e) => {
					console.dir(e.target.tagName);
					if (e.target.tagName !== "BUTTON") return;

					setPageno(e.target.dataset.pageno);
					setOffset(e.target.dataset.pageno * limit);

					fetchBooklist({
						offset: e.target.dataset.pageno * limit,
					});
				}}>
				<span className='btn btn-sm btn-primary'>Page</span>
				<button
					className='btn btn-sm btn-secondary mx-1 btn-active'
					data-pageno='0'>
					1
				</button>
				<button
					className='btn btn-sm btn-secondary mx-1 btn-active'
					data-pageno='1'>
					2
				</button>
				<button
					className='btn btn-sm btn-secondary mx-1 btn-active'
					data-pageno='2'>
					3
				</button>
				<button
					className='btn btn-sm btn-secondary mx-1 btn-active'
					data-pageno='3'>
					4
				</button>
				<button
					className='btn btn-sm btn-secondary mx-1 btn-active'
					data-pageno='4'>
					5
				</button>
			</div>

			<div className='booklist-maincontainer container'>
				<div className='row header align-items-center'>
					<div className='col-1'>SNO</div>
					<div className='col'>TITLE</div>
					<div className='col-3'>AUTHOR</div>
					<div className='col-2'>CATEGORY</div>
					<div className='col-1'>YEAR</div>
					<div className='col-1'>AVAILABLE</div>
					{/* <div className='col-1'>SELECT</div> */}
				</div>
				<div className='booklist-container-fixheight'>
					{bookReducer.map((book, i) => {
						const issuedBooks = sessionStorage.getItem(
							"issued-books"
						)
							? JSON.parse(sessionStorage.getItem("issued-books"))
							: [];

						let bookdetailclassname =
							"row bookdetail-container align-items-center";

						if (issuedBooks.includes(book.id)) {
							console.log("selected");
							bookdetailclassname += "selected";
						}

						return (
							<div
								className={bookdetailclassname}
								data-book-id={book.id}
								data-book-isbn={book.isbn}
								onClick={(e) => {
									let node = e.target;

									if (node.classList.contains("row")) return;

									node = node.parentNode;

									if (node.classList.contains("selected")) {
										return alert(
											"Book cannot be re-issued"
										);
									}

									const bookId = node.dataset.bookId;

									issueBookById(
										{ id: bookId, copies: 1 },
										(err, res) => {
											if (err) return;

											node.classList.add("selected");
											const availablecopiesdom =
												node.querySelector(
													".availablecopies"
												);
											availablecopiesdom.textContent =
												res;

											const issuedBooks =
												sessionStorage.getItem(
													"issued-books"
												)
													? JSON.parse(
															sessionStorage.getItem(
																"issued-books"
															)
													  )
													: [];

											console.log(issuedBooks);
											issuedBooks.push(bookId);
											sessionStorage.setItem(
												"issued-books",
												JSON.stringify(issuedBooks)
											);
										}
									);
								}}>
								<div className='col-1'>{offset + i + 1}</div>
								<div className='col'>
									{book.title.substring(0, 40)}
								</div>
								<div className='col-3'>{book.authorname}</div>
								<div className='col-2'>{book.category}</div>
								<div className='col-1'>
									{book.yearofpublication}
								</div>
								<div className='col-1 availablecopies'>
									{book.availablecopies}
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
}
