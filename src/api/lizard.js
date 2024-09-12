export async function fetchLizards() {
    const memberId = 1;
    const response = await fetch(`http://localhost:8888/api/lizards?memberId=${memberId}`);
    if (!response.ok) {
        const errorText = await response.text();
        console.error('Failed to fetch lizards:', errorText);
        throw new Error('Failed to fetch lizards');
    }
    const data = await response.json();
    console.log('API Response:', data); // 응답 데이터 확인
    return data.data;
}
  
  export async function fetchMatingCandidates(morph) {
    // const response = await fetch(`http://localhost:8888/api/matings?morph=${morph}`);
    // if (!response.ok) {
    //   throw new Error('Failed to fetch mating candidates');
    // }
    // return response.json();  // JSON 데이터 반환
  }
  
// 특정 도마뱀의 상세 정보를 가져오는 함수
//? api 경로 없음 -> 로직 수정
// export async function fetchLizardById(lizardId) {
//     const memberId = 1;
//     const response = await fetch(`http://localhost:8888/api/lizards/${lizardId}?memberId=${memberId}`);
//     if (!response.ok) {
//         const errorText = await response.text();
//         console.error('Failed to fetch lizard details:', errorText);
//         throw new Error('Failed to fetch lizard details');
//     }
//     return response.json(); // JSON 데이터 반환
// }
export function getLizardById(id, lizards) {
    return lizards.find(lizard => lizard.lizardId === id) || null;
}
