/**
 * randomuser 서비스에서 무작위 사용자를 가져온다.
 * @returns
 */
export async function getRandomUser() {
  const response = await fetch("https://randomuser.me/api/");
  const jsonData = await response.json();

  return jsonData.results[0];
}

/**
 * randomuser 서비스에서 무작위 사용자를 N명 가져온다.
 */
export async function getRandomUsersByNumber(n: number): Promise<string> {
  const response = await fetch(`https://randomuser.me/api/?results=${n}`);
  const jsonData = await response.json();

  return jsonData.results.map(
    (user: { name: { first: string; last: string } }) => {
      return `${user.name.first} ${user.name.last}`;
    }
  );
}
