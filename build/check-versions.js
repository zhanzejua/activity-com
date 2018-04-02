const chalk = require('chalk')
// semver, 语义化版本检查插件，npm版本号的检查
const semver = require('semver')
const packageConfig = require('../package.json')
// shelljs, 执行Unix命令行的插件
const shell = require('shelljs')
// 开辟子进程执行指令cmd并返回结果
function exec (cmd) {
	return require('child_process').execSync(cmd).toString().trim()
}

// node和npm版本需求
const versionRequirements = [
	{
		name: 'node',
		currentVersion: semver.clean(process.version), //使用semver插件把版本信息转化成规定格式，也就是 '  =v1.2.3  ' -> '1.2.3' 这种功能
		versionRequirement: packageConfig.engines.node
	}
]

if (shell.which('npm')) {
	versionRequirements.push({
		name: 'npm',
		currentVersion: exec('npm --version'),
		versionRequirement: packageConfig.engines.npm
	})
}

module.exports = function () {
	const warnings = []
	// 依次判断版本是否符合要求
	for (let i = 0; i < versionRequirements.length; i++) {
		const mod = versionRequirements[i]
		//semver.satisfies(version,range),如果版本不在这个范围内
		if (!semver.satisfies(mod.currentVersion, mod.versionRequirement)) {
			warnings.push(mod.name + ': ' +
				chalk.red(mod.currentVersion) + ' should be ' +
				chalk.green(mod.versionRequirement)
			)
		}
	}

	if (warnings.length) {
		console.log('')
		console.log(chalk.yellow('To use this template, you must update following to modules:'))
		console.log()

		for (let i = 0; i < warnings.length; i++) {
			const warning = warnings[i]
			console.log('  ' + warning)
		}

		console.log()
		process.exit(1)
	}
}
