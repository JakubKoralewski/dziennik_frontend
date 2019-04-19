<template>
	<div id="login-component">
		<div id="wrapper">
			<div id="login">
				<h1 id="logo">{{ propName }}</h1>
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
							:aria-label="$t('login.placeholders.login')"
						>
					</div>
					<div class="login-inputs" id="password-container">
						{{$t('login.password')}}:
						<input
							id="password"
							v-model="password"
							type="password"
							:placeholder="$t('login.placeholders.password')"
							:aria-label="$t('login.placeholders.password')"
						>
					</div>
				</div>

				<!-- <muggle-captcha /> -->
				<input
					id="login-button"
					type="button"
					:value="loginText"
					:aria-label="loginText"
					v-on="{click: !isLoggingIn ? loginRequest : () => null}"
				>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
	/* import MuggleCaptcha from '@/components/MuggleCaptcha.vue'; */
	import { Vue, Component, Mixins, Watch } from 'vue-property-decorator';
	import { API_URL } from '@/config';
	import { Sleep, ISleep } from '@/mixins/Sleep';

	enum TASKS {
		LoginTask,
		CheckIfTakingTooLongTask,
	}

	const LoginProps = Vue.extend({
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
	});
	@Component({
		name: 'Login',
		mixins: [Sleep],
	})
	export default class Login extends LoginProps {
		/* Data */
		login: string = '';
		loginText: string = '';
		oldLoginText: string = '';
		password: string = '';
		loginI18nText: string = '';
		isLoggingIn: boolean = false;

		/* Elements */
		loginButton: HTMLButtonElement | null = null;
		loginInput: HTMLInputElement | null = null;
		passwordInput: HTMLInputElement | null = null;

		wasLoginSuccessful: boolean = false;

		/* Mixin: Sleep */
		sleep: ISleep;

		created() {
			this.loginText = this.$t('login.CTA') as string;
			this.login = this.password = 'admin';
		}

		mounted() {
			this.loginButton = document.querySelector('#login-button');
			this.loginInput = document.querySelector('input#login');
			this.passwordInput = document.querySelector('input#password');

			Array.from(document.querySelectorAll('#login, #password')).forEach(
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
		}
		@Watch('$i18n.locale')
		onLocaleChange() {
			this.setLoginText(this.$t('login.CTA') as string);
		}
		/** Takes in a string that can be used
		 *  to find i18n message.
		 */
		private setLoginText(i18n_text: string) {
			this.oldLoginText = this.loginText;
			this.loginI18nText = i18n_text;
			this.loginText = this.$t(i18n_text) as string;
		}
		restoreOldLoginText() {
			this.loginText = this.oldLoginText;
		}
		loginRequest() {
			this.isLoggingIn = true;
			const invalidInputs = this.credentialsValid([
				this.loginInput as HTMLInputElement,
				this.passwordInput as HTMLInputElement,
			]);
			if (invalidInputs != false) {
				console.log('Found invalid inputs', invalidInputs);
				if (!this.wasLoginSuccessful) {
					[
						this.loginInput as HTMLInputElement,
						this.passwordInput as HTMLInputElement,
					].forEach(input => input.classList.remove('login-failed'));
				}
				this.loginError(invalidInputs as HTMLInputElement[]);
				return;
			}
			console.log(`login: ${this.login}\npassword: ${this.password}`);
			this.loginButton.classList.add('logging-in');
			this.setLoginText('login.logging-in');
			const loginTask = new Promise(resolve => {
				this.loginButton.classList.remove('change-text');
				resolve(
					fetch(`${API_URL}api/login`, {
						method: 'POST',
						body: JSON.stringify({
							login: this.login,
							password: this.password,
						}),
						headers: {
							'Content-Type': 'application/json; charset=UTF-8',
							'Access-Control-Allow-Origin': '*',
							'Access-Control-Allow-Credentials': 'true',
						},
					})
						.then(response => {
							debugger;
							if (response.ok === true) {
								this.setLoginText('login.successful');
								console.log('Logged in.');
								this.loginSuccessful();
							} else {
								this.loginError([
									this.loginInput as HTMLInputElement,
									this.passwordInput as HTMLInputElement,
								]);
								this.setLoginText('login.invalid-credentials');
								this.loginButton.classList.add('change-text');
								// tslint:disable-next-line:no-unused-expression
								new Promise(x => {
									setTimeout(() => {
										this.setLoginText('login.CTA');
										this.loginButton.classList.remove(
											'change-text'
										);
									}, 1500);
								});
							}
							this.isLoggingIn = false;
							return TASKS.LoginTask;
						})
						.catch(error => {
							console.error(error);
							this.setLoginText('login.error');
						})
						.finally(() => {
							this.loginButton.classList.remove('logging-in');
						})
				);
			});
			const checkIfTakingTooLongTask = (amountToWait: number) =>
				new Promise(async resolve => {
					await this.sleep(amountToWait);
					resolve(TASKS.CheckIfTakingTooLongTask);
				});
			Promise.race([checkIfTakingTooLongTask(1000), loginTask]).then(
				async (taskType: any) => {
					if (taskType === TASKS.CheckIfTakingTooLongTask) {
						this.setLoginText('login.taking-long');
					}
				}
			);
		}
		loginSuccessful() {
			this.wasLoginSuccessful = true;
			[
				this.loginInput as HTMLInputElement,
				this.passwordInput as HTMLInputElement,
			].forEach(input => input.classList.remove('login-failed'));
			this.$router.push(this.$t('paths.logged-in'));
		}
		loginError(inputs: Array<HTMLInputElement | null>) {
			this.wasLoginSuccessful = false;
			inputs.forEach(input => {
				input!.classList.add('login-failed');
			});
		}
		/** If invalid, returns HTMLInputElement that was invalid  */
		credentialsValid(
			inputs: Array<HTMLInputElement | null>
		): HTMLInputElement[] | true {
			const invalidInputs = inputs
				.map(input => {
					if (!!input!.value == false) {
						this.setLoginText(`login.empty-input.${input.type}`);
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
					this.setLoginText('login.empty-input.both');
				}
				return invalidInputs as HTMLInputElement[];
			}
		}
	}
</script>

<style lang="scss" scoped src="./Login/styles.scss"/>
