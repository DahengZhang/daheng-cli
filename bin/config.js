const inquirer = require('inquirer')
const chalk = require('chalk')
let conf = require(`${__dirname}/../config.json`)

const list = (list = conf) => {
	for (let key in list) {
		const branchs = list[key].branchs || ['master']
		for (let i = 0; i < branchs.length; i++) {
			console.log(`${chalk.magenta(key)}: ${chalk.blue(list[key].url)}${chalk.gray('#' + branchs[i])}`)
		}
	}
}

const add = async (options) => {
	const { name, url, branch } = await inquirer.prompt([
		{
            name: 'name',
            type: 'input',
			message: '请输入仓库名称',
			default: options.name
        }, {
            name: 'url',
            type: 'input',
            message: '请输入仓库地址'
		}, {
            name: 'branch',
            type: 'input',
			message: '请输入使用的分支',
			default: 'master'
        }
	])
	let overwrite = false
	if (conf.hasOwnProperty(name)) {
		const overwriteOption = await inquirer.prompt([
			{
				name: 'overwrite',
				type: 'confirm',
				message: `${name}仓库已经存在，是否更新`,
				default: false
			}
		])
		overwrite = overwriteOption.overwrite
	}

	conf[name] = {
		url,
		branchs: [branch]
	}
	console.log(has``)
}

const remove = () => {
	console.log('remove')
}

module.exports = (projectName, options) => {
	switch (projectName) {
		case 'list':
			list();break;
		case 'add':
			add(options);break;
		case 'remove':
			remove();break;
		default:
			console.log(chalk.red('未知操作'))
	}
}
