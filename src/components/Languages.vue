<template>
	<div class="languages">
		<div
			class="language"
			v-for="(lang, i) in langs"
			:key="i"
			@click="localeChange(lang)"
			:class="{'current-active': $i18n.locale == lang}"
			:title="$i18n.locale == lang ? $i18n.messages[lang]['language']['already-chosen'] : $i18n.messages[lang]['language']['change-to']"
		>{{lang}}</div>
	</div>
</template>

<script lang="ts">
	import { Vue, Component } from 'vue-property-decorator';

	@Component({
		name: 'Languages',
	})
	export default class Languages extends Vue {
		langs: string[] = [];
		created() {
			this.langs = this.$i18n.availableLocales;
		}
		localeChange(lang: string) {
			this.$i18n.locale = lang;
			//this.$router.push(this.$t('logged-in'));
		}
	}
</script>

<style scoped lang="scss">
</style>
