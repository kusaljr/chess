export function compositeUUID(uuid1: string, uuid2: string) {
  const uuid1Bytes = uuidToBytes(uuid1);
  const uuid2Bytes = uuidToBytes(uuid2);

  const compositeBytes: number[] = [];
  for (let i = 0; i < 16; i++) {
    compositeBytes.push(uuid1Bytes[i] ^ uuid2Bytes[i]);
  }

  const compositeUUID = bytesToUUID(compositeBytes);
  return compositeUUID;
}

function uuidToBytes(uuid: string): number[] {
  return (uuid.replace(/-/g, "").match(/.{2}/g) || []).map((byte) =>
    parseInt(byte, 16)
  );
}

function bytesToUUID(bytes: number[]): string {
  const hexString = bytes
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
  return [
    hexString.substring(0, 8),
    hexString.substring(8, 12),
    hexString.substring(12, 16),
    hexString.substring(16, 20),
    hexString.substring(20),
  ].join("-");
}
