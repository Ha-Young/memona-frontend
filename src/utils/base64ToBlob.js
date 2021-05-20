async function base64ToBlob(base64Data, type = "image/jpeg") {
  const base64Response = await fetch(`data:${type};base64,${base64Data}`);
  return await base64Response.blob();
}

export default base64ToBlob;
