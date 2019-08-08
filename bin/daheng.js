#!/usr/bin/env node
// 千万不能忘记这句，告诉终端从哪个路径找运行环境

const program = require('commander')
const chalk = require('chalk')

// 标准区块
program
	.version(require('../package.json').version)
	.usage('<command> [options]')

// create 命令区块
program
	.command('create <project-name>')
	.description('创建新项目')
	.option('-p, --page <pageName>', '创建子站')
	.action((projectName, options) => {
		require('./create')(projectName, cleanArgs(options))
	})

// 用户输入位置命令时显示帮助文档，并提示错误
program
	.arguments('<command>')
	.action((cmd) => {
		program.outputHelp()
		console.log(`  ` + chalk.red(`Unknown command ${chalk.yellow(cmd)}.`))
	})

// 在每一行帮助文档后面加一句
program
	.on('--help', () => {
		console.log(`\n  执行 ${chalk.cyan(`daheng <command> --help`)} 可以查看某个命令的帮助文档。\n`)
	})

// 处理各种参数不全
enhanceErrorMessages('missingArgument', argName => {
	return `Missing required argument ${chalk.yellow(`<${argName}>`)}.`
})
enhanceErrorMessages('unknownOption', optionName => {
	return `Unknown option ${chalk.yellow(optionName)}.`
})
enhanceErrorMessages('optionMissingArgument', (option, flag) => {
	return `Missing required argument for option ${chalk.yellow(option.flags)}` + (
		flag ? `, got ${chalk.yellow(flag)}` : ``
	)
})

// 用户在输入命令未加任何参数时显示帮助文档
if (!process.argv.slice(2).length) {
	program.outputHelp()
}

// 这句相当于结束语
program.parse(process.argv)

/**
 * 以下为我从 vue-cli 中拷贝来的通用方法，解析命令行分参数与处理错误传参用的
 * @param {*} str
 */
function camelize (str) {
	return str.replace(/-(\w)/g, (_, c) => c ? c.toUpperCase() : '')
}

function cleanArgs (cmd) {
	const args = {}
	cmd.options.forEach(o => {
		const key = camelize(o.long.replace(/^--/, ''))
		// if an option is not present and Command has a method with the same name
		// it should not be copied
		if (typeof cmd[key] !== 'function' && typeof cmd[key] !== 'undefined') {
			args[key] = cmd[key]
		}
	})
	return args
}

function enhanceErrorMessages (methodName, log) {
	program.Command.prototype[methodName] = function (...args) {
		if (methodName === 'unknownOption' && this._allowUnknownOption) {
			return
		}
		this.outputHelp()
		console.log(`  ` + chalk.red(log(...args)) + ' \n')
		process.exit(1)
	}
}
