export async function fetchStats() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    const communityRes = await fetch(`${baseUrl}/airdrop/cryptocommunity`);
    const communityData = await communityRes.json();
    const communityCount = communityData.data.length;

    const airdropRes = await fetch(`${baseUrl}/airdrop/allairdrop`);
    const airdropData = await airdropRes.json();
    const airdropCount = airdropData.data.length;

    return {
      communityCount: `${communityCount} community`,
      airdropCount: `${airdropCount} airdrop`
    };
  } catch (error) {
    console.error('failed to fetch data:', error);
    return {
      communityCount: '--',
      airdropCount: '--'
    };
  }
}