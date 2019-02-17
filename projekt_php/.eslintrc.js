module.exports =  {
	"root": true,
    "env": {
      "node": true
    },
    "extends": [
      "plugin:vue/recommended",
      "eslint:recommended",
      /* "plugin:prettier/recommended", */
      "prettier/vue"
    ],
	"parserOptions": {
		"parser": "babel-eslint",
		"ecmaVersion": 6,
		"sourceType": "module",
		"ecmaFeatures": {
			"jsx": true,
			"modules": true
		}
	},
	"rules": {
		"semi": "error",
		"quotes": ["error", "single"],
		/* "indent": ["error", "tab"], */
		"vue/script-indent": ["error", "tab", { "baseIndent": 1 }],
		"comma-dangle": ["error", "always-multiline"]
	},
/* 	"plugins": [
		"prettier"
	] */
}