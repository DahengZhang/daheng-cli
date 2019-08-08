const ora = require('ora')
const chalk = require('chalk')
const inquirer = require('inquirer')
const clone = require('download-git-repo')

const createProject = async (name) => {
	const { template } = await inquirer.prompt([
		{
			name: 'template',
			type: 'list',
			message: `单选`,
			choices: [
				{ name: '不使用', value: false},
				{ name: '简易模版', value: 'simple-template'}
			]
		}
	])

	if (template) {
		let spinner = ora('downloading template ...')
		spinner.start()
		clone(
			`direct:https://github.com/DahengZhang/daheng-cli.git#${template}`,
			name === '.' ? '.' : `./${name}`, { clone: true }, function(err) {
				if (err) {
					spinner.fail()
					console.log(chalk.red(err))
					return
				}
				spinner.succeed()
				console.log(chalk.green('模版下载完成'))
			}
		)
	} else {
		console.log(chalk.yellow('不实用任何模版'))
	}
}

const createPage = async = (name) => {
	console.log(chalk.yellow('创建子站', name))
}

module.exports = async (name, cmd) => {
	if (cmd.page) {
		createPage(cmd.page)
	} else {
		createProject(name)
	}
}
