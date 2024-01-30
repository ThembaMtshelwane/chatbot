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

const greetingsKeywords = ['hello', 'hey', 'hi']
const todayWeatherKeywords = ['today', "today's"]
const tomorrowWeatherKeywords = ['tomorrow', "tomorrow's"]
const temperatureKeywords = ['temperature']
const listOfCities = ['Soweto']

const generateBotResponse = (message) => {
  const msg = message.toLowerCase()
  const city = listOfCities.find((city) => city.toLowerCase() === msg)
  const greet = greetingsKeywords.find((input) => input.includes(msg))
  const todayWeather = todayWeatherKeywords.some((keyword) =>
    msg.includes(keyword)
  )
  const tomorrowWeather = tomorrowWeatherKeywords.some((keyword) =>
    msg.includes(keyword)
  )
  const temperature = temperatureKeywords.some((keyword) =>
    msg.includes(keyword)
  )

  if (greet) {
    return 'Hello, please enter a city so I can help you with weather information'
  } else if (city) {
    return `What do you want to know about ${city}? \n  The weather \n The temperature`
  } else if (tomorrowWeather) {
    return 'The weather tomorrow will be'
  } else if (todayWeather) {
    return 'The weather today is'
  } else if (temperature) {
    return 'The temperature is'
  } else {
    return "Sorry, I don't understand you"
  }
}
