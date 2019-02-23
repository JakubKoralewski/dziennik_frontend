<template>
	<div>
		<div class="login">
			<img id="logo" :src="require('@/assets/' + propLogo)">
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

<style scoped lang="scss">
	.login {
		box-shadow: 10px 10px black;
		border-radius: 10px;
	}
</style>
