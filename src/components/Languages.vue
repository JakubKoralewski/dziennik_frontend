<template>
	<div
		class="languages"
		itemprop="availableLanguage"
		itemscope
		itemtype="http://schema.org/Language"
	>
		<div
			itemprop="name"
			class="language"
			v-for="(lang, i) in langs"
			:key="i"
			@click="localeChange(lang)"
			:class="{'current-active': $i18n.locale == lang}"
			:title="langsTexts[lang]"
			:aria-label="langsTexts[lang]"
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
		langsTexts: any = {};
		created() {
			this.langs = this.$i18n.availableLocales;
			for (const lang of this.langs) {
				this.langsTexts[lang] =
					this.$i18n.locale === lang
						? (this.$i18n.messages as any)[lang]['language'][
								'already-chosen'
						  ]
						: (this.$i18n.messages as any)[lang]['language'][
								'change-to'
						  ];
			}
		}
		localeChange(lang: string) {
			this.$i18n.locale = lang;
			this.$emit('localeChange', lang);
		}
	}
</script>

<style scoped lang="scss">
</style>
