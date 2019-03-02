<template>
	<div id="login-component">
		<div id="wrapper">
			<div id="login">
				<div id="logo">{{ propName }}</div>
				<p id="subtitle">Dziennik elektroniczny.</p>
				<p id="copyright">© 2019 Jakub Koralewski</p>
				<hr>
				<div class="login-inputs" id="login-container">
					Login:
					<input id="login" v-model="login" type="login" placeholder="Twój login">
				</div>
				<div class="login-inputs" id="haslo-container">
					Hasło:
					<input id="haslo" v-model="haslo" type="password" placeholder="Twoje hasło">
				</div>
				<!-- <muggle-captcha /> -->
				<input id="loginButton" type="button" value="Zaloguj się" @click="loginRequest()">
			</div>
		</div>
	</div>
</template>

<script lang="ts">
	/* import MuggleCaptcha from '@/components/MuggleCaptcha.vue'; */
	import Vue from 'vue';

	export default Vue.extend({
		name: 'Login',
		/* components: {
						MuggleCaptcha,
					}, */
		props: {
			propName: {
				type: String,
				required: false,
				default: 'Harwart',
			},
			/** Relative to the assets directory.  */
			propLogo: {
				type: String,
				required: false,
				default: 'logo.png',
			},
		},
		data() {
			return {
				login: '',
				haslo: '',
				loginButton: null,
				loginInput: null,
				hasloInput: null,
				wasLoginSuccessful: false,
			} as {
				login: string;
				haslo: string;
				loginButton: HTMLButtonElement | null;
				loginInput: HTMLInputElement | null;
				hasloInput: HTMLInputElement | null;
				wasLoginSuccessful: boolean;
			};
		},
		mounted() {
			this.loginButton = document.querySelector('#loginButton');
			this.loginInput = document.querySelector('input#login');
			this.hasloInput = document.querySelector('input#haslo');

			Array.from(document.querySelectorAll('#login, #haslo')).forEach(
				input => {
					input.addEventListener('keyup', (event: Event) => {
						if ((event as KeyboardEvent).key !== 'Enter') {
							return;
						}

						this.loginButton!.click();
						event.preventDefault();
					});
				}
			);
		},
		methods: {
			loginRequest() {
				const invalidInputs = this.credentialsValid([
					this.loginInput as HTMLInputElement,
					this.hasloInput as HTMLInputElement,
				]);
				if (invalidInputs != false) {
					console.log('Found invalid inputs', invalidInputs);
					if (!this.wasLoginSuccessful) {
						[
							this.loginInput as HTMLInputElement,
							this.hasloInput as HTMLInputElement,
						].forEach(input => input.classList.remove('login-failed'));
					}
					this.loginError(invalidInputs as HTMLInputElement[]);
					return;
				}
				console.log(`login: ${this.login}\nhaslo: ${this.haslo}`);
				fetch(`api/login.php`, {
					method: 'POST',
					body: JSON.stringify({ login: this.login, haslo: this.haslo }),
					headers: {
						'Content-Type': 'application/json; charset=UTF-8',
						'Access-Control-Allow-Origin': '*',
						'Access-Control-Allow-Credentials': 'true',
					},
				})
					.then(response => {
						if (response.ok !== true) {
							this.loginError([
								this.loginInput as HTMLInputElement,
								this.hasloInput as HTMLInputElement,
							]);
						}
						return response.json();
					})
					.then(data => {
						console.log(data);
						if (data.status === true) {
							console.log('zalogowano.');
							this.loginSuccessful();
						}
					})
					.catch(error => {
						console.error(error);
					});
			},
			loginSuccessful() {
				this.wasLoginSuccessful = true;
				[
					this.loginInput as HTMLInputElement,
					this.hasloInput as HTMLInputElement,
				].forEach(input => input.classList.remove('login-failed'));
				this.$router.push('zalogowany');
			},
			loginError(inputs: Array<HTMLInputElement | null>) {
				this.wasLoginSuccessful = false;
				inputs.forEach(input => {
					input!.classList.add('login-failed');
				});
			},
			/** If invalid, returns HTMLInputElement that was invalid  */
			credentialsValid(
				inputs: Array<HTMLInputElement | null>
			): HTMLInputElement[] | true {
				const invalidInputs = inputs
					.map(input => {
						if (!!input!.value == false) {
							return input;
						}
						return null;
					})
					.filter((input: HTMLInputElement | null) => {
						return !!input;
					});
				if (invalidInputs == null) {
					console.log('credentials valid');
					return true;
				} else {
					return invalidInputs as HTMLInputElement[];
				}
			},
		},
	});
</script>

<style lang="scss" scoped>
	input.login-failed {
		background-color: lighten(red, 40%) !important;
		color: darken(red, 20%) !important;
	}

	#login-component {
		border-radius: 10px;
		box-shadow: 0px 0px 21px 3px rgba(255, 255, 255, 0.4);
		animation-name: shadowAnimation;
		animation-duration: 24s;
		animation-iteration-count: infinite;
	}

	@keyframes shadowAnimation {
		0% {
			box-shadow: 0px 0px 21px 3px rgba(0, 217, 255, 0.699);
		}
		25% {
			box-shadow: 0px 0px 21px 3px rgba(255, 0, 234, 0.4);
		}
		50% {
			box-shadow: 0px 0px 21px 3px rgba(30, 255, 0, 0.6);
		}
		75% {
			box-shadow: 0px 0px 21px 3px rgba(255, 0, 0, 0.6);
		}
		100% {
			box-shadow: 0px 0px 21px 3px rgba(0, 217, 255, 0.699);
		}
	}

	div#wrapper {
		width: 100%;
		height: 100%;

		display: inline-block;
		div#login {
			box-sizing: border-box;
			display: flex;
			height: 100%;
			width: 100%;
			padding: 1vw;

			flex-direction: column;
			justify-content: center;
			align-items: center;
			text-align: center;

			hr {
				width: 100%;
				margin-top: 2rem;
				margin-bottom: 1rem;
				opacity: 0.2;
			}

			.login-inputs {
				font-size: 0.9rem;
				input {
					margin-left: 1rem;
				}
			}

			#logo {
				font-weight: 600;
				font-size: 4rem;
				justify-self: center;
				margin-bottom: 0.2rem;
			}

			#copyright {
				margin-top: 0.1rem;
				font-weight: 200;
				font-size: 0.7rem;
			}

			input#login {
				margin-bottom: 0.5rem;
			}

			input#login,
			input#haslo {
				height: 1.2rem;
				border-width: 0px;
				border-radius: 4px;
				background-color: transparentize(gray, 0.8);
				padding: 0.3rem;
			}

			input#loginButton {
				$color: rgb(175, 0, 0);
				margin-top: 1rem;
				width: 60%;
				border-width: 0px;
				background-color: $color;
				color: white;
				padding: 0.5rem 0;
				border-radius: 8px;

				&:hover {
					cursor: pointer;
					background-color: lighten($color, 2);
				}
			}
		}
	}
</style>
