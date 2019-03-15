<template>
	<div id="login-component">
		<div id="wrapper">
			<div id="login">
				<div id="logo">{{ propName }}</div>
				<p id="subtitle">{{$t('title')}}</p>
				<p id="copyright">©2019 Jakub Koralewski</p>
				<hr>
				<div class="login">
					<div class="login-inputs" id="login-container">
						Login:
						<input
							id="login"
							v-model="login"
							type="login"
							spellcheck="false"
							:placeholder="$t('login.placeholders.login')"
						>
					</div>
					<div class="login-inputs" id="haslo-container">
						{{$t('login.password')}}:
						<input
							id="haslo"
							v-model="haslo"
							type="password"
							:placeholder="$t('login.placeholders.password')"
						>
					</div>
				</div>

				<!-- <muggle-captcha /> -->
				<input id="login-button" type="button" :value="loginText" @click="loginRequest()">
			</div>
		</div>
	</div>
</template>

<script lang="ts">
	/* import MuggleCaptcha from '@/components/MuggleCaptcha.vue'; */
	import Vue from 'vue';
	import { API_URL } from '@/config';

	export default Vue.extend({
		name: 'Login',
		// components: {
		// 	MuggleCaptcha,
		// },
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
				loginText: this.$t('login.CTA'),
				oldLoginText: '',
				haslo: '',
				loginButton: null,
				loginInput: null,
				hasloInput: null,
				wasLoginSuccessful: false,
			} as {
				login: string;
				loginText: string;
				oldLoginText: string;
				haslo: string;
				loginButton: HTMLButtonElement | null;
				loginInput: HTMLInputElement | null;
				hasloInput: HTMLInputElement | null;
				wasLoginSuccessful: boolean;
			};
		},
		mounted() {
			this.loginButton = document.querySelector('#login-button');
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
			setLoginText(new_text: string) {
				this.oldLoginText = this.loginText;
				this.loginText = new_text;
			},
			restoreOldLoginText() {
				this.loginText = this.oldLoginText;
			},
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
				this.loginButton.classList.add('logging-in');
				this.setLoginText(this.$t('login.logging-in') as string);
				fetch(`${API_URL}api/login.php`, {
					method: 'POST',
					body: JSON.stringify({ login: this.login, haslo: this.haslo }),
					headers: {
						'Content-Type': 'application/json; charset=UTF-8',
						'Access-Control-Allow-Origin': '*',
						'Access-Control-Allow-Credentials': 'true',
					},
				})
					.then(response => {
						if ((response as any).status !== true) {
							this.loginError([
								this.loginInput as HTMLInputElement,
								this.hasloInput as HTMLInputElement,
							]);
						} else {
							this.setLoginText(this.$t(
								'login.invalid-credentials'
							) as string);
						}
						return response.json();
					})
					.then(async data => {
						console.log(data);
						if (data.status === true) {
							this.setLoginText(this.$t(
								'login.successful'
							) as string);
							console.log('zalogowano.');
							this.loginSuccessful();
						} else {
							this.setLoginText(this.$t(
								'login.invalid-credentials'
							) as string);
							this.loginButton.classList.add('change-text');
							new Promise(x => {
								setTimeout(() => {
									this.setLoginText(this.$t(
										'login.CTA'
									) as string);
									this.loginButton.classList.remove(
										'change-text'
									);
								}, 1500);
							});
						}
					})
					.catch(error => {
						console.error(error);
						this.setLoginText(this.$t('login.error') as string);
					})
					.finally(() => {
						this.loginButton.classList.remove('logging-in');
					});
			},
			loginSuccessful() {
				this.wasLoginSuccessful = true;
				[
					this.loginInput as HTMLInputElement,
					this.hasloInput as HTMLInputElement,
				].forEach(input => input.classList.remove('login-failed'));
				this.$router.push(this.$t('logged-in'));
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
							this.setLoginText(this.$t(
								`login.empty-input.${input.type}`
							) as string);
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
					if (invalidInputs.length == 2) {
						this.setLoginText(this.$t(
							`login.empty-input.both`
						) as string);
					}
					return invalidInputs as HTMLInputElement[];
				}
			},
		},
	});
</script>

<style lang="scss" scoped src="./Login/styles.scss"/>
