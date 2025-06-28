
const LOG_ENDPOINT = 'http://20.244.56.144/evaluation-service/logs';
const AUTH_TOKEN ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiIyMjUwMWEwNWo3QHB2cHNpdC5hYy5pbiIsImV4cCI6MTc1MTA4NzI5MSwiaWF0IjoxNzUxMDg2MzkxLCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiYjM0YzBkZDgtYzRiMy00MjFiLWI4NTgtMWRkNDgwNTMzODU1IiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoiYW51c2hhIiwic3ViIjoiZTJhZGUxMDktOGQ3Yi00ZDdjLTlmOTItM2MxMDZmYTczZjQ3In0sImVtYWlsIjoiMjI1MDFhMDVqN0BwdnBzaXQuYWMuaW4iLCJuYW1lIjoiYW51c2hhIiwicm9sbE5vIjoiMjI1MDFhMDVqNyIsImFjY2Vzc0NvZGUiOiJlSFdOenQiLCJjbGllbnRJRCI6ImUyYWRlMTA5LThkN2ItNGQ3Yy05ZjkyLTNjMTA2ZmE3M2Y0NyIsImNsaWVudFNlY3JldCI6IlFmRFZ6QmpRS3B2V0h3bVQifQ.3XS_sHQMxLyRob5PGpMjhKl7hlpl17NPIuvrYuJ4Kic";
export async function Log(stack, level, logPackage, message) {
  const validStacks = ['frontend'];
  const validLevels = ['debug', 'info', 'warn', 'error', 'fatal'];
  const validPackages = ["api",
"component",
"hook",
"page",
"state",
"style" // shared packages
  ];

  try {
    if (!validStacks.includes(stack)) throw new Error(`Invalid stack: ${stack}`);
    if (!validLevels.includes(level)) throw new Error(`Invalid level: ${level}`);
    if (!validPackages.includes(logPackage)) throw new Error(`Invalid package: ${logPackage}`);

    const response = await fetch(LOG_ENDPOINT, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${AUTH_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        stack,
        level,
        package: logPackage,
        message
      })
    });

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(`Server responded with ${response.status}: ${errorData}`);
    }

    const data = await response.json();
    console.log('Log sent:', data);
  } catch (err) {
    console.error('Logging failed:', err.message);
  }
}
