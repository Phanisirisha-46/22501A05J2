
const LOG_ENDPOINT = 'http://20.244.56.144/evaluation-service/logs';
const AUTH_TOKEN ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiIyMjUwMWEwNWoyQHB2cHNpdC5hYy5pbiIsImV4cCI6MTc1MTA4NzM5NywiaWF0IjoxNzUxMDg2NDk3LCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiOTBlZTViN2UtMWM0Ny00Y2RiLTg1YWEtNmM0MWIwYWU0NjhmIiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoidmVlcmFua2kgcGhhbmkgc2lyaXNoYSIsInN1YiI6IjliYjQyMTMwLTFiMDQtNDFmNy1iNTAzLTZmMzc4ZmNhYjAyOCJ9LCJlbWFpbCI6IjIyNTAxYTA1ajJAcHZwc2l0LmFjLmluIiwibmFtZSI6InZlZXJhbmtpIHBoYW5pIHNpcmlzaGEiLCJyb2xsTm8iOiIyMjUwMWEwNWoyIiwiYWNjZXNzQ29kZSI6ImVIV056dCIsImNsaWVudElEIjoiOWJiNDIxMzAtMWIwNC00MWY3LWI1MDMtNmYzNzhmY2FiMDI4IiwiY2xpZW50U2VjcmV0IjoiZWZkVWZIZGNETnNjYXp6cSJ9.Ohgi2N_SOleSf2hQeRW66SSEAE4LncU0vEn2XtrMI-E";
export async function Log(stack, level, logPackage, message) {
  const validStacks = ['frontend'];
  const validLevels = ['debug', 'info', 'warn', 'error', 'fatal'];
  const validPackages = [
    'api', 'component', 'hook', 'page', 'state', 'style',
    'auth', 'config', 'middleware', 'utils' // shared packages
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