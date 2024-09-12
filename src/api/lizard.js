export async function fetchLizards() {
    const memberId = 1
    const response = await fetch(`/api/lizards/${memberId}`);
    if (!response.ok) {
        const errorText = await response.text();
        console.error('Failed to fetch lizards:', errorText);
        throw new Error('Failed to fetch lizards');
    }
    return response.json();
}
  
  export async function fetchMatingCandidates(morph) {
    const response = await fetch(`http://localhost:8080/api/matings?morph=${morph}`);
    if (!response.ok) {
      throw new Error('Failed to fetch mating candidates');
    }
    return response.json();  // JSON 데이터 반환
  }
  
export async function fetchLizardById(id) {
    const response = await fetch(`http://localhost:8080/api/lizards/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch lizard details');
    }
    return response.json();  // JSON 데이터 반환
  }