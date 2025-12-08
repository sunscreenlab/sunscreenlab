exports.handler = async function(event, context) {
  try {
    const body = JSON.parse(event.body);

    const issueTitle = `Sunscreen Submission: ${body.brand} – ${body.name}`;
    const issueBody = `
A new sunscreen was submitted:

\`\`\`json
${JSON.stringify(body, null, 2)}
\`\`\`

Submitted from: Add a Sunscreen form
    `;

    const response = await fetch(
      "https://api.github.com/repos/sunscreenlab/sunscreenlab/issues",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.GITHUB_TOKEN}`,
          "User-Agent": "NetlifyFunction"
        },
        body: JSON.stringify({
          title: issueTitle,
          body: issueBody
        })
      }
    );

    const text = await response.text();   // ⬅️ IMPORTANT
    console.log("GitHub response:", text); // ⬅️ PRINT IT TO LOGS

    if (!response.ok) {
      return {
        statusCode: 500,
        body: JSON.stringify({
          message: "Failed to create issue",
          details: text
        })
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Submission received! Thank you." })
    };

  } catch (err) {
    console.log("Function error:", err); // ⬅️ ALSO PRINT
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Error processing submission",
        error: err.message
      })
    };
  }
};
