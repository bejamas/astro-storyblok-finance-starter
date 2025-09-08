const axios = require('axios')

exports.handler = async (event, context) => {
  const STORYBLOK_MANAGEMENT_TOKEN = process.env.STORYBLOK_MANAGEMENT_TOKEN
  const STORYBLOK_SPACE_ID = process.env.STORYBLOK_SPACE_ID

  if (!STORYBLOK_MANAGEMENT_TOKEN) {
    return {
      statusCode: 500,
      body: 'Server error: STORYBLOK_MANAGEMENT_TOKEN is not configured.'
    }
  }
  if (!STORYBLOK_SPACE_ID) {
    return {
      statusCode: 500,
      body: 'Server error: STORYBLOK_SPACE_ID is not configured.'
    }
  }

  const newSpaceName = `Global Finance Starter - ${new Date().toISOString().slice(0, 16)}`

  const requestBody = {
    dup_id: STORYBLOK_SPACE_ID,
    space: {
      name: newSpaceName
    }
  }

  const headers = {
    'Authorization': STORYBLOK_MANAGEMENT_TOKEN,
    'Content-Type': 'application/json'
  }

  const url = `https://api.storyblok.com/v1/spaces/`

  try {
    const response = await axios.post(url, requestBody, { headers })
    const newSpace = response.data.space
    const newSpaceUrl = `https://app.storyblok.com/#/me/spaces/${newSpace.id}/dashboard/`

    return {
      statusCode: 302,
      headers: {
        'Location': newSpaceUrl
      },
      body: ''
    }

  } catch (error) {
    console.error('Error duplicating Storyblok space:', error.response ? error.response.data : error.message)

    let errorMessage = 'An unknown error occurred.'
    let errorStatus = 500

    if (error.response) {
      errorStatus = error.response.status
      errorMessage = JSON.stringify(error.response.data, null, 2)
    } else {
      errorMessage = error.message
    }

    return {
      statusCode: errorStatus,
      body: `Failed to clone Storyblok space. Here are the details: \n\n${errorMessage}`
    }
  }
}
