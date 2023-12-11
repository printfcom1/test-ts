function getClockAngle(hh_mm: string): number {
  const [hh, mm] = hh_mm.split(":");
  let numberHH: number = Number(hh);
  let numberMM: number = Number(mm);
  if (numberHH > 12) {
    numberHH = numberHH - 12;
  }

  const angleHH: number = numberHH * 30 + numberMM * 0.5;
  const angleMM: number = numberMM * 6;

  let result: number;
  if (angleHH > angleMM) {
    result = angleHH - angleMM;
  } else if (angleHH < angleMM) {
    result = angleMM - angleHH;
  } else {
    result = 0;
  }
  if (result > 180) return 360 - result;
  return result;
}
// console.log(getClockAngle("00:15"));
