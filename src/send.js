const { ServiceBusClient } = require('@azure/service-bus')

async function send ({ queue, topic, message }) {
  const connectionString = process.env.SB_CONNECTION_STRING
  const bus = ServiceBusClient.createFromConnectionString(connectionString)

  if (queue) {
    const client = bus.createQueueClient(queue)
    const sender = client.createSender()
    await sender.send({
      body: message
    })
  }

  if (topic) {
    const client = bus.createTopicClient(topic)
    const sender = client.createSender()
    await sender.send({
      body: message
    })
  }
}

module.exports = send
