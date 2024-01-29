const textDisplay = document.getElementById('text-display')
const form = document.querySelector('form')

form.addEventListener('submit', (e) => {
  e.preventDefault()
  const userInput = document.querySelector('input').value
  addUserText(userInput)
  addBotText(userInput)
  document.querySelector('input').value = ''
})

const addUserText = (message) => {
  const displayUserTextElement = document.createElement('p')
  displayUserTextElement.classList.add('user-text-right')
  displayUserTextElement.textContent = message

  const userTextContainer = document.createElement('section')
  userTextContainer.classList.add('user-text')
  userTextContainer.appendChild(displayUserTextElement)
  textDisplay.appendChild(userTextContainer)
}

const addBotText = (message) => {
  const response = generateBotResponse(message)
  const displayBotTextElement = document.createElement('p')
  displayBotTextElement.classList.add('bot-text-left')
  displayBotTextElement.textContent = response

  const botTextContainer = document.createElement('section')
  botTextContainer.classList.add('bot-text')
  botTextContainer.appendChild(displayBotTextElement)
  textDisplay.appendChild(botTextContainer)
}

const generateBotResponse = (message) => {
  if (message === 'Hello') {
    return 'Hi, how can I help you'
  } else {
    return 'I cannot understand I cannot understand I cannot understand'
  }
}
