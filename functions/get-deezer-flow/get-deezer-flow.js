const fetch = require("node-fetch")

exports.handler = function(event, _, callback) {
  const id = event.queryStringParameters.id
  const TRACKS_URL = `https://api.deezer.com/user/${id}/tracks`

  getDeezerFlow(TRACKS_URL)
    .then(data => {
      respond(200, data)
    })
    .catch(e => {
      respond(404, e.msg)
    })

  function respond(status, data) {
    callback(null, {
      statusCode: status,
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      }
    })
  }
}

async function getDeezerFlow(TRACKS_URL) {
  try {
    const response = await fetch(TRACKS_URL)
    const tracks = await response.json()
    return tracks
  } catch {
    return Error("Error: cannot retrieve user data.")
  }
}
