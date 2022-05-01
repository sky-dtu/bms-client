import axios from "axios";
import QueryString from "qs";
import React, { useEffect } from "react";
import "./Addbook.scss";

export default function Addbook() {
	const addBookToDb = (e) => {
		e.preventDefault();
		const formdata = {
			isbn: document.getElementById("book-isbn").value,
			title: document.getElementById("book-title").value,
			authorname: document.getElementById("book-author").value,
			yearofpublication: document.getElementById("book-year").value,
			category: document.getElementById("book-category").value,
			availablecopies: document.getElementById("book-availablecopies")
				.value,
		};

		const url = "http://localhost:8080/v1/api/book/add-book";

		const options = {
			method: "POST",
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
		<div className='AddbookContainer my-2 container border border-black rounded rounded-3 h-75'>
			<div class='form-container'>
				<div class='left-container'>
					<h1>
						<i class='fas fa-book'></i>
						BMS
					</h1>
					<div class='book'>
						<img src='https://www.vhv.rs/dpng/d/463-4633996_book-placeholder-hd-png-download.png' />
					</div>
				</div>
				<div class='right-container'>
					<form action='#' onSubmit={addBookToDb}>
						<header>
							<h1>Add Book Here</h1>
							<div class='book-title field-container'>
								<label for='book-title'>Title</label>
								<input
									id='book-title'
									placeholder='Book Title'
									type='text'
									required
								/>
							</div>
							<div class='book-author field-container'>
								<label for='book-author'>Author</label>
								<input
									id='book-author'
									placeholder='Author Name'
									type='text'
									required
								/>
							</div>
							<div class='set'>
								<div class='book-category w-50 me-2 field-container'>
									<label for='book-category'>Category</label>
									<input
										id='book-category'
										placeholder='Book Category'
										type='text'
										required
									/>
								</div>
								<div class='book-year w-50 field-container'>
									<label for='book-year'>
										Year of Publish
									</label>
									<input
										id='book-year'
										placeholder='YYYY (eg - 1970)'
										type='number'
										required
									/>
								</div>
							</div>
							<div class='set'>
								<div class='book-availablecopies w-50 me-2 field-container'>
									<label for='book-availablecopies'>
										Available Copies
									</label>
									<input
										id='book-availablecopies'
										name='book-availablecopies'
										type='number'
										placeholder='eg - 10'
										required
									/>
								</div>

								<div class='book-isbn w-50 field-container'>
									<label for='book-isbn'>ISBN</label>
									<input
										id='book-isbn'
										placeholder='Book ISBN'
										type='text'
										required
									/>
								</div>
							</div>
						</header>
						<footer>
							<div class='set row d-flex justify-content-end'>
								<button
									id='next'
									className='align-self-end justify-self-end'
									type='submit'>
									Add
								</button>
							</div>
						</footer>
					</form>
				</div>
			</div>
		</div>
	);
}
