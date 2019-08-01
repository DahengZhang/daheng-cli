const inquirer = require('inquirer')
const path = require('path')

module.exports = async (name, cmd) => {
	const projectName = path.relative('../', process.cwd())
    const { radio, checkbox } = await inquirer.prompt([
		{
			name: 'radio',
			type: 'list',
			message: `单选`,
			choices: [
				{ name: '单选1', value: 'radio1'},
				{ name: '单选2', value: 'radio2'},
				{ name: 'Cancel', value: false }
			]
		},
		{
			name: 'checkbox',
			type: 'checkbox',
			message: `多选`,
			choices: [
				{ name: '多选1', value: 'checkbox1'},
				{ name: '多选2', value: 'checkbox2'},
				{ name: '多选3', value: 'checkbox3'},
				{ name: '多选4', value: 'checkbox4'},
			]
		}
	])

	console.log(`正在创建项目${name === '.' ? projectName : name}，所带参数有${JSON.stringify(cmd)}`)
	console.log('radio', radio)
	console.log('checkbox', checkbox)
}
