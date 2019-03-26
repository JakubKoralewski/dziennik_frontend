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
					@click="loginRequest()"
				>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
	/* import MuggleCaptcha from '@/components/MuggleCaptcha.vue'; */
	import { Vue, Component, Mixins } from 'vue-property-decorator';
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
		setLoginText(new_text: string) {
			this.oldLoginText = this.loginText;
			this.loginText = new_text;
		}
		restoreOldLoginText() {
			this.loginText = this.oldLoginText;
		}
		loginRequest() {
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
			this.setLoginText(this.$t('login.logging-in') as string);
			const loginTask = new Promise(resolve => {
				this.loginButton.classList.remove('change-text');
				resolve(
					fetch(`${API_URL}api/login.php`, {
						method: 'POST',
						body: JSON.stringify({
							login: this.login,
							haslo: this.password,
						}),
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
									this.passwordInput as HTMLInputElement,
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
								// tslint:disable-next-line:no-unused-expression
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
							return TASKS.LoginTask;
						})
						.catch(error => {
							console.error(error);
							this.setLoginText(this.$t('login.error') as string);
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
						this.setLoginText(this.$t('login.taking-long') as string);
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
					this.setLoginText(this.$t(`login.empty-input.both`) as string);
				}
				return invalidInputs as HTMLInputElement[];
			}
		}
	}
</script>

<style lang="scss" scoped src="./Login/styles.scss"/>
