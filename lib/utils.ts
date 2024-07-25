export function convertToBytes(size: string): number {
  const units = {
    B: 1,
    KB: 1024,
    MB: 1024 ** 2,
    GB: 1024 ** 3,
    TB: 1024 ** 4,
    PB: 1024 ** 5,
    EB: 1024 ** 6,
    ZB: 1024 ** 7,
    YB: 1024 ** 8,
  };

  try {
    let [value, unit] = size.split(" ");

    const v = parseFloat(value.replace(",", "."));
    const u = units[unit as keyof typeof units];

    return v * u;
  } catch (e) {
    return 0;
  }
}
