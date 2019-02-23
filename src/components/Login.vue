<template>
	<div>
		<div id="login">
			<div id="logo">Hogwart</div>
			<p id="subtitle">Dziennik elektroniczny.</p>
			<input id="login" v-model="login" type="login" placeholder="Twój login">
			<input id="haslo" v-model="haslo" type="password" placeholder="Twoje hasło">
			<input id="loginButton" type="button" value="Zaloguj się" @click="loginRequest()">
		</div>
	</div>
</template>

<script lang="ts">
	/* const config = require('@/config.js'); */
	import Vue from 'vue';

	export default Vue.extend({
		name: 'Login',
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
			} as {
				login: string;
				haslo: string;
				loginButton: HTMLButtonElement | null;
			};
		},
		mounted() {
			this.loginButton = document.querySelector('#loginButton');
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
				console.log(`login: ${this.login}\nhaslo: ${this.haslo}`);
				fetch('http://localhost/projekt_php_backend/api/login.php', {
					method: 'POST',
					body: JSON.stringify({ login: this.login, haslo: this.haslo }),
					headers: {
						'Content-Type': 'application/json; charset=UTF-8',
						'Access-Control-Allow-Origin': '*',
						'Access-Control-Allow-Credentials': 'true',
					},
				})
					.then(response => {
						if (response.ok === true) {
							console.log('zalogowano.');
							this.loginSuccessful();
						}
						return response.json();
					})
					.then(data => {
						console.log(data);
					})
					.catch(error => {
						console.error(error);
					});
			},
			loginSuccessful() {
				this.$router.push('zalogowany');
			},
		},
	});
</script>

<style lang="scss" scoped>
	div#login {
		width: 100%;
		height: 100%;
		padding: 2rem 2rem;
		box-shadow: 0px 0px 21px 3px rgba(0, 0, 0, 0.2);
		border-radius: 10px;
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-template-rows: 3fr 1fr;
		/* justify-content: center;
																						align-self: center; */

		#logo {
			font-family: 'Montserrat', Arial, sans-serif;
			font-weight: 600;
			font-size: 4rem;
			grid-row: 1;
			grid-column: 1/-1;
			justify-self: center;
			margin-bottom: 1rem;
		}

		#login,
		#haslo,
		#loginButton {
			grid-row: 2;
		}
	}
</style>
