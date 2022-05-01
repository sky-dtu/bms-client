import axios from "axios";
import QueryString from "qs";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, setuser } from "../../redux/actions";
import "./Auth.scss";

function Auth() {
	const dispatch = useDispatch();
	const isLogged = useSelector((state) => state.isLogged);
	const htmlDomElements = {};

	const signupServer = (formdata, callback) => {
		const url = "http://localhost:8080/v1/api/auth/sign-up";
		if (!formdata.type) {
			formdata.type = "reader";
		}

		const options = {
			method: "POST",
			url: url,
			data: QueryString.stringify(formdata),
			headers: {
				"content-type":
					"application/x-www-form-urlencoded;charset=utf-8",
				"Access-Control-Allow-Origin": "*",
			},
		};

		axios(options)
			.then((response) => {
				const { data } = response;
				callback(null, data);
			})
			.catch((error, res) => {
				console.log("Error", error, res);
				callback(error.response.data, res);
			});
	};

	const loginServer = (formdata, callback) => {
		const url = "http://localhost:8080/v1/api/auth/login";

		const options = {
			method: "POST",
			url: url,
			data: QueryString.stringify(formdata),
			headers: {
				"content-type":
					"application/x-www-form-urlencoded;charset=utf-8",
				"Access-Control-Allow-Origin": "*",
			},
		};

		axios(options)
			.then((response) => {
				// console.log(response);
				const { data } = response;

				try {
					if (data) {
						// console.log(data)
						const { token, user } = response.data;
						console.log(user);
						localStorage.setItem("Authorization", token);
						localStorage.setItem(
							"user",
							btoa(JSON.stringify(user))
						);

						callback(null, response.data);
					}
				} catch (error) {
					// throw error;
					callback(error.response.data, null);
				}
			})
			.catch((error, res) => {
				// console.log("Error", error, res);
				if (error.code === "ERR_NETWORK") {
					error.msg = "Please check your network connection";
					return callback(error, null);
				}

				callback(error.response.data, res);
			});
	};

	const handleFormSubmit = (e) => {
		e.preventDefault();
		const formid = e.target.id;

		if (formid == "signin-form") {
			const username = document.getElementById("signin-email").value;
			const password = document.getElementById("signin-pass").value;

			// console.log({ username, password });

			loginServer({ username, password }, (err, res) => {
				// console.log(res);
				if (err) {
					return alert(err.msg);
				}

				dispatch(setuser(res.user));
				dispatch(login);
			});
		} else if (formid == "signup-form") {
			const username = document.getElementById("signup-email").value;
			const password = document.getElementById("signup-pass").value;
			const password_repeat =
				document.getElementById("signup-pass-repeat").value;

			signupServer(
				{ username, password, password_repeat },
				(err, res) => {
					if (err) {
						return alert(err.msg);
					}

					htmlDomElements?.container?.classList.remove(
						"right-panel-active"
					);

					loginServer(
						{ username, password },
						(loginerr, loginres) => {
							// console.log(loginres);
							if (loginerr) {
								return alert(loginerr.msg);
							}

							dispatch(setuser(res.user));
							dispatch(login);
						}
					);

					alert(res.msg);
				}
			);
		}
	};

	const handleAuthCardTransition = () => {
		// Your code to run since DOM is loaded and ready
		htmlDomElements.signUpButton = document.getElementById("signUp");
		htmlDomElements.signInButton = document.getElementById("signIn");
		htmlDomElements.container = document.getElementById("container");

		htmlDomElements?.signUpButton?.addEventListener("click", () => {
			htmlDomElements?.container?.classList.add("right-panel-active");
		});

		htmlDomElements?.signInButton?.addEventListener("click", () => {
			htmlDomElements?.container?.classList.remove("right-panel-active");
		});
	};

	useEffect(() => {
		if (localStorage.getItem("Authorization")) {
			if(localStorage.getItem("user")) {
				dispatch(login);
				dispatch(setuser((JSON.parse(atob(localStorage.getItem("user"))))));
			}
			return;
		}

		return () => {
			handleAuthCardTransition();
		};
	}, []);

	return (
		<div className="AuthContainer">
			<div className='container' id='container'>
				<div className='form-container sign-up-container'>
					<form
						action='#'
						id='signup-form'
						onSubmit={handleFormSubmit}>
						<h1 className='mb-3'>Create Account</h1>
						<input
							type='email'
							placeholder='Email'
							id='signup-email'
						/>
						<input
							type='password'
							placeholder='Password'
							id='signup-pass'
						/>
						<input
							type='password'
							placeholder='Re-enter Password'
							id='signup-pass-repeat'
						/>
						<button className='mt-4'>Sign Up</button>
					</form>
				</div>
				<div className='form-container sign-in-container'>
					<form
						action='#'
						id='signin-form'
						onSubmit={handleFormSubmit}>
						<h1>Sign in</h1>
						<input
							type='text'
							placeholder='Email'
							id='signin-email'
						/>
						<input
							type='password'
							placeholder='Password'
							id='signin-pass'
						/>
						<button>Sign In</button>
					</form>
				</div>
				<div className='overlay-container'>
					<div className='overlay'>
						<div className='overlay-panel overlay-left'>
							<h1>Welcome Back!</h1>
							<p>
								To keep connected, please login <hr /> with your
								credentials
							</p>
							<button className='ghost' id='signIn'>
								Sign In
							</button>
						</div>
						<div className='overlay-panel overlay-right'>
							<h2 className='mb-2 fw-bold'>Hello, Explorer!</h2>
							<p>
								New here ? <hr /> Click below to register and
								start learning
							</p>
							<button className='ghost' id='signUp'>
								Sign Up
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Auth;
