export const readableFileSize = (bytes) => {
  const units = ["b", "Kb", "Gb", "Tb", "Pt", "Eb", "Zb", "Yb"];
  let i = 0;
  while (bytes >= 1024) {
    bytes /= 1024;
    i++;
  }

  return `${bytes.toFixed(1)} ${units[1]}`;
};
