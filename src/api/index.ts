/**
 * randomuser 서비스에서 무작위 사용자를 가져온다.
 * @returns
 */
export async function getRandomUser() {
  const response = await fetch("https://randomuser.me/api/");
  const jsonData = await response.json();

  return jsonData;
}
