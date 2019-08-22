const ora = require('ora')
const chalk = require('chalk')
const inquirer = require('inquirer')

module.exports = async (projectName, options) => {
	const { name, css, router, history } = await inquirer.prompt([
		{
            name: 'name',
            type: 'input',
            message: '请输入项目名称',
            default: projectName === '.' ? path.relative('../', process.cwd()) : projectName
        }, {
			name: 'css',
			type: 'list',
			message: `选择css预处理器`,
			choices: [
				{ name: '不使用', value: false},
                { name: 'less', value: 'less-template'},
                { name: 'sass/scss', value: 'sass-template'}
			]
		}, {
            name: 'router',
            type: 'confirm',
            message: '是否使用前段路由',
            default: true
        }, {
            name: 'history',
            type: 'confirm',
            message: '路由是否使用 history 模式',
            default: true,
            when (answer) {
                return answer.router
            }
        }
	])
}
