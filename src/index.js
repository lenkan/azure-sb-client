#!/bin/env node
require('dotenv').config()
const yargs = require('yargs')
const send = require('./send')

function success (msg) {
  if (msg) {
    console.log(msg)
  }

  process.exit(0)
}

function fail (msg) {
  if (msg) {
    console.error(msg)
  }

  process.exit(1)
}

yargs.command('send', 'Send message to service bus topic or queue', argv => {
  argv.option('topic', {
    alias: 't',
    type: 'string',
    description: 'Specifies the topic to send the message to'
  })

  argv.option('queue', {
    alias: 'q',
    type: 'string',
    description: 'Specifies the queue so send the message to'
  })

  argv.option('message', {
    alias: 'm',
    description: 'The message to send, use dot-notation to create an object'
  })

  argv.option('preview', {
    alias: 'p',
    type: 'boolean',
    description: 'Use to preview print the message that is going to be sent'
  })

  return argv
}, async args => {
  const { topic, queue, message, preview } = args
  if (preview) {
    return success(JSON.stringify(message, null, 2))
  }

  try {
    await send({ topic, queue, message })
    success()
  } catch (error) {
    fail(error)
  }
})

yargs.demandCommand()
yargs.help()
yargs.parse()
