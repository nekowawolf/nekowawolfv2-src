export async function fetchStats() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

    const communityRes = await fetch(`${baseUrl}/airdrop/cryptocommunity/stats`);
    const communityData = await communityRes.json();
    const communityCount = communityData.data?.total ?? 0;

    const airdropRes = await fetch(`${baseUrl}/airdrop/allairdrop/stats`);
    const airdropData = await airdropRes.json();
    const airdropCount = airdropData.data?.total ?? 0;

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