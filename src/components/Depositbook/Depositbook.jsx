import axios from "axios";
import QueryString from "qs";
import React, { useEffect } from "react";
import "./Depositbook.scss";

export default function Depositbook() {
	const depositbookToDb = (e) => {
		e.preventDefault();

		const formdata = {
			isbn: document.getElementById("book-isbn").value,
			copies: 1,
		};

		const url = "http://localhost:8080/v1/api/book/update-copy";

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

				alert(data.msg);
				return;
			})
			.catch((error, res) => {
				console.log("Error", error, res);
				alert(error?.response?.data?.msg);
			});
	};

	useEffect(() => {
		return () => {};
	});

	return (
		<div className='DepositbookContainer my-2 container border border-black rounded rounded-3 h-75'>
			<div class='form-container'>
				<div class='left-container'>
					<h1>
						{/* <i class='fas fa-book'></i> */}
						BMS
					</h1>
					<div class='book'>
						<img src='https://www.vhv.rs/dpng/d/463-4633996_book-placeholder-hd-png-download.png' />
					</div>
				</div>
				<div class='right-container'>
					<form action='#' onSubmit={depositbookToDb}>
						<header>
							<h1>Deposit Book Here</h1>
							<div class='book-isbn field-container'>
								<label for='book-isbn'>ISBN</label>
								<input
									id='book-isbn'
									placeholder='Book ISBN'
									type='text'
									required
								/>
							</div>
						</header>
						<footer>
							<div class='set row d-flex justify-content-end'>
								<button
									id='next'
									className='align-self-end justify-self-end'
									type='submit'>
									Deposit
								</button>
							</div>
						</footer>
					</form>
				</div>
			</div>
		</div>
	);
}
