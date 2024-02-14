const textDisplay = document.getElementById('text-display')
const form = document.querySelector('form')
const questionResponseMap = []

// Function to read file contents asynchronously and parse it into question-response pairs
const readFileAndParse = async () => {
  try {
    const response = await fetch('dialogs.txt') // Assuming dialogs.txt is in the same directory
    if (!response.ok) {
      throw new Error('Failed to load file. Please make sure the file exists.')
    }
    const text = await response.text()
    const lines = text.split('\n')
    lines.forEach((line) => {
      const [question, response] = line.split('\t')
      const cleanedQuestion = question
        .toLowerCase()
        .replace(/[^\w\s]/g, '')
        .trim()
      questionResponseMap.push({
        question: cleanedQuestion,
        response: response.trim(),
      })
    })
  } catch (error) {
    console.error('Error reading file:', error.message)
  }
}

readFileAndParse()

form.addEventListener('submit', (e) => {
  e.preventDefault()
  const userInput = document.querySelector('input').value.trim()
  if (userInput) {
    addUserText(userInput)
    addBotText(userInput)
    document.querySelector('input').value = ''
    document.querySelector('input').focus()
    scrollToBottom()
  } else {
    console.log('Please enter a valid input.')
  }
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
  const msg = message.toLowerCase()
  const response = getBotResponse(msg)
  if (response) {
    const displayBotTextElement = document.createElement('p')
    displayBotTextElement.classList.add('bot-text-left')
    displayBotTextElement.textContent = response

    const botTextContainer = document.createElement('section')
    botTextContainer.classList.add('bot-text')
    botTextContainer.appendChild(displayBotTextElement)
    textDisplay.appendChild(botTextContainer)
    scrollToBottom()
  } else {
    console.log('No response found')
  }
}

function levenshteinDistance(a, b) {
  if (a.length === 0) return b.length
  if (b.length === 0) return a.length

  const matrix = []

  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i]
  }

  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j
  }

  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1]
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        )
      }
    }
  }

  return matrix[b.length][a.length]
}

function getBotResponse(userInput) {
  let minDistance = Infinity
  let mostSimilarResponse = ''

  questionResponseMap.forEach((line) => {
    const distance = levenshteinDistance(userInput, line.question.toLowerCase())
    if (distance < minDistance) {
      minDistance = distance
      mostSimilarResponse = line.response
    }
  })

  return mostSimilarResponse
}

function scrollToBottom() {
  textDisplay.scrollTop = textDisplay.scrollHeight
}
